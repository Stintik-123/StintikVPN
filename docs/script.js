(function(){
  "use strict";

  // === УТИЛИТЫ ===
  function sanitizeHTML(str) {
    var t = document.createElement('div');
    t.textContent = str;
    return t.innerHTML;
  }

  function debounce(func, wait) {
    var timeout;
    return function() {
      var ctx = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function(){ func.apply(ctx, args); }, wait);
    };
  }

  function trackEvent(cat, act, lbl) {
    console.log('[Analytics]', cat, act, lbl);
  }

  // === ПРЕЛОАДЕР ===
  (function(){
    var el = document.getElementById("preloader");
    if (!el) return;
    var hidden = false, startedAt = Date.now(), MIN_VISIBLE = 300;
    function hide(){
      if (hidden) return; hidden = true;
      var wait = Math.max(0, MIN_VISIBLE - (Date.now() - startedAt));
      setTimeout(function(){
        el.classList.add("hidden");
        setTimeout(function(){ if (el.parentNode) el.parentNode.removeChild(el); }, 300);
      }, wait);
    }
    window.addEventListener("load", hide);
    setTimeout(hide, 1200);
  })();

  // === SERVICE WORKER ===
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('service-worker.js').catch(function(){});
    });
  }

  // === ТЕМА ===
  var themeBtn = null;
  function initTheme() {
    if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-theme');
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
      themeBtn = btn;
    }
  }
  initTheme();
  function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    if (themeBtn) themeBtn.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
  }
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // === ОПРЕДЕЛЕНИЕ ОС ===
  function detectOS(){
    var ua = navigator.userAgent || "";
    if (/android/i.test(ua)) return "android";
    if (/iphone|ipad|ipod/i.test(ua)) return "ios";
    if (/mac/i.test(ua)) return "mac";
    if (/win/i.test(ua)) return "win";
    return "linux";
  }
  var userOS = detectOS();

  // === TOAST ===
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function showToast(msg){
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toastEl.classList.remove("visible"); }, 4000);
  }

  // === CLIPBOARD ===
  function copyText(text){
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function(resolve, reject){
      try {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.focus(); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta); resolve();
      } catch(e) { reject(e); }
    });
  }

  // === ГЛОБАЛЬНЫЕ ОЦЕНКИ (CounterAPI) ===
  var globalRatings = {};

  async function fetchRating(id, type) {
    try {
      var res = await fetch("https://api.counterapi.dev/v1/stintikvpn/" + id + "-" + type + "/get");
      var data = await res.json();
      return data.count || 0;
    } catch(e) { return 0; }
  }

  async function incrementRating(id, type) {
    try {
      await fetch("https://api.counterapi.dev/v1/stintikvpn/" + id + "-" + type + "/up");
      if (!globalRatings[id]) globalRatings[id] = { likes: 0, dislikes: 0 };
      globalRatings[id][type]++;
      updateRatingDisplay(id);
    } catch(e) { showToast("Ошибка сети"); }
  }

  function updateRatingDisplay(id) {
    var card = document.getElementById("card-" + id);
    if (!card || !globalRatings[id]) return;
    var l = card.querySelector(".rating-likes");
    var d = card.querySelector(".rating-dislikes");
    if (l) l.textContent = globalRatings[id].likes;
    if (d) d.textContent = globalRatings[id].dislikes;
  }

  async function loadAllRatings() {
    var total = 0;
    for (var i = 0; i < subscriptions.length; i++) {
      var sub = subscriptions[i];
      var likes = await fetchRating(sub.id, "like");
      var dislikes = await fetchRating(sub.id, "dislike");
      globalRatings[sub.id] = { likes: likes, dislikes: dislikes };
      total += likes + dislikes;
    }
    var ratStat = document.getElementById('statRatings');
    if (ratStat) ratStat.textContent = total;
  }

  // === ГЛОБАЛЬНАЯ СТАТИСТИКА КОПИРОВАНИЙ ===
  var globalCopies = {};

  async function fetchCopyCount(id) {
    try {
      var res = await fetch("https://api.counterapi.dev/v1/stintikvpn/" + id + "-copy/get");
      var data = await res.json();
      return data.count || 0;
    } catch(e) { return 0; }
  }

  async function incrementCopyCount(id) {
    try {
      await fetch("https://api.counterapi.dev/v1/stintikvpn/" + id + "-copy/up");
      if (!globalCopies[id]) globalCopies[id] = 0;
      globalCopies[id]++;
      updateCopyBadge(id);
      updateTotalCopies();
    } catch(e) {}
  }

  function updateCopyBadge(id) {
    var card = document.getElementById("card-" + id);
    if (!card) return;
    var badge = card.querySelector(".popularity-badge");
    var count = globalCopies[id] || 0;
    if (badge) {
      badge.textContent = count > 100 ? '🔥 Популярное' : '⭐ ' + count + ' копирований';
    }
  }

  function updateTotalCopies() {
    var total = Object.values(globalCopies).reduce(function(s, v){ return s + v; }, 0);
    var el = document.getElementById('statCopies');
    if (el) el.textContent = total;
  }

  async function loadAllCopyCounts() {
    for (var i = 0; i < subscriptions.length; i++) {
      var sub = subscriptions[i];
      globalCopies[sub.id] = await fetchCopyCount(sub.id);
    }
    updateTotalCopies();
  }

  // === УМНАЯ ДИАГНОСТИКА ===
  async function checkSubscriptionHealth(url) {
    var startTime = performance.now();
    try {
      var controller = new AbortController();
      var timeoutId = setTimeout(function(){ controller.abort(); }, 5000);
      await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache', signal: controller.signal });
      clearTimeout(timeoutId);
      var latency = Math.round(performance.now() - startTime);
      return {
        status: 'online',
        latency: latency,
        speed: latency < 500 ? 'fast' : latency < 1500 ? 'medium' : 'slow'
      };
    } catch(e) {
      return { status: 'offline', latency: null, speed: null };
    }
  }

  async function updateHealth(subId, url) {
    var card = document.getElementById("card-" + subId);
    if (!card) return;
    var badge = card.querySelector('.health-badge');
    if (!badge) return;
    badge.textContent = '⏳ Проверка...';
    badge.className = 'health-badge checking';
    var health = await checkSubscriptionHealth(url);
    if (health.status === 'online') {
      var emoji = health.speed === 'fast' ? '🟢' : health.speed === 'medium' ? '🟡' : '🟠';
      badge.textContent = emoji + ' ' + health.latency + 'ms';
      badge.className = 'health-badge ' + health.speed;
    } else {
      badge.textContent = '🔴 Недоступна';
      badge.className = 'health-badge offline';
    }
  }

  // === МОДАЛЬНЫЕ ОКНА ===
  function showRatingModal(subId, subName) {
    var existing = document.querySelector('.rating-modal-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.className = 'rating-modal-overlay';
    overlay.innerHTML = '<div class="rating-modal"><p>Этот конфиг работает?</p><h3>' + sanitizeHTML(subName) + '</h3><div class="rating-actions"><button class="btn btn-primary like-btn">👍 Полезный</button><button class="btn btn-ghost dislike-btn">👎 Не работает</button></div><button class="rating-close-btn">✕</button></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('.like-btn').addEventListener('click', function(){
      incrementRating(subId, 'like'); overlay.remove(); showToast('Спасибо! 👍');
    });
    overlay.querySelector('.dislike-btn').addEventListener('click', function(){
      incrementRating(subId, 'dislike'); overlay.remove(); showToast('Учтём это 👎');
    });
    overlay.querySelector('.rating-close-btn').addEventListener('click', function(){ overlay.remove(); });
    overlay.addEventListener('click', function(e){ if (e.target === overlay) overlay.remove(); });
  }

  function showCopyOptions(url, name, id) {
    var existing = document.querySelector('.rating-modal-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.className = 'rating-modal-overlay';
    var v2rayUrl = 'v2rayng://install-config?url=' + encodeURIComponent(url);
    overlay.innerHTML = '<div class="rating-modal"><p>Как скопировать "' + sanitizeHTML(name) + '"?</p><div class="rating-actions" style="flex-direction:column;gap:10px;"><button class="btn btn-primary copy-plain-btn">⧉ Обычная ссылка</button><button class="btn btn-ghost copy-v2ray-btn">📱 Ссылка v2ray://</button></div><button class="rating-close-btn">✕</button></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('.copy-plain-btn').addEventListener('click', function(){
      copyText(url).then(function(){
        overlay.remove(); showToast('Ссылка скопирована!');
        incrementCopyCount(id);
        showRatingModal(id, name);
      });
    });
    overlay.querySelector('.copy-v2ray-btn').addEventListener('click', function(){
      copyText(v2rayUrl).then(function(){
        overlay.remove(); showToast('v2ray ссылка скопирована!');
        incrementCopyCount(id);
        showRatingModal(id, name);
      });
    });
    overlay.querySelector('.rating-close-btn').addEventListener('click', function(){ overlay.remove(); });
    overlay.addEventListener('click', function(e){ if (e.target === overlay) overlay.remove(); });
  }

  // === ДАННЫЕ ===
  var subscriptions = [
    { id:"black-main", cat:"black", count:"", name:"🏴 Чёрный список (основной)", desc:"Основной чёрный список для обычного интернета.", updated:"12.07.2025", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt" },
    { id:"black-backup", cat:"black", count:"", name:"🏴 Чёрный список (запасной)", desc:"Запасной вариант.", updated:"10.07.2025", url:"https://vpn.akres.fun/all" },
    { id:"black-mobile", cat:"black", count:"20", name:"👑 Black Mobile", desc:"20 лучших серверов для телефонов.", updated:"14.07.2025", url:"https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt" },
    { id:"white-main", cat:"white", count:"", name:"🏳️ Белый список (основной)", desc:"Для жёстких блокировок.", updated:"13.07.2025", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt" },
    { id:"white-cidr", cat:"white", count:"", name:"🌐 Белый список (CIDR)", desc:"Фильтрует по IP-диапазонам.", updated:"11.07.2025", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt" },
    { id:"white-sni", cat:"white", count:"", name:"🔍 Белый список (SNI)", desc:"Фильтрует по именам сайтов.", updated:"11.07.2025", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt" },
    { id:"proto-vless", cat:"protocol", count:"", name:"⚡ VLESS + Reality", desc:"Лучший по скорости, но РКН активно блокирует.", updated:"14.07.2025", url:"https://mifa.world/vless" },
    { id:"proto-vmess", cat:"protocol", count:"", name:"🔒 VMess", desc:"Самый надёжный протокол.", updated:"14.07.2025", url:"https://mifa.world/vmess" },
    { id:"proto-trojan", cat:"protocol", count:"", name:"🛡️ Trojan", desc:"Хорошая маскировка.", updated:"14.07.2025", url:"https://mifa.world/trojan" },
    { id:"proto-ss", cat:"protocol", count:"", name:"🚀 Shadowsocks", desc:"Максимальная скорость.", updated:"14.07.2025", url:"https://mifa.world/ss" }
  ];

  // === РЕНДЕРИНГ ПОДПИСОК ===
  var subGrid = document.getElementById("subGrid");
  var skeletonGrid = document.getElementById("skeletonGrid");
  var searchInput = document.getElementById("searchSubs");
  var currentFilter = "all";

  function renderSubs(filter) {
    currentFilter = filter;
    if (!subGrid) return;
    subGrid.innerHTML = "";
    var query = searchInput ? searchInput.value.toLowerCase() : "";

    subscriptions.forEach(function(sub){
      if (filter !== "all" && sub.cat !== filter) return;
      if (query && sub.name.toLowerCase().indexOf(query) === -1 && sub.desc.toLowerCase().indexOf(query) === -1) return;

      var card = document.createElement("div");
      card.className = "sub-card";
      card.setAttribute("data-subid", sub.id);
      card.id = "card-" + sub.id;
      var rating = globalRatings[sub.id] || { likes: 0, dislikes: 0 };
      var copies = globalCopies[sub.id] || 0;
      var reportUrl = "https://t.me/Keb04w?text=" + encodeURIComponent("Не работает: " + sub.name);

      card.innerHTML =
        '<div class="sub-header">' +
          '<h3>' + sanitizeHTML(sub.name) + '</h3>' +
          '<div class="sub-header-badges">' +
            (sub.count ? '<span class="sub-count">' + sub.count + '</span>' : '') +
            '<span class="health-badge" data-url="' + sub.url + '">⚪ Не проверено</span>' +
            (copies >= 10 ? '<span class="popularity-badge">' + (copies > 100 ? '🔥 Популярное' : '⭐ ' + copies + ' копирований') + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<p>' + sanitizeHTML(sub.desc) + '</p>' +
        '<div class="sub-updated">📅 Обновлено: ' + sub.updated + '</div>' +
        '<code>' + sanitizeHTML(sub.url) + '</code>' +
        '<div class="sub-actions-row">' +
          '<button class="btn btn-ghost copy-btn">⧉ Копировать</button>' +
          '<button class="btn btn-ghost health-btn">🔄 Проверить</button>' +
          '<button class="btn btn-ghost share-btn">↗</button>' +
          '<a class="btn btn-ghost" href="' + reportUrl + '" target="_blank" rel="noopener">⚑</a>' +
        '</div>' +
        '<div class="rating-row">' +
          '<span class="rating-likes">' + rating.likes + '</span> 👍 ' +
          '<span class="rating-dislikes">' + rating.dislikes + '</span> 👎' +
        '</div>';

      card.querySelector(".copy-btn").addEventListener("click", function(){
        showCopyOptions(sub.url, sub.name, sub.id);
      });

      card.querySelector(".health-btn").addEventListener("click", function(){
        updateHealth(sub.id, sub.url);
      });

      var hBadge = card.querySelector(".health-badge");
      if (hBadge) {
        hBadge.addEventListener("click", function(){ updateHealth(sub.id, sub.url); });
      }

      card.querySelector(".share-btn").addEventListener("click", function(){
        if (navigator.share) {
          navigator.share({ title: sub.name, text: 'VPN: ' + sub.name, url: sub.url }).catch(function(){});
        } else {
          copyText(sub.url).then(function(){ showToast('Ссылка скопирована'); });
        }
      });

      subGrid.appendChild(card);

      // Авто-проверка здоровья с задержкой
      setTimeout(function(){ updateHealth(sub.id, sub.url); }, Math.random() * 3000 + 500);
    });
  }

  function hideSkeleton() {
    if (skeletonGrid) skeletonGrid.style.display = 'none';
    if (subGrid) subGrid.style.display = 'grid';
  }

  if (searchInput) {
    searchInput.addEventListener("input", debounce(function(){ renderSubs(currentFilter); }, 300));
  }

  // === ТАБЫ ===
  var tabs = document.querySelectorAll(".tab[data-filter]");
  tabs.forEach(function(tab){
    var filter = tab.getAttribute("data-filter");
    if (filter === "black") tab.textContent = "🏠 Домашний";
    else if (filter === "white") tab.textContent = "📱 Мобильный";
    else if (filter === "protocol") tab.textContent = "⚙️ Протоколы";
    else if (filter === "all") tab.textContent = "Все подписки";
    tab.addEventListener("click", function(){
      tabs.forEach(function(t){ t.classList.remove("active"); });
      tab.classList.add("active");
      renderSubs(filter);
    });
  });

  // === COPY ALL ===
  var copyAllBtn = document.getElementById("copyAllBtn");
  if (copyAllBtn) {
    copyAllBtn.addEventListener("click", function(){
      var active = document.querySelector(".tab.active[data-filter]");
      var filter = active ? active.getAttribute("data-filter") : "all";
      var query = searchInput ? searchInput.value.toLowerCase() : "";
      var visible = subscriptions.filter(function(s){
        if (filter !== "all" && s.cat !== filter) return false;
        if (query && s.name.toLowerCase().indexOf(query) === -1 && s.desc.toLowerCase().indexOf(query) === -1) return false;
        return true;
      });
      copyText(visible.map(function(s){ return s.name + ": " + s.url; }).join("\n")).then(function(){
        copyAllBtn.textContent = "✓ Скопировано";
        setTimeout(function(){ copyAllBtn.textContent = "⧉ Скопировать все видимые"; }, 1800);
      });
    });
  }

  // === HELPER ===
  document.querySelectorAll(".helper-opt").forEach(function(btn){
    btn.addEventListener("click", function(){
      var targetId = btn.getAttribute("data-target");
      tabs.forEach(function(t){ t.classList.remove("active"); });
      var allTab = document.querySelector('.tab[data-filter="all"]');
      if (allTab) allTab.classList.add("active");
      if (searchInput) searchInput.value = "";
      renderSubs("all");
      requestAnimationFrame(function(){
        var el = document.getElementById("card-" + targetId);
        if (!el) return;
        el.scrollIntoView({ behavior:"smooth", block:"center" });
        el.classList.add("highlight");
        setTimeout(function(){ el.classList.remove("highlight"); }, 3400);
      });
    });
  });

  // === ПРОТОКОЛЫ ===
  var protoGrid = document.getElementById("protoGrid");
  if (protoGrid) {
    [
      { name:"VLESS + Reality", note:"Лучший по скорости и маскировке, но РКН блокирует активнее." },
      { name:"Trojan", note:"Хорошая маскировка под обычный HTTPS трафик." },
      { name:"VMess", note:"Самый надёжный и стабильный протокол." },
      { name:"Shadowsocks", note:"Максимальная скорость, идеально для игр." }
    ].forEach(function(p){
      var d = document.createElement("div");
      d.className = "proto-card";
      d.innerHTML = '<h3>' + p.name + '</h3><p>' + p.note + '</p>';
      protoGrid.appendChild(d);
    });
  }

  // === КАЛЬКУЛЯТОР ПРОТОКОЛОВ ===
  var calcAnswers = {};
  var calcStep1 = document.getElementById('calcStep1');
  var calcStep2 = document.getElementById('calcStep2');
  var calcResult = document.getElementById('calcResult');
  var calcRec = document.getElementById('calcRec');
  var calcReset = document.getElementById('calcReset');

  document.querySelectorAll('#calcStep1 .calc-opt').forEach(function(opt){
    opt.addEventListener('click', function(){
      calcAnswers.task = opt.dataset.task;
      calcStep1.style.display = 'none';
      calcStep2.style.display = 'block';
      trackEvent('calculator', 'step1', calcAnswers.task);
    });
  });

  document.querySelectorAll('#calcStep2 .calc-opt').forEach(function(opt){
    opt.addEventListener('click', function(){
      calcAnswers.speed = opt.dataset.speed;
      calcStep2.style.display = 'none';
      showCalcResult();
      trackEvent('calculator', 'step2', calcAnswers.speed);
    });
  });

  if (calcReset) {
    calcReset.addEventListener('click', function(){
      calcAnswers = {};
      calcResult.style.display = 'none';
      calcStep1.style.display = 'block';
      calcStep2.style.display = 'none';
    });
  }

  function showCalcResult() {
    calcResult.style.display = 'block';
    var recs = {
      streaming: {
        high: { protocol: 'VLESS + Reality', desc: 'Максимальная скорость для 4K стриминга', speed: '⭐⭐⭐⭐⭐', privacy: '⭐⭐⭐⭐', stability: '⭐⭐⭐' },
        medium: { protocol: 'Trojan', desc: 'Отличный баланс скорости и стабильности', speed: '⭐⭐⭐⭐', privacy: '⭐⭐⭐⭐', stability: '⭐⭐⭐⭐' },
        low: { protocol: 'VMess', desc: 'Надёжный протокол для HD видео', speed: '⭐⭐⭐', privacy: '⭐⭐⭐⭐⭐', stability: '⭐⭐⭐⭐⭐' }
      },
      gaming: {
        high: { protocol: 'Shadowsocks', desc: 'Минимальный пинг для онлайн-игр', speed: '⭐⭐⭐⭐⭐', privacy: '⭐⭐⭐', stability: '⭐⭐⭐⭐' },
        medium: { protocol: 'VLESS + Reality', desc: 'Низкий пинг и хорошая скорость', speed: '⭐⭐⭐⭐⭐', privacy: '⭐⭐⭐⭐', stability: '⭐⭐⭐' },
        low: { protocol: 'VMess', desc: 'Стабильное соединение для игр', speed: '⭐⭐⭐', privacy: '⭐⭐⭐⭐⭐', stability: '⭐⭐⭐⭐⭐' }
      },
      messaging: {
        high: { protocol: 'Trojan', desc: 'Быстрая и стабильная связь', speed: '⭐⭐⭐⭐', privacy: '⭐⭐⭐⭐', stability: '⭐⭐⭐⭐' },
        medium: { protocol: 'VMess', desc: 'Надёжный протокол для мессенджеров', speed: '⭐⭐⭐', privacy: '⭐⭐⭐⭐⭐', stability: '⭐⭐⭐⭐⭐' },
        low: { protocol: 'VMess', desc: 'Базовый надёжный протокол', speed: '⭐⭐⭐', privacy: '⭐⭐⭐⭐⭐', stability: '⭐⭐⭐⭐⭐' }
      },
      browsing: {
        high: { protocol: 'VLESS + Reality', desc: 'Максимальная скорость для сёрфинга', speed: '⭐⭐⭐⭐⭐', privacy: '⭐⭐⭐⭐', stability: '⭐⭐⭐' },
        medium: { protocol: 'Trojan', desc: 'Отличный баланс для обычного использования', speed: '⭐⭐⭐⭐', privacy: '⭐⭐⭐⭐', stability: '⭐⭐⭐⭐' },
        low: { protocol: 'VMess', desc: 'Простой и надёжный', speed: '⭐⭐⭐', privacy: '⭐⭐⭐⭐⭐', stability: '⭐⭐⭐⭐⭐' }
      },
      privacy: {
        high: { protocol: 'VMess', desc: 'Максимальная приватность и шифрование', speed: '⭐⭐⭐', privacy: '⭐⭐⭐⭐⭐', stability: '⭐⭐⭐⭐⭐' },
        medium: { protocol: 'VMess', desc: 'Лучший выбор для приватности', speed: '⭐⭐⭐', privacy: '⭐⭐⭐⭐⭐', stability: '⭐⭐⭐⭐⭐' },
        low: { protocol: 'VMess', desc: 'Максимальная защита данных', speed: '⭐⭐⭐', privacy: '⭐⭐⭐⭐⭐', stability: '⭐⭐⭐⭐⭐' }
      }
    };
    var r = recs[calcAnswers.task][calcAnswers.speed];
    calcRec.innerHTML =
      '<div class="rec-card">' +
        '<h4>' + r.protocol + '</h4>' +
        '<p>' + r.desc + '</p>' +
        '<div class="rec-stats">' +
          '<span>⚡ Скорость: ' + r.speed + '</span>' +
          '<span>🔒 Приватность: ' + r.privacy + '</span>' +
          '<span>🛡️ Стабильность: ' + r.stability + '</span>' +
        '</div>' +
        '<a href="#subscriptions" class="btn btn-primary">Найти подписки</a>' +
      '</div>';
  }

  // === КЛИЕНТЫ ===
  var clientGroups = [
    { device:"Windows", match:["win"], apps:[{name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"}, {name:"v2rayN", url:"https://github.com/2dust/v2rayN/releases"}] },
    { device:"Android", match:["android"], apps:[{name:"Incy", url:"https://play.google.com/store/apps/details?id=com.glarimy.incy"}, {name:"NekoBox", url:"https://github.com/MatsuriDayo/NekoBoxForAndroid/releases"}] },
    { device:"Android TV", match:[], apps:[{name:"NekoBox (TV)", url:"https://github.com/MatsuriDayo/NekoBoxForAndroid/releases"}] },
    { device:"iOS / iPadOS", match:["ios"], apps:[{name:"Streisand", url:"https://apps.apple.com/app/streisand/id6450534064"}, {name:"V2Box", url:"https://apps.apple.com/app/v2box/id6443654552"}] },
    { device:"Linux", match:["linux"], apps:[{name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"}, {name:"NekoRay", url:"https://github.com/MatsuriDayo/nekoray/releases"}] },
    { device:"macOS", match:["mac"], apps:[{name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"}, {name:"Streisand", url:"https://apps.apple.com/app/streisand/id6450534064"}] }
  ];
  var clientGrid = document.getElementById("clientGrid");
  if (clientGrid) clientGroups.forEach(function(g){
    var recommended = g.match.indexOf(userOS) !== -1;
    var card = document.createElement("div");
    card.className = "client-card" + (recommended ? " recommended" : "");
    var appsHtml = g.apps.map(function(a){ return '<a href="' + a.url + '" target="_blank" rel="noopener">' + a.name + '</a>'; }).join("");
    card.innerHTML = (recommended ? '<span class="rec-badge">🏆 Ваш выбор</span>' : '') + '<h3>' + g.device + '</h3><div class="client-apps">' + appsHtml + '</div>';
    clientGrid.appendChild(card);
  });

  // === ИНСТРУКЦИИ ===
  var guides = [
    { name:"Zapret", note:"Обходит DPI на уровне системы. Не шифрует трафик.", steps:["Скачайте сборку","Распакуйте архив","Запустите general.bat","Не закрывайте окно","Попробуйте другую стратегию"], links:[{label:"Windows-сборка", url:"https://github.com/Flowseal/zapret-discord-youtube"}, {label:"Оригинал", url:"https://github.com/bol-van/zapret"}] },
    { name:"ByeDPI", note:"Проще Zapret, работает на Android без root.", steps:["Windows/Linux: запустите – SOCKS5 на 127.0.0.1:1080","Пропишите прокси в браузере","Android: установите APK, нажмите Start"], links:[{label:"Windows / Linux", url:"https://github.com/hufrea/byedpi"}, {label:"Android", url:"https://github.com/dovecoteescapee/ByeDPIAndroid"}] },
    { name:"tgwsproxy", note:"Специализированный прокси для Telegram.", steps:["Скачайте сборку","Запустите – следуйте инструкции","Свернётся в трей","Android: APK с автонастройкой"], links:[{label:"Desktop", url:"https://github.com/Flowseal/tg-ws-proxy"}, {label:"Android", url:"https://github.com/amurcanov/tg-ws-proxy-android"}] }
  ];
  var guideGrid = document.getElementById("guideGrid");
  if (guideGrid) guides.forEach(function(g){
    var d = document.createElement("details");
    d.className = "guide-card";
    d.innerHTML = '<summary>' + g.name + ' <span>показать</span></summary><p>' + g.note + '</p><ol>' + g.steps.map(function(s){ return '<li>' + s + '</li>'; }).join("") + '</ol><div class="guide-links">' + g.links.map(function(l){ return '<a href="' + l.url + '" target="_blank" rel="noopener">' + l.label + ' →</a>'; }).join("") + '</div>';
    guideGrid.appendChild(d);
  });

  // === TELEGRAM ПРОКСИ ===
  var tgProxies = [
    { label:"MTProto", addr:"proxy.vmelectronics.ru:443", url:"https://t.me/proxy?server=proxy.vmelectronics.ru&port=443&secret=ee6164732e78352e72759c6509729477" },
    { label:"MTProto", addr:"coca.mtmajestic.space:853", url:"tg://proxy?server=coca.mtmajestic.space&port=853&secret=616cf892574b078aab3f73e63b8b7df4" },
    { label:"MTProto", addr:"185.130.114.232:443", url:"https://t.me/proxy?server=185.130.114.232&port=443&secret=eea8f35c1d7e9042b6c4d19e2fb7630a586d61782e7275" },
    { label:"MTProto", addr:"fast.proxytg.space:8443", url:"tg://proxy?server=fast.proxytg.space&port=8443&secret=ee60a6bb02c869117fa6820902f61c82ff666173742e70726f787974672e7370616365" }
  ];
  var tgList = document.getElementById("tgList");
  if (tgList) tgProxies.forEach(function(p){
    var row = document.createElement("div");
    row.className = "tg-item";
    row.innerHTML = '<b>' + p.label + '</b> — <code>' + p.addr + '</code> <a href="' + p.url + '" target="_blank" rel="noopener">Подключиться</a>';
    tgList.appendChild(row);
  });

  // === СТАТУС СЕРВИСОВ ===
  var services = [
    { name: 'YouTube', url: 'https://www.youtube.com', icon: '📺' },
    { name: 'Discord', url: 'https://discord.com', icon: '💬' },
    { name: 'Telegram', url: 'https://web.telegram.org', icon: '✈️' },
    { name: 'Instagram', url: 'https://www.instagram.com', icon: '📷' },
    { name: 'Twitter/X', url: 'https://x.com', icon: '🐦' },
    { name: 'Facebook', url: 'https://www.facebook.com', icon: '👥' }
  ];

  async function checkServiceStatus(service) {
    try {
      var controller = new AbortController();
      var tid = setTimeout(function(){ controller.abort(); }, 3000);
      await fetch(service.url, { method: 'HEAD', mode: 'no-cors', signal: controller.signal });
      clearTimeout(tid);
      return Object.assign({}, service, { status: 'online' });
    } catch(e) {
      return Object.assign({}, service, { status: 'offline' });
    }
  }

  async function renderServiceStatus() {
    var grid = document.getElementById('statusGrid');
    if (!grid) return;
    grid.innerHTML = '<p class="status-loading">Проверяем статус...</p>';
    var results = await Promise.all(services.map(checkServiceStatus));
    grid.innerHTML = results.map(function(s){
      return '<div class="status-item ' + s.status + '"><span class="status-icon">' + s.icon + '</span><span class="status-name">' + s.name + '</span><span class="status-dot"></span></div>';
    }).join('');
  }

  // === FAQ ===
  var faq = [
    { q:"Подписка не работает или очень медленно.", a:"Обновите подписку в клиенте. Попробуйте сменить протокол (VLESS → Trojan) или сервер. Иногда помогает перезапуск клиента." },
    { q:"Как часто обновляются конфиги?", a:"Даты обновления указаны на каждой карточке. Мы стараемся актуализировать их не реже раза в неделю." },
    { q:"Когда нужны белые списки?", a:"Только когда ваш мобильный оператор включил «белые списки» РКН — и обычные сайты перестали открываться." },
    { q:"Какой клиент лучше для новичка?", a:"Hiddify — самый удобный для Windows и Android. На iOS — Streisand." },
    { q:"Безопасно ли пользоваться этими конфигами?", a:"Конфиги из открытых источников. Не передавайте через них банковские данные. Используйте на свой страх и риск." }
  ];
  var faqList = document.getElementById("faqList");
  if (faqList) faq.forEach(function(item, i){
    var d = document.createElement("details");
    d.className = "faq-item"; if (i === 0) d.open = true;
    d.innerHTML = '<summary>' + item.q + '</summary><p>' + item.a + '</p>';
    faqList.appendChild(d);
  });

  // === БЛАГОДАРНОСТИ ===
  var contributors = [
    { name:"Stintik", role:"Основатель", link:"https://github.com/Stintik-123" },
    { name:"Keb04w", role:"Поддержка", link:"https://t.me/Keb04w" },
    { name:"Сообщество GitHub", role:"Звёзды и идеи", link:"https://github.com/Stintik-123/StintikVPN" }
  ];
  var thanksGrid = document.getElementById("thanksGrid");
  if (thanksGrid) {
    contributors.forEach(function(c){
      var card = document.createElement("div");
      card.className = "thanks-card";
      card.innerHTML = '<strong>' + c.name + '</strong><span>' + c.role + '</span>';
      if (c.link && c.link !== "#") {
        card.style.cursor = "pointer";
        card.addEventListener("click", function(){ window.open(c.link, "_blank"); });
      }
      thanksGrid.appendChild(card);
    });
  }

  // === ЗВЁЗДЫ GITHUB ===
  var starsEl = document.getElementById("statStars");
  var currentStars = null;
  function animateNumber(el, from, to){
    var start = null, duration = 700;
    function step(ts){
      if (!start) start = ts;
      var progress = Math.min(1, (ts - start) / duration);
      el.textContent = Math.round(from + (to - from) * progress);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function refreshStars(){
    if (!starsEl) return;
    fetch("https://api.github.com/repos/Stintik-123/StintikVPN", { headers: { 'Accept': 'application/vnd.github.v3+json' } })
      .then(function(r){ return r.json(); })
      .then(function(data){
        if (data && typeof data.stargazers_count === "number") {
          var to = data.stargazers_count;
          animateNumber(starsEl, currentStars === null ? to : currentStars, to);
          currentStars = to;
        }
      }).catch(function(){
        if (currentStars === null) starsEl.textContent = "—";
      });
  }
  refreshStars();
  setInterval(refreshStars, 120000);

  // === TELEGRAM WIDGET ===
  var telegramBtn = document.getElementById('telegramBtn');
  var telegramModal = document.getElementById('telegramModal');
  var telegramClose = document.querySelector('.telegram-close');

  if (telegramBtn && telegramModal) {
    telegramBtn.addEventListener('click', function(){ telegramModal.style.display = 'flex'; });
    if (telegramClose) telegramClose.addEventListener('click', function(){ telegramModal.style.display = 'none'; });
    telegramModal.addEventListener('click', function(e){ if (e.target === telegramModal) telegramModal.style.display = 'none'; });
    setTimeout(function(){
      if (!localStorage.getItem('telegramSubscribed')) {
        telegramBtn.classList.add('visible');
      }
    }, 8000);
  }

  // === UI ===
  var backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener("scroll", function(){ backBtn.classList.toggle("visible", window.scrollY > 600); });
    backBtn.addEventListener("click", function(){ window.scrollTo({ top:0, behavior:"smooth" }); });
  }

  // Мобильное меню
  (function(){
    var navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    var btn = document.createElement('button');
    btn.className = 'nav-icon hamburger';
    btn.innerHTML = '☰';
    btn.setAttribute('aria-label', 'Меню');
    btn.addEventListener('click', function(){ navLinks.classList.toggle('open'); });
    var navRight = document.querySelector('.nav-right');
    if (navRight) navRight.prepend(btn);
  })();

  // Анимация появления
  var appearObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        appearObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.sub-card, .client-card, .proto-card, .guide-card, .check-card').forEach(function(el){ appearObserver.observe(el); });

  // Keyboard nav
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      document.querySelectorAll('.rating-modal-overlay, .telegram-modal').forEach(function(m){ m.style.display = 'none'; m.remove(); });
    }
    if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
  });
  document.addEventListener('mousedown', function(){ document.body.classList.remove('keyboard-nav'); });

  // === ФОНОВАЯ АНИМАЦИЯ ===
  (function bg(){
    var canvas = document.getElementById("bgCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var w, h, nodes = [];
    var NODE_COUNT = 40;
    var animId = null;
    var isVisible = true;

    var canvasObserver = new IntersectionObserver(function(entries){
      isVisible = entries[0].isIntersecting;
      if (!isVisible && animId) { cancelAnimationFrame(animId); animId = null; }
      else if (isVisible && !animId) draw();
    }, { threshold: 0 });
    canvasObserver.observe(canvas);

    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    }
    function initNodes(){
      nodes = [];
      for (var i = 0; i < NODE_COUNT; i++){
        nodes.push({
          x: Math.random()*w, y: Math.random()*h,
          vx: (Math.random()-.5)*(reduced?.1:.3),
          vy: (Math.random()-.5)*(reduced?.1:.3),
          r: Math.random()*1.5+.5
        });
      }
    }
    function draw(){
      if (!isVisible) return;
      ctx.clearRect(0,0,w,h);
      for (var i=0;i<nodes.length;i++){
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        for (var j=i+1;j<nodes.length;j++){
          var m = nodes[j];
          var dx = n.x-m.x, dy = n.y-m.y;
          var dist = Math.sqrt(dx*dx+dy*dy);
          if (dist < 120){
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = "rgba(255,138,61,"+(1-dist/120)*.15+")";
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
        ctx.fillStyle = "rgba(255,138,61,.4)";
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    }
    resize(); initNodes(); draw();
    window.addEventListener("resize", function(){ resize(); initNodes(); });
  })();

  // === ЗАПУСК ===
  async function init() {
    try {
      await Promise.all([
        loadAllRatings(),
        loadAllCopyCounts()
      ]);
      hideSkeleton();
      renderSubs("all");
      renderServiceStatus();
      setInterval(renderServiceStatus, 300000);

      var subStat = document.getElementById('statSubs');
      if (subStat) subStat.textContent = subscriptions.length;
    } catch(e) {
      console.error('Init error:', e);
      hideSkeleton();
      renderSubs("all");
    }
  }

  init();
})();

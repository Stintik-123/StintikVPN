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
  var themeBtn = document.querySelector('.theme-toggle');
  function initTheme() {
    if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-theme');
    if (themeBtn) themeBtn.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
  }
  initTheme();
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
      themeBtn.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
  }

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
      updateTotalRatings();
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

  function updateTotalRatings() {
    var total = 0;
    for (var id in globalRatings) {
      total += (globalRatings[id].likes || 0) + (globalRatings[id].dislikes || 0);
    }
    var el = document.getElementById('statRatings');
    if (el) el.textContent = total;
  }

  async function loadAllRatings() {
    for (var i = 0; i < subscriptions.length; i++) {
      var sub = subscriptions[i];
      var likes = await fetchRating(sub.id, "like");
      var dislikes = await fetchRating(sub.id, "dislike");
      globalRatings[sub.id] = { likes: likes, dislikes: dislikes };
    }
    updateTotalRatings();
  }

  // === ГЛОБАЛЬНЫЕ КОПИРОВАНИЯ ===
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
      updateTotalCopies();
    } catch(e) {}
  }

  function updateTotalCopies() {
    var total = 0;
    for (var id in globalCopies) total += globalCopies[id];
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
      var tid = setTimeout(function(){ controller.abort(); }, 5000);
      await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache', signal: controller.signal });
      clearTimeout(tid);
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

  // === МОДАЛКИ ===
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
      incrementRating(subId, 'dislike'); overlay.remove(); showToast('Учтём 👎');
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

  // === ДАННЫЕ ПОДПИСОК (из README) ===
  var subscriptions = [
    { id:"black-main", cat:"black", name:"🏴 Чёрный список (основной)", desc:"Для обычного интернета (домашний Wi-Fi, кабель, 4G).", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt" },
    { id:"black-backup", cat:"black", name:"🏴 Чёрный список (запасной)", desc:"Альтернативный источник чёрных списков.", url:"https://vpn.akres.fun/all" },
    { id:"black-mobile", cat:"black", name:"👑 Black Mobile", desc:"20 ЛУЧШИХ серверов, специально оптимизированных для телефонов.", url:"https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt" },
    { id:"white-main", cat:"white", name:"🏳️ Белые списки (Основные)", desc:"Для жёстких блокировок (мобильный интернет с белыми списками РКН).", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt" },
    { id:"white-cidr", cat:"white", name:"🌐 Белые списки (CIDR)", desc:"Фильтрует трафик по IP-диапазонам. Используйте, если не работает SNI.", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt" },
    { id:"white-sni", cat:"white", name:"🔍 Белые списки (SNI)", desc:"Фильтрует трафик по именам сайтов. Используйте, если не работает CIDR.", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt" },
    { id:"proto-vless", cat:"protocol", name:"⚡ VLESS", desc:"Лучший по скорости и маскировке, но РКН активно блокирует.", url:"https://mifa.world/vless" },
    { id:"proto-vmess", cat:"protocol", name:"🔒 VMess", desc:"Самый надёжный протокол из всех.", url:"https://mifa.world/vmess" },
    { id:"proto-trojan", cat:"protocol", name:"🛡️ Trojan", desc:"Хорошая маскировка под обычный HTTPS трафик.", url:"https://mifa.world/trojan" },
    { id:"proto-ss", cat:"protocol", name:"🚀 Shadowsocks", desc:"Максимальная скорость. Рекомендуется для онлайн-игр.", url:"https://mifa.world/ss" }
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

    var hasResults = false;
    subscriptions.forEach(function(sub){
      if (filter !== "all" && sub.cat !== filter) return;
      if (query && sub.name.toLowerCase().indexOf(query) === -1 && sub.desc.toLowerCase().indexOf(query) === -1) return;

      hasResults = true;
      var card = document.createElement("div");
      card.className = "sub-card appear";
      card.id = "card-" + sub.id;
      var rating = globalRatings[sub.id] || { likes: 0, dislikes: 0 };
      var copies = globalCopies[sub.id] || 0;
      var reportUrl = "https://t.me/Keb04w?text=" + encodeURIComponent("Не работает: " + sub.name);

      card.innerHTML =
        '<div class="sub-header">' +
          '<h3>' + sanitizeHTML(sub.name) + '</h3>' +
          '<div class="sub-header-badges">' +
            '<span class="health-badge" data-url="' + sub.url + '">⚪ Не проверено</span>' +
            (copies >= 10 ? '<span class="popularity-badge">' + (copies > 100 ? '🔥 Популярное' : '⭐ ' + copies) + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<p>' + sanitizeHTML(sub.desc) + '</p>' +
        '<code>' + sanitizeHTML(sub.url) + '</code>' +
        '<div class="sub-actions-row">' +
          '<button class="btn btn-primary copy-btn" data-url="' + sub.url + '">⧉ Копировать</button>' +
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
      if (hBadge) hBadge.addEventListener("click", function(){ updateHealth(sub.id, sub.url); });

      card.querySelector(".share-btn").addEventListener("click", function(){
        if (navigator.share) {
          navigator.share({ title: sub.name, text: 'VPN: ' + sub.name, url: sub.url }).catch(function(){});
        } else {
          copyText(sub.url).then(function(){ showToast('Ссылка скопирована'); });
        }
      });

      subGrid.appendChild(card);
      setTimeout(function(){ updateHealth(sub.id, sub.url); }, Math.random() * 3000 + 500);
    });

    if (!hasResults) {
      subGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:40px;">Ничего не найдено.</p>';
    }
  }

  function hideSkeleton() {
    if (skeletonGrid) skeletonGrid.style.display = 'none';
    if (subGrid) subGrid.style.display = 'grid';
    renderSubs("all");
  }

  if (searchInput) {
    searchInput.addEventListener("input", debounce(function(){ renderSubs(currentFilter); }, 300));
  }

  // === ТАБЫ ===
  var tabs = document.querySelectorAll(".tab[data-filter]");
  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      tabs.forEach(function(t){ t.classList.remove("active"); });
      tab.classList.add("active");
      renderSubs(tab.getAttribute("data-filter"));
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

  // === КАЛЬКУЛЯТОР ===
  var calcStep1 = document.getElementById('calcStep1');
  var calcResult = document.getElementById('calcResult');
  var calcRec = document.getElementById('calcRec');
  var calcReset = document.getElementById('calcReset');

  document.querySelectorAll('#calcStep1 .calc-opt').forEach(function(opt){
    opt.addEventListener('click', function(){
      var task = opt.dataset.task;
      var rec = {};
      if (task === 'games') {
        rec = { proto: '🚀 Shadowsocks', desc: 'Минимальный пинг и максимальная скорость для онлайн-игр.' };
      } else if (task === 'stream') {
        rec = { proto: '⚡ VLESS (Reality)', desc: 'Лучший выбор для стриминга в 4K. Высокая скорость.' };
      } else if (task === 'secure') {
        rec = { proto: '🔒 VMess', desc: 'Самый надёжный протокол из всех. Стабильное соединение.' };
      } else if (task === 'universal') {
        rec = { proto: '🛡️ Trojan', desc: 'Идеальный универсальный вариант. Отличная маскировка и надёжность.' };
      }
      calcRec.innerHTML = '<div class="rec-card"><h4>' + rec.proto + '</h4><p>' + rec.desc + '</p></div>';
      calcStep1.style.display = 'none';
      calcResult.style.display = 'block';
    });
  });

  if (calcReset) {
    calcReset.addEventListener('click', function(){
      calcResult.style.display = 'none';
      calcStep1.style.display = 'block';
    });
  }

  // === КЛИЕНТЫ С ПОДБОРОМ ПО ОС ===
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
    card.className = "client-card appear" + (recommended ? " recommended" : "");
    var appsHtml = g.apps.map(function(a){ return '<a href="' + a.url + '" target="_blank" rel="noopener">' + a.name + '</a>'; }).join("");
    card.innerHTML = (recommended ? '<span class="rec-badge">🏆 Ваш выбор</span>' : '') + '<h3>' + g.device + '</h3><div class="client-apps">' + appsHtml + '</div>';
    clientGrid.appendChild(card);
  });

  // === TELEGRAM ПРОКСИ (из README) ===
  var tgProxies = [
    { type: "SOCKS5", addr: "84.201.182.112:1080", url: "https://t.me/socks?server=84.201.182.112&port=1080&user=86XFhWe7j9&pass=e4GwQtyVaZ" },
    { type: "MTProto", addr: "46.243.235.29:853", url: "https://t.me/proxy?server=46.243.235.29&port=853&secret=ee534adcf23a16f425cbae129c4cb574cb6164732e78352e7275" },
    { type: "MTProto", addr: "de4.kael.fuckrkn.net:443", url: "https://t.me/proxy?server=de4.kael.fuckrkn.net&port=443&secret=ee1a499af9a7a18282da82e30714402e157777772e6165726f666c6f742e7275" },
    { type: "MTProto", addr: "mtp1.sosproxy.space:443", url: "https://t.me/proxy?server=mtp1.sosproxy.space&port=443&secret=ee806bfea72377dacb92438b5f330856b464726976652e676f6f676c652e636f6d" },
    { type: "MTProto", addr: "adsl.myrka.digital:443", url: "https://t.me/proxy?server=adsl.myrka.digital&port=443&secret=ee6e2443fe7f5904ff5ceded8d76f02ea268312e6d79726b612e6469676974616c" },
    { type: "MTProto", addr: "95.163.176.204:2083", url: "https://t.me/proxy?server=95.163.176.204&port=2083&secret=ee93143b0fadcd4c8a99164fd3e819987f636f666665652e73616d6172617765622e74656368" },
    { type: "MTProto", addr: "89.169.32.31:2083", url: "https://t.me/proxy?server=89.169.32.31&port=2083&secret=eea2b102b138450e1e33e7dc460ad967e8636f666665652e73616d6172617765622e74656368" }
  ];
  var tgList = document.getElementById("tgList");
  if (tgList) {
    tgProxies.forEach(function(p){
      var row = document.createElement("div");
      row.className = "tg-item";
      row.innerHTML = '<div class="tg-info"><span class="tg-type">' + p.type + '</span><code>' + p.addr + '</code></div><a href="' + p.url + '" target="_blank" rel="noopener" class="btn btn-ghost">Подключить</a>';
      tgList.appendChild(row);
    });
  }

  // === FAQ ===
  var faq = [
    { q:"Подписка не работает или очень медленно.", a:"Обновите подписку в клиенте (кнопка «Обновить»). Попробуйте сменить протокол (VLESS Reality → Trojan) или сервер. Иногда помогает перезапуск клиента." },
    { q:"Как часто обновляются конфиги?", a:"Конфигурации обновляются ежедневно их создателями. Ссылки всегда ведут на актуальные версии." },
    { q:"Когда нужны белые списки?", a:"Только когда ваш мобильный оператор (МТС, Билайн, Tele2) включил «белые списки» РКН." },
    { q:"Какой клиент лучше для новичка?", a:"Hiddify — самый удобный для Windows и Android. На iOS — Streisand." },
    { q:"Что делать, если Telegram прокси не подключается?", a:"Прокси часто умирают. Просто попробуйте следующий из списка." },
    { q:"Можно ли использовать одну подписку на нескольких устройствах?", a:"Да, большинство подписок поддерживают одновременное подключение." },
    { q:"Безопасно ли пользоваться этими конфигами?", a:"Конфиги из открытых источников. Не передавайте через них банковские данные. Используйте на свой страх и риск." }
  ];
  var faqList = document.getElementById("faqList");
  if (faqList) {
    faq.forEach(function(item, i){
      var d = document.createElement("details");
      d.className = "faq-item";
      if (i === 0) d.open = true;
      d.innerHTML = '<summary>' + item.q + '</summary><p>' + item.a + '</p>';
      faqList.appendChild(d);
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

  // Фоновая анимация
  (function bg(){
    var canvas = document.getElementById("bgCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var w, h, nodes = [];
    var NODE_COUNT = 30;
    var animId = null;
    var isVisible = true;

    var canvasObserver = new IntersectionObserver(function(entries){
      isVisible = entries[0].isIntersecting;
      if (!isVisible && animId) { cancelAnimationFrame(animId); animId = null; }
      else if (isVisible && !animId) draw();
    }, { threshold: 0 });
    canvasObserver.observe(canvas);

    function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    function initNodes(){
      nodes = [];
      for (var i = 0; i < NODE_COUNT; i++){
        nodes.push({ x: Math.random()*w, y: Math.random()*h, vx: (Math.random()-.5)*0.3, vy: (Math.random()-.5)*0.3, r: Math.random()*1.5+0.5 });
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
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = "rgba(255,138,61,"+(1-dist/120)*0.15+")"; ctx.stroke();
          }
        }
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
        ctx.fillStyle = "rgba(255,138,61,0.4)"; ctx.fill();
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

      var subStat = document.getElementById('statSubs');
      if (subStat) subStat.textContent = subscriptions.length;

      // Запускаем observer для карточек клиентов
      document.querySelectorAll('.client-card').forEach(function(el){ appearObserver.observe(el); });
    } catch(e) {
      console.error('Init error:', e);
      hideSkeleton();
    }
  }

  init();
})();

(function(){
  "use strict";

  (function(){
    var el = document.getElementById("preloader");
    if (!el) return;
    var hidden = false;
    var startedAt = Date.now();
    var MIN_VISIBLE = 800;
    function hide(){
      if (hidden) return; hidden = true;
      var wait = Math.max(0, MIN_VISIBLE - (Date.now() - startedAt));
      setTimeout(function(){
        el.classList.add("hidden");
        setTimeout(function(){ if (el.parentNode) el.parentNode.removeChild(el); }, 500);
      }, wait);
    }
    window.addEventListener("load", hide);
    setTimeout(hide, 3500);
  })();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('service-worker.js').catch(function(err) {});
    });
  }

  var themeBtn = null;
  function initTheme() {
    if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-theme');
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
      btn.setAttribute('aria-label', 'Переключить тему');
      themeBtn = btn;
    }
  }
  initTheme();

  function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    if (themeBtn) themeBtn.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
  }

  (function(){
    var clicks = 0;
    var logo = document.querySelector('.hero-logo');
    if (!logo) return;
    logo.style.cursor = 'pointer';
    logo.setAttribute('title', 'Кликни 5 раз 😉');
    logo.addEventListener('click', function(){
      clicks++;
      if (clicks >= 5) {
        clicks = 0;
        document.body.classList.add('easter-egg');
        showToast('🎉 Свобода активирована! Наслаждайтесь интернетом.');
        setTimeout(function(){ document.body.classList.remove('easter-egg'); }, 4000);
      }
    });
  })();

  (function(){
    if (localStorage.getItem('onboardingDone')) return;
    var btn = document.querySelector('.hero-ctas .btn-primary');
    if (!btn) return;
    var tip = document.createElement('div');
    tip.className = 'onboarding-tip';
    tip.textContent = '👋 Нажмите сюда, чтобы быстро подобрать VPN!';
    btn.parentNode.style.position = 'relative';
    btn.parentNode.appendChild(tip);
    setTimeout(function(){ tip.classList.add('show'); }, 800);
    btn.addEventListener('click', function(){
      tip.classList.remove('show');
      localStorage.setItem('onboardingDone', '1');
      setTimeout(function(){ if (tip.parentNode) tip.parentNode.removeChild(tip); }, 400);
    });
  })();

  var ratings = JSON.parse(localStorage.getItem('subRatings') || '{}');
  function saveRating(id, type) {
    if (!ratings[id]) ratings[id] = { likes: 0, dislikes: 0 };
    ratings[id][type]++;
    localStorage.setItem('subRatings', JSON.stringify(ratings));
    updateAllRatingDisplays();
  }
  function updateAllRatingDisplays() {
    document.querySelectorAll('.sub-card').forEach(function(card) {
      var id = card.getAttribute('data-subid');
      if (!id || !ratings[id]) return;
      card.querySelector('.rating-likes').textContent = ratings[id].likes || 0;
      card.querySelector('.rating-dislikes').textContent = ratings[id].dislikes || 0;
    });
  }

  function showRatingModal(subId, subName) {
    var existing = document.querySelector('.rating-modal-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.className = 'rating-modal-overlay';
    overlay.innerHTML = `
      <div class="rating-modal">
        <p>Этот конфиг работает?<br><strong>${subName}</strong></p>
        <div class="rating-buttons">
          <button class="rating-btn like-btn" data-type="likes">👍 Полезный</button>
          <button class="rating-btn dislike-btn" data-type="dislikes">👎 Не работает</button>
        </div>
        <button class="rating-close-btn">✕</button>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('.like-btn').addEventListener('click', function() {
      saveRating(subId, 'likes');
      overlay.remove();
      showToast('Спасибо за оценку! 👍');
    });
    overlay.querySelector('.dislike-btn').addEventListener('click', function() {
      saveRating(subId, 'dislikes');
      overlay.remove();
      showToast('Жаль, что не работает. Попробуйте другой протокол.');
    });
    overlay.querySelector('.rating-close-btn').addEventListener('click', function() { overlay.remove(); });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  }

  function showQRModal(url, name) {
    var existing = document.querySelector('.qr-modal-overlay');
    if (existing) existing.remove();
    var overlay = document.createElement('div');
    overlay.className = 'qr-modal-overlay';
    var qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    overlay.innerHTML = `
      <div class="qr-modal">
        <h4>QR-код подписки</h4><p>${name}</p>
        <img src="${qrSrc}" alt="QR" class="qr-image" loading="lazy">
        <button class="rating-close-btn">✕</button>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('.rating-close-btn').addEventListener('click', function() { overlay.remove(); });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  }

  function detectOS(){
    var ua = navigator.userAgent || "";
    if (/android/i.test(ua)) return "android";
    if (/iphone|ipad|ipod/i.test(ua)) return "ios";
    if (/mac/i.test(ua)) return "mac";
    if (/win/i.test(ua)) return "win";
    return "linux";
  }
  var userOS = detectOS();

  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function showToast(message){
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toastEl.classList.remove("visible"); }, 4000);
  }

  function copyText(text){
    if (navigator.clipboard && window.isSecureContext){ return navigator.clipboard.writeText(text); }
    return new Promise(function(resolve, reject){
      try{
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.focus(); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta); resolve();
      }catch(e){ reject(e); }
    });
  }

  function shareSubscription(name, url) {
    if (navigator.share) {
      navigator.share({ title: name, text: `VPN подписка: ${name}`, url: url }).catch(function(){});
    } else {
      copyText(`${name}: ${url}`).then(function(){ showToast('Ссылка скопирована – отправьте другу'); });
    }
  }

  function openInClient(url) {
    var v2rayUrl = `v2ray://import/subscription?url=${encodeURIComponent(url)}`;
    window.location.href = v2rayUrl;
    setTimeout(function(){ showToast('Если клиент не открылся, скопируйте ссылку вручную'); }, 2000);
  }

  var subscriptions = [
    { id:"black-main", cat:"black", count:"", name:"🏴 Чёрный список (основной)", desc:"Основной чёрный список для обычного интернета.", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt" },
    { id:"black-backup", cat:"black", count:"", name:"🏴 Чёрный список (запасной)", desc:"Запасной вариант.", url:"https://vpn.akres.fun/all" },
    { id:"black-mobile", cat:"black", count:"20", name:"👑 Black Mobile", desc:"20 лучших серверов для телефонов.", url:"https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt" },
    { id:"white-main", cat:"white", count:"", name:"🏳️ Белый список (основной)", desc:"Для жёстких блокировок.", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt" },
    { id:"white-cidr", cat:"white", count:"", name:"🌐 Белый список (CIDR)", desc:"Фильтрует по IP-диапазонам.", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt" },
    { id:"white-sni", cat:"white", count:"", name:"🔍 Белый список (SNI)", desc:"Фильтрует по именам сайтов.", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt" },
    { id:"proto-vless", cat:"protocol", count:"", name:"⚡ VLESS + Reality", desc:"Лучший по скорости, но РКН активно блокирует.", url:"https://mifa.world/vless" },
    { id:"proto-vmess", cat:"protocol", count:"", name:"🔒 VMess", desc:"Самый надёжный протокол.", url:"https://mifa.world/vmess" },
    { id:"proto-trojan", cat:"protocol", count:"", name:"🛡️ Trojan", desc:"Хорошая маскировка.", url:"https://mifa.world/trojan" },
    { id:"proto-ss", cat:"protocol", count:"", name:"🚀 Shadowsocks", desc:"Максимальная скорость.", url:"https://mifa.world/ss" }
  ];

  var subGrid = document.getElementById("subGrid");
  function renderSubs(filter){
    if (!subGrid) return;
    subGrid.innerHTML = "";
    subscriptions.forEach(function(sub){
      if (filter !== "all" && sub.cat !== filter) return;
      var card = document.createElement("div");
      card.className = "sub-card";
      card.setAttribute("data-subid", sub.id);
      var rating = ratings[sub.id] || { likes: 0, dislikes: 0 };
      var reportUrl = "https://t.me/Keb04w?text=" + encodeURIComponent("Не работает: " + sub.name);
      card.innerHTML = `
        <div class="sub-top"><div class="sub-name">${sub.name}</div>${sub.count ? `<span class="sub-count">${sub.count}</span>` : ''}</div>
        <div class="sub-desc">${sub.desc}</div>
        <div class="sub-src">${sub.url}</div>
        <div class="sub-actions-row">
          <button class="copy-btn">⧉ Скопировать</button>
          <button class="client-btn" title="Открыть в клиенте">📲</button>
          <button class="qr-btn" title="QR-код">📱</button>
          <button class="share-btn" title="Поделиться">↗</button>
          <a class="report-btn" href="${reportUrl}" target="_blank" rel="noopener" title="Сообщить">⚑</a>
        </div>
        <div class="rating-row"><span class="rating-likes">${rating.likes}</span> 👍 <span class="rating-dislikes">${rating.dislikes}</span> 👎</div>
      `;
      card.querySelector(".copy-btn").addEventListener("click", function(){
        copyText(sub.url).then(function(){
          var btn = card.querySelector(".copy-btn");
          btn.textContent = "✓ Скопировано"; btn.classList.add("copied");
          setTimeout(function(){ btn.textContent = "⧉ Скопировать"; btn.classList.remove("copied"); }, 1600);
          showRatingModal(sub.id, sub.name);
        }).catch(function(){ showToast("Не удалось скопировать"); });
      });
      card.querySelector(".qr-btn").addEventListener("click", function(){ showQRModal(sub.url, sub.name); });
      card.querySelector(".share-btn").addEventListener("click", function(){ shareSubscription(sub.name, sub.url); });
      card.querySelector(".client-btn").addEventListener("click", function(){ openInClient(sub.url); });
      subGrid.appendChild(card);
    });
  }

  var tabs = document.querySelectorAll(".tab[data-filter]");
  tabs.forEach(function(tab){
    var filter = tab.getAttribute("data-filter");
    if (filter === "black") tab.textContent = "🏠 Домашний интернет";
    else if (filter === "white") tab.textContent = "📱 Мобильный интернет";
    else if (filter === "protocol") tab.textContent = "⚙️ Протоколы";
    else if (filter === "all") tab.textContent = "Все подписки";
    tab.addEventListener("click", function(){
      tabs.forEach(function(t){ t.classList.remove("active"); });
      tab.classList.add("active");
      renderSubs(filter);
    });
  });

  var copyAllBtn = document.getElementById("copyAllBtn");
  if (copyAllBtn) {
    copyAllBtn.addEventListener("click", function(){
      var active = document.querySelector(".tab.active[data-filter]");
      var filter = active ? active.getAttribute("data-filter") : "all";
      var visible = subscriptions.filter(function(s){ return filter === "all" || s.cat === filter; });
      copyText(visible.map(function(s){ return s.name + ": " + s.url; }).join("\n")).then(function(){
        copyAllBtn.textContent = "✓ Скопировано";
        setTimeout(function(){ copyAllBtn.textContent = "⧉ Скопировать все видимые"; }, 1800);
      }).catch(function(){ showToast("Не удалось скопировать список"); });
    });
  }

  document.querySelectorAll(".helper-opt").forEach(function(btn){
    btn.addEventListener("click", function(){
      var targetId = btn.getAttribute("data-target");
      tabs.forEach(function(t){ t.classList.remove("active"); });
      var allTab = document.querySelector('.tab[data-filter="all"]');
      if (allTab) allTab.classList.add("active");
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

  var protoGrid = document.getElementById("protoGrid");
  if (protoGrid) {
    [
      { name:"VLESS", note:"Лучший по скорости и маскировке, но РКН блокирует активнее." },
      { name:"Trojan", note:"Хорошая маскировка под TLS." },
      { name:"VMess", note:"Самый надёжный." },
      { name:"Shadowsocks", note:"Максимальная скорость, для игр." }
    ].forEach(function(p){
      var d = document.createElement("div");
      d.className = "proto-card";
      d.innerHTML = "<h3>" + p.name + "</h3><p>" + p.note + "</p>";
      protoGrid.appendChild(d);
    });
  }

  var guides = [
    { name:"Zapret", note:"Обходит DPI. Не шифрует трафик.", steps:["Скачайте сборку","Распакуйте архив","Запустите general.bat","Не закрывайте окно","Попробуйте другую стратегию"], links:[ {label:"Windows-сборка", url:"https://github.com/Flowseal/zapret-discord-youtube"}, {label:"Оригинал", url:"https://github.com/bol-van/zapret"} ] },
    { name:"ByeDPI", note:"Проще Zapret, Android без root.", steps:["Windows/Linux: запустите – SOCKS5 на 127.0.0.1:1080","Пропишите прокси в браузере","Android: установите APK, нажмите Start"], links:[ {label:"Windows / Linux", url:"https://github.com/hufrea/byedpi"}, {label:"Android", url:"https://github.com/dovecoteescapee/ByeDPIAndroid"} ] },
    { name:"tgwsproxy", note:"Прокси для Telegram.", steps:["Скачайте сборку","Запустите – инструкция для Desktop","Свернётся в трей","Android: APK и автонастройка"], links:[ {label:"Windows / macOS / Linux", url:"https://github.com/Flowseal/tg-ws-proxy"}, {label:"Android", url:"https://github.com/amurcanov/tg-ws-proxy-android"} ] }
  ];
  var guideGrid = document.getElementById("guideGrid");
  if (guideGrid) guides.forEach(function(g){
    var d = document.createElement("details");
    d.className = "guide-card";
    d.innerHTML = "<summary>" + g.name + " <span class='hint'>показать</span></summary><div class='guide-body'><p>" + g.note + "</p><ol>" + g.steps.map(function(s){ return "<li>" + s + "</li>"; }).join("") + "</ol><div class='guide-links'>" + g.links.map(function(l){ return "<a href='" + l.url + "' target='_blank' rel='noopener'>" + l.label + " →</a>"; }).join("") + "</div></div>";
    guideGrid.appendChild(d);
  });

  var tgProxies = [
    { label:"MTProto", addr:"proxy.vmelectronics.ru:443", url:"https://t.me/proxy?server=proxy.vmelectronics.ru&port=443&secret=ee6164732e78352e72759c6509729477" },
    { label:"MTProto", addr:"coca.mtmajestic.space:853", url:"tg://proxy?server=coca.mtmajestic.space&port=853&secret=616cf892574b078aab3f73e63b8b7df4" },
    { label:"MTProto", addr:"coca.mtmajestic.space:443", url:"tg://proxy?server=coca.mtmajestic.space&port=443&secret=dd616cf892574b078aab3f73e63b8b7df4" },
    { label:"MTProto", addr:"185.130.114.232:443", url:"https://t.me/proxy?server=185.130.114.232&port=443&secret=eea8f35c1d7e9042b6c4d19e2fb7630a586d61782e7275" },
    { label:"MTProto", addr:"146.185.208.118:8443", url:"https://t.me/proxy?server=146.185.208.118&port=8443&secret=7gNCstm3UgMJ5_8asG-Xia53aXBlLmNhbGxzbWVlZS54eXo" },
    { label:"MTProto", addr:"fast.proxytg.space:8443", url:"tg://proxy?server=fast.proxytg.space&port=8443&secret=ee60a6bb02c869117fa6820902f61c82ff666173742e70726f787974672e7370616365" },
    { label:"MTProto", addr:"redflag.yazaebalsyadelatproxy.cc:443", url:"https://t.me/proxy?server=redflag.yazaebalsyadelatproxy.cc&port=443&secret=ee69e899d89ec68e220ca177557322b27f706c617932676f2e636c6f7564" }
  ];
  var tgList = document.getElementById("tgList");
  if (tgList) tgProxies.forEach(function(p){
    var row = document.createElement("div");
    row.className = "tg-item";
    row.innerHTML = "<span>" + p.label + " — " + p.addr + "</span><a href='" + p.url + "' target='_blank' rel='noopener' style='color:var(--orange-bright);'>Подключиться</a>";
    tgList.appendChild(row);
  });

  var clientGroups = [
    { device:"Windows", match:["win"], apps:[ {name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"}, {name:"v2rayN", url:"https://github.com/2dust/v2rayN/releases"} ] },
    { device:"Android", match:["android"], apps:[ {name:"Incy", url:"https://play.google.com/store/apps/details?id=com.glarimy.incy"}, {name:"NekoBox", url:"https://github.com/MatsuriDayo/NekoBoxForAndroid/releases"} ] },
    { device:"Android TV", match:[], apps:[ {name:"NekoBox (TV)", url:"https://github.com/MatsuriDayo/NekoBoxForAndroid/releases"} ] },
    { device:"iOS / iPadOS", match:["ios"], apps:[ {name:"Streisand", url:"https://apps.apple.com/app/streisand/id6450534064"}, {name:"V2Box", url:"https://apps.apple.com/app/v2box/id6443654552"} ] },
    { device:"Linux", match:["linux"], apps:[ {name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"}, {name:"NekoRay", url:"https://github.com/MatsuriDayo/nekoray/releases"} ] },
    { device:"macOS", match:["mac"], apps:[ {name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"}, {name:"Streisand", url:"https://apps.apple.com/app/streisand/id6450534064"} ] }
  ];
  var clientGrid = document.getElementById("clientGrid");
  if (clientGrid) clientGroups.forEach(function(g){
    var recommended = g.match.indexOf(userOS) !== -1;
    var card = document.createElement("div");
    card.className = "client-card" + (recommended ? " recommended" : "");
    var appsHtml = g.apps.map(function(a){ return "<a href='" + a.url + "' target='_blank' rel='noopener'>" + a.name + "</a>"; }).join("");
    card.innerHTML = (recommended ? '<span class="client-tag">Для вас</span>' : "") + '<div class="client-device">' + g.device + '</div><div class="client-apps">' + appsHtml + '</div>';
    clientGrid.appendChild(card);
  });

  var faq = [
    { q:"Подписка не работает или очень медленно.", a:"Обновите подписку в клиенте (кнопка «Обновить»). Попробуйте сменить протокол (VLESS → Trojan) или сервер. Иногда помогает перезапуск клиента или смена Wi-Fi/мобильного интернета." },
    { q:"Как часто обновляются конфиги?", a:"Это подборка из чужих источников — обновляется вручную, по мере появления новых рабочих ссылок, а не по расписанию." },
    { q:"Когда нужно использовать белые списки?", a:"Только когда ваш мобильный оператор (МТС, Билайн, Tele2 и др.) включил «белые списки» РКН — и обычные сайты перестали открываться." },
    { q:"Какой клиент лучше всего для новичка?", a:"Hiddify — самый удобный и понятный, для Windows и Android. На iOS — Streisand." },
    { q:"Что делать, если Telegram-прокси не подключается?", a:"Прокси часто умирают даже свежие — попробуйте следующий из списка или используйте обычную VPN-подписку выше вместо прокси." },
    { q:"Можно ли использовать одну подписку на нескольких устройствах?", a:"Да, большинство подписок поддерживают одновременное подключение с нескольких устройств — но это зависит от конкретного сервера." },
    { q:"Безопасно ли пользоваться этими конфигами?", a:"Конфиги из открытых источников и не проверяются нами на безопасность. Не передавайте через них банковские данные и важные пароли. Используйте на свой страх и риск." }
  ];
  var faqList = document.getElementById("faqList");
  if (faqList) faq.forEach(function(item, i){
    var d = document.createElement("details");
    d.className = "faq-item"; if (i === 0) d.open = true;
    d.innerHTML = "<summary>" + item.q + "</summary><p>" + item.a + "</p>";
    faqList.appendChild(d);
  });

  var contributors = [
    { name:"Stintik", role:"Основатель", link:"https://github.com/Stintik-123" },
    { name:"Анонимный помощник", role:"Тестировщик", link:"#" },
    { name:"Keb04w", role:"Поддержка", link:"https://t.me/Keb04w" },
    { name:"Сообщество GitHub", role:"Звёзды и идеи", link:"https://github.com/Stintik-123/StintikVPN" }
  ];
  var thanksGrid = document.getElementById("thanksGrid");
  if (thanksGrid) {
    contributors.forEach(function(c){
      var card = document.createElement("div");
      card.className = "thanks-card";
      card.innerHTML = "<strong>" + c.name + "</strong><span>" + c.role + "</span>";
      if (c.link && c.link !== "#") {
        card.style.cursor = "pointer";
        card.addEventListener("click", function(){ window.open(c.link, "_blank"); });
      }
      thanksGrid.appendChild(card);
    });
  }

  var starsEl = document.getElementById("statStars");
  var currentStars = null;
  function animateNumber(el, from, to){
    var start = null; var duration = 700;
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
    fetch("https://api.github.com/repos/Stintik-123/StintikVPN").then(function(r){ return r.ok ? r.json() : null; }).then(function(data){
      if (data && typeof data.stargazers_count === "number") {
        var to = data.stargazers_count;
        animateNumber(starsEl, currentStars === null ? to : currentStars, to);
        currentStars = to;
      } else if (currentStars === null) starsEl.textContent = "…";
    }).catch(function(){ if (currentStars === null) starsEl.textContent = "…"; });
  }
  refreshStars();
  setInterval(refreshStars, 60000);

  var backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener("scroll", function(){ backBtn.classList.toggle("visible", window.scrollY > 600); });
    backBtn.addEventListener("click", function(){ window.scrollTo({ top:0, behavior:"smooth" }); });
  }

  (function(){
    var links = document.querySelectorAll(".nav-links a[href^='#']");
    if (!links.length || !window.IntersectionObserver) return;
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        links.forEach(function(a){ a.classList.remove("active"); });
        var match = document.querySelector(".nav-links a[href='#" + entry.target.id + "']");
        if (match) match.classList.add("active");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    links.forEach(function(a){ var s = document.querySelector(a.getAttribute("href")); if (s) observer.observe(s); });
  })();

  var appearObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        appearObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.sub-card, .client-card, .proto-card, .guide-card, .check-card').forEach(function(el){ appearObserver.observe(el); });

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

  (function(){
    var footer = document.querySelector('.footer-links');
    if (!footer) return;
    var shareBtn = document.createElement('a');
    shareBtn.href = '#';
    shareBtn.textContent = '📤 Поделиться';
    shareBtn.addEventListener('click', function(e){
      e.preventDefault();
      if (navigator.share) navigator.share({ title: 'StintikVPN', text: 'Подборка рабочих VPN-подписок', url: window.location.href });
      else showToast('Скопируйте адрес сайта и отправьте другу');
    });
    footer.appendChild(shareBtn);
  })();

  (function bg(){
    var canvas = document.getElementById("bgCanvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var w, h, nodes = [];
    var NODE_COUNT = 46;
    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    }
    function initNodes(){
      nodes = [];
      for (var i=0;i<NODE_COUNT;i++) nodes.push({ x: Math.random()*w, y: Math.random()*h, vx: (Math.random()-.5)*.25, vy: (Math.random()-.5)*.25 });
    }
    function step(){
      ctx.clearRect(0,0,w,h);
      for (var i=0;i<nodes.length;i++){
        var n = nodes[i];
        if (!reduced){ n.x += n.vx; n.y += n.vy; }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        for (var j=i+1;j<nodes.length;j++){
          var m = nodes[j], dx = n.x-m.x, dy = n.y-m.y, dist = Math.sqrt(dx*dx+dy*dy);
          if (dist < 160){
            ctx.strokeStyle = "rgba(255,138,61," + (0.15 * (1 - dist/160)) + ")";
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
          }
        }
      }
      requestAnimationFrame(step);
    }
    window.addEventListener("resize", function(){ resize(); initNodes(); });
    resize(); initNodes();
    requestAnimationFrame(step);
  })();

  (function(){
    var statsRow = document.querySelector('.stats-row');
    if (!statsRow) return;
    var totalSubs = subscriptions.length;
    var subStat = document.getElementById('statSubs');
    if (!subStat) {
      var d = document.createElement('div');
      d.className = 'stat';
      d.innerHTML = '<b id="statSubs">'+totalSubs+'</b><span>Подписок</span>';
      statsRow.appendChild(d);
    } else subStat.textContent = totalSubs;
    var ratingSum = Object.values(ratings).reduce(function(s,r){ return s + (r.likes||0) + (r.dislikes||0); }, 0);
    var ratStat = document.getElementById('statRatings');
    if (!ratStat) {
      var d2 = document.createElement('div');
      d2.className = 'stat';
      d2.innerHTML = '<b id="statRatings">'+ratingSum+'</b><span>Оценок</span>';
      statsRow.appendChild(d2);
    } else ratStat.textContent = ratingSum;
  })();

  (function(){
    var navRight = document.querySelector('.nav-right');
    if (navRight) {
      var themeBtnEl = document.createElement('button');
      themeBtnEl.className = 'nav-icon theme-toggle';
      themeBtnEl.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
      themeBtnEl.setAttribute('aria-label', 'Переключить тему');
      themeBtnEl.addEventListener('click', toggleTheme);
      navRight.appendChild(themeBtnEl);
      themeBtn = themeBtnEl;
    }
  })();

  renderSubs("all");
})();

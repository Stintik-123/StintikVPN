(function(){
  "use strict";

  var subscriptions = [
    { id:"black-main", cat:"black", count:"",
      name:"🏴 Чёрный список (основной)",
      desc:"Основной чёрный список для обычного интернета.",
      url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt" },
    { id:"black-backup", cat:"black", count:"",
      name:"🏴 Чёрный список (запасной)",
      desc:"Запасной вариант, если основной чёрный список не работает.",
      url:"https://vpn.akres.fun/all" },
    { id:"black-mobile", cat:"black", count:"20",
      name:"👑 Black Mobile",
      desc:"20 лучших серверов специально для телефонов.",
      url:"https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt" },
    { id:"white-main", cat:"white", count:"",
      name:"🏳️ Белый список (основной)",
      desc:"Для жёстких блокировок, когда включены «белые списки» РКН.",
      url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt" },
    { id:"white-cidr", cat:"white", count:"",
      name:"🌐 Белый список (CIDR)",
      desc:"Фильтрует по числовым IP-диапазонам. Если не работает SNI — попробуйте это.",
      url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt" },
    { id:"white-sni", cat:"white", count:"",
      name:"🔍 Белый список (SNI)",
      desc:"Фильтрует по именам сайтов (например, youtube.com). Если не работает CIDR — попробуйте это.",
      url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt" },
    { id:"proto-vless", cat:"protocol", count:"",
      name:"⚡ VLESS + Reality",
      desc:"Лучший по скорости и маскировке, но РКН сейчас блокирует его активнее остальных.",
      url:"https://mifa.world/vless" },
    { id:"proto-vmess", cat:"protocol", count:"",
      name:"🔒 VMess",
      desc:"Самый надёжный протокол из всех.",
      url:"https://mifa.world/vmess" },
    { id:"proto-trojan", cat:"protocol", count:"",
      name:"🛡️ Trojan",
      desc:"Хорошая маскировка под обычный TLS-трафик.",
      url:"https://mifa.world/trojan" },
    { id:"proto-ss", cat:"protocol", count:"",
      name:"🚀 Shadowsocks",
      desc:"Максимальная скорость — рекомендуется для онлайн-игр.",
      url:"https://mifa.world/ss" }
  ];

  var protocols = [
    { name:"VLESS", note:"Лучший по скорости и маскировке, но в последнее время РКН активно блокирует — надёжность упала." },
    { name:"Trojan", note:"Хорошая маскировка под обычный TLS-трафик." },
    { name:"VMess", note:"Самый надёжный протокол из всех." },
    { name:"Shadowsocks", note:"Максимальная скорость, рекомендуется для онлайн-игр." }
  ];

  var guides = [
    { name:"Zapret",
      note:"Обходит блокировку по содержимому пакетов (DPI) — то, чем режут YouTube и Discord. Не шифрует трафик, просто обманывает проверку.",
      steps:[
        "Скачайте сборку со страницы релизов (ссылка ниже)",
        "Распакуйте архив в папку без кириллицы в пути",
        "Запустите general.bat — включает обход для YouTube, Discord и Cloudflare",
        "Не закрывайте открывшееся окно (можно свернуть)",
        "Если не помогло — попробуйте другую стратегию из архива или добавьте папку в исключения антивируса"
      ],
      links:[
        {label:"Windows-сборка (Flowseal)", url:"https://github.com/Flowseal/zapret-discord-youtube"},
        {label:"Оригинал (Linux / роутеры, bol-van)", url:"https://github.com/bol-van/zapret"}
      ] },
    { name:"ByeDPI",
      note:"Похож на Zapret, но проще в настройке. На Android есть версия без root — включил и пользуешься.",
      steps:[
        "Windows/Linux: скачайте релиз, запустите — поднимет локальный SOCKS5-прокси на 127.0.0.1:1080",
        "Пропишите этот адрес как прокси в браузере или системных настройках сети",
        "Android: установите APK, откройте приложение и нажмите Start — дальше работает как обычный локальный VPN"
      ],
      links:[
        {label:"Windows / Linux", url:"https://github.com/hufrea/byedpi"},
        {label:"Android (без root)", url:"https://github.com/dovecoteescapee/ByeDPIAndroid"}
      ] },
    { name:"tgwsproxy",
      note:"Локальный прокси именно для Telegram — ускоряет загрузку фото/видео и звонки, если тормозит только Telegram, а не весь интернет.",
      steps:[
        "Скачайте сборку для своей ОС со страницы релизов",
        "Запустите — при первом старте откроется окно с инструкцией для Telegram Desktop",
        "Приложение свернётся в трей: через «Открыть в Telegram» прокси настроится автоматически",
        "На Android — установите APK и включите прокси, приложение само подскажет как подключить его в настройках Telegram"
      ],
      links:[
        {label:"Windows / macOS / Linux (Flowseal)", url:"https://github.com/Flowseal/tg-ws-proxy"},
        {label:"Android", url:"https://github.com/amurcanov/tg-ws-proxy-android"}
      ] }
  ];

  var tgProxies = [
    { label:"MTProto", addr:"proxy.vmelectronics.ru:443", url:"https://t.me/proxy?server=proxy.vmelectronics.ru&port=443&secret=ee6164732e78352e72759c6509729477" },
    { label:"MTProto", addr:"coca.mtmajestic.space:853", url:"tg://proxy?server=coca.mtmajestic.space&port=853&secret=616cf892574b078aab3f73e63b8b7df4" },
    { label:"MTProto", addr:"coca.mtmajestic.space:443", url:"tg://proxy?server=coca.mtmajestic.space&port=443&secret=dd616cf892574b078aab3f73e63b8b7df4" },
    { label:"MTProto", addr:"185.130.114.232:443", url:"https://t.me/proxy?server=185.130.114.232&port=443&secret=eea8f35c1d7e9042b6c4d19e2fb7630a586d61782e7275" },
    { label:"MTProto", addr:"146.185.208.118:8443", url:"https://t.me/proxy?server=146.185.208.118&port=8443&secret=7gNCstm3UgMJ5_8asG-Xia53aXBlLmNhbGxzbWVlZS54eXo" },
    { label:"MTProto", addr:"fast.proxytg.space:8443", url:"tg://proxy?server=fast.proxytg.space&port=8443&secret=ee60a6bb02c869117fa6820902f61c82ff666173742e70726f787974672e7370616365" },
    { label:"MTProto", addr:"redflag.yazaebalsyadelatproxy.cc:443", url:"https://t.me/proxy?server=redflag.yazaebalsyadelatproxy.cc&port=443&secret=ee69e899d89ec68e220ca177557322b27f706c617932676f2e636c6f7564" }
  ];

  var clientGroups = [
    { device:"Windows", match:["win"], apps:[
        {name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"},
        {name:"v2rayN", url:"https://github.com/2dust/v2rayN/releases"} ] },
    { device:"Android", match:["android"], apps:[
        {name:"Incy", url:"https://play.google.com/store/apps/details?id=com.glarimy.incy"},
        {name:"NekoBox", url:"https://github.com/MatsuriDayo/NekoBoxForAndroid/releases"} ] },
    { device:"Android TV", match:[], apps:[
        {name:"NekoBox (TV)", url:"https://github.com/MatsuriDayo/NekoBoxForAndroid/releases"} ] },
    { device:"iOS / iPadOS", match:["ios"], apps:[
        {name:"Streisand", url:"https://apps.apple.com/app/streisand/id6450534064"},
        {name:"V2Box", url:"https://apps.apple.com/app/v2box/id6443654552"} ] },
    { device:"Linux", match:["linux"], apps:[
        {name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"},
        {name:"NekoRay", url:"https://github.com/MatsuriDayo/nekoray/releases"} ] },
    { device:"macOS", match:["mac"], apps:[
        {name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"},
        {name:"Streisand", url:"https://apps.apple.com/app/streisand/id6450534064"} ] }
  ];

  var faq = [
    { q:"Подписка не работает или очень медленно.",
      a:"Обновите подписку в клиенте (кнопка «Обновить»). Попробуйте сменить протокол (VLESS → Trojan) или сервер. Иногда помогает перезапуск клиента или смена Wi-Fi/мобильного интернета." },
    { q:"Как часто обновляются конфиги?",
      a:"Это подборка из чужих источников — обновляется вручную, по мере появления новых рабочих ссылок, а не по расписанию." },
    { q:"Когда нужно использовать белые списки?",
      a:"Только когда ваш мобильный оператор (МТС, Билайн, Tele2 и др.) включил «белые списки» РКН — и обычные сайты перестали открываться." },
    { q:"Какой клиент лучше всего для новичка?",
      a:"Hiddify — самый удобный и понятный, для Windows и Android. На iOS — Streisand." },
    { q:"Что делать, если Telegram-прокси не подключается?",
      a:"Прокси часто умирают даже свежие — попробуйте следующий из списка или используйте обычную VPN-подписку выше вместо прокси." },
    { q:"Можно ли использовать одну подписку на нескольких устройствах?",
      a:"Да, большинство подписок поддерживают одновременное подключение с нескольких устройств — но это зависит от конкретного сервера." },
    { q:"Безопасно ли пользоваться этими конфигами?",
      a:"Конфиги из открытых источников и не проверяются нами на безопасность. Не передавайте через них банковские данные и важные пароли. Используйте на свой страх и риск." }
  ];

  /* ---------- вспомогательные функции ---------- */
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

  /* ---------- подписки ---------- */
  var subGrid = document.getElementById("subGrid");
  function renderSubs(filter){
    subGrid.innerHTML = "";
    subscriptions.forEach(function(sub){
      if (filter !== "all" && sub.cat !== filter) return;
      var card = document.createElement("div");
      card.className = "sub-card"; card.id = "card-" + sub.id;
      var reportText = encodeURIComponent("Не работает подписка: " + sub.name + " — " + sub.url);
      card.innerHTML =
        '<div class="sub-top"><div class="sub-name">' + sub.name + '</div>' + (sub.count ? '<span class="sub-count">' + sub.count + '</span>' : '') + '</div>' +
        '<div class="sub-desc">' + sub.desc + '</div>' +
        '<div class="sub-src">' + sub.url + '</div>' +
        '<div class="sub-actions-row">' +
          '<button class="copy-btn">⧉ Скопировать</button>' +
          '<a class="report-btn" href="https://t.me/Keb04w?text=' + reportText + '" target="_blank" rel="noopener" title="Сообщить, что не работает">⚑</a>' +
        '</div>';
      var copyBtn = card.querySelector(".copy-btn");
      copyBtn.addEventListener("click", function(){
        copyText(sub.url).then(function(){
          copyBtn.textContent = "✓ Скопировано"; copyBtn.classList.add("copied");
          setTimeout(function(){ copyBtn.textContent = "⧉ Скопировать"; copyBtn.classList.remove("copied"); }, 1600);
        }).catch(function(){ showToast("Не удалось скопировать: " + sub.url); });
      });
      subGrid.appendChild(card);
    });
  }

  var tabs = document.querySelectorAll(".tab[data-filter]");
  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      tabs.forEach(function(t){ t.classList.remove("active"); });
      tab.classList.add("active");
      renderSubs(tab.getAttribute("data-filter"));
    });
  });

  var copyAllBtn = document.getElementById("copyAllBtn");
  copyAllBtn.addEventListener("click", function(){
    var activeFilter = document.querySelector(".tab.active[data-filter]").getAttribute("data-filter");
    var visible = subscriptions.filter(function(s){ return activeFilter === "all" || s.cat === activeFilter; });
    var text = visible.map(function(s){ return s.name + ": " + s.url; }).join("\n");
    copyText(text).then(function(){
      copyAllBtn.textContent = "✓ Скопировано";
      setTimeout(function(){ copyAllBtn.textContent = "⧉ Скопировать все видимые"; }, 1800);
    }).catch(function(){ showToast("Не удалось скопировать список"); });
  });

  document.querySelectorAll(".helper-opt").forEach(function(btn){
    btn.addEventListener("click", function(){
      var targetId = btn.getAttribute("data-target");
      tabs.forEach(function(t){ t.classList.remove("active"); });
      document.querySelector('.tab[data-filter="all"]').classList.add("active");
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

  /* ---------- протоколы ---------- */
  var protoGrid = document.getElementById("protoGrid");
  protocols.forEach(function(p){
    var d = document.createElement("div");
    d.className = "proto-card";
    d.innerHTML = "<h3>" + p.name + "</h3><p>" + p.note + "</p>";
    protoGrid.appendChild(d);
  });

  /* ---------- гайды (скрыты, открываются по клику) ---------- */
  var guideGrid = document.getElementById("guideGrid");
  guides.forEach(function(g){
    var d = document.createElement("details");
    d.className = "guide-card";
    var stepsHtml = g.steps.map(function(s){ return "<li>" + s + "</li>"; }).join("");
    var linksHtml = g.links.map(function(l){ return "<a href='" + l.url + "' target='_blank' rel='noopener'>" + l.label + " →</a>"; }).join("");
    d.innerHTML =
      "<summary>" + g.name + " <span class='hint'>показать гайд</span></summary>" +
      "<div class='guide-body'><p>" + g.note + "</p><ol>" + stepsHtml + "</ol><div class='guide-links'>" + linksHtml + "</div></div>";
    guideGrid.appendChild(d);
  });

  /* ---------- telegram-прокси ---------- */
  var tgList = document.getElementById("tgList");
  tgProxies.forEach(function(p){
    var row = document.createElement("div");
    row.className = "tg-item";
    row.innerHTML = "<span>" + p.label + " — " + p.addr + "</span><a href='" + p.url + "' target='_blank' rel='noopener' style='color:var(--orange-bright);'>Подключиться</a>";
    tgList.appendChild(row);
  });

  /* ---------- клиенты ---------- */
  var clientGrid = document.getElementById("clientGrid");
  clientGroups.forEach(function(g){
    var recommended = g.match.indexOf(userOS) !== -1;
    var card = document.createElement("div");
    card.className = "client-card" + (recommended ? " recommended" : "");
    var appsHtml = g.apps.map(function(a){ return "<a href='" + a.url + "' target='_blank' rel='noopener'>" + a.name + "</a>"; }).join("");
    card.innerHTML = (recommended ? '<span class="client-tag">Для вас</span>' : "") +
      '<div class="client-device">' + g.device + '</div><div class="client-apps">' + appsHtml + '</div>';
    clientGrid.appendChild(card);
  });

  /* ---------- faq ---------- */
  var faqList = document.getElementById("faqList");
  faq.forEach(function(item, i){
    var d = document.createElement("details");
    d.className = "faq-item"; if (i === 0) d.open = true;
    d.innerHTML = "<summary>" + item.q + "</summary><p>" + item.a + "</p>";
    faqList.appendChild(d);
  });

  /* ---------- звёзды GitHub: автообновление + анимированный счётчик ---------- */
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
    fetch("https://api.github.com/repos/Stintik-123/StintikVPN").then(function(r){ return r.ok ? r.json() : null; }).then(function(data){
      if (data && typeof data.stargazers_count === "number"){
        var to = data.stargazers_count;
        animateNumber(starsEl, currentStars === null ? to : currentStars, to);
        currentStars = to;
      }
    }).catch(function(){});
  }
  refreshStars();
  setInterval(refreshStars, 60000);

  /* ---------- прелоадер ---------- */
  (function preloader(){
    var el = document.getElementById("preloader");
    if (!el) return;
    var hidden = false;
    var startedAt = Date.now();
    var MIN_VISIBLE = 1600;
    function hide(){
      if (hidden) return; hidden = true;
      var wait = Math.max(0, MIN_VISIBLE - (Date.now() - startedAt));
      setTimeout(function(){
        el.classList.add("hidden");
        setTimeout(function(){ el.remove(); }, 450);
      }, wait);
    }
    window.addEventListener("load", hide);
    setTimeout(hide, 4000);
  })();

  /* ---------- кнопка "наверх" ---------- */
  (function backToTop(){
    var btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener("scroll", function(){
      btn.classList.toggle("visible", window.scrollY > window.innerHeight * 0.6);
    });
    btn.addEventListener("click", function(){
      window.scrollTo({ top:0, behavior:"smooth" });
    });
  })();

  /* ---------- активный пункт меню при скролле ---------- */
  (function scrollSpy(){
    var navLinks = document.querySelectorAll(".nav-links a[href^='#']");
    if (!navLinks.length) return;
    var sections = Array.prototype.map.call(navLinks, function(a){ return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
    if (!("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        navLinks.forEach(function(a){ a.classList.remove("active"); });
        var match = document.querySelector(".nav-links a[href='#" + entry.target.id + "']");
        if (match) match.classList.add("active");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function(s){ observer.observe(s); });
  })();

  /* ---------- живой фон: сеть узлов ---------- */
  (function bg(){
    var canvas = document.getElementById("bgCanvas");
    var ctx = canvas.getContext("2d");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var w, h, nodes = [];
    var NODE_COUNT = 46;
    var running = true;

    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    }
    function initNodes(){
      nodes = [];
      for (var i=0;i<NODE_COUNT;i++){
        nodes.push({ x: Math.random()*w, y: Math.random()*h, vx: (Math.random()-.5)*.25, vy: (Math.random()-.5)*.25 });
      }
    }
    function step(){
      if (!running) return;
      ctx.clearRect(0,0,w,h);
      for (var i=0;i<nodes.length;i++){
        var n = nodes[i];
        if (!reduced){ n.x += n.vx; n.y += n.vy; }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        for (var j=i+1;j<nodes.length;j++){
          var m = nodes[j];
          var dx = n.x-m.x, dy = n.y-m.y;
          var dist = Math.sqrt(dx*dx+dy*dy);
          if (dist < 160){
            ctx.strokeStyle = "rgba(255,138,61," + (0.12*(1-dist/160)) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(m.x,m.y); ctx.stroke();
          }
        }
      }
      for (var k=0;k<nodes.length;k++){
        ctx.fillStyle = "rgba(255,107,26,.55)";
        ctx.beginPath(); 

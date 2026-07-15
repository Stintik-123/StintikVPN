(function(){
  "use strict";

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

  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function showToast(msg){
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toastEl.classList.remove("visible"); }, 4000);
  }

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

  var subscriptions = [
    { id:"black-main", cat:"black", name:"🏴 Чёрный список (основной)", desc:"Для обычного интернета (домашний Wi-Fi, кабель, 4G).", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt" },
    { id:"black-backup", cat:"black", name:"🏴 Чёрный список (запасной)", desc:"Альтернативный источник чёрных списков.", url:"https://vpn.akres.fun/all" },
    { id:"black-mobile", cat:"black", name:"👑 Black Mobile", desc:"20 ЛУЧШИХ серверов, специально оптимизированных для телефонов.", url:"https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt" },
    { id:"white-main", cat:"white", name:"🏳️ Белые списки (Основные)", desc:"Для жёстких блокировок (мобильный интернет с белыми списками РКН).", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt" },
    { id:"white-cidr", cat:"white", name:"🌐 Белые списки (CIDR)", desc:"Фильтрует трафик по цифровым IP-диапазонам. Используйте, если не работает SNI.", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt" },
    { id:"white-sni", cat:"white", name:"🔍 Белые списки (SNI)", desc:"Фильтрует трафик по текстовым именам сайтов. Используйте, если не работает CIDR.", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt" },
    { id:"proto-vless", cat:"protocol", name:"⚡ VLESS", desc:"Лучший по скорости и маскировке, но в последнее время РКН активно блокирует.", url:"https://mifa.world/vless" },
    { id:"proto-vmess", cat:"protocol", name:"🔒 VMess", desc:"Самый надёжный протокол из всех. Рекомендуется для стабильной работы.", url:"https://mifa.world/vmess" },
    { id:"proto-trojan", cat:"protocol", name:"🛡️ Trojan", desc:"Хорошая маскировка под обычный HTTPS трафик.", url:"https://mifa.world/trojan" },
    { id:"proto-ss", cat:"protocol", name:"🚀 Shadowsocks", desc:"Максимальная скорость. Настоятельно рекомендуется для онлайн-игр.", url:"https://mifa.world/ss" }
  ];

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

      card.innerHTML =
        '<div class="sub-header"><h3>' + sanitizeHTML(sub.name) + '</h3></div>' +
        '<p>' + sanitizeHTML(sub.desc) + '</p>' +
        '<code>' + sanitizeHTML(sub.url) + '</code>' +
        '<div class="sub-actions-row">' +
          '<button class="btn btn-primary copy-btn" data-url="' + sub.url + '">⧉ Копировать ссылку</button>' +
        '</div>';

      card.querySelector(".copy-btn").addEventListener("click", function(){
        var url = this.getAttribute("data-url");
        copyText(url).then(function(){
          var originalText = this.textContent;
          this.textContent = "✓ Скопировано!";
          this.classList.add("copied");
          showToast("Ссылка скопирована! Вставьте её в VPN-клиент.");
          var btn = this;
          setTimeout(function(){ 
            btn.textContent = originalText; 
            btn.classList.remove("copied"); 
          }.bind(btn), 2000);
        }.bind(this)).catch(function(){
          showToast("Ошибка копирования. Скопируйте вручную.");
        });
      });

      subGrid.appendChild(card);
    });

    if (!hasResults) {
      subGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:40px;">Ничего не найдено. Попробуйте изменить запрос.</p>';
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

  var tabs = document.querySelectorAll(".tab[data-filter]");
  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      tabs.forEach(function(t){ t.classList.remove("active"); });
      tab.classList.add("active");
      renderSubs(tab.getAttribute("data-filter"));
    });
  });

  var calcStep1 = document.getElementById('calcStep1');
  var calcResult = document.getElementById('calcResult');
  var calcRec = document.getElementById('calcRec');
  var calcReset = document.getElementById('calcReset');

  document.querySelectorAll('#calcStep1 .calc-opt').forEach(function(opt){
    opt.addEventListener('click', function(){
      var task = opt.dataset.task;
      var rec = {};
      if (task === 'games') {
        rec = { proto: '🚀 Shadowsocks', desc: 'Обеспечивает минимальный пинг и максимальную скорость, что критически важно для онлайн-игр. Не имеет лишних накладных расходов на шифрование.' };
      } else if (task === 'stream') {
        rec = { proto: '⚡ VLESS (Reality)', desc: 'Лучший выбор для стриминга в 4K. Высокая скорость, но имейте в виду, что РКН периодически пытается его блокировать.' };
      } else if (task === 'secure') {
        rec = { proto: '🔒 VMess', desc: 'Самый надёжный протокол из всех. Обеспечивает стабильное соединение и хорошую защиту, даже если другие протоколы блокируются.' };
      } else if (task === 'universal') {
        rec = { proto: '🛡️ Trojan', desc: 'Идеальный универсальный вариант. Отличная маскировка под обычный HTTPS-трафик, хорошая скорость и высокая надёжность. Работает почти везде.' };
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

  var faq = [
    { q:"Подписка не работает или очень медленно.", a:"Обновите подписку в клиенте (кнопка «Обновить»). Попробуйте сменить протокол (VLESS Reality → Trojan) или сервер. Иногда помогает перезапуск клиента или смена Wi-Fi/мобильного интернета." },
    { q:"Как часто обновляются конфиги?", a:"Конфигурации обновляются ежедневно их создателями. Ссылки на сайте всегда ведут на актуальные версии." },
    { q:"Когда нужно использовать белые списки?", a:"Только когда ваш мобильный оператор (МТС, Билайн, Tele2 и др.) включил «белые списки» РКН — и обычные сайты перестали открываться." },
    { q:"Какой клиент лучше всего для новичка?", a:"Hiddify — самый удобный и понятный. Рекомендуется для Windows и Android. На iOS — Streisand." },
    { q:"Что делать, если Telegram прокси не подключается?", a:"Прокси часто умирают. Просто попробуйте следующий из списка. Они обновляются регулярно." },
    { q:"Можно ли использовать одну подписку на нескольких устройствах?", a:"Да, большинство подписок поддерживают одновременное подключение с нескольких устройств (зависит от конкретного сервера)." },
    { q:"Безопасно ли пользоваться этими конфигами?", a:"Конфиги из открытых источников. Рекомендуется не передавать через них чувствительные данные (банковские приложения, важные аккаунты). Используйте на свой страх и риск." }
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

  var backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener("scroll", function(){ backBtn.classList.toggle("visible", window.scrollY > 600); });
    backBtn.addEventListener("click", function(){ window.scrollTo({ top:0, behavior:"smooth" }); });
  }

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

  setTimeout(hideSkeleton, 800);
})();

(function(){
  "use strict";

  // === ПРЕЛОАДЕР ===
  window.addEventListener('load', function() {
    setTimeout(function() {
      var p = document.getElementById('preloader');
      if (p) { p.classList.add('hidden'); setTimeout(function(){ if(p.parentNode) p.parentNode.removeChild(p); }, 500); }
    }, 1000);
  });
  setTimeout(function() {
    var p = document.getElementById('preloader');
    if (p) { p.classList.add('hidden'); if(p.parentNode) p.parentNode.removeChild(p); }
  }, 3000);

  // === УТИЛИТЫ ===
  function sanitizeHTML(str) { var t = document.createElement('div'); t.textContent = str; return t.innerHTML; }
  function debounce(func, wait) { var t; return function() { clearTimeout(t); t = setTimeout(() => func.apply(this, arguments), wait); }; }
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("visible"), 4000);
  }

  // === ТЕМА ===
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
      themeBtn.innerHTML = document.body.classList.contains('light-theme') ? '️' : '🌙';
    });
  }

  // === ЯЗЫК ===
  const translations = {
    ru: { copy_btn: "⧉ Копировать", check_btn: "🔄 Проверить", report_btn: "⚠ Пожаловаться", checking: "⏳ Проверка...", works: "✅ Работает", fails: "🔴 Не работает", copied: "✓ Скопировано" },
    en: { copy_btn: "⧉ Copy", check_btn: "🔄 Check", report_btn: "⚠ Report", checking: " Checking...", works: "✅ Works", fails: "🔴 Fails", copied: "✓ Copied" }
  };
  let currentLang = localStorage.getItem('lang') || 'ru';
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = currentLang === 'ru' ? 'EN' : 'RU';
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'ru' ? 'en' : 'ru';
      localStorage.setItem('lang', currentLang);
      langToggle.textContent = currentLang === 'ru' ? 'EN' : 'RU';
      renderSubs(currentFilter);
    });
  }

  // === ДАННЫЕ ===
  const subscriptions = [
    { id:"black-main", cat:"black", name:"🏴 Чёрный список (основной)", desc:"Для обычного интернета (домашний Wi-Fi, кабель, 4G).", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt" },
    { id:"black-backup", cat:"black", name:"🏴 Чёрный список (запасной)", desc:"Альтернативный источник чёрных списков.", url:"https://vpn.akres.fun/all" },
    { id:"black-mobile", cat:"black", name:"👑 Black Mobile", desc:"20 ЛУЧШИХ серверов для телефонов.", url:"https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt" },
    { id:"white-main", cat:"white", name:"️ Белые списки (Основные)", desc:"Для жёстких блокировок.", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt" },
    { id:"white-cidr", cat:"white", name:"🌐 Белые списки (CIDR)", desc:"Фильтрует по IP-диапазонам.", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt" },
    { id:"white-sni", cat:"white", name:"🔍 Белые списки (SNI)", desc:"Фильтрует по именам сайтов.", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt" },
    { id:"proto-vless", cat:"protocol", name:"⚡ VLESS", desc:"Лучший по скорости.", url:"https://mifa.world/vless" },
    { id:"proto-vmess", cat:"protocol", name:"🔒 VMess", desc:"Самый надёжный.", url:"https://mifa.world/vmess" },
    { id:"proto-trojan", cat:"protocol", name:"🛡️ Trojan", desc:"Хорошая маскировка.", url:"https://mifa.world/trojan" },
    { id:"proto-ss", cat:"protocol", name:"🚀 Shadowsocks", desc:"Максимальная скорость.", url:"https://mifa.world/ss" }
  ];

  // === ЛАЙКИ/ДИЗЛАЙКИ (localStorage) ===
  let userVotes = JSON.parse(localStorage.getItem('userVotes') || '{}');
  let localRatings = JSON.parse(localStorage.getItem('localRatings') || '{}');

  function getRating(id) {
    if (!localRatings[id]) localRatings[id] = { likes: 0, dislikes: 0 };
    return localRatings[id];
  }

  function vote(id, type) {
    const key = id + '-' + type;
    if (userVotes[key]) { showToast('Ты уже голосовал!'); return; }
    getRating(id)[type]++;
    userVotes[key] = true;
    localStorage.setItem('userVotes', JSON.stringify(userVotes));
    localStorage.setItem('localRatings', JSON.stringify(localRatings));
    updateRatingUI(id);
    updateTotalRatings();
    showToast(type === 'like' ? '👍 Спасибо!' : '👎 Принято');
  }

  function updateRatingUI(id) {
    const card = document.getElementById('card-' + id);
    if (!card) return;
    const r = getRating(id);
    const likeBtn = card.querySelector('.like-btn');
    const dislikeBtn = card.querySelector('.dislike-btn');
    likeBtn.innerHTML = '👍 <span>' + r.likes + '</span>';
    dislikeBtn.innerHTML = ' <span>' + r.dislikes + '</span>';
    if (userVotes[id + '-like']) { likeBtn.classList.add('voted'); likeBtn.style.borderColor = 'var(--success)'; likeBtn.style.color = 'var(--success)'; }
    if (userVotes[id + '-dislike']) { dislikeBtn.classList.add('voted'); dislikeBtn.style.borderColor = 'var(--error)'; dislikeBtn.style.color = 'var(--error)'; }
  }

  function updateTotalRatings() {
    let total = 0;
    for (let id in localRatings) total += localRatings[id].likes + localRatings[id].dislikes;
    const el = document.getElementById('statRatings');
    if (el) el.textContent = total;
  }

  // === РЕНДЕРИНГ ===
  const subGrid = document.getElementById("subGrid");
  const skeletonGrid = document.getElementById("skeletonGrid");
  const searchInput = document.getElementById("searchSubs");
  let currentFilter = "all";

  function renderSubs(filter) {
    currentFilter = filter;
    if (!subGrid) return;
    subGrid.innerHTML = "";
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    let hasResults = false;
    const t = translations[currentLang];

    subscriptions.forEach(sub => {
      if (filter !== "all" && sub.cat !== filter) return;
      if (query && sub.name.toLowerCase().indexOf(query) === -1 && sub.desc.toLowerCase().indexOf(query) === -1) return;
      hasResults = true;
      const card = document.createElement("div");
      card.className = "sub-card appear";
      card.id = "card-" + sub.id;
      const r = getRating(sub.id);

      card.innerHTML = `
        <h3>${sanitizeHTML(sub.name)}</h3>
        <div class="status-badge checking">${t.checking}</div>
        <p>${sanitizeHTML(sub.desc)}</p>
        <code>${sanitizeHTML(sub.url)}</code>
        <div class="sub-actions-row">
          <button class="btn btn-primary copy-btn" data-url="${sub.url}">${t.copy_btn}</button>
          <button class="btn btn-ghost btn-check check-btn" data-url="${sub.url}">${t.check_btn}</button>
          <a href="https://t.me/Keb04w?text=${encodeURIComponent('Не работает: '+sub.name)}" target="_blank" class="btn btn-ghost btn-report">${t.report_btn}</a>
        </div>
        <div class="rating-row">
          <button class="rating-btn like-btn">👍 <span>${r.likes}</span></button>
          <button class="rating-btn dislike-btn">👎 <span>${r.dislikes}</span></button>
        </div>
      `;

      card.querySelector(".copy-btn").addEventListener("click", function() {
        const url = this.getAttribute("data-url");
        navigator.clipboard.writeText(url).then(() => {
          const orig = this.textContent;
          this.textContent = t.copied;
          showToast('Ссылка скопирована!');
          setTimeout(() => { this.textContent = orig; }, 2000);
        });
      });

      card.querySelector(".check-btn").addEventListener("click", function() {
        const url = this.getAttribute("data-url");
        const badge = card.querySelector('.status-badge');
        badge.textContent = t.checking;
        badge.className = "status-badge checking";
        fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache' })
          .then(() => { badge.textContent = t.works; badge.className = "status-badge works"; })
          .catch(() => { badge.textContent = t.fails; badge.className = "status-badge fails"; });
      });

      card.querySelector(".like-btn").addEventListener("click", () => vote(sub.id, 'like'));
      card.querySelector(".dislike-btn").addEventListener("click", () => vote(sub.id, 'dislike'));

      subGrid.appendChild(card);
      updateRatingUI(sub.id);

      // Авто-проверка
      setTimeout(() => {
        const url = sub.url;
        const badge = card.querySelector('.status-badge');
        fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache' })
          .then(() => { badge.textContent = t.works; badge.className = "status-badge works"; })
          .catch(() => { badge.textContent = t.fails; badge.className = "status-badge fails"; });
      }, Math.random() * 2000 + 500);
    });

    if (!hasResults) subGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:40px;">Ничего не найдено.</p>';
  }

  function hideSkeleton() {
    if (skeletonGrid) skeletonGrid.style.display = 'none';
    if (subGrid) subGrid.style.display = 'grid';
    renderSubs("all");
  }

  if (searchInput) searchInput.addEventListener("input", debounce(() => renderSubs(currentFilter), 300));

  document.querySelectorAll(".tab[data-filter]").forEach(tab => {
    tab.addEventListener("click", function() {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      renderSubs(this.getAttribute("data-filter"));
    });
  });

  // === КЛИЕНТЫ ===
  function detectOS() {
    const ua = navigator.userAgent || "";
    if (/android/i.test(ua)) return "android";
    if (/iphone|ipad|ipod/i.test(ua)) return "ios";
    if (/mac/i.test(ua)) return "mac";
    if (/win/i.test(ua)) return "win";
    return "linux";
  }
  const userOS = detectOS();
  const clientGroups = [
    { device:"Windows", match:["win"], apps:[{name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"}, {name:"v2rayN", url:"https://github.com/2dust/v2rayN/releases"}] },
    { device:"Android", match:["android"], apps:[{name:"Incy", url:"https://play.google.com/store/apps/details?id=com.glarimy.incy"}, {name:"NekoBox", url:"https://github.com/MatsuriDayo/NekoBoxForAndroid/releases"}] },
    { device:"iOS / iPadOS", match:["ios"], apps:[{name:"Streisand", url:"https://apps.apple.com/app/streisand/id6450534064"}, {name:"V2Box", url:"https://apps.apple.com/app/v2box/id6443654552"}] },
    { device:"Linux", match:["linux"], apps:[{name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"}, {name:"NekoRay", url:"https://github.com/MatsuriDayo/nekoray/releases"}] },
    { device:"macOS", match:["mac"], apps:[{name:"Hiddify", url:"https://github.com/hiddify/hiddify-next/releases"}, {name:"Streisand", url:"https://apps.apple.com/app/streisand/id6450534064"}] }
  ];
  const clientGrid = document.getElementById("clientGrid");
  if (clientGrid) {
    clientGroups.forEach(g => {
      const recommended = g.match.indexOf(userOS) !== -1;
      const card = document.createElement("div");
      card.className = "client-card appear" + (recommended ? " recommended" : "");
      const appsHtml = g.apps.map(a => '<a href="' + a.url + '" target="_blank" rel="noopener">' + a.name + '</a>').join("");
      card.innerHTML = (recommended ? '<span class="rec-badge">🏆 Ваш выбор</span>' : '') + '<h3>' + g.device + '</h3><div class="client-apps">' + appsHtml + '</div>';
      clientGrid.appendChild(card);
    });
  }

  // === FAQ ===
  const faqData = [
    { q: "Подписка не работает.", a: "Обновите подписку в клиенте. Попробуйте сменить протокол." },
    { q: "Как часто обновляются конфиги?", a: "Ежедневно создателями." },
    { q: "Какой клиент лучше?", a: "Hiddify для Windows/Android. Streisand для iOS." }
  ];
  const faqList = document.getElementById("faqList");
  if (faqList) {
    faqData.forEach((item, i) => {
      const d = document.createElement("details");
      d.className = "faq-item";
      if (i === 0) d.open = true;
      d.innerHTML = '<summary>' + item.q + '</summary><p>' + item.a + '</p>';
      faqList.appendChild(d);
    });
  }

  // === ЗВЁЗДЫ GITHUB ===
  fetch("https://api.github.com/repos/Stintik-123/StintikVPN")
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById("statStars");
      if (el && data.stargazers_count) el.textContent = data.stargazers_count;
    })
    .catch(() => { const el = document.getElementById("statStars"); if (el) el.textContent = "—"; });

  document.getElementById('statSubs').textContent = subscriptions.length;
  updateTotalRatings();

  // === UI ===
  const backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener("scroll", () => backBtn.classList.toggle("visible", window.scrollY > 600));
    backBtn.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
  }

  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const btn = document.createElement('button');
    btn.className = 'nav-icon hamburger';
    btn.innerHTML = '☰';
    btn.addEventListener('click', () => navLinks.classList.toggle('open'));
    const navRight = document.querySelector('.nav-right');
    if (navRight) navRight.prepend(btn);
  }

  const appearObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("appear"); appearObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });

  setTimeout(() => {
    hideSkeleton();
    document.querySelectorAll('.sub-card, .client-card').forEach(el => appearObserver.observe(el));
  }, 500);

  // ============================================
  // === ПАСХАЛКИ ===
  // ============================================

  // 1. МАТРИЦА — код Конами: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIndex = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) { konamiIndex = 0; activateMatrix(); }
    } else konamiIndex = 0;
  });

  function activateMatrix() {
    showToast('🎮 Матрица активирована!');
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99998;pointer-events:none;';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const chars = 'アイウエオカキクケコ0123456789VPN';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*fontSize, drops[i]*fontSize);
        if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
    const interval = setInterval(draw, 33);
    setTimeout(() => { clearInterval(interval); canvas.remove(); }, 5000);
  }

  // 2. ИНКОГНИТО — введи "incognito" в поиск
  if (searchInput) {
    let buf = '';
    searchInput.addEventListener('input', (e) => {
      buf += e.data || '';
      if (buf.toLowerCase().includes('incognito')) {
        buf = '';
        document.body.style.filter = 'grayscale(100%) contrast(120%)';
        showToast('️ Режим инкогнито активирован');
        setTimeout(() => { document.body.style.filter = ''; }, 10000);
      }
      if (buf.length > 20) buf = buf.slice(-10);
    });
  }

  // 3. 10 кликов по звёздам
  const starsEl = document.getElementById('statStars');
  let starClicks = 0;
  if (starsEl) {
    starsEl.style.cursor = 'pointer';
    starsEl.addEventListener('click', () => {
      starClicks++;
      if (starClicks >= 10) {
        starClicks = 0;
        const msgs = ['🌟 Ты нашёл секрет!','⭐ Поставь звезду на GitHub!','✨ Достижение: "Настойчивый"','😄 Ладно, поставь уже звезду!'];
        showToast(msgs[Math.floor(Math.random()*msgs.length)]);
      }
    });
  }

  // 4. Ночное приветствие (00:00 - 06:00)
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 6) {
    setTimeout(() => showToast(' Ночной серфер? VPN работает даже в 3 часа ночи!'), 3000);
  }

  // 5. Хэш #/admin
  if (window.location.hash === '#/admin') {
    setTimeout(() => {
      showToast('🔓 Админ-панель... шутка! Но ты нашёл секрет!');
      document.body.style.background = 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)';
      setTimeout(() => { document.body.style.background = ''; }, 5000);
    }, 1000);
  }

  // 6. Быстрый набор "vpn"
  let vpnBuf = '';
  document.addEventListener('keypress', (e) => {
    vpnBuf += e.key.toLowerCase();
    if (vpnBuf.includes('vpn')) {
      vpnBuf = '';
      showToast('🔐 VPN - это свобода!');
      document.querySelectorAll('.btn-primary').forEach(btn => { btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; });
      setTimeout(() => { document.querySelectorAll('.btn-primary').forEach(btn => { btn.style.background = ''; }); }, 3000);
    }
    if (vpnBuf.length > 10) vpnBuf = vpnBuf.slice(-5);
  });

})();

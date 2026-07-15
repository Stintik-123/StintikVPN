(function(){
  "use strict";

  // === ПЕРЕВОДЫ ===
  const translations = {
    ru: {
      title: "StintikVPN — Интернет свобода",
      loading: "Сканирование сети...",
      nav_news: "Новости", nav_subs: "Подписки", nav_clients: "Клиенты", nav_guides: "Гайды",
      hero_title: "Интернет свобода ", hero_highlight: "без границ",
      hero_desc: "Рабочие VPN подписки, гайды по обходу блокировок и актуальные новости.",
      stat_subs: "Подписок", stat_stars: "Звёзд", stat_ratings: "Оценок",
      copy_btn: " Копировать", check_btn: "🔄 Проверить", report_btn: " Пожаловаться",
      checking: "⏳ Проверка...", works: "✅ Работает", fails: " Не работает",
      copied: "✓ Скопировано", voted_like: " Спасибо", voted_dislike: " Принято"
    },
    en: {
      title: "StintikVPN — Internet Freedom",
      loading: "Scanning network...",
      nav_news: "News", nav_subs: "Subs", nav_clients: "Clients", nav_guides: "Guides",
      hero_title: "Internet freedom ", hero_highlight: "without borders",
      hero_desc: "Working VPN subscriptions, DPI bypass guides and actual news.",
      stat_subs: "Subscriptions", stat_stars: "Stars", stat_ratings: "Ratings",
      copy_btn: "⧉ Copy", check_btn: "🔄 Check", report_btn: " Report",
      checking: " Checking...", works: "✅ Works", fails: "🔴 Fails",
      copied: "✓ Copied", voted_like: " Thanks", voted_dislike: "👎 Noted"
    }
  };
  let currentLang = localStorage.getItem('lang') || 'ru';

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[currentLang][key]) {
        if (key === 'hero_title') {
          el.innerHTML = translations[currentLang]['hero_title'] + '<span class="highlight">' + translations[currentLang]['hero_highlight'] + '</span>';
        } else {
          el.innerHTML = translations[currentLang][key];
        }
      }
    });
    document.getElementById('langToggle').textContent = currentLang === 'ru' ? 'EN' : 'RU';
    // Обновляем кнопки в карточках
    document.querySelectorAll('.copy-btn').forEach(b => b.textContent = translations[currentLang].copy_btn);
    document.querySelectorAll('.check-btn').forEach(b => b.textContent = translations[currentLang].check_btn);
    document.querySelectorAll('.report-btn').forEach(b => b.textContent = translations[currentLang].report_btn);
  }

  document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    applyTranslations();
  });

  // === ПРЕЛОАДЕР ===
  (function(){
    const el = document.getElementById("preloader");
    if (!el) return;
    let hidden = false, startedAt = Date.now(), MIN_VISIBLE = 1000; // Минимум 1 сек
    function hide(){
      if (hidden) return; hidden = true;
      const wait = Math.max(0, MIN_VISIBLE - (Date.now() - startedAt));
      setTimeout(() => {
        el.classList.add("hidden");
        setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
      }, wait);
    }
    window.addEventListener("load", hide);
    setTimeout(hide, 2000);
  })();

  // === ТЕМА ===
  const themeBtn = document.querySelector('.theme-toggle');
  function initTheme() {
    if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-theme');
    if (themeBtn) themeBtn.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
  }
  initTheme();
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
      themeBtn.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
  }

  // === ПАСХАЛКИ ===
  let logoClicks = 0;
  document.getElementById('mainLogo').addEventListener('click', () => {
    logoClicks++;
    if (logoClicks >= 5) {
      logoClicks = 0;
      showToast(currentLang === 'ru' ? '🚀 Свобода активирована!' : '🚀 Freedom activated!');
      document.body.style.filter = "hue-rotate(90deg)";
      setTimeout(() => { document.body.style.filter = "none"; }, 2000);
    }
  });

  // === УТИЛИТЫ ===
  function sanitizeHTML(str) { const t = document.createElement('div'); t.textContent = str; return t.innerHTML; }
  function debounce(func, wait) { let timeout; return function() { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, arguments), wait); }; }
  
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("visible"), 4000);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      try {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.focus(); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta); resolve();
      } catch(e) { reject(e); }
    });
  }

  // === ГЛОБАЛЬНЫЕ ОЦЕНКИ ===
  let globalRatings = {};
  let userVotes = JSON.parse(localStorage.getItem('userVotes') || '{}');

  async function fetchRating(id, type) {
    try {
      const res = await fetch(`https://api.counterapi.dev/v1/stintikvpn/${id}-${type}/get`);
      const data = await res.json();
      return data.count || 0;
    } catch(e) { return 0; }
  }

  async function incrementRating(id, type) {
    // Проверка: голосовал ли уже
    const voteKey = `${id}-${type}`;
    if (userVotes[voteKey]) {
      showToast(currentLang === 'ru' ? 'Вы уже голосовали' : 'Already voted');
      return;
    }

    try {
      await fetch(`https://api.counterapi.dev/v1/stintikvpn/${id}-${type}/up`);
      if (!globalRatings[id]) globalRatings[id] = { likes: 0, dislikes: 0 };
      globalRatings[id][type]++;
      userVotes[voteKey] = true;
      localStorage.setItem('userVotes', JSON.stringify(userVotes));
      
      updateRatingDisplay(id);
      updateTotalRatings();
      showToast(type === 'like' ? (currentLang === 'ru' ? 'Спасибо за оценку!' : 'Thanks!') : (currentLang === 'ru' ? 'Принято' : 'Noted'));
    } catch(e) { showToast("Ошибка сети"); }
  }

  function updateRatingDisplay(id) {
    const card = document.getElementById("card-" + id);
    if (!card || !globalRatings[id]) return;
    
    const likeBtn = card.querySelector(".like-btn");
    const dislikeBtn = card.querySelector(".dislike-btn");
    
    likeBtn.innerHTML = `👍 <span class="rating-likes">${globalRatings[id].likes}</span>`;
    dislikeBtn.innerHTML = `👎 <span class="rating-dislikes">${globalRatings[id].dislikes}</span>`;

    // Визуализация голоса
    if (userVotes[`${id}-like`]) {
      likeBtn.classList.add('voted');
      likeBtn.style.background = 'rgba(16, 185, 129, 0.2)';
      likeBtn.style.borderColor = 'var(--success)';
      likeBtn.style.color = 'var(--success)';
    }
    if (userVotes[`${id}-dislike`]) {
      dislikeBtn.classList.add('voted');
      dislikeBtn.style.background = 'rgba(239, 68, 68, 0.2)';
      dislikeBtn.style.borderColor = 'var(--error)';
      dislikeBtn.style.color = 'var(--error)';
    }
  }

  function updateTotalRatings() {
    let total = 0;
    for (let id in globalRatings) total += (globalRatings[id].likes || 0) + (globalRatings[id].dislikes || 0);
    const el = document.getElementById('statRatings');
    if (el) el.textContent = total;
  }

  async function loadAllRatings() {
    for (let sub of subscriptions) {
      globalRatings[sub.id] = { 
        likes: await fetchRating(sub.id, "like"), 
        dislikes: await fetchRating(sub.id, "dislike") 
      };
    }
    updateTotalRatings();
  }

  // === ДАННЫЕ ПОДПИСОК ===
  const subscriptions = [
    { id:"black-main", cat:"black", name:"🏴 Чёрный список (основной)", desc:"Для обычного интернета (домашний Wi-Fi, кабель, 4G).", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt" },
    { id:"black-backup", cat:"black", name:" Чёрный список (запасной)", desc:"Альтернативный источник чёрных списков.", url:"https://vpn.akres.fun/all" },
    { id:"black-mobile", cat:"black", name:"👑 Black Mobile", desc:"20 ЛУЧШИХ серверов, специально оптимизированных для телефонов.", url:"https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt" },
    { id:"white-main", cat:"white", name:"🏳️ Белые списки (Основные)", desc:"Для жёстких блокировок (мобильный интернет с белыми списками РКН).", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt" },
    { id:"white-cidr", cat:"white", name:"🌐 Белые списки (CIDR)", desc:"Фильтрует трафик по IP-диапазонам. Используйте, если не работает SNI.", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt" },
    { id:"white-sni", cat:"white", name:"🔍 Белые списки (SNI)", desc:"Фильтрует трафик по именам сайтов. Используйте, если не работает CIDR.", url:"https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt" },
    { id:"proto-vless", cat:"protocol", name:"⚡ VLESS", desc:"Лучший по скорости и маскировке, но РКН активно блокирует.", url:"https://mifa.world/vless" },
    { id:"proto-vmess", cat:"protocol", name:"🔒 VMess", desc:"Самый надёжный протокол из всех.", url:"https://mifa.world/vmess" },
    { id:"proto-trojan", cat:"protocol", name:"🛡️ Trojan", desc:"Хорошая маскировка под обычный HTTPS трафик.", url:"https://mifa.world/trojan" },
    { id:"proto-ss", cat:"protocol", name:"🚀 Shadowsocks", desc:"Максимальная скорость. Рекомендуется для онлайн-игр.", url:"https://mifa.world/ss" }
  ];

  // === ПРОВЕРКА СТАТУСА ===
  async function checkStatus(subId, url, btnElement) {
    const card = document.getElementById("card-" + subId);
    if (!card) return;
    const badge = card.querySelector('.status-badge');
    
    // UI обновление
    btnElement.disabled = true;
    btnElement.textContent = translations[currentLang].checking;
    badge.className = 'status-badge checking';
    badge.textContent = translations[currentLang].checking;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache', signal: controller.signal });
      clearTimeout(timeoutId);
      
      badge.textContent = translations[currentLang].works;
      badge.className = 'status-badge works';
      btnElement.textContent = "✓ OK";
    } catch(e) {
      badge.textContent = translations[currentLang].fails;
      badge.className = 'status-badge fails';
      btnElement.textContent = " Ошибка";
    }
    setTimeout(() => { btnElement.disabled = false; btnElement.textContent = translations[currentLang].check_btn; }, 3000);
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

    subscriptions.forEach(sub => {
      if (filter !== "all" && sub.cat !== filter) return;
      if (query && sub.name.toLowerCase().indexOf(query) === -1 && sub.desc.toLowerCase().indexOf(query) === -1) return;

      hasResults = true;
      const card = document.createElement("div");
      card.className = "sub-card appear";
      card.id = "card-" + sub.id;
      const rating = globalRatings[sub.id] || { likes: 0, dislikes: 0 };
      const reportUrl = `https://t.me/Keb04w?text=${encodeURIComponent("Не работает: " + sub.name)}`;

      card.innerHTML = `
        <h3>${sanitizeHTML(sub.name)}</h3>
        <div class="status-badge">${translations[currentLang].checking}</div>
        <p>${sanitizeHTML(sub.desc)}</p>
        <code>${sanitizeHTML(sub.url)}</code>
        <div class="sub-actions-row">
          <button class="btn btn-primary copy-btn" data-url="${sub.url}">${translations[currentLang].copy_btn}</button>
          <button class="btn btn-ghost btn-check check-btn">${translations[currentLang].check_btn}</button>
          <a href="${reportUrl}" target="_blank" class="btn btn-ghost btn-report report-btn">${translations[currentLang].report_btn}</a>
        </div>
        <div class="rating-row">
          <button class="rating-btn like-btn" data-id="${sub.id}" data-type="like"> <span class="rating-likes">${rating.likes}</span></button>
          <button class="rating-btn dislike-btn" data-id="${sub.id}" data-type="dislike">👎 <span class="rating-dislikes">${rating.dislikes}</span></button>
        </div>
      `;

      // Копирование
      card.querySelector(".copy-btn").addEventListener("click", function() {
        copyText(sub.url).then(() => {
          const originalText = this.textContent;
          this.textContent = translations[currentLang].copied;
          showToast(currentLang === 'ru' ? 'Ссылка скопирована!' : 'Link copied!');
          setTimeout(() => { this.textContent = originalText; }, 2000);
        });
      });

      // Проверка
      card.querySelector(".check-btn").addEventListener("click", function() {
        checkStatus(sub.id, sub.url, this);
      });

      // Лайки
      card.querySelector(".like-btn").addEventListener("click", function() {
        incrementRating(sub.id, "like");
      });
      card.querySelector(".dislike-btn").addEventListener("click", function() {
        incrementRating(sub.id, "dislike");
      });

      subGrid.appendChild(card);
      // Авто-проверка при загрузке (с задержкой чтобы не спамить)
      setTimeout(() => {
        const checkBtn = card.querySelector(".check-btn");
        checkStatus(sub.id, sub.url, checkBtn);
      }, Math.random() * 2000 + 500);
    });

    if (!hasResults) {
      subGrid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:40px;">${currentLang === 'ru' ? 'Ничего не найдено.' : 'Nothing found.'}</p>`;
    }
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
    { device:"Android TV", match:[], apps:[{name:"NekoBox (TV)", url:"https://github.com/MatsuriDayo/NekoBoxForAndroid/releases"}] },
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
      const appsHtml = g.apps.map(a => `<a href="${a.url}" target="_blank" rel="noopener">${a.name}</a>`).join("");
      card.innerHTML = (recommended ? '<span class="rec-badge">🏆 Ваш выбор</span>' : '') + `<h3>${g.device}</h3><div class="client-apps">${appsHtml}</div>`;
      clientGrid.appendChild(card);
    });
  }

  // === FAQ ===
  const faqData = [
    { q: {ru: "Подписка не работает.", en: "Subscription doesn't work."}, a: {ru: "Обновите подписку в клиенте. Попробуйте сменить протокол.", en: "Update subscription in client. Try changing protocol."} },
    { q: {ru: "Как часто обновляются конфиги?", en: "How often are configs updated?"}, a: {ru: "Ежедневно создателями.", en: "Daily by creators."} },
    { q: {ru: "Какой клиент лучше?", en: "Which client is best?"}, a: {ru: "Hiddify для Windows/Android. Streisand для iOS.", en: "Hiddify for Windows/Android. Streisand for iOS."} }
  ];
  const faqList = document.getElementById("faqList");
  if (faqList) {
    faqData.forEach((item, i) => {
      const d = document.createElement("details");
      d.className = "faq-item";
      if (i === 0) d.open = true;
      d.innerHTML = `<summary class="faq-q" data-ru="${item.q.ru}" data-en="${item.q.en}">${item.q[currentLang]}</summary><p class="faq-a" data-ru="${item.a.ru}" data-en="${item.a.en}">${item.a[currentLang]}</p>`;
      faqList.appendChild(d);
    });
  }

  // Обновление FAQ при смене языка
  const origApply = applyTranslations;
  applyTranslations = function() {
    origApply();
    document.querySelectorAll('.faq-q').forEach(el => el.textContent = el.getAttribute(`data-${currentLang}`));
    document.querySelectorAll('.faq-a').forEach(el => el.textContent = el.getAttribute(`data-${currentLang}`));
    renderSubs(currentFilter);
  };

  // === ЗВЁЗДЫ GITHUB ===
  let currentStars = null;
  function animateNumber(el, from, to) {
    let start = null, duration = 700;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      el.textContent = Math.round(from + (to - from) * progress);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function refreshStars() {
    const starsEl = document.getElementById("statStars");
    if (!starsEl) return;
    fetch("https://api.github.com/repos/Stintik-123/StintikVPN", { headers: { 'Accept': 'application/vnd.github.v3+json' } })
      .then(r => r.json())
      .then(data => {
        if (data && typeof data.stargazers_count === "number") {
          animateNumber(starsEl, currentStars === null ? data.stargazers_count : currentStars, data.stargazers_count);
          currentStars = data.stargazers_count;
        }
      }).catch(() => { if (currentStars === null) starsEl.textContent = "—"; });
  }
  refreshStars();
  setInterval(refreshStars, 120000);

  // === UI ===
  const backBtn = document.getElementById("backToTop");
  if (backBtn) {
    window.addEventListener("scroll", () => backBtn.classList.toggle("visible", window.scrollY > 600));
    backBtn.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
  }

  // Мобильное меню
  (function(){
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    const btn = document.createElement('button');
    btn.className = 'nav-icon hamburger';
    btn.innerHTML = '☰';
    btn.addEventListener('click', () => navLinks.classList.toggle('open'));
    const navRight = document.querySelector('.nav-right');
    if (navRight) navRight.prepend(btn);
  })();

  // Анимация появления
  const appearObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        appearObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.sub-card, .client-card').forEach(el => appearObserver.observe(el));

  // === ЗАПУСК ===
  async function init() {
    try {
      await loadAllRatings();
      hideSkeleton();
      document.getElementById('statSubs').textContent = subscriptions.length;
    } catch(e) {
      console.error('Init error:', e);
      hideSkeleton();
    }
  }
  init();
})();

(function(){
  "use strict";

  // === ПЕРЕВОДЫ (RU / EN) ===
  const translations = {
    ru: {
      title: "StintikVPN — Интернет свобода ближе, чем кажется",
      skip: "Перейти к основному содержимому",
      loading: "Загружаем StintikVPN...",
      nav_news: "Монитор", nav_subs: "Подписки", nav_clients: "Клиенты", nav_guides: "Гайды", nav_faq: "FAQ",
      hero_title: "Интернет свобода ",
      hero_highlight: "ближе, чем кажется",
      hero_desc: "Сборник лучших бесплатных VPN-подписок. Ничего настраивать не нужно: просто копируйте ссылку, вставляйте в клиент и пользуйтесь.",
      hero_btn1: "📦 Перейти к подпискам", hero_btn2: "⭐ Оригинальный GitHub",
      news_tag: "Актуально", news_title: "📡 Монитор Свободы", news_desc: "Последние крупные события в сфере цифровых ограничений.",
      news1_title: "Усиление замедления видеохостингов", news1_desc: "Провайдеры внедряют новое оборудование ТСПУ, что приводит к нестабильной работе стриминговых сервисов.",
      news2_title: "Белые списки у мобильных операторов", news2_desc: "Ряд крупных операторов связи начал тестировать фильтрацию трафика по SNI и CIDR.",
      news3_title: "Блокировка протоколов обхода DPI", news3_desc: "Зафиксированы случаи точечного блокирования IP-адресов, связанных с инструментами обхода.",
      stat_subs: "Подписок", stat_stars: "Звёзд на GitHub", stat_ratings: "Оценок",
      subs_tag: "Каталог", subs_title: "📦 VPN подписки", subs_desc: "Нажмите на кнопку, чтобы скопировать ссылку.",
      search_ph: "🔍 Поиск подписки...", tab_all: "Все", tab_black: "🏴 Чёрные списки", tab_white: "🏳️ Белые списки", tab_proto: "🛠️ По протоколам",
      copy_all: "⧉ Скопировать все видимые", copy_btn: "⧉ Копировать",
      works: "✅ Работает", fails: "🔴 Не работает", checking: "⏳ Проверка...",
      clients_tag: "Приложения", clients_title: "📱 Рекомендуемые клиенты", clients_desc: "Система автоматически подсветит подходящие.",
      guides_tag: "Инструкции", guides_title: "📖 Гайды по обходу DPI", guides_desc: "Если VPN не работает или нужно разблокировать только конкретные сайты.",
      zapret_sub: "Мощный обход DPI для Windows и Linux",
      zapret_desc: "<b>Что это:</b> Обходит DPI на уровне системы. Не шифрует весь трафик, а подменяет пакеты, обеспечивая максимальную скорость.",
      steps_title: "📝 Пошаговая инструкция:",
      zapret_1: "Скачайте сборку с GitHub (Flowseal) или оригинального репозитория.",
      zapret_2: "Распакуйте архив (в пути не должно быть кириллицы).",
      zapret_3: "Запустите install_service.bat или general.bat от имени Администратора.",
      zapret_4: "В консоли выберите стратегию (попробуйте 1 или 3).",
      zapret_5: "<b>Важно:</b> Не закрывайте окно консоли. Для проверки откройте YouTube.",
      byedpi_sub: "Лёгкий обход блокировок (включая Android)",
      byedpi_desc: "<b>Что это:</b> Простая альтернатива Zapret. Работает на Windows, Linux и Android без root.",
      byedpi_1: "<b>Windows/Linux:</b> Скачайте с GitHub. Запустите файл. Создаст SOCKS5 на 127.0.0.1:1080.",
      byedpi_2: "Пропишите этот прокси в настройках браузера.",
      byedpi_3: "<b>Android:</b> Установите ByeDPI Android. Нажмите Start.",
      tg_sub: "Специализированный прокси только для Telegram",
      tg_desc: "<b>Что это:</b> Позволяет подключаться к Telegram через WebSocket, обходя блокировки провайдера.",
      tg_1: "Скачайте сборку для вашей ОС с GitHub.",
      tg_2: "Запустите программу. Она сгенерирует ссылку для подключения.",
      tg_3: "Нажмите на ссылку, чтобы добавить прокси в Telegram.",
      tg_4: "Программа свернётся в трей (ПК) или будет работать в фоне (Android).",
      check_tag: "Проверка", check_title: "🔍 Проверьте, что VPN работает",
      check1_title: "🌍 Изменился ли IP", check1_desc: "Убедитесь, что реальный IP скрыт.",
      check2_title: "🔒 Нет ли утечки DNS", check2_desc: "Проверьте, не видит ли провайдер запросы.",
      check3_title: "⚡ Не упала ли скорость", check3_desc: "Измерьте реальную скорость соединения.",
      check_btn: "Проверить →",
      faq_tag: "Помощь", faq_title: "❓ Часто задаваемые вопросы",
      warn_title: "⚠️ Важное предупреждение", warn_desc: "Все конфиги из открытых источников. Работоспособность не гарантируется на 100%. Запрещено использовать в противоправных целях.",
      thanks_tag: "Команда", thanks_title: "Спасибо, что делаете проект лучше",
      role_creator: "Создатель", role_helper: "Помощник"
    },
    en: {
      title: "StintikVPN — Internet freedom is closer than it seems",
      skip: "Skip to main content",
      loading: "Loading StintikVPN...",
      nav_news: "Monitor", nav_subs: "Subscriptions", nav_clients: "Clients", nav_guides: "Guides", nav_faq: "FAQ",
      hero_title: "Internet freedom is ",
      hero_highlight: "closer than it seems",
      hero_desc: "A collection of the best free VPN subscriptions. No setup required: just copy the link, paste it into your client and enjoy.",
      hero_btn1: "📦 Go to Subscriptions", hero_btn2: "⭐ Original GitHub",
      news_tag: "Actual", news_title: "📡 Freedom Monitor", news_desc: "Latest major events in digital restrictions.",
      news1_title: "Increased throttling of video hosting", news1_desc: "ISPs are deploying new TSPU equipment, causing unstable streaming service performance.",
      news2_title: "Whitelists by mobile operators", news2_desc: "Several major mobile operators have started testing SNI and CIDR traffic filtering.",
      news3_title: "Blocking of DPI bypass protocols", news3_desc: "Cases of targeted blocking of IP addresses associated with bypass tools have been recorded.",
      stat_subs: "Subscriptions", stat_stars: "GitHub Stars", stat_ratings: "Ratings",
      subs_tag: "Catalog", subs_title: "📦 VPN Subscriptions", subs_desc: "Click the button to copy the link.",
      search_ph: "🔍 Search subscription...", tab_all: "All", tab_black: "🏴 Blacklists", tab_white: "🏳️ Whitelists", tab_proto: "🛠️ By Protocol",
      copy_all: "⧉ Copy all visible", copy_btn: "⧉ Copy",
      works: "✅ Works", fails: "🔴 Fails", checking: "⏳ Checking...",
      clients_tag: "Apps", clients_title: "📱 Recommended Clients", clients_desc: "The system will automatically highlight suitable ones.",
      guides_tag: "Guides", guides_title: "📖 DPI Bypass Guides", guides_desc: "If VPN doesn't work or you only need to unblock specific sites.",
      zapret_sub: "Powerful DPI bypass for Windows and Linux",
      zapret_desc: "<b>What it is:</b> Bypasses DPI at the system level. It doesn't encrypt all traffic, but replaces packets, ensuring maximum speed.",
      steps_title: "📝 Step-by-step guide:",
      zapret_1: "Download the build from GitHub (Flowseal) or the original repository.",
      zapret_2: "Extract the archive (path should not contain Cyrillic).",
      zapret_3: "Run install_service.bat or general.bat as Administrator.",
      zapret_4: "In the console, choose a strategy (try 1 or 3).",
      zapret_5: "<b>Important:</b> Do not close the console window. Open YouTube to test.",
      byedpi_sub: "Lightweight bypass (including Android)",
      byedpi_desc: "<b>What it is:</b> A simple alternative to Zapret. Works on Windows, Linux, and Android without root.",
      byedpi_1: "<b>Windows/Linux:</b> Download from GitHub. Run the file. It will create a SOCKS5 proxy at 127.0.0.1:1080.",
      byedpi_2: "Configure this proxy in your browser settings.",
      byedpi_3: "<b>Android:</b> Install ByeDPI Android. Press Start.",
      tg_sub: "Specialized proxy for Telegram only",
      tg_desc: "<b>What it is:</b> Allows connecting to Telegram via WebSocket, bypassing ISP blocks when MTProto fails.",
      tg_1: "Download the build for your OS from GitHub.",
      tg_2: "Run the program. It will generate a connection link.",
      tg_3: "Click the link to add the proxy to Telegram.",
      tg_4: "The program will minimize to tray (PC) or run in background (Android).",
      check_tag: "Check", check_title: "🔍 Verify VPN is working",
      check1_title: "🌍 Did IP change", check1_desc: "Ensure your real IP is hidden.",
      check2_title: "🔒 Any DNS leaks", check2_desc: "Check if your ISP can still see your requests.",
      check3_title: "⚡ Did speed drop", check3_desc: "Measure your actual connection speed.",
      check_btn: "Check →",
      faq_tag: "Help", faq_title: "❓ Frequently Asked Questions",
      warn_title: "⚠️ Important Warning", warn_desc: "All configs are from open sources. 100% functionality is not guaranteed. Illegal use is prohibited.",
      thanks_tag: "Team", thanks_title: "Thank you for making the project better",
      role_creator: "Creator", role_helper: "Helper"
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
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[currentLang][key]) el.placeholder = translations[currentLang][key];
    });
    document.getElementById('langToggle').textContent = currentLang === 'ru' ? 'EN' : 'RU';
  }

  document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    applyTranslations();
  });

  // === ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ ===
  if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
  document.getElementById('a11yToggle').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
  });

  // === ПРЕЛОАДЕР ===
  (function(){
    const el = document.getElementById("preloader");
    if (!el) return;
    let hidden = false, startedAt = Date.now(), MIN_VISIBLE = 500;
    function hide(){
      if (hidden) return; hidden = true;
      const wait = Math.max(0, MIN_VISIBLE - (Date.now() - startedAt));
      setTimeout(() => {
        el.classList.add("hidden");
        setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
      }, wait);
    }
    window.addEventListener("load", hide);
    setTimeout(hide, 1500);
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
      showToast(currentLang === 'ru' ? '🚀 Свобода активирована! Наслаждайтесь интернетом.' : '🚀 Freedom activated! Enjoy the internet.');
      document.body.style.filter = "hue-rotate(90deg)";
      setTimeout(() => { document.body.style.filter = "none"; }, 2000);
    }
  });

  // Код Конами: ↑ ↑ ↓ ↓ ← → ← → b a
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        showToast(currentLang === 'ru' ? '🎮 Чит-код активирован! Вы настоящий хакер.' : '🎮 Cheat code activated! You are a real hacker.');
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
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

  // === ГЛОБАЛЬНЫЕ ОЦЕНКИ (CounterAPI) ===
  let globalRatings = {};
  async function fetchRating(id, type) {
    try {
      const res = await fetch(`https://api.counterapi.dev/v1/stintikvpn/${id}-${type}/get`);
      const data = await res.json();
      return data.count || 0;
    } catch(e) { return 0; }
  }
  async function incrementRating(id, type) {
    try {
      await fetch(`https://api.counterapi.dev/v1/stintikvpn/${id}-${type}/up`);
      if (!globalRatings[id]) globalRatings[id] = { likes: 0, dislikes: 0 };
      globalRatings[id][type]++;
      updateRatingDisplay(id);
      updateTotalRatings();
    } catch(e) { showToast("Ошибка сети / Network error"); }
  }
  function updateRatingDisplay(id) {
    const card = document.getElementById("card-" + id);
    if (!card || !globalRatings[id]) return;
    card.querySelector(".rating-likes").textContent = globalRatings[id].likes;
    card.querySelector(".rating-dislikes").textContent = globalRatings[id].dislikes;
  }
  function updateTotalRatings() {
    let total = 0;
    for (let id in globalRatings) total += (globalRatings[id].likes || 0) + (globalRatings[id].dislikes || 0);
    const el = document.getElementById('statRatings');
    if (el) el.textContent = total;
  }
  async function loadAllRatings() {
    for (let sub of subscriptions) {
      globalRatings[sub.id] = { likes: await fetchRating(sub.id, "like"), dislikes: await fetchRating(sub.id, "dislike") };
    }
    updateTotalRatings();
  }

  // === ДАННЫЕ ПОДПИСОК ===
  const subscriptions = [
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

  // === ПРОВЕРКА СТАТУСА (Работает / Не работает) ===
  async function checkStatus(subId, url) {
    const card = document.getElementById("card-" + subId);
    if (!card) return;
    const badge = card.querySelector('.status-badge');
    if (!badge) return;
    
    badge.textContent = translations[currentLang].checking;
    badge.className = 'status-badge';
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      await fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache', signal: controller.signal });
      clearTimeout(timeoutId);
      badge.textContent = translations[currentLang].works;
      badge.classList.add('works');
    } catch(e) {
      badge.textContent = translations[currentLang].fails;
      badge.classList.add('fails');
    }
  }

  // === РЕНДЕРИНГ ПОДПИСОК ===
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

      card.innerHTML = `
        <h3>${sanitizeHTML(sub.name)}</h3>
        <div class="status-badge">${translations[currentLang].checking}</div>
        <p>${sanitizeHTML(sub.desc)}</p>
        <code>${sanitizeHTML(sub.url)}</code>
        <div class="sub-actions-row">
          <button class="btn btn-primary copy-btn" data-url="${sub.url}">${translations[currentLang].copy_btn}</button>
        </div>
        <div class="rating-row">
          <button class="rating-btn like-btn" data-id="${sub.id}" data-type="like">👍 <span class="rating-likes">${rating.likes}</span></button>
          <button class="rating-btn dislike-btn" data-id="${sub.id}" data-type="dislike">👎 <span class="rating-dislikes">${rating.dislikes}</span></button>
        </div>
      `;

      card.querySelector(".copy-btn").addEventListener("click", function() {
        copyText(sub.url).then(() => {
          this.textContent = "✓ OK";
          showToast(currentLang === 'ru' ? 'Ссылка скопирована! Вставьте в клиент.' : 'Link copied! Paste into client.');
          setTimeout(() => { this.textContent = translations[currentLang].copy_btn; }, 2000);
        });
      });

      card.querySelector(".like-btn").addEventListener("click", function() {
        this.classList.add("active");
        incrementRating(sub.id, "like");
      });
      card.querySelector(".dislike-btn").addEventListener("click", function() {
        this.classList.add("active");
        incrementRating(sub.id, "dislike");
      });

      subGrid.appendChild(card);
      setTimeout(() => checkStatus(sub.id, sub.url), Math.random() * 2000 + 500);
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

  document.getElementById("copyAllBtn").addEventListener("click", function() {
    const active = document.querySelector(".tab.active[data-filter]");
    const filter = active ? active.getAttribute("data-filter") : "all";
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const visible = subscriptions.filter(s => {
      if (filter !== "all" && s.cat !== filter) return false;
      if (query && s.name.toLowerCase().indexOf(query) === -1 && s.desc.toLowerCase().indexOf(query) === -1) return false;
      return true;
    });
    copyText(visible.map(s => s.name + ": " + s.url).join("\n")).then(() => {
      this.textContent = "✓ OK";
      setTimeout(() => { this.textContent = translations[currentLang].copy_all; }, 2000);
    });
  });

  // === КЛИЕНТЫ С ПОДБОРОМ ПО ОС ===
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
      card.innerHTML = (recommended ? '<span class="rec-badge">🏆 ' + (currentLang === 'ru' ? 'Ваш выбор' : 'Your choice') + '</span>' : '') + `<h3>${g.device}</h3><div class="client-apps">${appsHtml}</div>`;
      clientGrid.appendChild(card);
    });
  }

  // === FAQ ===
  const faqData = [
    { q: {ru: "Подписка не работает или очень медленно.", en: "Subscription doesn't work or is very slow."}, a: {ru: "Обновите подписку в клиенте. Попробуйте сменить протокол или сервер.", en: "Update the subscription in the client. Try changing the protocol or server."} },
    { q: {ru: "Как часто обновляются конфиги?", en: "How often are configs updated?"}, a: {ru: "Конфигурации обновляются ежедневно их создателями.", en: "Configurations are updated daily by their creators."} },
    { q: {ru: "Какой клиент лучше для новичка?", en: "Which client is best for beginners?"}, a: {ru: "Hiddify — самый удобный для Windows и Android. На iOS — Streisand.", en: "Hiddify is the most convenient for Windows and Android. On iOS — Streisand."} }
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

  // Обновляем тексты FAQ при смене языка
  const origApply = applyTranslations;
  applyTranslations = function() {
    origApply();
    document.querySelectorAll('.faq-q').forEach(el => el.textContent = el.getAttribute(`data-${currentLang}`));
    document.querySelectorAll('.faq-a').forEach(el => el.textContent = el.getAttribute(`data-${currentLang}`));
    // Перерендер карточек для обновления статусов
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

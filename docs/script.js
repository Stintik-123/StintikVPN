document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 800);

  // === ПЕРЕВОДЫ ===
  const translations = {
    ru: {
      nav_news: 'Новости', nav_subs: 'Подписки', nav_guides: 'Гайды', nav_faq: 'FAQ',
      hero_title: 'Интернет свобода <span class="gradient-text">ближе, чем кажется</span>',
      hero_desc: 'Рабочие VPN подписки, понятные гайды и актуальные новости.',
      hero_btn1: '📦 Перейти к подпискам',
      news_title: ' Монитор Свободы',
      news1_title: 'Усиление замедления YouTube', news1_desc: 'Провайдеры внедряют новое оборудование ТСПУ. Читайте подробности и способы обхода.',
      news2_title: 'Белые списки у операторов', news2_desc: 'МТС и Билайн тестируют фильтрацию трафика. Как это влияет на пользователей?',
      news3_title: 'Блокировка протоколов', news3_desc: 'РКН начал блокировать IP адреса популярных VPN сервисов. Разбор ситуации.',
      read_more: 'Читать статью →',
      stat_subs: 'Подписок', stat_stars: 'Звёзд на GitHub',
      subs_title: ' Рабочие VPN подписки',
      search_ph: '🔍 Поиск подписки...',
      tab_all: 'Все', tab_black: ' Чёрные списки', tab_white: '🏳️ Белые списки', tab_proto: '⚙️ Протоколы',
      copy_btn: '📋 Скопировать', check_btn: '🔄 Проверить', report_btn: '⚠ Пожаловаться',
      checking: '⏳ Проверка...', works: '✅ Работает', fails: '🔴 Не работает',
      clients_title: '📱 Куда вставить ссылку?',
      guides_title: '📖 Понятные гайды по обходу DPI',
      check_title: '🔍 Проверка подключения',
      faq_title: '❓ Частые вопросы',
      support_title: '🆘 Нужна помощь?',
      support_desc: 'Если что-то не работает или есть вопросы — напишите в нашу поддержку.',
      thanks_title: '👥 Спасибо, что делаете проект лучше',
      role_creator: 'Создатель', role_helper: 'Помощник',
      footer_text: 'Сделано людьми для людей.',
      modal_title: '✅ Ссылка скопирована!',
      modal_desc: 'Вставьте её в ваш VPN клиент через кнопку "Добавить подписку".',
      modal_subtext: ' Хотите получать новые рабочие конфиги первыми?'
    },
    en: {
      nav_news: 'News', nav_subs: 'Subscriptions', nav_guides: 'Guides', nav_faq: 'FAQ',
      hero_title: 'Internet freedom is <span class="gradient-text">closer than it seems</span>',
      hero_desc: 'Working VPN subscriptions, clear guides and actual news.',
      hero_btn1: '📦 Go to subscriptions',
      news_title: '📡 Freedom Monitor',
      news1_title: 'YouTube throttling increased', news1_desc: 'ISPs deploy new TSPU equipment. Read details and bypass methods.',
      news2_title: 'Whitelists by operators', news2_desc: 'MTS and Beeline test traffic filtering. How does it affect users?',
      news3_title: 'Protocol blocking', news3_desc: 'RKN started blocking IP addresses of popular VPN services. Analysis.',
      read_more: 'Read article →',
      stat_subs: 'Subscriptions', stat_stars: 'GitHub Stars',
      subs_title: '📦 Working VPN subscriptions',
      search_ph: '🔍 Search subscription...',
      tab_all: 'All', tab_black: '🏴 Blacklists', tab_white: '🏳️ Whitelists', tab_proto: '⚙️ Protocols',
      copy_btn: '📋 Copy', check_btn: '🔄 Check', report_btn: '⚠ Report',
      checking: '⏳ Checking...', works: '✅ Works', fails: '🔴 Fails',
      clients_title: '📱 Where to paste the link?',
      guides_title: ' Clear DPI bypass guides',
      check_title: '🔍 Connection check',
      faq_title: '❓ FAQ',
      support_title: '🆘 Need help?',
      support_desc: 'If something doesn\'t work or you have questions — write to our support.',
      thanks_title: '👥 Thank you for making the project better',
      role_creator: 'Creator', role_helper: 'Helper',
      footer_text: 'Made by people for people.',
      modal_title: '✅ Link copied!',
      modal_desc: 'Paste it into your VPN client via "Add subscription" button.',
      modal_subtext: '🔔 Want to get new working configs first?'
    }
  };

  let currentLang = localStorage.getItem('lang') || 'ru';

  function applyTranslations() {
    const t = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) el.innerHTML = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) el.placeholder = t[key];
    });
    document.getElementById('langBtn').textContent = currentLang === 'ru' ? 'RU' : 'EN';
    renderSubs(document.querySelector('.tab-btn.active').dataset.filter, document.getElementById('searchInput').value);
  }

  // === ДАННЫЕ ===
  const subs = [
    { id: 'b1', cat: 'black', name: '🏴 Чёрный список (Основной)', desc: 'Для домашнего Wi-Fi и кабеля. Блокирует только запрещённые сайты.', url: 'https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt' },
    { id: 'b2', cat: 'black', name: '🏴 Чёрный список (Запасной)', desc: 'Альтернативный источник, если основной не работает.', url: 'https://vpn.akres.fun/all' },
    { id: 'b3', cat: 'black', name: '👑 Black Mobile', desc: '20 лучших серверов, оптимизированных специально для телефонов.', url: 'https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt' },
    { id: 'w1', cat: 'white', name: '🏳️ Белые списки (Основные)', desc: 'Для мобильных операторов с жёсткими блокировками (МТС, Билайн).', url: 'https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt' },
    { id: 'w2', cat: 'white', name: '🌐 Белые списки (CIDR)', desc: 'Фильтрация по IP-диапазонам. Используйте, если не работает SNI.', url: 'https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt' },
    { id: 'w3', cat: 'white', name: '🔍 Белые списки (SNI)', desc: 'Фильтрация по именам сайтов. Используйте, если не работает CIDR.', url: 'https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt' },
    { id: 'p1', cat: 'protocol', name: '⚡ VLESS + Reality', desc: 'Максимальная скорость. РКН активно пытается блокировать.', url: 'https://mifa.world/vless' },
    { id: 'p2', cat: 'protocol', name: '🔒 VMess', desc: 'Самый надёжный и стабильный протокол из всех.', url: 'https://mifa.world/vmess' },
    { id: 'p3', cat: 'protocol', name: '🛡️ Trojan', desc: 'Отличная маскировка под обычный HTTPS трафик.', url: 'https://mifa.world/trojan' },
    { id: 'p4', cat: 'protocol', name: '🚀 Shadowsocks', desc: 'Минимальный пинг. Идеально подходит для онлайн-игр.', url: 'https://mifa.world/ss' }
  ];

  const clients = [
    { os: 'Windows', apps: [{n:'Hiddify', u:'https://github.com/hiddify/hiddify-next/releases'}, {n:'v2rayN', u:'https://github.com/2dust/v2rayN/releases'}] },
    { os: 'Android', apps: [{n:'Incy', u:'https://play.google.com/store/apps/details?id=com.glarimy.incy'}, {n:'NekoBox', u:'https://github.com/MatsuriDayo/NekoBoxForAndroid/releases'}] },
    { os: 'iOS / iPadOS', apps: [{n:'Streisand', u:'https://apps.apple.com/app/streisand/id6450534064'}, {n:'V2Box', u:'https://apps.apple.com/app/v2box/id6443654552'}] },
    { os: 'macOS', apps: [{n:'Hiddify', u:'https://github.com/hiddify/hiddify-next/releases'}, {n:'Streisand', u:'https://apps.apple.com/app/streisand/id6450534064'}] },
    { os: 'Linux', apps: [{n:'Hiddify', u:'https://github.com/hiddify/hiddify-next/releases'}, {n:'NekoRay', u:'https://github.com/MatsuriDayo/nekoray/releases'}] }
  ];

  const guides = [
    { icon: '🛡️', title: 'Zapret', sub: 'Для Windows и Linux', desc: 'Мощный инструмент, который обходит блокировки на уровне системы. Он не шифрует весь трафик, а только подменяет пакеты, поэтому скорость остаётся максимальной.', steps: ['Скачайте свежую сборку с GitHub (Flowseal).', 'Распакуйте архив в папку без кириллицы в пути.', 'Запустите install_service.bat от имени Администратора.', 'В чёрном окне выберите стратегию 1 или 3.', 'Не закрывайте окно, пока пользуетесь интернетом.'] },
    { icon: '⚡', title: 'ByeDPI', sub: 'Лёгкий и быстрый', desc: 'Простая альтернатива Zapret. Работает без установки и отлично подходит для Android без root-прав.', steps: ['Скачайте файл с GitHub и запустите его.', 'Программа создаст локальный прокси 127.0.0.1:1080.', 'Пропишите этот прокси в настройках браузера.', 'На Android: установите APK и нажмите большую кнопку Start.'] },
    { icon: '✈️', title: 'tgwsproxy', sub: 'Только для Telegram', desc: 'Специальный инструмент для подключения Telegram через WebSocket, когда обычные прокси не работают.', steps: ['Скачайте сборку для вашей ОС с GitHub.', 'Запустите программу — она создаст ссылку.', 'Нажмите на ссылку, чтобы добавить прокси в Telegram.', 'Программа будет работать в фоне или трее.'] }
  ];

  const faqs = [
    { q: 'Как пользоваться подписками?', a: 'Скопируйте ссылку из каталога, откройте ваш VPN клиент (например, Hiddify), нажмите "Добавить подписку" и вставьте ссылку. Затем нажмите "Обновить" и подключитесь к серверу.' },
    { q: 'Что делать, если ничего не работает?', a: 'Попробуйте сменить протокол (например, с VLESS на Trojan) или обновите подписку в клиенте. Если не помогло — напишите в поддержку.' },
    { q: 'В чём разница между чёрными и белыми списками?', a: 'Чёрные списки блокируют только запрещённые сайты (подходят для домашнего интернета). Белые списки пропускают только разрешённые сайты (нужны для мобильных операторов с жёсткими блокировками).' },
    { q: 'Какой клиент лучше для новичка?', a: 'Hiddify — самый простой и понятный для Windows и Android. Для iOS (iPhone/iPad) лучше всего подходит Streisand.' },
    { q: 'Безопасно ли использовать эти конфиги?', a: 'Конфиги собраны из открытых источников. Мы не рекомендуем передавать через них банковские данные. Используйте на свой страх и риск.' },
    { q: 'Как часто обновляются списки?', a: 'Создатели конфигов обновляют их ежедневно. Ссылки на сайте всегда ведут на самые свежие версии.' }
  ];

  // === РЕНДЕРИНГ ===
  const renderSubs = (filter = 'all', search = '') => {
    const grid = document.getElementById('subsGrid');
    grid.innerHTML = '';
    const q = search.toLowerCase();
    const t = translations[currentLang];
    subs.filter(s => (filter === 'all' || s.cat === filter) && (s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q))).forEach(s => {
      const card = document.createElement('div');
      card.className = 'card sub-card';
      card.innerHTML = `
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <code>${s.url}</code>
        <span class="status-indicator checking">${t.checking}</span>
        <div class="sub-actions">
          <button class="btn primary small copy-btn" data-url="${s.url}">${t.copy_btn}</button>
          <button class="btn ghost small check-btn" data-url="${s.url}">${t.check_btn}</button>
          <a href="https://t.me/Keb04w?text=${encodeURIComponent('Не работает: '+s.name+' ('+s.url+')')}" target="_blank" class="btn ghost small report-btn">${t.report_btn}</a>
        </div>`;
      grid.appendChild(card);
    });

    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const url = e.target.dataset.url;
        navigator.clipboard.writeText(url).then(() => {
          document.getElementById('copyModal').classList.add('active');
        });
      });
    });

    document.querySelectorAll('.check-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const url = e.target.dataset.url;
        const indicator = e.target.closest('.sub-card').querySelector('.status-indicator');
        indicator.textContent = t.checking;
        indicator.className = 'status-indicator checking';
        fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache' })
          .then(() => { indicator.textContent = t.works; indicator.className = 'status-indicator works'; })
          .catch(() => { indicator.textContent = t.fails; indicator.className = 'status-indicator fails'; });
      });
    });

    // Автопроверка
    document.querySelectorAll('.sub-card').forEach((card, i) => {
      setTimeout(() => {
        const url = card.querySelector('.check-btn').dataset.url;
        const indicator = card.querySelector('.status-indicator');
        fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-cache' })
          .then(() => { indicator.textContent = t.works; indicator.className = 'status-indicator works'; })
          .catch(() => { indicator.textContent = t.fails; indicator.className = 'status-indicator fails'; });
      }, 500 + i * 300);
    });
  };

  const renderClients = () => {
    const grid = document.getElementById('clientsGrid');
    const ua = navigator.userAgent;
    const isWin = /win/i.test(ua), isAndroid = /android/i.test(ua), isIOS = /iphone|ipad/i.test(ua), isMac = /mac/i.test(ua);
    clients.forEach(c => {
      const isRec = (c.os === 'Windows' && isWin) || (c.os === 'Android' && isAndroid) || (c.os === 'iOS / iPadOS' && isIOS) || (c.os === 'macOS' && isMac);
      const card = document.createElement('div');
      card.className = `card client-card ${isRec ? 'recommended' : ''}`;
      card.innerHTML = `${isRec ? '<span class="rec-badge">🏆 Ваш выбор</span>' : ''}<h3>${c.os}</h3>${c.apps.map(a => `<a href="${a.u}" target="_blank">${a.n}</a>`).join('')}`;
      grid.appendChild(card);
    });
  };

  const renderGuides = () => {
    const list = document.getElementById('guidesGrid');
    guides.forEach(g => {
      const item = document.createElement('details');
      item.className = 'guide-item';
      item.innerHTML = `<summary><span class="guide-icon">${g.icon}</span><div><h3>${g.title}</h3><small style="color:var(--text-muted)">${g.sub}</small></div></summary><div class="guide-content"><p>${g.desc}</p><ol>${g.steps.map(s => `<li>${s}</li>`).join('')}</ol></div>`;
      list.appendChild(item);
    });
  };

  const renderFaq = () => {
    const list = document.getElementById('faqList');
    faqs.forEach((f, i) => {
      const item = document.createElement('details');
      item.className = 'faq-item';
      if (i === 0) item.open = true;
      item.innerHTML = `<summary>${f.q}</summary><p>${f.a}</p>`;
      list.appendChild(item);
    });
  };

  renderSubs();
  renderClients();
  renderGuides();
  renderFaq();
  applyTranslations();

  // === ВЗАИМОДЕЙСТВИЯ ===
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSubs(btn.dataset.filter, document.getElementById('searchInput').value);
    });
  });

  document.getElementById('searchInput').addEventListener('input', (e) => {
    const activeFilter = document.querySelector('.tab-btn.active').dataset.filter;
    renderSubs(activeFilter, e.target.value);
  });

  // Тема
  const themeBtn = document.getElementById('themeBtn');
  const applyTheme = () => { themeBtn.textContent = document.body.classList.contains('light-theme') ? '☀️' : ''; };
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    applyTheme();
  });
  if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-theme');
  applyTheme();

  // Язык
  document.getElementById('langBtn').addEventListener('click', () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    applyTranslations();
  });

  // Слабовидящие
  const a11yBtn = document.getElementById('a11yBtn');
  if (localStorage.getItem('highContrast') === 'true') { document.body.classList.add('high-contrast'); a11yBtn.textContent = '👁🗨'; }
  a11yBtn.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    a11yBtn.textContent = document.body.classList.contains('high-contrast') ? '‍🗨' : '👁';
  });

  // Мобильное меню
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Модальное окно
  const modal = document.getElementById('copyModal');
  document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

  // Кнопка наверх
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => scrollBtn.classList.toggle('visible', window.scrollY > 500));
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Звёзды GitHub
  fetch('https://api.github.com/repos/Stintik-123/StintikVPN')
    .then(r => r.json())
    .then(d => { if (d.stargazers_count) document.getElementById('statStars').textContent = d.stargazers_count; })
    .catch(() => document.getElementById('statStars').textContent = '100+');
  document.getElementById('statSubs').textContent = subs.length;

  // === ПАСХАЛКИ ===
  let logoClicks = 0;
  document.getElementById('siteLogo').addEventListener('click', (e) => {
    e.preventDefault();
    logoClicks++;
    if (logoClicks === 3) {
      logoClicks = 0;
      document.body.style.filter = 'hue-rotate(180deg)';
      setTimeout(() => document.body.style.filter = '', 2000);
    }
    setTimeout(() => logoClicks = 0, 1000);
  });

  document.getElementById('searchInput').addEventListener('input', (e) => {
    if (e.target.value.toLowerCase().includes('secret')) {
      e.target.value = '';
      alert('🎉 Вы нашли секретный режим! (Шутка, но вы молодец)');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
      e.preventDefault();
      document.querySelectorAll('.card').forEach(c => c.style.borderColor = '#00ff00');
      setTimeout(() => document.querySelectorAll('.card').forEach(c => c.style.borderColor = ''), 3000);
    }
  });

  const starsEl = document.getElementById('statStars');
  starsEl.style.cursor = 'pointer';
  starsEl.addEventListener('click', () => {
    starsEl.style.transform = 'scale(1.2) rotate(10deg)';
    setTimeout(() => starsEl.style.transform = '', 300);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // === ПРЕЛОАДЕР ===
  setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 800);

  // === ДАННЫЕ ===
  const subs = [
    { id: 'b1', cat: 'black', name: '🏴 Чёрный список (Основной)', desc: 'Для домашнего Wi-Fi и кабеля. Блокирует только запрещённые сайты.', url: 'https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt' },
    { id: 'b2', cat: 'black', name: '🏴 Чёрный список (Запасной)', desc: 'Альтернативный источник, если основной не работает.', url: 'https://vpn.akres.fun/all' },
    { id: 'b3', cat: 'black', name: '👑 Black Mobile', desc: '20 лучших серверов, оптимизированных специально для телефонов.', url: 'https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt' },
    { id: 'w1', cat: 'white', name: '🏳️ Белые списки (Основные)', desc: 'Для мобильных операторов с жёсткими блокировками (МТС, Билайн).', url: 'https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt' },
    { id: 'w2', cat: 'white', name: '🌐 Белые списки (CIDR)', desc: 'Фильтрация по IP-диапазонам. Используйте, если не работает SNI.', url: 'https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt' },
    { id: 'w3', cat: 'white', name: '🔍 Белые списки (SNI)', desc: 'Фильтрация по именам сайтов. Используйте, если не работает CIDR.', url: 'https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt' },
    { id: 'p1', cat: 'protocol', name: ' VLESS + Reality', desc: 'Максимальная скорость. РКН активно пытается блокировать.', url: 'https://mifa.world/vless' },
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
    { icon: '', title: 'ByeDPI', sub: 'Лёгкий и быстрый', desc: 'Простая альтернатива Zapret. Работает без установки и отлично подходит для Android без root-прав.', steps: ['Скачайте файл с GitHub и запустите его.', 'Программа создаст локальный прокси 127.0.0.1:1080.', 'Пропишите этот прокси в настройках браузера.', 'На Android: установите APK и нажмите большую кнопку Start.'] },
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
    subs.filter(s => (filter === 'all' || s.cat === filter) && (s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q))).forEach(s => {
      const card = document.createElement('div');
      card.className = 'card sub-card';
      card.innerHTML = `<h3>${s.name}</h3><p>${s.desc}</p><code>${s.url}</code><button class="btn primary copy-btn" data-url="${s.url}"> Скопировать ссылку</button>`;
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
  };

  const renderClients = () => {
    const grid = document.getElementById('clientsGrid');
    const ua = navigator.userAgent;
    const isWin = /win/i.test(ua), isAndroid = /android/i.test(ua), isIOS = /iphone|ipad/i.test(ua), isMac = /mac/i.test(ua);
    clients.forEach(c => {
      const isRec = (c.os === 'Windows' && isWin) || (c.os === 'Android' && isAndroid) || (c.os === 'iOS / iPadOS' && isIOS) || (c.os === 'macOS' && isMac);
      const card = document.createElement('div');
      card.className = `card client-card ${isRec ? 'recommended' : ''}`;
      card.style.position = 'relative';
      card.innerHTML = `${isRec ? '<span class="rec-badge"> Ваш выбор</span>' : ''}<h3>${c.os}</h3>${c.apps.map(a => `<a href="${a.u}" target="_blank">${a.n}</a>`).join('')}`;
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

  // Инициализация
  renderSubs();
  renderClients();
  renderGuides();
  renderFaq();

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
  const applyTheme = () => {
    const isLight = document.body.classList.contains('light-theme');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
  };
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    applyTheme();
  });
  if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-theme'); }
  applyTheme();

  // Язык (заглушка с визуальным переключением)
  const langBtn = document.getElementById('langBtn');
  langBtn.addEventListener('click', () => {
    const isRu = langBtn.textContent === 'RU';
    langBtn.textContent = isRu ? 'EN' : 'RU';
    // Здесь можно добавить полноценный перевод, пока просто меняем кнопку
  });

  // Модальное окно
  const modal = document.getElementById('copyModal');
  document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

  // Кнопка наверх
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 500);
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Звёзды GitHub
  fetch('https://api.github.com/repos/Stintik-123/StintikVPN')
    .then(r => r.json())
    .then(d => { if (d.stargazers_count) document.getElementById('statStars').textContent = d.stargazers_count; })
    .catch(() => document.getElementById('statStars').textContent = '100+');
  document.getElementById('statSubs').textContent = subs.length;

  // === ПАСХАЛКИ (УПРОЩЁННЫЕ) ===
  
  // 1. Клик по логотипу 3 раза
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

  // 2. Ввод "secret" в поиск
  document.getElementById('searchInput').addEventListener('input', (e) => {
    if (e.target.value.toLowerCase().includes('secret')) {
      e.target.value = '';
      alert(' Вы нашли секретный режим! (Шутка, но вы молодец)');
    }
  });

  // 3. Ctrl + Shift + V
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
      e.preventDefault();
      document.querySelectorAll('.card').forEach(c => c.style.borderColor = '#00ff00');
      setTimeout(() => document.querySelectorAll('.card').forEach(c => c.style.borderColor = ''), 3000);
    }
  });

  // 4. Клик по звёздам (1 раз)
  const starsEl = document.getElementById('statStars');
  starsEl.style.cursor = 'pointer';
  starsEl.addEventListener('click', () => {
    starsEl.style.transform = 'scale(1.2) rotate(10deg)';
    setTimeout(() => starsEl.style.transform = '', 300);
  });
});

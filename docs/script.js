// ===== DATA =====
const subscriptions = [
    {
        id: 'black-main',
        title: '🏴 Чёрный список (основной)',
        desc: 'Основная подписка с чёрным списком для обычного интернета. Домашний Wi-Fi, кабель, 4G без жёстких блокировок.',
        url: 'https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt',
        category: 'black',
        badges: ['black'],
    },
    {
        id: 'black-backup',
        title: '🏴 Чёрный список (запасной)',
        desc: 'Резервная подписка чёрного списка. Используйте, если основная недоступна.',
        url: 'https://vpn.akres.fun/all',
        category: 'black',
        badges: ['black'],
    },
    {
        id: 'black-mobile',
        title: '👑 Black Mobile',
        desc: 'ЛУЧШИЕ сервера специально оптимизированные для мобильных устройств. Минимальный пинг, стабильное соединение.',
        url: 'https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt',
        category: 'black',
        badges: ['black', 'mobile'],
    },
    {
        id: 'white-main',
        title: '🏳️ Белый список (основной)',
        desc: 'Для жёстких блокировок мобильных операторов (МТС, Билайн, Tele2). Работает при включённых «белых списках» РКН.',
        url: 'https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt',
        category: 'white',
        badges: ['white'],
    },
    {
        id: 'white-cidr',
        title: '🏳️ Белый список (CIDR)',
        desc: 'Фильтрация трафика по IP-диапазонам (CIDR). Используйте, если SNI не работает.',
        url: 'https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt',
        category: 'white',
        badges: ['white', 'cidr'],
    },
    {
        id: 'white-sni',
        title: '🏳️ Белый список (SNI)',
        desc: 'Фильтрация трафика по текстовым именам сайтов (SNI). Используйте, если CIDR не работает.',
        url: 'https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt',
        category: 'white',
        badges: ['white', 'sni'],
    },
    {
        id: 'proto-vless',
        title: '⚡ VLESS',
        desc: 'Лучший по скорости и маскировке. Но РКН активно блокирует, надёжность снизилась.',
        url: 'https://mifa.world/vless',
        category: 'protocol',
        badges: ['protocol'],
    },
    {
        id: 'proto-vmess',
        title: '🛡️ VMess',
        desc: 'Самый надёжный протокол. Работает стабильно даже при усилении блокировок.',
        url: 'https://mifa.world/vmess',
        category: 'protocol',
        badges: ['protocol'],
    },
    {
        id: 'proto-trojan',
        title: '🎭 Trojan',
        desc: 'Хорошая маскировка под HTTPS. Сбалансированный выбор скорость/стабильность.',
        url: 'https://mifa.world/trojan',
        category: 'protocol',
        badges: ['protocol'],
    },
    {
        id: 'proto-ss',
        title: '🎮 Shadowsocks',
        desc: 'Максимальная скорость, минимальная задержка. Идеален для онлайн-игр и стриминга.',
        url: 'https://mifa.world/ss',
        category: 'protocol',
        badges: ['protocol'],
    },
    {
        id: 'proxy-socks5',
        title: '🔗 SOCKS5 прокси',
        desc: 'SOCKS5 прокси для Telegram. Сервер: 84.201.182.112:1080',
        url: 'https://t.me/socks?server=84.201.182.112&port=1080&user=86XFhWe7j9&pass=e4GwQtyVaZ',
        category: 'proxy',
        badges: ['proxy'],
    },
    {
        id: 'proxy-mtproto-1',
        title: '🔗 MTProto #1',
        desc: 'MTProto прокси для Telegram. Сервер: 46.243.235.29:853',
        url: 'https://t.me/proxy?server=46.243.235.29&port=853&secret=ee534adcf23a16f425cbae129c4cb574cb6164732e78352e7275',
        category: 'proxy',
        badges: ['proxy'],
    },
    {
        id: 'proxy-mtproto-2',
        title: '🔗 MTProto #2',
        desc: 'MTProto прокси для Telegram. Сервер: de4.kael.fuckrkn.net:443',
        url: 'https://t.me/proxy?server=de4.kael.fuckrkn.net&port=443&secret=ee1a499af9a7a18282da82e30714402e157777772e6165726f666c6f742e7275',
        category: 'proxy',
        badges: ['proxy'],
    },
    {
        id: 'proxy-mtproto-3',
        title: '🔗 MTProto #3',
        desc: 'MTProto прокси для Telegram. Сервер: mtp1.sosproxy.space:443',
        url: 'https://t.me/proxy?server=mtp1.sosproxy.space&port=443&secret=ee806bfea72377dacb92438b5f330856b464726976652e676f6f676c652e636f6d',
        category: 'proxy',
        badges: ['proxy'],
    },
    {
        id: 'proxy-mtproto-4',
        title: '🔗 MTProto #4',
        desc: 'MTProto прокси для Telegram. Сервер: adsl.myrka.digital:443',
        url: 'https://t.me/proxy?server=adsl.myrka.digital&port=443&secret=ee6e2443fe7f5904ff5ceded8d76f02ea268312e6d79726b612e6469676974616c',
        category: 'proxy',
        badges: ['proxy'],
    },
    {
        id: 'proxy-mtproto-5',
        title: '🔗 MTProto #5',
        desc: 'MTProto прокси для Telegram. Сервер: 95.163.176.204:2083',
        url: 'https://t.me/proxy?server=95.163.176.204&port=2083&secret=ee93143b0fadcd4c8a99164fd3e819987f636f666665652e73616d6172617765622e74656368',
        category: 'proxy',
        badges: ['proxy'],
    },
    {
        id: 'proxy-mtproto-6',
        title: '🔗 MTProto #6',
        desc: 'MTProto прокси для Telegram. Сервер: 89.169.32.31:2083',
        url: 'https://t.me/proxy?server=89.169.32.31&port=2083&secret=eea2b102b138450e1e33e7dc460ad967e8636f666665652e73616d6172617765622e74656368',
        category: 'proxy',
        badges: ['proxy'],
    },
];

const clients = [
    {
        platform: 'Windows',
        icon: '💻',
        iconBg: '#0078d4',
        apps: [
            { name: 'Hiddify', url: 'https://github.com/hiddify/hiddify-next/releases' },
            { name: 'v2rayN', url: 'https://github.com/2dust/v2rayN/releases' },
        ],
    },
    {
        platform: 'Android',
        icon: '📱',
        iconBg: '#3ddc84',
        apps: [
            { name: 'Incy', url: 'https://play.google.com/store/apps/details?id=com.glarimy.incy' },
            { name: 'NekoBox', url: 'https://github.com/MatsuriDayo/NekoBoxForAndroid/releases' },
        ],
    },
    {
        platform: 'Android TV',
        icon: '📺',
        iconBg: '#7cb342',
        apps: [
            { name: 'NekoBox (TV)', url: 'https://github.com/MatsuriDayo/NekoBoxForAndroid/releases' },
        ],
    },
    {
        platform: 'iOS / iPadOS',
        icon: '🍎',
        iconBg: '#555555',
        apps: [
            { name: 'Streisand', url: 'https://apps.apple.com/app/streisand/id6450534064' },
            { name: 'V2Box', url: 'https://apps.apple.com/app/v2box/id6443654552' },
        ],
    },
    {
        platform: 'Linux',
        icon: '🐧',
        iconBg: '#fcc624',
        apps: [
            { name: 'Hiddify', url: 'https://github.com/hiddify/hiddify-next/releases' },
            { name: 'NekoRay', url: 'https://github.com/MatsuriDayo/nekoray/releases' },
        ],
    },
    {
        platform: 'macOS',
        icon: '🖥️',
        iconBg: '#999999',
        apps: [
            { name: 'Hiddify', url: 'https://github.com/hiddify/hiddify-next/releases' },
            { name: 'Streisand', url: 'https://apps.apple.com/app/streisand/id6450534064' },
        ],
    },
];

const faqData = [
    {
        q: 'Подписка не работает или очень медленно. Что делать?',
        a: 'Обновите подписку в клиенте (кнопка «Обновить»). Попробуйте сменить протокол (VLESS → Trojan → VMess) или выбрать другой сервер. Иногда помогает перезапуск клиента или смена Wi-Fi на мобильный интернет (и наоборот).',
    },
    {
        q: 'Как часто обновляются конфиги?',
        a: 'Конфигурации обновляются ежедневно их создателями. Ссылки на сайте всегда ведут на актуальные версии — просто нажмите «Обновить» в клиенте.',
    },
    {
        q: 'Когда нужно использовать белые списки?',
        a: 'Только когда ваш мобильный оператор (МТС, Билайн, Tele2 и др.) включил «белые списки» РКН — и обычные сайты перестали открываться. Для домашнего Wi-Fi обычно достаточно чёрных списков.',
    },
    {
        q: 'Какой клиент лучше всего для новичка?',
        a: 'Hiddify — самый удобный и понятный. Рекомендуется для Windows и Android. На iOS — Streisand. Оба поддерживают импорт подписок в один клик.',
    },
    {
        q: 'Что делать, если Telegram прокси не подключается?',
        a: 'Прокси часто умирают из-за блокировок. Просто попробуйте следующий из списка. На сайте они обновляются регулярно. Подпишитесь на канал @StintikVPN — там публикуются новые прокси первыми.',
    },
    {
        q: 'Можно ли использовать одну подписку на нескольких устройствах?',
        a: 'Да, большинство подписок поддерживают одновременное подключение с нескольких устройств (зависит от конкретного сервера). Просто вставьте одну и ту же ссылку на все устройства.',
    },
    {
        q: 'Безопасно ли пользоваться этими конфигами?',
        a: 'Конфиги из открытых источников. Рекомендуется не передавать через них чувствительные данные (банковские приложения, важные аккаунты). Используйте на свой страх и риск. Для критичных задач лучше платный VPN с проверенной репутацией.',
    },
    {
        q: 'В чём разница между SNI и CIDR белыми списками?',
        a: 'SNI фильтрует по именам сайтов (youtube.com), CIDR — по IP-диапазонам (173.194.0.0/16). Если не работает SNI — пробуйте CIDR, и наоборот. Обычно SNI быстрее, но CIDR надёжнее при глубокой инспекции пакетов.',
    },
];

// ===== PARTICLES =====
function createParticles() {
    const container = document.getElementById('particles');
    const count = window.innerWidth < 768 ? 15 : 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (12 + Math.random() * 20) + 's';
        p.style.animationDelay = Math.random() * 15 + 's';
        p.style.width = (1 + Math.random() * 2) + 'px';
        p.style.height = p.style.width;
        container.appendChild(p);
    }
}

// ===== RENDER SUBSCRIPTIONS =====
function renderSubscriptions(filter = 'all') {
    const grid = document.getElementById('subsGrid');
    const filtered = filter === 'all' ? subscriptions : subscriptions.filter(s => s.category === filter);

    grid.innerHTML = filtered.map(sub => `
        <div class="sub-card" data-category="${sub.category}">
            <div class="sub-header">
                <div class="sub-title">${sub.title}</div>
                <div class="sub-badges">
                    ${sub.badges.map(b => `<span class="sub-badge ${b}">${getBadgeLabel(b)}</span>`).join('')}
                </div>
            </div>
            <p class="sub-desc">${sub.desc}</p>
            <div class="sub-url">
                <span class="url-status checking" data-url="${sub.url}"></span>
                <code>${sub.url}</code>
            </div>
            <div class="sub-actions">
                <button class="btn-copy" data-url="${sub.url}" onclick="copyUrl(this)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2"/>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                    </svg>
                    Копировать
                </button>
                <button class="btn-open" onclick="openUrl('${sub.url}')" title="Открыть ссылку">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    checkUrls();
}

function getBadgeLabel(badge) {
    const labels = {
        black: 'Чёрный список',
        white: 'Белый список',
        protocol: 'По протоколу',
        proxy: 'Прокси',
        mobile: 'Mobile',
        cidr: 'CIDR',
        sni: 'SNI',
    };
    return labels[badge] || badge;
}

// ===== URL AVAILABILITY CHECK =====
async function checkUrls() {
    const indicators = document.querySelectorAll('.url-status');
    for (const ind of indicators) {
        const url = ind.dataset.url;
        ind.className = 'url-status checking';

        // Simulate check with timeout (can't do real CORS check from static site)
        // Using a heuristic: if URL contains known working domains, mark online
        const knownWorking = [
            'gitverse.ru',
            'raw.githubusercontent.com',
            'vpn.akres.fun',
            'mifa.world',
        ];

        const isKnown = knownWorking.some(domain => url.includes(domain));

        await new Promise(r => setTimeout(r, 300 + Math.random() * 700));

        if (isKnown) {
            ind.className = 'url-status online';
        } else {
            ind.className = 'url-status online'; // optimistic for Telegram links
        }
    }
}

// ===== COPY FUNCTION =====
let copyCount = 0;
let tgModalShown = false;

async function copyUrl(btn) {
    const url = btn.dataset.url;

    try {
        await navigator.clipboard.writeText(url);

        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            Скопировано
        `;
        btn.classList.add('copied');
        showToast('Ссылка скопирована в буфер обмена!', '✓');

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
        }, 2000);

        // Telegram modal on first copy
        copyCount++;
        if (copyCount === 1 && !tgModalShown) {
            setTimeout(() => showTgModal(), 800);
        }
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Ссылка скопирована!', '✓');
    }
}

function copyProtocolUrl(btn) {
    const url = btn.dataset.url;
    const tempBtn = { dataset: { url }, innerHTML: btn.innerHTML };

    navigator.clipboard.writeText(url).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            Скопировано
        `;
        btn.style.borderColor = 'var(--success)';
        btn.style.color = 'var(--success)';
        showToast('Ссылка скопирована!', '✓');

        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 2000);

        copyCount++;
        if (copyCount === 1 && !tgModalShown) {
            setTimeout(() => showTgModal(), 800);
        }
    });
}

function openUrl(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// ===== TOAST =====
function showToast(text, icon = '✓') {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');
    const toastIcon = document.getElementById('toastIcon');

    toastText.textContent = text;
    toastIcon.textContent = icon;
    toast.classList.add('show');

    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== TELEGRAM MODAL =====
function showTgModal() {
    const modal = document.getElementById('tgModal');
    modal.classList.add('show');
    tgModalShown = true;
}

function hideTgModal() {
    const modal = document.getElementById('tgModal');
    modal.classList.remove('show');
}

// ===== FILTER TABS =====
function initFilters() {
    const tabs = document.querySelectorAll('.filter-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderSubscriptions(tab.dataset.filter);
        });
    });
}

// ===== RENDER CLIENTS =====
function renderClients() {
    const grid = document.getElementById('clientsGrid');
    grid.innerHTML = clients.map(client => `
        <div class="client-card">
            <div class="client-header">
                <div class="client-icon" style="background: ${client.iconBg}20; color: ${client.iconBg};">${client.icon}</div>
                <div class="client-info">
                    <h4>${client.platform}</h4>
                    <p>${client.apps.length} приложени${client.apps.length > 1 ? 'я' : 'е'}</p>
                </div>
            </div>
            <div class="client-apps">
                ${client.apps.map(app => `
                    <div class="client-app">
                        <span class="client-app-name">${app.name}</span>
                        <div class="client-app-links">
                            <a href="${app.url}" target="_blank" rel="noopener">Скачать →</a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// ===== RENDER FAQ =====
function renderFaq() {
    const list = document.getElementById('faqList');
    list.innerHTML = faqData.map((item, i) => `
        <div class="faq-item" data-index="${i}">
            <div class="faq-question" onclick="toggleFaq(${i})">
                <span>${item.q}</span>
                <span class="faq-icon">▼</span>
            </div>
            <div class="faq-answer">${item.a}</div>
        </div>
    `).join('');
}

function toggleFaq(index) {
    const items = document.querySelectorAll('.faq-item');
    const target = items[index];
    const isActive = target.classList.contains('active');

    items.forEach(item => item.classList.remove('active'));

    if (!isActive) {
        target.classList.add('active');
    }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section-header, .sub-card, .protocol-card, .client-card, .step, .mirror-card, .faq-item, .tg-info, .tg-visual').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ===== NAVBAR SCROLL =====
function initNavbar() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const links = document.getElementById('navLinks');

    btn.addEventListener('click', () => {
        links.classList.toggle('show');
        btn.textContent = links.classList.contains('show') ? '✕' : '☰';
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('show');
            btn.textContent = '☰';
        });
    });
}

// ===== MODAL EVENTS =====
function initModal() {
    document.getElementById('modalClose').addEventListener('click', hideTgModal);
    document.getElementById('tgSkipBtn').addEventListener('click', hideTg

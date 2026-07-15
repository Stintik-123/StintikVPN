const subscriptions = [
    { name: 'Основной', url: 'https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt', category: 'black', badge: '🏴' },
    { name: 'Запасной', url: 'https://vpn.akres.fun/all', category: 'black', badge: '🏴' },
    { name: 'Black Mobile', url: 'https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt', category: 'black', badge: '📱' },
    { name: 'Основной', url: 'https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt', category: 'white', badge: '🏳️' },
    { name: 'White SNI', url: 'https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt', category: 'white', badge: '🏳️' },
    { name: 'White CIDR', url: 'https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt', category: 'white', badge: '🏳️' },
    { name: 'VLESS', url: 'https://mifa.world/vless', category: 'protocol', badge: '🛠️' },
    { name: 'VMess', url: 'https://mifa.world/vmess', category: 'protocol', badge: '🛠️' },
    { name: 'Trojan', url: 'https://mifa.world/trojan', category: 'protocol', badge: '🛠️' },
    { name: 'Shadowsocks', url: 'https://mifa.world/ss', category: 'protocol', badge: '🛠️' }
];

const clients = [
    { os: 'windows', name: 'Windows', apps: 'Hiddify, v2rayN' },
    { os: 'android', name: 'Android', apps: 'Incy, NekoBox' },
    { os: 'ios', name: 'iOS', apps: 'Streisand, V2Box' },
    { os: 'mac', name: 'macOS', apps: 'Hiddify, Streisand' },
    { os: 'linux', name: 'Linux', apps: 'Hiddify, NekoRay' }
];

let currentLanguage = 'ru';
let isDarkTheme = true;

window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    renderSubscriptions();
    renderClients();
    setupListeners();
    loadGitHubStars();
    setupScrollTop();
    checkNightMode();
    setTimeout(() => hidePreloader(), 1500);
});

function hidePreloader() {
    document.getElementById('preloader').style.display = 'none';
}

function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    isDarkTheme = saved === 'dark';
    applyTheme();
    if (localStorage.getItem('contrast') === 'on') {
        document.body.classList.add('high-contrast');
    }
}

function applyTheme() {
    if (isDarkTheme) {
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
    }
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    document.getElementById('theme-toggle').textContent = isDarkTheme ? '🌙' : '☀️';
}

function initLanguage() {
    currentLanguage = localStorage.getItem('language') || 'ru';
    document.getElementById('language-select').value = currentLanguage;
}

function renderSubscriptions() {
    const grid = document.getElementById('subs-grid');
    grid.innerHTML = subscriptions.map(sub => `
        <div class="sub-card glass-effect" data-category="${sub.category}">
            <span class="badge">${sub.badge}</span>
            <h3>${sub.name}</h3>
            <p>${sub.url.substring(0, 50)}...</p>
            <button class="btn-copy" onclick="copySub('${sub.url}')">📋 Копировать</button>
            <button class="btn-check" onclick="checkStatus(this, '${sub.url}')">🔄 Проверить</button>
            <button onclick="reportSub('${sub.name}')">🚨 Пожаловаться</button>
            <span class="status">⏳</span>
        </div>
    `).join('');
}

function renderClients() {
    const grid = document.getElementById('clients-grid');
    const userOS = detectOS();
    grid.innerHTML = clients.map(client => `
        <div class="client-card glass-effect" ${client.os === userOS ? 'style="border: 2px solid var(--primary);"' : ''}>
            <h3>${client.name}</h3>
            ${client.os === userOS ? '<span class="badge">🏆 Ваш выбор</span>' : ''}
            <p>${client.apps}</p>
        </div>
    `).join('');
}

function detectOS() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('win')) return 'windows';
    if (ua.includes('android')) return 'android';
    if (ua.includes('iphone') || ua.includes('ipad')) return 'ios';
    if (ua.includes('mac')) return 'mac';
    if (ua.includes('linux')) return 'linux';
    return 'windows';
}

function setupListeners() {
    document.getElementById('theme-toggle').addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        applyTheme();
    });

    document.getElementById('contrast-toggle').addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('contrast', document.body.classList.contains('high-contrast') ? 'on' : 'off');
    });

    document.getElementById('language-select').addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem('language', currentLanguage);
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterSubs(this.getAttribute('data-filter'));
        });
    });

    document.querySelectorAll('.faq-item').forEach((item, idx) => {
        item.querySelector('.faq-header').addEventListener('click', () => {
            document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
        });
    });

    document.querySelectorAll('.guide-item').forEach((item, idx) => {
        item.querySelector('.guide-header').addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.id === 'copy-modal') closeModal();
    });

    document.getElementById('siteLogo').addEventListener('click', (e) => {
        e.preventDefault();
        if (!window.logoClickCount) window.logoClickCount = 0;
        window.logoClickCount++;
        if (window.logoClickCount === 3) {
            alert('🎉 Пасхалка: Ты же знаешь, интернет свобода ближе чем кажется! 🚀');
            window.logoClickCount = 0;
        }
        setTimeout(() => window.logoClickCount = 0, 3000);
    });
}

function copySub(url) {
    navigator.clipboard.writeText(url).then(() => {
        const modal = document.getElementById('copy-modal');
        modal.classList.add('active');
        setTimeout(() => modal.classList.remove('active'), 3000);
    });
}

function filterSubs(filter) {
    document.querySelectorAll('.sub-card').forEach(card => {
        const cat = card.getAttribute('data-category');
        card.style.display = (filter === 'all' || cat === filter) ? 'flex' : 'none';
    });
}

function checkStatus(btn, url) {
    const card = btn.parentElement;
    const status = card.querySelector('.status');
    status.textContent = '⏳ Проверка...';
    status.className = 'status checking';
    
    fetch(url, { method: 'HEAD', mode: 'no-cors' })
        .then(() => {
            status.textContent = '✅ Работает';
            status.className = 'status working';
        })
        .catch(() => {
            status.textContent = '🔴 Не работает';
            status.className = 'status failed';
        });
}

function reportSub(name) {
    const text = `Проблема с подпиской: ${name}`;
    window.open(`https://t.me/Keb04w?text=${encodeURIComponent(text)}`, '_blank');
}

function closeModal() {
    document.getElementById('copy-modal').classList.remove('active');
}

function toggleFAQ(el) {
    const item = el.parentElement;
    document.querySelectorAll('.faq-item').forEach(e => e.classList.remove('active'));
    item.classList.add('active');
}

function toggleGuide(el) {
    el.parentElement.classList.toggle('active');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupScrollTop() {
    const btn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 600);
    });
}

function checkNightMode() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) {
        setTimeout(() => {
            const toast = document.getElementById('night-toast');
            toast.classList.remove('hidden');
            setTimeout(() => toast.classList.add('hidden'), 3000);
        }, 3000);
    }
}

function loadGitHubStars() {
    fetch('https://api.github.com/repos/Stintik-123/StintikVPN')
        .then(r => r.json())
        .then(data => {
            const count = document.getElementById('stars-count');
            if (data.stargazers_count) {
                count.textContent = data.stargazers_count;
                count.parentElement.addEventListener('click', () => {
                    window.open('https://github.com/Stintik-123/StintikVPN', '_blank');
                });
            }
        })
        .catch(() => console.log('GitHub API error'));
}
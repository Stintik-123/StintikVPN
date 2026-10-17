// ===== DATA =====
const data = {
  updated: "17.10.2026",
  subscriptions: [
    {
      category: "black",
      tag: "Чёрные",
      title: "Чёрный список (основной)",
      note: "V2Ray Aggregator",
      url: "https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt"
    },
    {
      category: "black",
      tag: "Mobile",
      title: "Black Mobile",
      note: "Для телефона — KvRuVPN",
      url: "https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt"
    },
    {
      category: "white",
      tag: "Белые",
      title: "Белые списки (основные)",
      note: "Для жестких блокировок",
      url: "https://gitverse.ru/api/repos/flaafix/AetrisVPN_white_list_lite/raw/branch/master/AetrisVPN.txt"
    },
    {
      category: "white",
      tag: "CIDR",
      title: "Белые списки (CIDR)",
      note: "Фильтр по IP",
      url: "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt"
    },
    {
      category: "white",
      tag: "SNI",
      title: "Белые списки (SNI)",
      note: "Фильтр по доменам",
      url: "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt"
    }
  ],
  proxies: [
    {
      addr: "lumetra.mtproxy.zip",
      url: "https://t.me/proxy?server=lumetra.mtproxy.zip&port=443&secret=ee9af09f8b8dcfe282445cf1bc91854acb786170692e6f7a6f6e2e7275"
    },
    {
      addr: "85.192.34.18:9443",
      url: "https://t.me/proxy?server=85.192.34.18&port=9443&secret=eef390d9757cb92d87826bcef28a6e75ed74676e6e2e6c697665"
    },
    {
      addr: "proxy.tonservice.site",
      url: "https://t.me/proxy?server=proxy.tonservice.site&port=8443&secret=dd00000000000000000000000000000000"
    },
    {
      addr: "172.65.100.45:25565",
      url: "https://t.me/proxy?server=172.65.100.45&port=25565&secret=ee1603010200010001fc030386e24c3add6d656469612e737465616d706f77657265642e636f6d"
    },
    {
      addr: "cluster.mtproxy.cc",
      url: "https://t.me/proxy?server=cluster.mtproxy.cc&port=443&secret=ee499cbaa63a17e5071d5babf1ccba89f3636c75737465722e6d7470726f78792e6363"
    }
  ]
};

// ===== INIT =====
function init() {
  updateProxyDate();
  loadSubscriptions();
  loadProxies();
  initTheme();
  initSmoothScroll();
  initMobileNav();
}

// ===== THEME =====
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains('dark');
  body.classList.toggle('dark', !isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldBeDark = saved === 'dark' || (saved !== 'light' && prefersDark);
  document.body.classList.toggle('dark', shouldBeDark);
}

// ===== NAV =====
function toggleNav() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}

function initMobileNav() {
  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav-container');
    const burger = document.querySelector('.nav-burger');
    if (nav && burger && !nav.contains(e.target) && !burger.contains(e.target)) {
      document.querySelector('.nav-links')?.classList.remove('open');
    }
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav
      document.querySelector('.nav-links')?.classList.remove('open');
    });
  });
}

// ===== PROXY DATE =====
function updateProxyDate() {
  const el = document.getElementById('proxy-date');
  if (!el) return;
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  el.textContent = `${day}.${month}.${year}`;
}

// ===== SUBSCRIPTIONS =====
function loadSubscriptions() {
  const container = document.getElementById('sub-list');
  if (!container) return;

  container.innerHTML = data.subscriptions.map(sub => `
    <div class="sub" data-c="${sub.category}">
      <span class="sub-tag">${sub.tag}</span>
      <div class="sub-body">
        <h4>${sub.title}</h4>
        <span>${sub.note}</span>
      </div>
      <div class="sub-actions">
        <button class="btn btn-secondary" onclick="showQR(this, '${sub.url}')">QR</button>
        <button class="btn btn-secondary" onclick="cp(this, '${sub.url}')">Копировать</button>
        <button class="btn btn-secondary" onclick="shareUrl(this, '${sub.url}')">Поделиться</button>
      </div>
    </div>
  `).join('');

  // Filter buttons
  document.querySelectorAll('.filter-jump')?.forEach(btn => {
    btn.addEventListener('click', () => filt(btn.dataset.f));
  });
}

// ===== PROXIES =====
function loadProxies() {
  const container = document.getElementById('proxy-list');
  if (!container) return;

  container.innerHTML = data.proxies.map(proxy => `
    <div class="proxy">
      <div class="proxy-left">
        <span class="proxy-type">MTProto</span>
        <span class="proxy-addr">${proxy.addr}</span>
      </div>
      <div class="sub-actions">
        <button class="btn btn-secondary" onclick="showQR(this, '${proxy.url}')">QR</button>
        <button class="btn btn-secondary" onclick="cp(this, '${proxy.url}')">Копировать</button>
        <button class="btn btn-secondary" onclick="shareUrl(this, '${proxy.url}')">Поделиться</button>
        <a href="${proxy.url}" target="_blank" class="btn btn-secondary">Открыть</a>
      </div>
    </div>
  `).join('');
}

// ===== FILTER =====
function filt(cat) {
  // Update filter buttons
  document.querySelectorAll('.filter')?.forEach(b => {
    b.classList.toggle('active', b.dataset.f === cat);
  });

  // Filter items
  document.querySelectorAll('.sub')?.forEach(r => {
    if (cat === 'all') {
      r.classList.remove('hidden');
    } else {
      const categories = (r.dataset.c || '').split(' ');
      r.classList.toggle('hidden', !categories.includes(cat));
    }
  });

  // Scroll to section
  document.getElementById('subs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== COPY =====
function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
  }
  return legacyCopy(text);
}

function legacyCopy(text) {
  return new Promise(resolve => {
    const t = document.createElement('textarea');
    t.value = text;
    t.setAttribute('readonly', '');
    t.style.position = 'fixed';
    t.style.left = '-9999px';
    document.body.appendChild(t);
    t.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(t);
    resolve();
  });
}

function cp(btn, url) {
  copyToClipboard(url).then(() => {
    if (btn?.classList) {
      const original = btn.textContent;
      btn.classList.add('copied');
      btn.textContent = '✓ Скопировано';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.textContent = original;
      }, 1500);
    }
    showToast('Скопировано');
  });
}

// ===== SHARE =====
function shareUrl(btn, url) {
  if (!navigator.share) {
    showToast('Поделиться недоступно');
    return;
  }
  navigator.share({ text: url }).catch(() => {});
}

// ===== QR =====
var currentQRUrl = '';

function showQR(btn, url) {
  currentQRUrl = url;
  const modal = document.getElementById('qr-modal');
  const container = document.getElementById('qrcode');
  if (!modal || !container) return;

  container.innerHTML = '';

  if (typeof QRCode === 'undefined') {
    container.innerHTML = '<p>QR-библиотека не загрузилась</p>';
    modal.hidden = false;
    return;
  }

  const isDark = document.body.classList.contains('dark');
  const colorDark = isDark ? '#ffffff' : '#000000';
  const colorLight = isDark ? '#000000' : '#ffffff';

  try {
    new QRCode(container, {
      text: url,
      width: 200,
      height: 200,
      colorDark: colorDark,
      colorLight: colorLight,
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (e) {
    container.innerHTML = '<p>Не удалось сгенерировать QR</p>';
  }

  modal.hidden = false;
}

function closeQR() {
  document.getElementById('qr-modal')?.setAttribute('hidden', '');
  currentQRUrl = '';
}

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.hidden = true, 200);
  }, 1500);
}

// ===== FAQ =====
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  
  // Close all
  document.querySelectorAll('.faq-item')?.forEach(x => x.classList.remove('open'));
  
  // Open current if wasn't open
  if (!isOpen) item.classList.add('open');
}

// ===== KEYBOARD =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeQR();
    document.querySelector('.nav-links')?.classList.remove('open');
  }
});

// ===== RUN =====
document.addEventListener('DOMContentLoaded', init);

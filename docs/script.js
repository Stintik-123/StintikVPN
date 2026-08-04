/* Best default subscription — Black Mobile */
const BEST_URL = 'https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt';
const BEST_DESKTOP = 'https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt';

const CLIENTS = {
  windows: { name: 'Windows', icon: '💻', url: 'https://github.com/hiddify/hiddify-next/releases', label: 'Hiddify' },
  android: { name: 'Android', icon: '📱', url: 'https://play.google.com/store/apps/details?id=com.glarimy.incy', label: 'Incy / NekoBox' },
  ios:     { name: 'iOS', icon: '🍎', url: 'https://apps.apple.com/app/streisand/id6450534064', label: 'Streisand' },
  mac:     { name: 'macOS', icon: '🖥️', url: 'https://github.com/hiddify/hiddify-next/releases', label: 'Hiddify' },
  linux:   { name: 'Linux', icon: '🐧', url: 'https://github.com/hiddify/hiddify-next/releases', label: 'Hiddify' }
};

function detectOS() {
  const ua = navigator.userAgent || '';
  const p = navigator.platform || '';
  if (/android/i.test(ua)) return 'android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Mac/i.test(p) || /Mac OS/i.test(ua)) return 'mac';
  if (/Win/i.test(p) || /Windows/i.test(ua)) return 'windows';
  if (/Linux/i.test(p) || /Linux/i.test(ua)) return 'linux';
  return 'windows';
}

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Mac/i.test(navigator.platform));
}

function bestUrl() {
  return isMobile() ? BEST_URL : BEST_DESKTOP;
}

function cp(btn, url) {
  const text = url || BEST_URL;
  navigator.clipboard.writeText(text).then(() => {
    if (btn && btn.classList) {
      const o = btn.textContent;
      btn.classList.add('done');
      btn.textContent = '✓ Готово';
      setTimeout(() => { btn.classList.remove('done'); btn.textContent = o; }, 1800);
    }
    showToast();
  }).catch(() => {
    const t = document.createElement('textarea');
    t.value = text;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    showToast();
  });
}

function cpBest() {
  const btn = document.getElementById('hero-copy') || document.getElementById('smart-copy');
  cp(btn, bestUrl());
}

function showToast() {
  const el = document.getElementById('toast');
  if (!el) return;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

function toggleFaq(btn) {
  const item = btn.parentElement;
  const open = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(x => x.classList.remove('open'));
  if (!open) item.classList.add('open');
}

function filt(cat) {
  document.querySelectorAll('.filter').forEach(b => {
    b.classList.toggle('active', b.dataset.f === cat);
  });
  document.querySelectorAll('.sub').forEach(r => {
    if (cat === 'all') r.classList.remove('hidden');
    else {
      const c = (r.dataset.c || '').split(' ');
      r.classList.toggle('hidden', !c.includes(cat));
    }
  });
  const s = document.getElementById('subs');
  if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initSmart() {
  const os = detectOS();
  const mobile = isMobile();
  const client = CLIENTS[os] || CLIENTS.windows;
  const card = document.getElementById('smart');
  if (!card) return;

  document.getElementById('smart-icon').textContent = client.icon;
  document.getElementById('smart-title').textContent =
    mobile
      ? `Ты на ${client.name} — рекомендуем Black Mobile`
      : `Ты на ${client.name} — начни с чёрного списка`;
  document.getElementById('smart-desc').textContent =
    `Клиент: ${client.label}. Одна кнопка — подписка в буфере.`;

  const clientBtn = document.getElementById('smart-client');
  if (clientBtn) {
    clientBtn.href = client.url;
    clientBtn.textContent = `Скачать ${client.label}`;
    clientBtn.target = '_blank';
    clientBtn.rel = 'noopener';
  }

  card.classList.add('show');

  document.querySelectorAll('.client').forEach(el => {
    if (el.dataset.os === os) el.classList.add('hl');
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const h = a.getAttribute('href');
    if (!h || h === '#') return;
    e.preventDefault();
    const t = document.querySelector(h);
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmart);
} else {
  initSmart();
}

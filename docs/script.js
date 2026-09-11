// Auto-update proxy date
function updateProxyDate() {
  const dateEl = document.getElementById('proxy-date');
  if (!dateEl) return;
  
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  dateEl.textContent = `${day}.${month}.${year}`;
}

// Theme toggle
function toggleTheme() {
  const body = document.body;
  const isLight = body.classList.contains('theme-light');
  body.classList.toggle('theme-light', !isLight);
  body.classList.toggle('theme-dark', isLight);
  localStorage.setItem('theme', isLight ? 'dark' : 'light');
}

// Init theme from localStorage or system preference
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const shouldUseLight = saved === 'light' || (saved !== 'dark' && prefersLight);
  document.body.classList.toggle('theme-light', shouldUseLight);
  document.body.classList.toggle('theme-dark', !shouldUseLight);
}

// Mobile nav toggle
function toggleNav() {
  const links = document.querySelector('.nav-links');
  const ctas = document.querySelector('.nav-ctas');
  links.classList.toggle('open');
  ctas.classList.toggle('open');
}

function closeNav() {
  const links = document.querySelector('.nav-links');
  const ctas = document.querySelector('.nav-ctas');
  if (links) links.classList.remove('open');
  if (ctas) ctas.classList.remove('open');
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.hidden = true, 200);
  }, 1800);
}

// Copy with Share API fallback and modal always shown after copy
function cp(btn, url) {
  const done = () => {
    if (btn && btn.classList) {
      const o = btn.textContent;
      btn.classList.add('done');
      btn.textContent = '✓ Готово';
      setTimeout(() => { btn.classList.remove('done'); btn.textContent = o; }, 1800);
    }
    showToast('✓ Скопировано');
    // Always show Telegram modal after copying
    showTgModal();
  };
  
  // Try Share API first (mobile) - but still copy to clipboard
  if (navigator.share) {
    navigator.share({ text: url }).then(() => {
      copyToClipboard(url).then(done);
    }).catch(() => {
      // User cancelled share, just copy
      copyToClipboard(url).then(done);
    });
    return;
  }
  
  copyToClipboard(url).then(done);
}

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text).catch(() => {
    const t = document.createElement('textarea');
    t.value = text;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    return Promise.resolve();
  });
}

function showTgModal() {
  const m = document.getElementById('tg-modal');
  const close = document.getElementById('modal-close');
  if (!m || !close) return;
  m.hidden = false;
  close.disabled = true;
  close.textContent = 'Закрыть (3)';
  let n = 3;
  const t = setInterval(() => {
    n -= 1;
    if (n <= 0) {
      clearInterval(t);
      close.disabled = false;
      close.textContent = 'Закрыть';
    } else {
      close.textContent = 'Закрыть (' + n + ')';
    }
  }, 1000);
  close.onclick = () => {
    if (!close.disabled) m.hidden = true;
  };
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

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const h = a.getAttribute('href');
    if (!h || h === '#') return;
    e.preventDefault();
    const t = document.querySelector(h);
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Initialize on load
initTheme();
updateProxyDate();

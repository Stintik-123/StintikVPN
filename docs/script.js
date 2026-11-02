// StintikVPN v2 — сайт рендерится из data.json (единый источник данных)

'use strict';

function toggleTheme() {
  const body = document.body;
  const isLight = body.classList.contains('theme-light');
  body.classList.toggle('theme-light', !isLight);
  body.classList.toggle('theme-dark', isLight);
  localStorage.setItem('theme', isLight ? 'dark' : 'light');
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const shouldUseLight = saved === 'light' || (saved !== 'dark' && prefersLight);
  document.body.classList.toggle('theme-light', shouldUseLight);
  document.body.classList.toggle('theme-dark', !shouldUseLight);
}

function toggleNav() {
  document.querySelector('.nav')?.classList.toggle('open');
}

function closeNav() {
  document.querySelector('.nav')?.classList.remove('open');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message || '✓ Скопировано';
  toast.hidden = false;
  requestAnimationFrame(function () { toast.classList.add('show'); });
  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.hidden = true; }, 220);
  }, 1800);
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(function () {
      return legacyCopy(text);
    });
  }
  return legacyCopy(text);
}

function legacyCopy(text) {
  return new Promise(function (resolve) {
    var t = document.createElement('textarea');
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
  copyToClipboard(url).then(function () {
    showToast('✓ Скопировано');
    if (btn) {
      var o = btn.textContent;
      btn.textContent = '✓ Готово';
      setTimeout(function () { btn.textContent = o; }, 1200);
    }
  });
}

function shareUrl(url) {
  if (navigator.share) {
    navigator.share({ url: url }).catch(function () {});
  } else {
    copyToClipboard(url).then(function () { showToast('Ссылка скопирована'); });
  }
}

function showQR(url) {
  var modal = document.getElementById('qr-modal');
  var box = document.getElementById('qrcode');
  if (!modal || !box) return;
  box.innerHTML = '';
  if (typeof QRCode !== 'undefined') {
    new QRCode(box, { text: url, width: 200, height: 200 });
  } else {
    box.textContent = url;
  }
  modal.hidden = false;
}

function closeQR() {
  var modal = document.getElementById('qr-modal');
  if (modal) modal.hidden = true;
}

function toggleFaq(btn) {
  var item = btn.closest('.faq-item');
  if (!item) return;
  item.classList.toggle('open');
}

function filt(f) {
  document.querySelectorAll('.filter').forEach(function (b) {
    b.classList.toggle('active', b.dataset.f === f);
  });
  document.querySelectorAll('.sub-card').forEach(function (card) {
    var cat = card.dataset.cat || 'all';
    card.style.display = (f === 'all' || cat === f) ? '' : 'none';
  });
}

function esc(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"');
}

function renderSub(s) {
  var cat = s.category || 'black';
  var tagClass = cat === 'white' ? 'white' : '';
  var url = esc(s.url);
  return '<div class="sub-card" data-cat="' + esc(cat) + '">' +
    '<div class="sub-info">' +
    '<span class="sub-tag ' + tagClass + '">' + esc(s.tag || cat) + '</span>' +
    '<div class="sub-title">' + esc(s.title) + '</div>' +
    (s.note ? '<div class="sub-note">' + esc(s.note) + '</div>' : '') +
    '</div>' +
    '<div class="sub-actions">' +
    '<button class="btn btn-sm btn-ghost" data-action="qr" data-url="' + url + '">QR</button>' +
    '<button class="btn btn-sm btn-primary" data-action="copy" data-url="' + url + '">Скопировать</button>' +
    '</div></div>';
}

function renderProxy(p) {
  var url = esc(p.url);
  return '<div class="proxy-card">' +
    '<span class="proxy-addr">' + esc(p.addr) + '</span>' +
    '<div class="sub-actions">' +
    '<button class="btn btn-sm btn-ghost" data-action="qr" data-url="' + url + '">QR</button>' +
    '<button class="btn btn-sm btn-primary" data-action="copy" data-url="' + url + '">Скопировать</button>' +
    '<a class="btn btn-sm btn-ghost" href="' + url + '" target="_blank" rel="noopener">Открыть</a>' +
    '</div></div>';
}

function initData(data) {
  var subList = document.getElementById('sub-list');
  var proxyList = document.getElementById('proxy-list');
  if (subList) subList.innerHTML = (data.subscriptions || []).map(renderSub).join('');
  if (proxyList) proxyList.innerHTML = (data.proxies || []).map(renderProxy).join('');

  var dateEl = document.getElementById('proxy-date');
  if (dateEl && data.updated) dateEl.textContent = data.updated;
}

document.addEventListener('click', function (e) {
  var t = e.target instanceof Element ? e.target : null;
  if (!t) return;

  var actionEl = t.closest('[data-action]');
  if (actionEl) {
    var url = actionEl.getAttribute('data-url') || '';
    if (actionEl.dataset.action === 'qr') showQR(url);
    else if (actionEl.dataset.action === 'copy') cp(actionEl, url);
    else if (actionEl.dataset.action === 'share') shareUrl(url);
    return;
  }

  var filter = t.closest('.filter');
  if (filter) { filt(filter.dataset.f); return; }

  var faq = t.closest('.faq-q');
  if (faq) { toggleFaq(faq); return; }

  var a = t.closest('a[href^="#"]');
  if (a) {
    var h = a.getAttribute('href');
    if (!h || h === '#') return;
    e.preventDefault();
    closeNav();
    var target = document.querySelector(h);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

initTheme();

fetch('data.json')
  .then(function (r) { return r.json(); })
  .then(initData)
  .catch(function () {
    showToast('Не удалось загрузить список подписок');
  });

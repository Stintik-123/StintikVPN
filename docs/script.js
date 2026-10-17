// StintikVPN v2 — сайт рендерится из data.json (единый источник данных)

'use strict';

// ---------- Тема ----------

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

// ---------- Навигация ----------

function toggleNav() {
  const links = document.querySelector('.nav-links');
  const ctas = document.querySelector('.nav-ctas');
  if (links) links.classList.toggle('open');
  if (ctas) ctas.classList.toggle('open');
}

function closeNav() {
  const links = document.querySelector('.nav-links');
  const ctas = document.querySelector('.nav-ctas');
  if (links) links.classList.remove('open');
  if (ctas) ctas.classList.remove('open');
}

// ---------- Тост и буфер ----------

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(function () { toast.classList.add('show'); }, 10);
  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.hidden = true; }, 200);
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
    if (btn && btn.classList) {
      var o = btn.textContent;
      btn.classList.add('done');
      btn.textContent = '✓ Готово';
      setTimeout(function () {
        btn.classList.remove('done');
        btn.textContent = o;
      }, 1800);
    }
    showToast('✓ Скопировано');
  });
}

function shareUrl(url) {
  if (!navigator.share) {
    showToast('Поделиться недоступно на этом устройстве');
    return;
  }
  navigator.share({ text: url }).catch(function () {});
}

// ---------- QR ----------

function showQR(url) {
  var modal = document.getElementById('qr-modal');
  var container = document.getElementById('qrcode');
  if (!modal || !container) return;

  container.innerHTML = '';

  if (typeof QRCode === 'undefined') {
    container.innerHTML = '<p style="color:var(--text-2);font-size:0.85rem;padding:12px">QR-библиотека не загрузилась. Обнови страницу.</p>';
    modal.hidden = false;
    return;
  }

  var isLight = document.body.classList.contains('theme-light');

  try {
    new QRCode(container, {
      text: url,
      width: 200,
      height: 200,
      colorDark: isLight ? '#1a1a1e' : '#ececf1',
      colorLight: isLight ? '#ffffff' : '#060608',
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (e) {
    container.innerHTML = '<p style="color:var(--text-2);font-size:0.85rem;padding:12px">Не удалось сгенерировать QR</p>';
  }

  modal.hidden = false;
}

function closeQR() {
  var modal = document.getElementById('qr-modal');
  if (modal) modal.hidden = true;
}

// ---------- Фильтры и FAQ ----------

function filt(cat) {
  document.querySelectorAll('.filter').forEach(function (b) {
    b.classList.toggle('active', b.dataset.f === cat);
  });
  document.querySelectorAll('.sub').forEach(function (r) {
    if (cat === 'all') r.classList.remove('hidden');
    else r.classList.toggle('hidden', r.dataset.c !== cat);
  });
}

function toggleFaq(btn) {
  var item = btn.parentElement;
  var open = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function (x) {
    x.classList.remove('open');
  });
  if (!open) item.classList.add('open');
}

// ---------- Рендер из data.json ----------

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderSub(s) {
  var url = esc(s.url);
  var tagClass = s.category === 'black' ? 'tag-black' : 'tag-white';
  return '<div class="sub" data-c="' + esc(s.category) + '">' +
    '<span class="sub-tag ' + tagClass + '">' + esc(s.tag) + '</span>' +
    '<div class="sub-body"><h4>' + esc(s.title) + '</h4><span>' + esc(s.note) + '</span></div>' +
    '<div class="sub-actions">' +
    '<button class="btn btn-sm btn-qr" data-action="qr" data-url="' + url + '">QR</button>' +
    '<button class="btn btn-sm btn-copy" data-action="copy" data-url="' + url + '">Скопировать</button>' +
    '<button class="btn btn-sm btn-share" data-action="share" data-url="' + url + '">Поделиться</button>' +
    '</div></div>';
}

function renderProxy(p) {
  var url = esc(p.url);
  return '<div class="proxy"><div class="proxy-left"><span class="proxy-type">MTProto</span>' +
    '<span class="proxy-addr">' + esc(p.addr) + '</span></div>' +
    '<div class="sub-actions">' +
    '<button class="btn btn-sm btn-qr" data-action="qr" data-url="' + url + '">QR</button>' +
    '<button class="btn btn-sm btn-copy" data-action="copy" data-url="' + url + '">Скопировать</button>' +
    '<button class="btn btn-sm btn-share" data-action="share" data-url="' + url + '">Поделиться</button>' +
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

// ---------- Один делегированный обработчик кликов ----------

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

  var jump = t.closest('.filter-jump');
  if (jump) {
    filt(jump.dataset.f);
    var s = document.getElementById('subs');
    if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

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

// ---------- Инициализация ----------

initTheme();

fetch('data.json')
  .then(function (r) { return r.json(); })
  .then(initData)
  .catch(function () {
    showToast('Не удалось загрузить список подписок');
  });

// StintikVPN — логика сайта.
// Данные (подписки и прокси) приходят из docs/data.json — это единый источник правды,
// поэтому здесь нет ни одной захардкоженной ссылки.

'use strict';

var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var SCROLL_BEHAVIOR = REDUCED_MOTION ? 'auto' : 'smooth';

// ---------- Тема ----------

function setTheme(theme) {
  var isLight = theme === 'light';
  document.body.classList.toggle('theme-light', isLight);
  document.body.classList.toggle('theme-dark', !isLight);
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    // приватный режим — просто не сохраняем выбор
  }
}

function initTheme() {
  var saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch (e) {
    saved = null;
  }
  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(saved === 'light' || saved === 'dark' ? saved : (prefersLight ? 'light' : 'dark'));
}

function toggleTheme() {
  setTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light');
}

// ---------- Навигация ----------

function setNav(open) {
  var links = document.querySelector('.nav-links');
  var burger = document.querySelector('.nav-burger');
  if (links) links.classList.toggle('open', open);
  if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function toggleNav() {
  var links = document.querySelector('.nav-links');
  setNav(!(links && links.classList.contains('open')));
}

function closeNav() {
  setNav(false);
}

// ---------- Тост ----------

var toastTimer = null;

function showToast(message) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(function () {
    toast.classList.add('show');
  });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () {
      toast.hidden = true;
    }, 200);
  }, 1800);
}

// ---------- Копирование ----------

function legacyCopy(text) {
  return new Promise(function (resolve) {
    var t = document.createElement('textarea');
    t.value = text;
    t.setAttribute('readonly', '');
    t.style.position = 'fixed';
    t.style.left = '-9999px';
    document.body.appendChild(t);
    t.select();
    try {
      document.execCommand('copy');
    } catch (e) {
      // копирование недоступно — покажем тост
    }
    document.body.removeChild(t);
    resolve();
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(function () {
      return legacyCopy(text);
    });
  }
  return legacyCopy(text);
}

function cp(btn, url) {
  copyToClipboard(url).then(function () {
    if (btn && btn.classList) {
      var original = btn.textContent;
      btn.classList.add('done');
      btn.textContent = '✓ Готово';
      setTimeout(function () {
        btn.classList.remove('done');
        btn.textContent = original;
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
  navigator.share({ text: url, url: url }).catch(function () {
    // пользователь закрыл системный диалог
  });
}

// ---------- QR-код ----------

var lastFocused = null;

function showQR(url) {
  var modal = document.getElementById('qr-modal');
  var container = document.getElementById('qrcode');
  if (!modal || !container) return;

  container.innerHTML = '';

  if (typeof QRCode === 'undefined') {
    container.innerHTML = '<p class="qr-hint">QR-библиотека не загрузилась. Обновите страницу.</p>';
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
    container.innerHTML = '<p class="qr-hint">Не удалось построить QR-код</p>';
  }

  lastFocused = document.activeElement;
  modal.hidden = false;

  var close = modal.querySelector('.modal-close');
  if (close) close.focus();
}

function closeQR() {
  var modal = document.getElementById('qr-modal');
  if (!modal || modal.hidden) return;

  modal.hidden = true;

  var container = document.getElementById('qrcode');
  if (container) container.innerHTML = '';

  if (lastFocused && lastFocused.focus) lastFocused.focus();
  lastFocused = null;
}

// ---------- Фильтры и FAQ ----------

function filt(cat) {
  document.querySelectorAll('.filter').forEach(function (b) {
    var active = b.dataset.f === cat;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  document.querySelectorAll('.sub').forEach(function (r) {
    r.classList.toggle('hidden', cat !== 'all' && r.dataset.c !== cat);
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
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSub(s) {
  var url = esc(s.url);
  var tagClass = s.category === 'black' ? 'tag-black' : 'tag-white';
  return '<div class="sub" data-c="' + esc(s.category) + '">' +
    '<span class="sub-tag ' + tagClass + '">' + esc(s.tag) + '</span>' +
    '<div class="sub-body"><h4>' + esc(s.title) + '</h4><span>' + esc(s.note) + '</span></div>' +
    '<div class="sub-actions">' +
    '<button class="btn btn-sm btn-qr" type="button" data-action="qr" data-url="' + url + '">QR</button>' +
    '<button class="btn btn-sm btn-copy" type="button" data-action="copy" data-url="' + url + '">Скопировать</button>' +
    '<button class="btn btn-sm btn-share" type="button" data-action="share" data-url="' + url + '">Поделиться</button>' +
    '</div></div>';
}

function renderProxy(p) {
  var url = esc(p.url);
  return '<div class="proxy"><div class="proxy-left"><span class="proxy-type">MTProto</span>' +
    '<span class="proxy-addr">' + esc(p.addr) + '</span></div>' +
    '<div class="sub-actions">' +
    '<button class="btn btn-sm btn-qr" type="button" data-action="qr" data-url="' + url + '">QR</button>' +
    '<button class="btn btn-sm btn-copy" type="button" data-action="copy" data-url="' + url + '">Скопировать</button>' +
    '<button class="btn btn-sm btn-share" type="button" data-action="share" data-url="' + url + '">Поделиться</button>' +
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
    var action = actionEl.dataset.action;
    var url = actionEl.getAttribute('data-url') || '';
    if (action === 'qr') showQR(url);
    else if (action === 'copy') cp(actionEl, url);
    else if (action === 'share') shareUrl(url);
    else if (action === 'theme') toggleTheme();
    else if (action === 'nav') toggleNav();
    else if (action === 'close-qr') closeQR();
    return;
  }

  var filter = t.closest('.filter');
  if (filter) {
    filt(filter.dataset.f);
    return;
  }

  var jump = t.closest('.filter-jump');
  if (jump) {
    filt(jump.dataset.f);
    var s = document.getElementById('subs');
    if (s) s.scrollIntoView({ behavior: SCROLL_BEHAVIOR, block: 'start' });
    return;
  }

  var faq = t.closest('.faq-q');
  if (faq) {
    toggleFaq(faq);
    return;
  }

  var a = t.closest('a[href^="#"]');
  if (a) {
    var h = a.getAttribute('href');
    if (!h || h === '#') return;
    e.preventDefault();
    closeNav();
    var target = document.querySelector(h);
    if (target) target.scrollIntoView({ behavior: SCROLL_BEHAVIOR, block: 'start' });
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  closeQR();
  closeNav();
});

// ---------- Инициализация ----------

initTheme();

fetch('data.json')
  .then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  })
  .then(initData)
  .catch(function () {
    var subList = document.getElementById('sub-list');
    if (subList) {
      subList.innerHTML = '<p class="list-hint">Не удалось загрузить список подписок. ' +
        'Актуальные ссылки всегда лежат в ' +
        '<a href="https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/docs/data.json">docs/data.json</a>.</p>';
    }
    showToast('Не удалось загрузить список подписок');
  });

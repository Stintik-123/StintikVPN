// Auto-update proxy date
function updateProxyDate() {
  const dateEl = document.getElementById('proxy-date');
  if (!dateEl) return;
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  dateEl.textContent = day + '.' + month + '.' + year;
}

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

// Только копирование в буфер — без системного share
function cp(btn, url) {
  copyToClipboard(url).then(function () {
    if (btn && btn.classList) {
      var o = btn.textContent;
      btn.classList.add('done');
      btn.textContent = '\u2713 \u0413\u043e\u0442\u043e\u0432\u043e';
      setTimeout(function () {
        btn.classList.remove('done');
        btn.textContent = o;
      }, 1800);
    }
    showToast('\u2713 \u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e');
    showTgModal();
  });
}

// Только системный share, без копирования в буфер
function shareUrl(btn, url) {
  if (!navigator.share) {
    showToast('Поделиться недоступно на этом устройстве');
    return;
  }
  navigator.share({ text: url }).catch(function () {
    // пользователь закрыл меню — ничего не копируем
  });
}

function showTgModal() {
  var m = document.getElementById('tg-modal');
  var close = document.getElementById('modal-close');
  if (!m || !close) return;
  m.hidden = false;
  close.disabled = true;
  close.textContent = '\u0417\u0430\u043a\u0440\u044b\u0442\u044c (3)';
  var n = 3;
  var t = setInterval(function () {
    n -= 1;
    if (n <= 0) {
      clearInterval(t);
      close.disabled = false;
      close.textContent = '\u0417\u0430\u043a\u0440\u044b\u0442\u044c';
    } else {
      close.textContent = '\u0417\u0430\u043a\u0440\u044b\u0442\u044c (' + n + ')';
    }
  }, 1000);
  close.onclick = function () {
    if (!close.disabled) m.hidden = true;
  };
}

function toggleFaq(btn) {
  var item = btn.parentElement;
  var open = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function (x) {
    x.classList.remove('open');
  });
  if (!open) item.classList.add('open');
}

function filt(cat) {
  document.querySelectorAll('.filter').forEach(function (b) {
    b.classList.toggle('active', b.dataset.f === cat);
  });
  document.querySelectorAll('.sub').forEach(function (r) {
    if (cat === 'all') r.classList.remove('hidden');
    else {
      var c = (r.dataset.c || '').split(' ');
      r.classList.toggle('hidden', c.indexOf(cat) === -1);
    }
  });
  var s = document.getElementById('subs');
  if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var h = a.getAttribute('href');
    if (!h || h === '#') return;
    e.preventDefault();
    var t = document.querySelector(h);
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

initTheme();
updateProxyDate();

var currentQRUrl = '';

function showQR(btn, url) {
  currentQRUrl = url;
  var modal = document.getElementById('qr-modal');
  var container = document.getElementById('qr-container');
  if (!modal || !container) return;

  container.innerHTML = '';

  if (typeof QRCode === 'undefined') {
    container.innerHTML = '<p style="color:var(--text-2);font-size:0.85rem;padding:12px">QR-библиотека не загрузилась. Обнови страницу.</p>';
    modal.hidden = false;
    return;
  }

  var isLight = document.body.classList.contains('theme-light');
  var colorDark = isLight ? '#1a1a1e' : '#ececf1';
  var colorLight = isLight ? '#ffffff' : '#060608';

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
    container.innerHTML = '<p style="color:var(--text-2);font-size:0.85rem;padding:12px">Не удалось сгенерировать QR</p>';
  }

  var copyBtn = document.querySelector('.qr-copy-btn');
  if (copyBtn) {
    copyBtn.classList.remove('done');
    var label = copyBtn.querySelector('.copy-text');
    if (label) label.textContent = '\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443';
    else copyBtn.textContent = '\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443';
  }

  modal.hidden = false;
}

function closeQR() {
  var modal = document.getElementById('qr-modal');
  if (modal) modal.hidden = true;
  currentQRUrl = '';
}

function copyQR() {
  if (!currentQRUrl) return;
  var copyBtn = document.querySelector('.qr-copy-btn');

  copyToClipboard(currentQRUrl).then(function () {
    if (copyBtn) {
      copyBtn.classList.add('done');
      var label = copyBtn.querySelector('.copy-text');
      if (label) label.textContent = '\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e';
      else copyBtn.textContent = '\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e';
      setTimeout(function () {
        copyBtn.classList.remove('done');
        if (label) label.textContent = '\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443';
        else copyBtn.textContent = '\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443';
      }, 1800);
    }
    showToast('\u2713 \u0421\u0441\u044b\u043b\u043a\u0430 \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u0430');
  }).catch(function () {
    showToast('\u2717 \u041e\u0448\u0438\u0431\u043a\u0430 \u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f');
  });
}

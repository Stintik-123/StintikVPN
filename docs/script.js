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

// Копирование ссылки
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

// Системный share
function shareUrl(btn, url) {
  if (!navigator.share) {
    showToast('Поделиться недоступно на этом устройстве');
    return;
  }
  navigator.share({ text: url }).catch(function () {
    // пользователь закрыл модалку
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

// Scroll Reveal анимация
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        reveal.classList.add('in');
      }
    });
  };
  
  // Проверяем при загрузке
  revealOnScroll();
  
  // И при скролле
  window.addEventListener('scroll', revealOnScroll);
}

// Плавный скролл для всех ссылок
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var h = a.getAttribute('href');
      if (!h || h === '#') return;
      e.preventDefault();
      var t = document.querySelector(h);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// QR код модалка
var currentQRUrl = '';

function showQR(btn, url) {
  currentQRUrl = url;
  var modal = document.getElementById('qr-modal');
  var container = document.getElementById('qrcode');
  if (!modal || !container) return;

  container.innerHTML = '';

  if (typeof QRCode === 'undefined') {
    container.innerHTML = '<p style="color:var(--text-2);font-size:0.85rem;padding:12px">QR-библиотека не загрузилась. Обновите страницу.</p>';
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

  modal.hidden = false;
}

function closeQR() {
  var modal = document.getElementById('qr-modal');
  if (modal) modal.hidden = true;
  currentQRUrl = '';
}

// Счетчики анимация
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const kind = counter.dataset.kind;
        const endValue = getCounterValue(kind);
        animateValue(counter, 0, endValue, 1000);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

function getCounterValue(kind) {
  const data = {
    subs: 5,
    proxies: 5
  };
  return data[kind] || 0;
}

function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Загрузка данных из JSON
async function loadData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Failed to load data');
    const data = await response.json();
    
    // Обновляем дату прокси
    updateProxyDate();
    
    // Загружаем подписки
    loadSubscriptions(data.subscriptions);
    
    // Загружаем прокси
    loadProxies(data.proxies);
    
  } catch (error) {
    console.error('Error loading data:', error);
    // Если не удалось загрузить JSON, используем данные из HTML
    initStaticContent();
  }
}

function loadSubscriptions(subscriptions) {
  const container = document.getElementById('sub-list');
  if (!container) return;
  
  container.innerHTML = subscriptions.map(sub => `
    <div class="sub" data-c="${sub.category}">
      <span class="sub-tag tag-${sub.category}">${sub.tag}</span>
      <div class="sub-body">
        <h4>${sub.title}</h4>
        <span>${sub.note}</span>
      </div>
      <div class="sub-actions">
        <button class="btn btn-sm btn-qr" onclick="showQR(this, '${sub.url}')">QR</button>
        <button class="btn btn-sm btn-copy" onclick="cp(this,'${sub.url}')">Скопировать</button>
        <button class="btn btn-sm btn-share" onclick="shareUrl(this,'${sub.url}')">Поделиться</button>
      </div>
    </div>
  `).join('');
  
  // Инициализируем фильтры
  document.querySelectorAll('.filter-jump').forEach(btn => {
    btn.addEventListener('click', () => {
      filt(btn.dataset.f);
    });
  });
}

function loadProxies(proxies) {
  const container = document.getElementById('proxy-list');
  if (!container) return;
  
  container.innerHTML = proxies.map(proxy => `
    <div class="proxy">
      <div class="proxy-left">
        <span class="proxy-type">MTProto</span>
        <span class="proxy-addr">${proxy.addr}</span>
      </div>
      <div class="sub-actions">
        <button class="btn btn-sm btn-qr" onclick="showQR(this, '${proxy.url}')">QR</button>
        <button class="btn btn-sm btn-copy" onclick="cp(this,'${proxy.url}')">Скопировать</button>
        <button class="btn btn-sm btn-share" onclick="shareUrl(this,'${proxy.url}')">Поделиться</button>
        <a class="btn btn-sm btn-ghost" href="${proxy.url}" target="_blank">Открыть</a>
      </div>
    </div>
  `).join('');
}

function initStaticContent() {
  // Если JSON не загрузился, используем статические данные из HTML
  // Эта функция оставлена для обратной совместимости
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initSmoothScroll();
  initScrollReveal();
  animateCounters();
  loadData();
  
  // Закрываем навигацию при клике вне
  document.addEventListener('click', function(e) {
    const nav = document.querySelector('.nav');
    const burger = document.querySelector('.nav-burger');
    if (nav && burger && !nav.contains(e.target) && !burger.contains(e.target)) {
      closeNav();
    }
  });
});

// Закрываем модалку QR при клике на backdrop
document.addEventListener('click', function(e) {
  const modal = document.getElementById('qr-modal');
  const backdrop = document.querySelector('.modal-backdrop');
  if (modal && !modal.hidden && e.target === backdrop) {
    closeQR();
  }
});

// Закрываем модалку QR при нажатии Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeQR();
    closeNav();
  }
});

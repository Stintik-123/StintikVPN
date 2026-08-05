function cp(btn, url) {
  const done = () => {
    if (btn && btn.classList) {
      const o = btn.textContent;
      btn.classList.add('done');
      btn.textContent = '✓ Готово';
      setTimeout(() => { btn.classList.remove('done'); btn.textContent = o; }, 1800);
    }
    showTgModal();
  };
  navigator.clipboard.writeText(url).then(done).catch(() => {
    const t = document.createElement('textarea');
    t.value = url;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    done();
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

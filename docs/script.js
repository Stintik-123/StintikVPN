function cp(btn, url) {
  navigator.clipboard.writeText(url).then(() => {
    const o = btn.textContent;
    btn.classList.add('done');
    btn.textContent = '✓ Готово';
    showToast();
    setTimeout(() => { btn.classList.remove('done'); btn.textContent = o; }, 1800);
  }).catch(() => {
    const t = document.createElement('textarea');
    t.value = url;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    showToast();
  });
}

function showToast() {
  const el = document.getElementById('toast');
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
    if (cat === 'all') {
      r.classList.remove('hidden');
    } else {
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

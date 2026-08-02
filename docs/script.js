function cp(btn, url) {
  navigator.clipboard.writeText(url).then(() => {
    const o = btn.innerHTML;
    btn.classList.add('ok');
    btn.innerHTML = '✓ Скопировано';
    toast();
    setTimeout(() => { btn.classList.remove('ok'); btn.innerHTML = o; }, 2000);
  }).catch(() => {
    const t = document.createElement('textarea');
    t.value = url; document.body.appendChild(t); t.select();
    document.execCommand('copy'); document.body.removeChild(t); toast();
  });
}
function toast() {
  const el = document.getElementById('toast');
  el.classList.add('on');
  setTimeout(() => el.classList.remove('on'), 2200);
}
function faq(btn) {
  const item = btn.parentElement;
  const open = item.classList.contains('open');
  document.querySelectorAll('.fq').forEach(x => x.classList.remove('open'));
  if (!open) item.classList.add('open');
}
function filt(cat) {
  document.querySelectorAll('.fbtn').forEach(b => b.classList.toggle('on', b.dataset.f === cat));
  document.querySelectorAll('.row').forEach(r => {
    if (cat === 'all') r.classList.remove('hide');
    else {
      const c = (r.dataset.c || '').split(' ');
      r.classList.toggle('hide', !c.includes(cat));
    }
  });
  const s = document.getElementById('subs');
  if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const h = a.getAttribute('href');
    if (h === '#') return;
    e.preventDefault();
    const t = document.querySelector(h);
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

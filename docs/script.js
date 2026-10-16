function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const prev = btn.textContent;
    btn.textContent = 'Скопировано';
    btn.classList.add('done');
    setTimeout(() => {
      btn.textContent = prev;
      btn.classList.remove('done');
    }, 1600);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'OK';
  });
}
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', () => copyText(btn.getAttribute('data-copy'), btn));
});

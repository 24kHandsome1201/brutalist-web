const topbar = document.querySelector('.topbar');
const setTopbar = () => document.documentElement.style.setProperty('--topbar-h', `${topbar.offsetHeight}px`);
setTopbar();
addEventListener('resize', setTopbar);

const navLinks = [...document.querySelectorAll('.topbar__nav a')];
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    for (const a of navLinks) {
      if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    }
  }
}, { rootMargin: '-45% 0px -50% 0px' });
navLinks.forEach((a) => observer.observe(document.querySelector(a.getAttribute('href'))));

const marquee = document.querySelector('.marquee');
const marqueeToggle = marquee.querySelector('.marquee__toggle');
marqueeToggle.addEventListener('click', () => {
  const paused = marquee.classList.toggle('is-paused');
  marqueeToggle.setAttribute('aria-pressed', String(paused));
  marqueeToggle.textContent = paused ? '▶ PLAY' : '❚❚ PAUSE';
});

const form = document.getElementById('submit-form');
const statusEl = form.querySelector('.form__status');
const clearInvalid = (el) => {
  el.removeAttribute('aria-invalid');
  el.removeAttribute('aria-describedby');
  el.closest('.field').classList.remove('is-invalid');
};
const labelOf = (el) => el.labels[0].textContent.split(' / ')[0] + (el.validity.patternMismatch ? '（四位年份 / 4 DIGITS）' : '');
const reportInvalid = (invalid) => {
  statusEl.textContent = invalid.length
    ? `✕ ${invalid.length} 项需要检查：${invalid.map(labelOf).join('、')}`
    : 'STATUS — 等待输入 / AWAITING INPUT';
};
form.addEventListener('input', (e) => {
  if (!e.target.closest('.field') || !e.target.checkValidity()) return;
  clearInvalid(e.target);
  if (statusEl.textContent.startsWith('✕')) reportInvalid([...form.querySelectorAll('.is-invalid input, .is-invalid textarea')]);
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll('.field input, .field textarea')];
  fields.forEach(clearInvalid);
  const invalid = fields.filter((el) => !el.checkValidity());
  if (invalid.length) {
    for (const el of invalid) {
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', 'form-status');
      el.closest('.field').classList.add('is-invalid');
    }
    reportInvalid(invalid);
    invalid[0].focus();
    return;
  }
  const code = `BTN-${form.year.value}-${form.city.value.replace(/[^a-z]/gi, '').slice(0, 3).toUpperCase() || 'XXX'}`;
  statusEl.textContent = `✓ 已收录 ${code} — 等待编辑审核`;
  form.reset();
});

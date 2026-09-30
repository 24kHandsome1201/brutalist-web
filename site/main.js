const form = document.getElementById('submit-form');
const status = form.querySelector('.form__status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const invalid = [...form.elements].find((el) => el.willValidate && !el.checkValidity());
  if (invalid) {
    status.textContent = `✕ 请检查：${invalid.labels[0].textContent}`;
    invalid.focus();
    return;
  }
  const code = `BTN-${form.year.value}-${form.city.value.slice(0, 3).toUpperCase()}`;
  status.textContent = `✓ 已收录 ${code}`;
  form.reset();
});

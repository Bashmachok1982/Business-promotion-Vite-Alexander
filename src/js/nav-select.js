document.addEventListener('change', e => {
  const select = e.target.closest('.nav-select');
  if (!select) return;

  const url = select.value;
  if (url) {
    window.location.href = url;
  }
});

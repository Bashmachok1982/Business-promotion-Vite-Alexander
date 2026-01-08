(() => {
  const toggle = document.querySelector('.theme-toggle');
  const sun = toggle?.querySelector('.sun-icon');
  const moon = toggle?.querySelector('.moon-icon');

  if (!toggle || !sun || !moon) return;

  // Применяем сохранённую тему
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    sun.style.display = 'none';
    moon.style.display = 'block';
  }

  // Переключение
  toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');

    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
      sun.style.display = 'none';
      moon.style.display = 'block';
    } else {
      localStorage.setItem('theme', 'light');
      sun.style.display = 'block';
      moon.style.display = 'none';
    }
  });
})();

(() => {
  // Получаем текущий путь страницы (без слеша в конце)
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  // Все ссылки в навигации хедера
  const navLinks = document.querySelectorAll('.header-link'); // или '.header-list a'

  navLinks.forEach(link => {
    // Убираем класс current у всех
    link.classList.remove('current');

    // Получаем путь ссылки
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';

    // Если путь совпадает с текущим — добавляем класс current
    if (linkPath === currentPath) {
      link.classList.add('current');
    }
  });
})();

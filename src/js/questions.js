const questionItems = document.querySelectorAll('.question-list-item');

// правильные пути для Vite и GitHub Pages
const PLUS_ICON = new URL('/img/plus.webp', import.meta.url).href;
const MINUS_ICON = new URL('/img/minus.webp', import.meta.url).href;

questionItems.forEach(item => {
  const header = item.querySelector('.question-header');

  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // закрываем все вопросы
    questionItems.forEach(el => {
      el.classList.remove('active');

      const icon = el.querySelector('.question-icon');
      if (icon) {
        icon.src = PLUS_ICON;
      }
    });

    // если кликнули по закрытому — открыть
    if (!isActive) {
      item.classList.add('active');

      const icon = item.querySelector('.question-icon');
      if (icon) {
        icon.src = MINUS_ICON;
      }
    }
  });
});

// начальное состояние — все закрыты и плюсики
questionItems.forEach(el => {
  el.classList.remove('active');

  const icon = el.querySelector('.question-icon');
  if (icon) {
    icon.src = PLUS_ICON;
  }
});

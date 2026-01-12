const questionItems = document.querySelectorAll('.question-list-item');

questionItems.forEach(item => {
  const header = item.querySelector('.question-header');

  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Закрываем все вопросы
    questionItems.forEach(el => {
      el.classList.remove('active');

      const icon = el.querySelector('.question-icon');
      if (icon) {
        icon.src = '/img/plus.webp'; // ← ТАК (без точки и слеша)
      }
    });

    // Если кликнули по закрытому — открываем
    if (!isActive) {
      item.classList.add('active');

      const icon = item.querySelector('.question-icon');
      if (icon) {
        icon.src = '/img/minus.webp'; // ← ТАК
      }
    }
  });
});

// Начальное состояние — все закрыты и плюсики
questionItems.forEach(el => {
  el.classList.remove('active');

  const icon = el.querySelector('.question-icon');
  if (icon) {
    icon.src = '/img/plus.webp'; // ← ТАК
  }
});

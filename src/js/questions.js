const questionItems = document.querySelectorAll('.question-list-item');

questionItems.forEach(item => {
  const header = item.querySelector('.question-header');

  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // закрываем все вопросы
    questionItems.forEach(el => {
      el.classList.remove('active');

      const icon = el.querySelector('.question-icon');
      if (icon) {
        icon.src = './img/plus.webp';
      }
    });

    // если кликнули по закрытому — открыть
    if (!isActive) {
      item.classList.add('active');

      const icon = item.querySelector('.question-icon');
      if (icon) {
        icon.src = './img/minus.webp';
      }
    }
  });
});

// начальное состояние — все закрыты и плюсики
questionItems.forEach(el => {
  el.classList.remove('active');

  const icon = el.querySelector('.question-icon');
  if (icon) {
    icon.src = './img/plus.webp';
  }
});

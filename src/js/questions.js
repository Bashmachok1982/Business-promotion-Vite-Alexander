const questionItems = document.querySelectorAll('.question-list-item');

questionItems.forEach(item => {
  const header = item.querySelector('.question-header');

  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Закрываем все
    questionItems.forEach(el => {
      el.classList.remove('active');

      const use = el.querySelector('.question-icon use');
      if (use) {
        use.setAttribute('href', './img/icons.svg#icon-plus_circle');
      }
    });

    // Открываем текущий, если не был активен
    if (!isActive) {
      item.classList.add('active');

      const currentUse = item.querySelector('.question-icon use');
      if (currentUse) {
        currentUse.setAttribute('href', './img/icons.svg#icon-minus_circle');
      }
    }
  });
});

// === ДОБАВЬ ЭТО: ПО УМОЛЧАНИЮ ВСЕ ЗАКРЫТЫ ===
questionItems.forEach(el => {
  el.classList.remove('active');

  const use = el.querySelector('.question-icon use');
  if (use) {
    use.setAttribute('href', './img/icons.svg#icon-plus_circle');
  }
});

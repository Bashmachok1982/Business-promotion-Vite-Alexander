const questionItems = document.querySelectorAll('.question-list-item');

questionItems.forEach(item => {
  const header = item.querySelector('.question-header');

  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    questionItems.forEach(el => {
      el.classList.remove('active');

      const use = el.querySelector('.question-icon use');
      if (use) {
        use.setAttribute('href', './img/icons.svg#icon-plus_circle');
      }
    });

    if (!isActive) {
      item.classList.add('active');

      const currentUse = item.querySelector('.question-icon use');
      if (currentUse) {
        currentUse.setAttribute('href', './img/icons.svg#icon-minus_circle');
      }
    }
  });
});

questionItems.forEach(el => {
  el.classList.remove('active');

  const use = el.querySelector('.question-icon use');
  if (use) {
    use.setAttribute('href', './img/icons.svg#icon-plus_circle');
  }
});

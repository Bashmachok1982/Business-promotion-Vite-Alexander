const questionItems = document.querySelectorAll('.question-list-item');

const PLUS_ICON = new URL('/img/plus.webp', import.meta.url).href;
const MINUS_ICON = new URL('/img/minus.webp', import.meta.url).href;

questionItems.forEach(item => {
  const header = item.querySelector('.question-header');

  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    questionItems.forEach(el => {
      el.classList.remove('active');

      const icon = el.querySelector('.question-icon');
      if (icon) {
        icon.src = PLUS_ICON;
      }
    });

    if (!isActive) {
      item.classList.add('active');

      const icon = item.querySelector('.question-icon');
      if (icon) {
        icon.src = MINUS_ICON;
      }
    }
  });
});

questionItems.forEach(el => {
  el.classList.remove('active');

  const icon = el.querySelector('.question-icon');
  if (icon) {
    icon.src = PLUS_ICON;
  }
});

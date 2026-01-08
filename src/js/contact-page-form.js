(() => {
  const form = document.getElementById('contact-page-form');
  const messageBlock = document.getElementById('contact-page-message');

  if (!form || !messageBlock) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    messageBlock.textContent = '';
    messageBlock.className = 'form-message';

    if (!name || !email) {
      messageBlock.textContent = 'Пожалуйста, заполните имя и email';
      messageBlock.classList.add('error');
      return;
    }

    messageBlock.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
    messageBlock.classList.add('success');

    form.reset();

    setTimeout(() => {
      messageBlock.textContent = '';
      messageBlock.className = 'form-message';
    }, 5000);
  });
})();

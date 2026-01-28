// contact-form.js — форма "Contact our expert" product/staff
// contact-form.js — форма "Get in touch with us"  pricing/enterprise
// contact-form.js — форма "Get in touch with us"  customer/work
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();

    contactMessage.textContent = '';
    contactMessage.style.color = '';

    if (!name || !email) {
      contactMessage.textContent = 'Please fill in your name and email';
      contactMessage.style.color = '#d93025';
      return;
    }

    // Успех — сообщение внутри модалки
    contactMessage.textContent =
      'Thank you! Our expert will contact you shortly.';
    contactMessage.style.color = '#02897a';

    // Очищаем форму
    contactForm.reset();

    // Закрываем модалку через 2 секунды
    setTimeout(() => {
      const backdrop = document.querySelector('[data-modal="contact"]');
      if (backdrop) {
        backdrop.classList.remove('is-modal-open');
        document.body.style.overflow = '';
      }
      contactMessage.textContent = '';
    }, 2000);
  });
}

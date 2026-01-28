// =============== ФОРМА В ФУТЕРЕ (заявка на звонок) ===============
const footerPhoneInput = document.getElementById('footer-phone');
const footerSubmitBtn = document.getElementById('footer-submit-btn');

if (footerSubmitBtn && footerPhoneInput) {
  footerSubmitBtn.addEventListener('click', () => {
    const phone = footerPhoneInput.value.trim();

    // Простая валидация: не пусто и хотя бы 9 символов
    if (!phone) {
      alert('Please enter your phone number');
      return;
    }

    if (phone.replace(/\D/g, '').length < 9) {
      alert('Please enter a valid phone number.');
      return;
    }

    // Имитация успешной отправки
    alert(`Thank you! We will contact you at ${phone} shortly.`);

    // Очищаем поле
    footerPhoneInput.value = '';

    // Здесь в будущем будет реальная отправка:
    // fetch('/api/request-call', { method: 'POST', body: JSON.stringify({ phone }) })
  });
}

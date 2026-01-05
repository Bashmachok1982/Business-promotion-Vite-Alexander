// =============== ФОРМА В ФУТЕРЕ (заявка на звонок) ===============
const footerPhoneInput = document.getElementById('footer-phone');
const footerSubmitBtn = document.getElementById('footer-submit-btn');

if (footerSubmitBtn && footerPhoneInput) {
  footerSubmitBtn.addEventListener('click', () => {
    const phone = footerPhoneInput.value.trim();

    // Простая валидация: не пусто и хотя бы 9 символов (можно улучшить regex)
    if (!phone) {
      alert('Пожалуйста, введите номер телефона');
      return;
    }

    if (phone.replace(/\D/g, '').length < 9) {
      alert('Пожалуйста, введите корректный номер телефона');
      return;
    }

    // Имитация успешной отправки
    alert(`Спасибо! Мы свяжемся с вами по номеру ${phone} в ближайшее время.`);

    // Очищаем поле
    footerPhoneInput.value = '';

    // Здесь в будущем будет реальная отправка:
    // fetch('/api/request-call', { method: 'POST', body: JSON.stringify({ phone }) })
  });
}

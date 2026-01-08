// =============== COMMUNICATIONS FORM (email) ===============
const communicationsForm = document.getElementById('communications-form');

if (communicationsForm) {
  communicationsForm.addEventListener('submit', e => {
    e.preventDefault();

    const emailInput = communicationsForm.querySelector('input');
    const email = emailInput.value.trim();

    if (!email) {
      alert('Пожалуйста, введите email');
      return;
    }

    if (!email.includes('@')) {
      alert('Введите корректный email');
      return;
    }

    // имитация отправки
    alert(`Спасибо! Мы свяжемся с вами по email: ${email}`);

    // очистка поля
    emailInput.value = '';

    // 🔥 будущее API
    // fetch('/api/subscribe', {
    //   method: 'POST',
    //   body: JSON.stringify({ email }),
    // });
  });
}

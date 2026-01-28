// =============== COMMUNICATIONS FORM (email) ===============
const communicationsForm = document.getElementById('communications-form');

if (communicationsForm) {
  communicationsForm.addEventListener('submit', e => {
    e.preventDefault();

    const emailInput = communicationsForm.querySelector('input');
    const email = emailInput.value.trim();

    if (!email) {
      alert('Please, enter email');
      return;
    }

    if (!email.includes('@')) {
      alert('Please enter the correct email');
      return;
    }

    // имитация отправки
    alert(`Thank you! We will contact you by email.: ${email}`);

    // очистка поля
    emailInput.value = '';

    // 🔥 будущее API
    // fetch('/api/subscribe', {
    //   method: 'POST',
    //   body: JSON.stringify({ email }),
    // });
  });
}

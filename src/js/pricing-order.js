import { openModalById } from './modal-core.js';

const LOGIN_FLAG = 'isLoggedIn';

document.querySelectorAll('.pricing-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.getAttribute('data-plan') || 'selected tariff';

    const logged = localStorage.getItem(LOGIN_FLAG) === 'true';

    if (logged) {
      alert(
        `Thank you for ordering the tariff "${plan}"! Our manager will contact you shortly.`
      );
      return;
    }

    sessionStorage.setItem('pendingPlan', plan);

    openModalById('signup');
  });
});

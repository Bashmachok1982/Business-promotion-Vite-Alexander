import { openModalById } from './modal-core.js';

const LOGIN_FLAG = 'isLoggedIn';

document.querySelectorAll('.pricing-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.getAttribute('data-plan') || 'выбранный тариф';

    const logged = localStorage.getItem(LOGIN_FLAG) === 'true';

    if (logged) {
      alert(
        `Спасибо за заказ тарифа "${plan}"! Наш менеджер свяжется с вами в ближайшее время.`
      );
      return;
    }

    sessionStorage.setItem('pendingPlan', plan);

    openModalById('signup');
  });
});

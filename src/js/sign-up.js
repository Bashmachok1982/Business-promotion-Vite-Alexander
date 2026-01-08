import { loadCurrentUser } from './auth.js';
import { closeModalById } from './modal-core.js';

const signupForm = document.getElementById('signup-form');
const signupError = document.getElementById('signup-error');

const STORAGE_KEY = 'currentUser';
const LOGIN_FLAG = 'isLoggedIn';

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = signupForm.name.value.trim();
    const email = signupForm.email.value.trim();
    const password = signupForm.password.value;

    signupError.textContent = '';
    signupError.style.color = '#d93025';

    if (!name || !email || !password) {
      signupError.textContent = 'Заполните все поля';
      return;
    }

    if (password.length < 6) {
      signupError.textContent = 'Пароль должен быть не менее 6 символов';
      return;
    }

    const newUser = { name, email, password };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem(LOGIN_FLAG, 'true');

    loadCurrentUser();

    signupError.textContent = 'Аккаунт создан!';
    signupError.style.color = '#02897a';

    const pendingPlan = sessionStorage.getItem('pendingPlan');
    if (pendingPlan) {
      alert(
        `Спасибо за регистрацию и заказ тарифа "${pendingPlan}"! Мы свяжемся с вами.`
      );
      sessionStorage.removeItem('pendingPlan');
    }

    setTimeout(() => closeModalById('signup'), 800);
  });
}

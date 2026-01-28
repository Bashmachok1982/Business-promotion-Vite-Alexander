import { loadCurrentUser } from './auth.js';
import { closeModalById } from './modal-core.js';

const signinForm = document.getElementById('signin-form');
const signinError = document.getElementById('signin-error');

const STORAGE_KEY = 'currentUser';
const LOGIN_FLAG = 'isLoggedIn';

if (signinForm) {
  signinForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = signinForm.email.value.trim();
    const password = signinForm.password.value;

    signinError.textContent = '';
    signinError.style.color = '#d93025';

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      signinError.textContent = 'User not found';
      return;
    }

    const user = JSON.parse(saved);

    if (user.email !== email || user.password !== password) {
      signinError.textContent = 'Incorrect login or password';
      return;
    }

    localStorage.setItem(LOGIN_FLAG, 'true');

    loadCurrentUser();

    signinError.textContent = 'Successful login!';
    signinError.style.color = '#02897a';

    setTimeout(() => closeModalById('signin'), 800);
  });
}

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
      signupError.textContent = 'Please fill in all fields';
      return;
    }

    if (password.length < 6) {
      signupError.textContent =
        'The password must be at least 6 characters long.';
      return;
    }

    const newUser = { name, email, password };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    localStorage.setItem(LOGIN_FLAG, 'true');

    loadCurrentUser();

    signupError.textContent = 'Account created!';
    signupError.style.color = '#02897a';

    const pendingPlan = sessionStorage.getItem('pendingPlan');
    if (pendingPlan) {
      alert(
        `Thank you for registering and ordering a tariff. "${pendingPlan}"! We will contact you.`
      );
      sessionStorage.removeItem('pendingPlan');
    }

    setTimeout(() => closeModalById('signup'), 800);
  });
}

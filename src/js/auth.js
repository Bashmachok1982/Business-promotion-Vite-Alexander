import { openModalById } from './modal-core.js';

const STORAGE_KEY = 'currentUser';
const LOGIN_FLAG = 'isLoggedIn';

let currentUser = null;

let unauthBlock;
let authBlock;
let userNameSpan;
let logoutBtn;

let featureSignupBtn;
let heroGetStartedBtn;
let promoSignupBtn;

export function loadCurrentUser() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const logged = localStorage.getItem(LOGIN_FLAG) === 'true';

  currentUser = saved ? JSON.parse(saved) : null;

  if (!logged) currentUser = null;

  updateAuthUI();
}

export function updateAuthUI() {
  if (currentUser) {
    if (unauthBlock) unauthBlock.style.display = 'none';
    if (authBlock) authBlock.style.display = 'flex';

    if (userNameSpan) {
      userNameSpan.textContent = `Welcome, ${currentUser.name}`;
    }

    if (featureSignupBtn) featureSignupBtn.style.display = 'none';
    if (heroGetStartedBtn) heroGetStartedBtn.style.display = 'none';
    if (promoSignupBtn) promoSignupBtn.style.display = 'none';
  } else {
    if (unauthBlock) unauthBlock.style.display = 'flex';
    if (authBlock) authBlock.style.display = 'none';

    if (featureSignupBtn) featureSignupBtn.style.display = 'block';
    if (heroGetStartedBtn) heroGetStartedBtn.style.display = 'block';
    if (promoSignupBtn) promoSignupBtn.style.display = 'block';
  }
}

function bindLogout() {
  if (!logoutBtn) return;

  logoutBtn.addEventListener('click', () => {
    localStorage.setItem(LOGIN_FLAG, 'false'); // важный момент

    loadCurrentUser();
    alert('Вы успешно вышли');
  });
}

function bindSignupButtons() {
  const buttons = [featureSignupBtn, heroGetStartedBtn, promoSignupBtn];

  buttons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => openModalById('signup'));
  });
}

function initAuthDOM() {
  unauthBlock = document.querySelector('.header-auth .unauth');
  authBlock = document.querySelector('.header-auth .auth');
  userNameSpan = document.querySelector('.user-name');
  logoutBtn = document.querySelector('.logout-btn');

  featureSignupBtn = document.querySelector('.feature-btn');
  heroGetStartedBtn = document.querySelector('.hero-btn-getstart');
  promoSignupBtn = document.querySelector('.promo-btn');

  bindLogout();
  bindSignupButtons();
  loadCurrentUser();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuthDOM);
} else {
  initAuthDOM();
}

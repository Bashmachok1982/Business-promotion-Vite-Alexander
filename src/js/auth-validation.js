(() => {
  // =========================
  // ЭЛЕМЕНТЫ ИНТЕРФЕЙСА
  // =========================
  const unauthBlock = document.querySelector('.header-auth .unauth');
  const authBlock = document.querySelector('.header-auth .auth');
  const userNameSpan = document.querySelector('.user-name');
  const logoutBtn = document.querySelector('.logout-btn');

  // CTA кнопки регистрации
  const featureSignupBtn = document.querySelector('.feature-btn');
  const heroGetStartedBtn = document.querySelector('.hero-btn-getstart');
  const promoSignupBtn = document.querySelector('.promo-btn');

  const STORAGE_KEY = 'currentUser';

  // =========================
  // СОСТОЯНИЕ ПОЛЬЗОВАТЕЛЯ
  // =========================
  let currentUser = null;

  function loadCurrentUser() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      currentUser = JSON.parse(saved);
    } else {
      currentUser = null;
    }
    updateAuthUI();
  }

  // =========================
  // UI В ЗАВИСИМОСТИ ОТ АВТОРИЗАЦИИ
  // =========================
  function updateAuthUI() {
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

  // =========================
  // МОДАЛКИ (открытие/закрытие)
  // =========================
  function openModalById(modalId) {
    const backdrop = document.querySelector(`[data-modal="${modalId}"]`);
    if (backdrop) {
      backdrop.classList.add('is-modal-open');
      document.body.style.overflow = 'hidden';

      if (modalId === 'video') {
        const iframe = backdrop.querySelector('iframe');
        if (iframe && !iframe.src.includes('autoplay=1')) {
          const separator = iframe.src.includes('?') ? '&' : '?';
          iframe.src += separator + 'autoplay=1';
        }
      }
    }
  }

  function closeModalById(modalId) {
    const backdrop = document.querySelector(`[data-modal="${modalId}"]`);
    if (backdrop) {
      backdrop.classList.remove('is-modal-open');
      document.body.style.overflow = '';

      if (modalId === 'video') {
        const iframe = backdrop.querySelector('iframe');
        if (iframe) {
          iframe.src = iframe.src.replace(/&?autoplay=1/g, '');
        }
      }
    }
  }

  // =========================
  // УНИВЕРСАЛЬНАЯ ПРИВЯЗКА КНОПОК data-modal-open
  // =========================
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-open');
      openModalById(modalId);
    });
  });

  // =========================
  // ЛОГАУТ — ДАННЫЕ ОСТАЮТСЯ В LOCALSTORAGE
  // =========================
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      currentUser = null;
      // НЕ УДАЛЯЕМ localStorage — пользователь остаётся для повторного входа
      loadCurrentUser();
      alert('Вы успешно вышли');
    });
  }

  // =========================
  // ГЛАЗИК ПАРОЛЯ
  // =========================
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn
        .closest('.password-label')
        .querySelector('.password-input');
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
      } else {
        input.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });

  // =========================
  // ИНИЦИАЛИЗАЦИЯ
  // =========================
  loadCurrentUser();
})();

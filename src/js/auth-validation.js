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
  const promoSignupBtn = document.querySelector('.promo-btn'); // если есть такая кнопка

  // Формы и ошибки
  const signinForm = document.getElementById('signin-form');
  const signinError = document.getElementById('signin-error');
  const signupForm = document.getElementById('signup-form');
  const signupError = document.getElementById('signup-error');

  const STORAGE_KEY = 'currentUser';

  // =========================
  // СОСТОЯНИЕ ПОЛЬЗОВАТЕЛЯ
  // =========================
  let currentUser = null;
  const savedUser = localStorage.getItem(STORAGE_KEY);
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }

  // =========================
  // UI В ЗАВИСИМОСТИ ОТ АВТОРИЗАЦИИ
  // =========================
  function updateAuthUI() {
    if (currentUser) {
      // Авторизован
      if (unauthBlock) unauthBlock.style.display = 'none';
      if (authBlock) authBlock.style.display = 'flex';
      if (userNameSpan)
        userNameSpan.textContent = `Welcome, ${currentUser.name}`;

      // Скрываем все CTA-кнопки регистрации
      if (featureSignupBtn) featureSignupBtn.style.display = 'none';
      if (heroGetStartedBtn) heroGetStartedBtn.style.display = 'none';
      if (promoSignupBtn) promoSignupBtn.style.display = 'none';
    } else {
      // Не авторизован
      if (unauthBlock) unauthBlock.style.display = 'flex';
      if (authBlock) authBlock.style.display = 'none';

      // Показываем все CTA-кнопки
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

      // Специально для видео-модалки — добавляем autoplay только при открытии
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

      // Специально для видео — убираем autoplay и останавливаем воспроизведение
      if (modalId === 'video') {
        const iframe = backdrop.querySelector('iframe');
        if (iframe) {
          iframe.src = iframe.src.replace(/&?autoplay=1/g, '');
        }
      }
    }
  }

  // Привязка кнопок к открытию модалки регистрации
  function bindSignupButton(btn) {
    if (!btn) return;
    btn.addEventListener('click', () => openModalById('signup'));
  }

  bindSignupButton(featureSignupBtn);
  bindSignupButton(heroGetStartedBtn);
  bindSignupButton(promoSignupBtn);

  // =========================
  // ЛОГАУТ
  // =========================
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      currentUser = null;
      updateAuthUI();
      alert('Вы успешно вышли');
    });
  }

  // =========================
  // SIGN IN
  // =========================
  if (signinForm) {
    signinForm.addEventListener('submit', e => {
      e.preventDefault();

      const email = signinForm.email.value.trim();
      const password = signinForm.password.value;

      signinError.textContent = '';
      signinError.style.color = '#d93025';

      if (!email || !password) {
        signinError.textContent = 'Заполните все поля';
        return;
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        signinError.textContent = 'Пользователь не найден';
        return;
      }

      const user = JSON.parse(saved);

      if (user.email !== email) {
        signinError.textContent = 'Пользователь с таким email не найден';
      } else if (user.password !== password) {
        signinError.textContent = 'Неправильный пароль';
      } else {
        currentUser = user;
        updateAuthUI();

        signinError.textContent = 'Успешный вход!';
        signinError.style.color = '#02897a';

        setTimeout(() => closeModalById('signin'), 800);
      }
    });
  }

  // =========================
  // SIGN UP
  // =========================
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

      currentUser = { name, email, password };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));

      updateAuthUI();

      signupError.textContent = 'Аккаунт создан!';
      signupError.style.color = '#02897a';

      setTimeout(() => closeModalById('signup'), 800);
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
  updateAuthUI();
})();

(function () {
  const burgerButton = document.querySelector('.menu-toggle');
  const mobileModal = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav a');
  const closeButton = document.querySelector('.menu-close-btn');

  const modalOpenButtonsInMenu =
    mobileModal.querySelectorAll('[data-modal-open]');

  const mobileUnauthBlock = mobileModal.querySelector(
    '.mobile-menu-auth.unauth'
  );
  const mobileAuthBlock = mobileModal.querySelector('.mobile-menu-user.auth');
  const mobileUserName = mobileModal.querySelector('#mobile-user-name');
  const mobileLogoutBtn = mobileModal.querySelector('.logout-btn-mobile');

  const STORAGE_KEY = 'currentUser';
  const LOGIN_FLAG = 'isLoggedIn';

  let currentUser = null;
  let isLoggedIn = false;

  // ============================
  // загрузка состояния
  // ============================
  function loadUserState() {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    const flag = localStorage.getItem(LOGIN_FLAG) === 'true';

    currentUser = savedUser ? JSON.parse(savedUser) : null;
    isLoggedIn = flag;

    if (!isLoggedIn) {
      currentUser = null; // пользователь сохранен, но не залогинен
    }
  }

  // ============================
  // обновление UI мобильного меню
  // ============================
  function updateMobileMenuAuth() {
    loadUserState();

    if (currentUser && isLoggedIn) {
      mobileUnauthBlock.style.display = 'none';
      mobileAuthBlock.style.display = 'flex';

      if (mobileUserName) {
        mobileUserName.textContent = currentUser.name;
      }
    } else {
      mobileUnauthBlock.style.display = 'flex';
      mobileAuthBlock.style.display = 'none';
    }
  }

  // ============================
  // открытие / закрытие меню
  // ============================
  function openModal() {
    updateMobileMenuAuth();
    mobileModal.classList.add('is-open');
  }

  function closeModal() {
    mobileModal.classList.remove('is-open');
  }

  function toggleModal() {
    mobileModal.classList.contains('is-open') ? closeModal() : openModal();
  }

  // ============================
  // обработчики
  // ============================
  burgerButton.addEventListener('click', toggleModal);
  closeButton.addEventListener('click', closeModal);

  navLinks.forEach(link => link.addEventListener('click', closeModal));

  modalOpenButtonsInMenu.forEach(btn =>
    btn.addEventListener('click', () => closeModal())
  );

  // ============================
  // ЛОГАУТ В МОБИЛЬНОМ МЕНЮ
  // ============================
  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener('click', () => {
      // удаляем только флаг входа
      localStorage.setItem(LOGIN_FLAG, 'false');

      // данные пользователя остаются!
      updateMobileMenuAuth();
      closeModal();
      alert('You have successfully logged out.');
    });
  }

  // ============================
  // синхронизация при смене вкладки / обновлении
  // ============================
  window.addEventListener('storage', updateMobileMenuAuth);

  // начальная инициализация
  updateMobileMenuAuth();
})();

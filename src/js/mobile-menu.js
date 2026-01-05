(function () {
  const burgerButton = document.querySelector('.menu-toggle');
  const mobileModal = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav a');
  const closeButton = document.querySelector('.menu-close-btn');

  // Кнопки авторизации внутри мобильного меню
  const modalOpenButtonsInMenu =
    mobileModal.querySelectorAll('[data-modal-open]');

  // Новые элементы для авторизованного состояния в мобильном меню
  const mobileUnauthBlock = mobileModal.querySelector(
    '.mobile-menu-auth.unauth'
  );
  const mobileAuthBlock = mobileModal.querySelector('.mobile-menu-user.auth');
  const mobileUserName = mobileModal.querySelector('#mobile-user-name');
  const mobileLogoutBtn = mobileModal.querySelector('.logout-btn-mobile');

  // Ключ localStorage (должен совпадать с основным скриптом авторизации)
  const STORAGE_KEY = 'currentUser';

  let currentUser = null;

  // Загружаем пользователя при открытии страницы
  const savedUser = localStorage.getItem(STORAGE_KEY);
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }

  // Обновляем состояние мобильного меню (кнопки ↔ приветствие)
  function updateMobileMenuAuth() {
    if (currentUser && mobileUnauthBlock && mobileAuthBlock) {
      mobileUnauthBlock.style.display = 'none';
      mobileAuthBlock.style.display = 'flex';
      if (mobileUserName) {
        mobileUserName.textContent = currentUser.name;
      }
    } else {
      if (mobileUnauthBlock) mobileUnauthBlock.style.display = 'flex';
      if (mobileAuthBlock) mobileAuthBlock.style.display = 'none';
    }
  }

  // Вызываем при загрузке
  updateMobileMenuAuth();

  // Функции открытия/закрытия меню
  function openModal() {
    mobileModal.classList.add('is-open');
    // При каждом открытии меню обновляем состояние авторизации
    updateMobileMenuAuth();
  }

  function closeModal() {
    mobileModal.classList.remove('is-open');
  }

  function toggleModal() {
    if (mobileModal.classList.contains('is-open')) {
      closeModal();
    } else {
      openModal();
    }
  }

  // Обработчики
  burgerButton.addEventListener('click', toggleModal);
  closeButton.addEventListener('click', closeModal);

  // Закрытие по клику на навигационную ссылку
  navLinks.forEach(link => {
    link.addEventListener('click', closeModal);
  });

  // При клике на кнопку Sign In / Sign Up внутри меню — закрываем меню
  modalOpenButtonsInMenu.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal();
      // Модалка авторизации откроется сама благодаря основному скрипту
    });
  });

  // Логаут из мобильного меню
  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener('click', () => {
      currentUser = null;
      // Не удаляем из localStorage (чтобы можно было войти снова)
      updateMobileMenuAuth();
      closeModal(); // закрываем меню после выхода
      alert('Вы успешно вышли');
    });
  }
})();

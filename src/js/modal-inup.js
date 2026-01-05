(() => {
  const openBtns = document.querySelectorAll('[data-modal-open]');
  const closeBtns = document.querySelectorAll('.modal-close');
  const backdrops = document.querySelectorAll('.backdrop');

  console.log('Модалки инициализированы');
  console.log('Кнопок открытия:', openBtns.length);
  console.log('Бэкдропов:', backdrops.length);

  if (openBtns.length === 0) return;

  function openModal(modalId) {
    const backdrop = document.querySelector(`[data-modal="${modalId}"]`);
    if (!backdrop) {
      console.warn('Бэкдроп не найден:', modalId);
      return;
    }
    console.log('Открываем модалку:', modalId);
    backdrop.classList.add('is-modal-open'); // ← изменили
    document.body.style.overflow = 'hidden';
  }

  function closeModal(backdrop) {
    backdrop.classList.remove('is-modal-open'); // ← изменили
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal-open');
      console.log('Клик по кнопке:', btn.textContent.trim(), '→', modalId);
      openModal(modalId);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const backdrop = btn.closest('.backdrop');
      if (backdrop) closeModal(backdrop);
    });
  });

  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      backdrops.forEach(backdrop => {
        if (backdrop.classList.contains('is-modal-open')) {
          // ← изменили
          closeModal(backdrop);
        }
      });
    }
  });
})();

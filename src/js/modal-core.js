// =========================
// ОТКРЫТИЕ МОДАЛКИ
// =========================
export function openModalById(modalId) {
  const backdrop = document.querySelector(`[data-modal="${modalId}"]`);
  if (!backdrop) return;

  backdrop.classList.add('is-modal-open');
  document.body.style.overflow = 'hidden';

  // автоплей видео
  if (modalId === 'video') {
    const iframe = backdrop.querySelector('iframe');
    if (iframe && !iframe.src.includes('autoplay=1')) {
      const separator = iframe.src.includes('?') ? '&' : '?';
      iframe.src += separator + 'autoplay=1';
    }
  }
}

// =========================
// ЗАКРЫТИЕ МОДАЛКИ
// =========================
export function closeModalById(modalId) {
  const backdrop = document.querySelector(`[data-modal="${modalId}"]`);
  if (!backdrop) return;

  backdrop.classList.remove('is-modal-open');
  document.body.style.overflow = '';

  // остановка видео
  if (modalId === 'video') {
    const iframe = backdrop.querySelector('iframe');
    if (iframe) {
      iframe.src = iframe.src.replace(/&?autoplay=1/g, '');
    }
  }
}

// =========================
// ГЛОБАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ
// =========================
document.addEventListener('DOMContentLoaded', () => {
  // кнопки открытия
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal-open');
      openModalById(id);
    });
  });

  // кнопки закрытия
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const backdrop = btn.closest('[data-modal]');
      if (!backdrop) return;
      const id = backdrop.getAttribute('data-modal');
      closeModalById(id);
    });
  });

  // клик по фону
  document.querySelectorAll('[data-modal]').forEach(backdrop => {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) {
        const id = backdrop.getAttribute('data-modal');
        closeModalById(id);
      }
    });
  });

  // ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-modal].is-modal-open').forEach(m => {
        const id = m.getAttribute('data-modal');
        closeModalById(id);
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const placeholders = document.querySelectorAll('.video-placeholder');

  placeholders.forEach(placeholder => {
    placeholder.addEventListener('click', function () {
      const videoId = this.dataset.videoId;

      if (!videoId) {
        console.warn('Нет data-video-id у плейсхолдера');
        return;
      }

      const wrapper = this.closest('.video-wrapper');

      wrapper.innerHTML = `
        <iframe
          src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1"
          title="Product Demo Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      `;
    });
  });
});

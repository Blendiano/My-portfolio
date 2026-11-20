// Screenshot lightbox — enhances a gallery of image links into a keyboard and
// touch friendly viewer. Image, alt text, title and description are read from
// the gallery figures, so no screenshot content is duplicated in JavaScript.
// Without JavaScript the links still open the full-size images.

// Keep this in step with the panel transition in case-study-naijamart.css.
const CLOSE_DURATION = 240;
const SWIPE_THRESHOLD = 45;

function initializeLightbox() {
  const gallery = document.querySelector('[data-gallery]');
  const lightbox = document.querySelector('[data-lightbox]');
  if (!gallery || !lightbox) return;

  // Triggers may live outside the gallery (the hero image is one), so collect
  // them across the page and keep their natural DOM order.
  const triggers = Array.from(document.querySelectorAll('[data-gallery-item]'));
  const panel = lightbox.querySelector('[data-lightbox-panel]');
  const image = lightbox.querySelector('[data-lightbox-image]');
  const title = lightbox.querySelector('[data-lightbox-title]');
  const description = lightbox.querySelector('[data-lightbox-description]');
  const counter = lightbox.querySelector('[data-lightbox-counter]');
  const thumbnails = lightbox.querySelector('[data-lightbox-thumbnails]');
  const stage = lightbox.querySelector('[data-lightbox-stage]');
  const closeButton = lightbox.querySelector('[data-lightbox-close]:not(.nm-lightbox__backdrop)');
  const prevButton = lightbox.querySelector('[data-lightbox-prev]');
  const nextButton = lightbox.querySelector('[data-lightbox-next]');

  if (!triggers.length || !panel || !image || !title || !description || !counter || !thumbnails || !stage || !closeButton || !prevButton || !nextButton) {
    return;
  }

  const screenshots = triggers.map((trigger, index) => {
    const figure = trigger.closest('figure');
    const source = trigger.querySelector('img');
    return {
      trigger,
      src: source?.getAttribute('src') || '',
      alt: source?.getAttribute('alt') || '',
      width: source?.getAttribute('width') || '',
      height: source?.getAttribute('height') || '',
      title: trigger.dataset.title || figure?.querySelector('.nm-figure__title')?.textContent.trim() || `Screenshot ${index + 1}`,
      description: trigger.dataset.description || figure?.querySelector('.nm-figure__text')?.textContent.trim() || ''
    };
  }).filter(shot => shot.src);

  if (!screenshots.length) return;

  let currentIndex = 0;
  let lastFocused = null;
  let previousOverflow = '';
  let closeTimer = null;
  let touchStartX = 0;
  let touchStartY = 0;

  // Keep decoded neighbours ready so prev/next does not flash an empty frame.
  const preloaded = new Map();
  function preloadNeighbours(index) {
    [index - 1, index + 1].forEach(offset => {
      const shot = screenshots[(offset + screenshots.length) % screenshots.length];
      if (!preloaded.has(shot.src)) {
        const neighbour = new Image();
        neighbour.src = shot.src;
        preloaded.set(shot.src, neighbour);
      }
    });
  }

  const thumbnailButtons = screenshots.map((shot, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'nm-lightbox__thumb';
    button.setAttribute('aria-label', `Show screenshot ${index + 1}: ${shot.title}`);

    const thumb = document.createElement('img');
    thumb.src = shot.src;
    thumb.alt = '';
    thumb.width = 76;
    thumb.height = 54;
    thumb.loading = 'lazy';
    thumb.decoding = 'async';

    button.appendChild(thumb);
    button.addEventListener('click', () => render(index, index > currentIndex ? 'next' : 'prev'));
    thumbnails.appendChild(button);
    return button;
  });

  function render(index, direction) {
    currentIndex = (index + screenshots.length) % screenshots.length;
    const shot = screenshots[currentIndex];

    image.src = shot.src;
    image.alt = shot.alt;
    if (shot.width) image.width = Number(shot.width);
    if (shot.height) image.height = Number(shot.height);
    title.textContent = shot.title;
    description.textContent = shot.description;
    counter.textContent = `${currentIndex + 1} of ${screenshots.length}`;

    thumbnailButtons.forEach((button, buttonIndex) => {
      if (buttonIndex === currentIndex) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });

    if (direction) {
      // Restart the CSS animation when someone navigates rapidly.
      image.classList.remove('is-entering-next', 'is-entering-prev');
      void image.offsetWidth;
      image.classList.add(direction === 'next' ? 'is-entering-next' : 'is-entering-prev');
    }

    preloadNeighbours(currentIndex);
  }

  function open(index, trigger) {
    window.clearTimeout(closeTimer);
    lastFocused = trigger || document.activeElement;
    // A fast reopen during the close animation already has the page locked;
    // overwriting the saved value then would leave scrolling disabled forever.
    if (lightbox.hidden) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    lightbox.hidden = false;
    render(index);

    // Let the hidden state paint before adding the class that transitions in.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => lightbox.classList.add('is-open'));
    });
    closeButton.focus();
  }

  function close() {
    if (lightbox.hidden) return;
    lightbox.classList.remove('is-open');

    // Always finish hiding, even if the transition never fires (reduced motion
    // or a background tab). Reopening before then cancels this timer.
    closeTimer = window.setTimeout(() => {
      lightbox.hidden = true;
      document.body.style.overflow = previousOverflow;
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }, CLOSE_DURATION);
  }

  function trapFocus(event) {
    const focusable = Array.from(lightbox.querySelectorAll('button'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      open(index, trigger);
    });
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach(element => {
    element.addEventListener('click', close);
  });

  prevButton.addEventListener('click', () => render(currentIndex - 1, 'prev'));
  nextButton.addEventListener('click', () => render(currentIndex + 1, 'next'));

  document.addEventListener('keydown', event => {
    if (lightbox.hidden) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        render(currentIndex - 1, 'prev');
        break;
      case 'ArrowRight':
        event.preventDefault();
        render(currentIndex + 1, 'next');
        break;
      case 'Home':
        event.preventDefault();
        render(0, 'prev');
        break;
      case 'End':
        event.preventDefault();
        render(screenshots.length - 1, 'next');
        break;
      case 'Tab':
        trapFocus(event);
        break;
      default:
        break;
    }
  });

  stage.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) return;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }, { passive: true });

  stage.addEventListener('touchend', event => {
    if (event.changedTouches.length !== 1) return;
    const distanceX = event.changedTouches[0].clientX - touchStartX;
    const distanceY = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(distanceX) < SWIPE_THRESHOLD || Math.abs(distanceX) < Math.abs(distanceY) * 1.4) return;

    if (distanceX < 0) render(currentIndex + 1, 'next');
    else render(currentIndex - 1, 'prev');
  }, { passive: true });
}

export { initializeLightbox };

/* Shared interactions. The content remains available without JavaScript. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const filmDialog = document.querySelector('#film-dialog');
const ambient = document.querySelector('#ambient');
let currentFilm = null;
let previewEnabled = !reducedMotion.matches;

function embedURL(film, preview = false) {
  const params = new URLSearchParams({h: film.hash, dnt: '1', playsinline: '1', title: '0', byline: '0', portrait: '0'});
  if (preview) {
    params.set('background', '1');
    params.set('muted', '1');
    params.set('autoplay', '1');
    params.set('loop', '1');
    params.set('quality', '540p');
  } else {
    params.set('autoplay', '1');
  }
  return `https://player.vimeo.com/video/${film.id}?${params}`;
}

function updatePreview() {
  if (!ambient || !currentFilm) return;
  ambient.replaceChildren();
  if (previewEnabled && !document.hidden && !filmDialog?.open) {
    const iframe = document.createElement('iframe');
    iframe.title = `${currentFilm.title} — muted motion preview`;
    iframe.src = embedURL(currentFilm, true);
    iframe.allow = 'autoplay; fullscreen';
    iframe.tabIndex = -1;
    iframe.setAttribute('aria-hidden', 'true');
    ambient.append(iframe);
  }
  const toggle = document.querySelector('#motion-toggle');
  toggle.textContent = previewEnabled ? 'Ⅱ' : '▷';
  toggle.setAttribute('aria-label', previewEnabled ? 'Pause motion preview' : 'Play muted motion preview');
  toggle.setAttribute('aria-pressed', String(previewEnabled));
}

document.querySelectorAll('.film-choice').forEach(choice => {
  choice.addEventListener('click', () => {
    if (choice.getAttribute('aria-pressed') === 'true') return;
    selectFilm(choice);
  });
});

function selectFilm(choice) {
  currentFilm = {...choice.dataset};
  document.querySelectorAll('.film-choice').forEach(button => button.setAttribute('aria-pressed', String(button === choice)));
  const poster = document.querySelector('#stage-poster');
  poster.src = currentFilm.poster;
  poster.alt = '';
  document.querySelector('#stage-title').textContent = currentFilm.title;
  document.querySelector('#stage-category').textContent = currentFilm.category;
  document.querySelector('#stage-duration').textContent = currentFilm.duration;
  document.querySelector('#project-link').href = currentFilm.page;
  document.querySelector('#selected-status').textContent = `${currentFilm.number} / ${String(document.querySelectorAll('.film-choice').length).padStart(2, '0')} — ${currentFilm.title}`;
  document.querySelector('#watch-film').setAttribute('aria-label', `Watch ${currentFilm.title}`);
  updatePreview();
}

document.querySelector('#motion-toggle')?.addEventListener('click', () => {
  previewEnabled = !previewEnabled;
  updatePreview();
});
reducedMotion.addEventListener('change', () => { previewEnabled = !reducedMotion.matches; updatePreview(); });
document.addEventListener('visibilitychange', updatePreview);

document.querySelector('#watch-film')?.addEventListener('click', () => {
  if (!currentFilm) return;
  document.querySelector('#film-dialog-title').textContent = currentFilm.title;
  const iframe = document.createElement('iframe');
  iframe.title = currentFilm.title;
  iframe.src = embedURL(currentFilm);
  iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
  iframe.allowFullscreen = true;
  document.querySelector('#film-player').replaceChildren(iframe);
  document.querySelector('#dialog-project-link').href = currentFilm.page;
  document.querySelector('#dialog-vimeo-link').href = `https://vimeo.com/${currentFilm.id}/${currentFilm.hash}`;
  filmDialog.showModal();
  document.body.classList.add('no-scroll');
  updatePreview();
});

document.querySelectorAll('[data-close-dialog]').forEach(button => {
  button.addEventListener('click', () => button.closest('dialog').close());
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => {
    document.body.classList.remove('no-scroll');
    if (dialog === filmDialog) {
      document.querySelector('#film-player').replaceChildren();
      updatePreview();
    }
  });
});

const photoDialog = document.querySelector('#photo-dialog');
const photoButtons = [...document.querySelectorAll('[data-photo]')];
let photoIndex = 0;
function showPhoto(index) {
  photoIndex = (index + photoButtons.length) % photoButtons.length;
  const button = photoButtons[photoIndex];
  const img = document.querySelector('#full-photo');
  img.src = button.dataset.photo;
  img.alt = button.querySelector('img').alt;
  document.querySelector('#photo-counter').textContent = `${String(photoIndex + 1).padStart(2, '0')} / ${String(photoButtons.length).padStart(2, '0')}`;
}
photoButtons.forEach((button, index) => {
  button.addEventListener('click', event => {
    event.preventDefault();
    showPhoto(index);
    photoDialog.showModal();
    document.body.classList.add('no-scroll');
  });
});
document.querySelector('#photo-prev')?.addEventListener('click', () => showPhoto(photoIndex - 1));
document.querySelector('#photo-next')?.addEventListener('click', () => showPhoto(photoIndex + 1));
photoDialog?.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(photoIndex - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(photoIndex + 1); }
});

// Reveal only after the observer is ready; no hidden content if scripts fail.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, {threshold: 0.08});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('js-ready');
}
const initialFilm = document.querySelector('.film-choice[aria-pressed=true]');
if (initialFilm) selectFilm(initialFilm);

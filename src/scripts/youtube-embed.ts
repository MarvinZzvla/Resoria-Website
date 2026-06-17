function loadYoutubeEmbed(button: HTMLButtonElement) {
  if (button.dataset.loaded === 'true') return;

  const embedSrc = button.dataset.embedSrc;
  if (!embedSrc) return;

  button.dataset.loaded = 'true';

  const iframe = document.createElement('iframe');
  iframe.className = 'absolute inset-0 h-full w-full border-0';
  iframe.src = `${embedSrc}?autoplay=1&rel=0`;
  iframe.title = button.getAttribute('aria-label') ?? 'YouTube video';
  iframe.allow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;

  const parent = button.parentElement;
  button.remove();
  parent?.appendChild(iframe);
}

function initYoutubeEmbeds(root: ParentNode = document) {
  root.querySelectorAll<HTMLButtonElement>('.youtube-embed:not([data-loaded])').forEach((button) => {
    button.addEventListener('click', () => loadYoutubeEmbed(button), { once: true });
  });
}

initYoutubeEmbeds();
document.addEventListener('astro:page-load', () => initYoutubeEmbeds());

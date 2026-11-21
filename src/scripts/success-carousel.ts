const SPEED_PX_PER_SEC = 42;

function getStep(track: HTMLElement): number {
  const card = track.querySelector<HTMLElement>('.success-carousel__card');
  if (!card) return 320;
  const styles = getComputedStyle(track);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || '20') || 20;
  return card.offsetWidth + gap;
}

function halfWidth(track: HTMLElement): number {
  return track.scrollWidth / 2;
}

function initSuccessCarousels() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll<HTMLElement>('[data-success-carousel]').forEach((shell) => {
    if (shell.dataset.carouselReady === 'true') return;
    shell.dataset.carouselReady = 'true';

    const track = shell.querySelector<HTMLElement>('[data-success-track]');
    const prev = shell.querySelector<HTMLButtonElement>('[data-success-prev]');
    const next = shell.querySelector<HTMLButtonElement>('[data-success-next]');
    if (!track || !prev || !next) return;

    if (reduceMotion) return;

    let offset = 0;
    let paused = false;
    let lastTs = 0;
    let raf = 0;

    const apply = () => {
      const loopAt = halfWidth(track);
      if (loopAt > 0) {
        while (offset <= -loopAt) offset += loopAt;
        while (offset > 0) offset -= loopAt;
      }
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const delta = (ts - lastTs) / 1000;
      lastTs = ts;

      if (!paused) {
        offset -= SPEED_PX_PER_SEC * delta;
        apply();
      }

      raf = requestAnimationFrame(tick);
    };

    const pause = () => {
      paused = true;
    };

    const resume = () => {
      if (shell.querySelector('iframe')) return;
      paused = false;
      lastTs = 0;
    };

    const nudge = (direction: 1 | -1) => {
      pause();
      offset += direction * getStep(track);
      apply();
      window.setTimeout(resume, 1800);
    };

    prev.addEventListener('click', () => nudge(1));
    next.addEventListener('click', () => nudge(-1));

    shell.addEventListener('mouseenter', pause);
    shell.addEventListener('mouseleave', resume);
    shell.addEventListener('focusin', pause);
    shell.addEventListener('focusout', (event) => {
      if (!shell.contains(event.relatedTarget as Node | null)) resume();
    });

    const observer = new MutationObserver(() => {
      if (shell.querySelector('iframe')) pause();
      else resume();
    });
    observer.observe(shell, { childList: true, subtree: true });

    raf = requestAnimationFrame(tick);

    window.addEventListener(
      'beforeunload',
      () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
      },
      { once: true },
    );
  });
}

initSuccessCarousels();
document.addEventListener('astro:page-load', initSuccessCarousels);

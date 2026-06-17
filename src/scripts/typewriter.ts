export function initTypewriter(element: HTMLElement): void {
  const wordsJson = element.dataset.words;
  if (!wordsJson) return;

  let words: string[];
  try {
    words = JSON.parse(wordsJson) as string[];
  } catch {
    return;
  }

  if (words.length === 0) return;

  const cursor = element.parentElement?.querySelector<HTMLElement>('[data-typewriter-cursor]');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.textContent = words[0];
    if (cursor) cursor.style.display = 'none';
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 90;
  const deleteSpeed = 55;
  const pauseAfterType = 2200;
  const pauseBeforeNext = 350;

  function schedule(next: () => void, delay: number): void {
    window.setTimeout(next, delay);
  }

  function tick(): void {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      charIndex += 1;
      element.textContent = currentWord.slice(0, charIndex);

      if (charIndex >= currentWord.length) {
        schedule(() => {
          isDeleting = true;
          tick();
        }, pauseAfterType);
        return;
      }

      schedule(tick, typeSpeed);
      return;
    }

    charIndex -= 1;
    element.textContent = currentWord.slice(0, charIndex);

    if (charIndex <= 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      schedule(tick, pauseBeforeNext);
      return;
    }

    schedule(tick, deleteSpeed);
  }

  element.textContent = '';
  tick();
}

export function initAllTypewriters(): void {
  document.querySelectorAll<HTMLElement>('[data-typewriter]').forEach(initTypewriter);
}

document.addEventListener('DOMContentLoaded', initAllTypewriters);

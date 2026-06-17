export function initScrollReveal(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
}

export function initContactFormPrefill(): void {
  const params = new URLSearchParams(window.location.search);
  const product = params.get('producto') ?? params.get('product');
  const plan = params.get('plan');

  const productSelect = document.getElementById('contact-product') as HTMLSelectElement | null;
  const planSelect = document.getElementById('contact-plan') as HTMLSelectElement | null;

  if (product && productSelect) productSelect.value = product;
  if (plan && planSelect) planSelect.value = plan;

  if ((product || plan) && window.location.hash === '#contacto') {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initContactFormPrefill();
});

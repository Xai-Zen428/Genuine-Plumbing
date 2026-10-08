(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const header = document.querySelector('.site-header');

  function closeMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !expanded);
    document.body.classList.toggle('menu-open', !expanded);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });

  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 20);
  }, { passive: true });

  document.querySelectorAll('.service-card, .feature, .about-copy, .why-photo, .gallery-item, .reviews-copy, .area-inner, .contact-form, .map-wrap')
    .forEach((element) => element.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach((button) => {
    button.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.full;
      lightboxImage.alt = button.querySelector('img')?.alt || 'Genuine Plumbing project photo';
      lightbox.showModal();
    });
  });
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox?.addEventListener('close', () => {
    if (lightboxImage) lightboxImage.src = '';
  });

  document.querySelector('#quote-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = [
      ['Name', data.get('name')],
      ['Phone', data.get('phone')],
      ['Email', data.get('email') || 'Not provided'],
      ['Service needed', data.get('service')],
      ['Message', data.get('message')],
    ];
    const message = `Hello Genuine Plumbing, I'd like to request a quote.\n\n${fields.map(([label, value]) => `${label}: ${value}`).join('\n')}`;
    window.open(`https://wa.me/27724520988?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();

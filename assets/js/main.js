/* ====== SEPA Dental JavaScript (clean + minimal) ====== */

/* ----- Mobile nav toggle ----- */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.setAttribute('aria-expanded', String(!expanded));
  });
}

/* ----- Form submission toast (client-only) ----- */
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent page reload
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = 'Thank you! We’ll contact you shortly.';
      toast.style.position = 'fixed';
      toast.style.bottom = '1.25rem';
      toast.style.right = '1.25rem';
      toast.style.padding = '0.75rem 1rem';
      toast.style.background = '#0f8a91';
      toast.style.color = '#fff';
      toast.style.fontWeight = '600';
      toast.style.borderRadius = '12px';
      toast.style.boxShadow = '0 4px 14px rgba(0,0,0,0.1)';
      toast.style.transition = 'opacity .3s ease';
      toast.style.opacity = '0';
      document.body.appendChild(toast);
    }
    toast.style.opacity = '1';
    setTimeout(() => (toast.style.opacity = '0'), 2200);
  });
});

const mapFrame = document.getElementById('branch-map');
const mapSelect = document.getElementById('f-branch');

const MAPS = {
  'TTDI': 'https://www.google.com/maps/embed?pb=!1m18!1m12!...TTDI...',
  'Mont Kiara / Publika': 'https://www.google.com/maps/embed?pb=!1m18!1m12!...Publika...',
  'Petaling Jaya': 'https://www.google.com/maps/embed?pb=!1m18!...PJ...',
  'Klang': 'https://www.google.com/maps/embed?pb=!1m18!...Klang...',
  'Subang Jaya': 'https://www.google.com/maps/embed?pb=!1m18!...Subang...',
  'Puchong': 'https://www.google.com/maps/embed?pb=!1m18!...Puchong...',
  'Seremban': 'https://www.google.com/maps/embed?pb=!1m18!...Seremban...',
  'Johor Bahru': 'https://www.google.com/maps/embed?pb=!1m18!...JB...'
};

if (mapFrame && mapSelect) {
  mapSelect.addEventListener('change', () => {
    const url = MAPS[mapSelect.value];
    if (url) mapFrame.src = url;
  });
}

/* --- Header shrink effect on scroll --- */
window.addEventListener('scroll', () => {
  const header = document.querySelector('.fixed-header');
  if (!header) return;

  if (window.scrollY > 60) {  // threshold for animation trigger
    if (!header.classList.contains('shrink')) {
      header.classList.add('shrink');
    }
  } else {
    header.classList.remove('shrink');
  }
});

/* === Scroll-reveal: IntersectionObserver === */
(function(){
  const els = [...document.querySelectorAll('[data-animate], [data-stagger]')];
  if (!('IntersectionObserver' in window) || !els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const once = el.hasAttribute('data-once') || el.getAttribute('data-animate')?.includes('once');

      if (entry.isIntersecting){
        // Support inline delay/duration (e.g., data-delay="150", data-dur="700")
        const delay = el.getAttribute('data-delay');
        const dur   = el.getAttribute('data-dur');
        if (delay) el.style.setProperty('--reveal-delay', `${parseInt(delay,10)}ms`);
        if (dur)   el.style.setProperty('--reveal-dur', `${parseInt(dur,10)}ms`);

        // Stagger children if data-stagger="120" (ms)
        const stagger = parseInt(el.getAttribute('data-stagger') || '0', 10);
        if (stagger && el.children.length){
          [...el.children].forEach((child, i) => {
            child.style.setProperty('--reveal-delay', `${i * stagger}ms`);
            child.setAttribute('data-animate', child.getAttribute('data-animate') || 'up');
            child.classList.add('in-view');
          });
        }

        el.classList.add('in-view');
        if (once) io.unobserve(el);
      } else {
        // Allow repeat animations unless data-once is set
        if (!el.hasAttribute('data-once')){
          el.classList.remove('in-view');
          if (el.hasAttribute('data-stagger')){
            [...el.children].forEach(child => child.classList.remove('in-view'));
          }
        }
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

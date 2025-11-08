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

function createGrandSparkles() {
  const colors = [
    "#ffffff", /* white glow */
    "#7fe4d9", /* mint (brand) */
    "#f6f2e9", /* sand (brand) */
    "#ffd87d", /* soft gold highlight */
    "#a5eaff"  /* spa aqua accent */
  ];

  for (let i = 0; i < 500; i++) { // increase for more explosion
    const s = document.createElement('div');
    s.className = 'sparkle';

    const color = colors[Math.floor(Math.random() * colors.length)];
    s.style.background = color;
    s.style.boxShadow = `0 0 14px ${color}`;

    // random start anywhere on screen
    s.style.left = `${Math.random() * window.innerWidth}px`;
    s.style.top = `${Math.random() * window.innerHeight}px`;

    // slight delay staggering for wave effect
    s.style.animationDelay = `${Math.random() * 0.4}s`;

    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1900);
  }
}

function createConfettiBurstSideEdges() {
  const colors = [
    "#0e8990", // brand teal
    "#ffd87d", // gold
    "#ff7aa2", // rose accent
    "#7fe4d9", // mint
    "#a5eaff", // aqua
    "#f6f2e9", // sand
    "#ffffff"  // highlight white
  ];

  const COUNT = 120; // Confetti amount

  for (let i = 0; i < COUNT; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';

    // Random size
    const w = Math.random() * 6 + 6;
    const h = Math.random() * 10 + 8;
    c.style.setProperty('--w', `${w}px`);
    c.style.setProperty('--h', `${h}px`);

    // Apply color
    const color = colors[Math.floor(Math.random() * colors.length)];
    c.style.background = color;
    c.style.boxShadow = `0 0 8px ${color}`;

    // SIDE origin: 50% chance left, 50% right
    const fromLeft = Math.random() < 0.5;
    const startX = fromLeft ? 0 : window.innerWidth;
    const endX = fromLeft ? (Math.random() * 200 + 150) : (window.innerWidth - (Math.random() * 200 + 150));

    // Random vertical start anywhere on screen
    const startY = Math.random() * window.innerHeight;
    const endY = startY + (Math.random() * 200 - 100); // Slight drift up/down

    // Wind sway + spin
    const wind = (Math.random() * 120 - 60) + 'px';
    const rot = (Math.random() * 360 - 180) + 'deg';

    c.style.left = `${startX}px`;
    c.style.top = `${startY}px`;
    c.style.setProperty('--dx', `${endX - startX}px`);
    c.style.setProperty('--dy', `${endY - startY}px`);
    c.style.setProperty('--wind', wind);
    c.style.setProperty('--rot', rot);
    c.style.animationDelay = `${Math.random() * 0.25}s`;

    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2300);
  }
}

/* Utility: find the center of the primary submit button in a form */
function getFormSubmitCenter(form) {
  const btn = form.querySelector('button, input[type="submit"]');
  if (!btn) {
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }
  const r = btn.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

/* ----- Form submission toast (client-only) ----- */
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent page reload

    // Celebration effects
    createGrandSparkles();
    const { x, y } = getFormSubmitCenter(form);
    createConfettiBurstSideEdges();

    // Toast (kept from your version)
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = 'Thank you! We’ll contact you shortly.';
      toast.style.position = 'fixed';
      toast.style.bottom = '1.25rem';
      toast.style.right = '1.25rem';
      toast.style.padding = '0.75rem 1rem';
      toast.style.background = '#0a4f54';
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

/* ===== Doctors Modal (About page) ===== */
(function(){
  const root = document.getElementById('doctor-modal-root');
  if (!root) return;

  // Map doctor slugs -> details (edit freely later)
  const DOCTORS = {
    "allen-teh": {
      name: "Dr Allen Teh",
      photo: "assets/img/team-1.jpg",
      quote: "Through personal experience, empathy and passion, we know what it takes to create a smile that you’ll love through a unique simple, and predictable experience. We empower people to take action towards revealing their best self with their best smile.”",
      focus: ["Cosmetic Dentistry", "Aligners & Smile Design", "Patient Education"],
      languages: ["English", "Bahasa Malaysia", "中文 (Mandarin)"]
    },
    "sky-liew": {
      name: "Dr Sky Liew",
      photo: "assets/img/team-2.jpg",
      quote: "Your unique smile, our heartfelt artistry. Embrace the authenticity as we create smiles that reflect your true beauty.”",
      focus: ["Aesthetic Restorations", "Whitening", "Minimally Invasive Care"],
      languages: ["English", "Bahasa Malaysia"]
    },
    "darren-yap": {
      name: "Dr Darren Yap",
      photo: "assets/img/team-3.jpg",
      quote: "With Precision and Passion, We sculpt and breathe life into your dream smile, turning it into reality, creating a masterpiece that is unique and unforgettable”",
      focus: ["Veneers", "Full-Mouth Rehab", "Smile Makeovers"],
      languages: ["English", "中文 (Mandarin)"]
    },
    "ck-liew": {
      name: "Dr CK Liew",
      photo: "assets/img/team-4.jpg",
      quote: "The best feeling is when my patients completed their braces journey and tell me they love their smile”",
      focus: ["Orthodontics (Braces)", "Interceptive Ortho", "Retention"],
      languages: ["English", "Bahasa Malaysia"]
    },
    "mckenzie-ee": {
      name: "Dr McKenzie Ee",
      photo: "assets/img/team-5.jpg",
      quote: "Your smile , is worth more than a million dollar”",
      focus: ["Preventive Dentistry", "Checkups & Cleaning", "Patient Comfort"],
      languages: ["English", "Bahasa Malaysia"]
    },
    "casey-lee": {
      name: "Dr Casey Lee",
      photo: "assets/img/team-6.jpg",
      quote: "Creating smile might not change the world, but it could change the world for one person”",
      focus: ["Family Dentistry", "Restorative Care", "Gentle Treatments"],
      languages: ["English", "Bahasa Malaysia"]
    },
    "temmeera-neo": {
      name: "Dr Temmeera Neo",
      photo: "assets/img/team-7.jpg",
      quote: "A beautiful smile, for a beautiful you.”",
      focus: ["Aesthetic Dentistry", "Whitening", "Smile Confidence"],
      languages: ["English"]
    },
    "ng-khai-ling": {
      name: "Dr Ng Khai Ling",
      photo: "assets/img/team-8.jpg",
      quote: "Dentistry is not expensive, neglect is. Don’t forget to get your teeth checked every year!”",
      focus: ["Preventive & Periodontal Care", "Education", "Long-term Maintenance"],
      languages: ["English", "Bahasa Malaysia", "中文 (Mandarin)"]
    },
    "hazel-woon": {
      name: "Dr Hazel Woon",
      photo: "assets/img/team-9.jpg",
      quote: "Seeing my patients smile confidently is the greatest satisfaction to me.”",
      focus: ["Cosmetic & Restorative", "Patient Confidence", "Whitening"],
      languages: ["English", "Bahasa Malaysia"]
    },
    "fan-zhi-yin": {
      name: "Dr Fan Zhi Yin",
      photo: "assets/img/team-10.jpg",
      quote: "There's nothing more gratifying than witnessing my patients' discomfort disappear after treatment.”",
      focus: ["Pain Relief", "Conservative Dentistry", "Patient Comfort"],
      languages: ["English", "Bahasa Malaysia"]
    }
  };

  function renderModal(d){
    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';

    // Card
    const card = document.createElement('div');
    card.className = 'modal-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-modal', 'true');
    card.setAttribute('aria-label', d.name);

    card.innerHTML = `
      <div class="modal-body">
        <figure class="modal-figure">
          <img src="${d.photo}" alt="${d.name}">
        </figure>
        <div>
          <h3 class="modal-title">${d.name}</h3>
          <p class="modal-sub">“${d.quote.replace(/^“|”$/g,'')}”</p>

          ${d.focus?.length ? `
          <div class="modal-meta">
            <strong>Areas of focus</strong>
            <div>${d.focus.map(f=>`<span class="tag">${f}</span>`).join(' ')}</div>
          </div>` : ''}

          ${d.languages?.length ? `
          <div class="modal-meta">
            <strong>Languages</strong>
            <div>${d.languages.join(', ')}</div>
          </div>` : ''}

          <p class="hint">Want to see if ${d.name.split(' ')[1] || d.name} is available at your preferred branch? Tap “Book with ${d.name.split(' ')[0]}”.</p>
        </div>
      </div>
      <div class="modal-actions">
        <button class="modal-close" type="button" data-action="close">Close</button>
        <a class="btn modal-primary" href="contact.html">Book with ${d.name.split(' ')[0]}</a>
      </div>
    `;

    // Mount
    root.innerHTML = '';
    root.appendChild(backdrop);
    root.appendChild(card);

    // Animate in
    requestAnimationFrame(()=>{
      backdrop.classList.add('show');
      card.classList.add('show');
    });

    // Focus management
    const closeBtn = card.querySelector('[data-action="close"]');
    closeBtn?.focus();

    // Events
    function close(){
      backdrop.classList.remove('show');
      card.classList.remove('show');
      setTimeout(()=>{ root.innerHTML=''; }, 200);
      document.removeEventListener('keydown', onKey);
      backdrop.removeEventListener('click', onBackdrop);
      card.removeEventListener('click', onClick);
    }
    function onBackdrop(e){ if (e.target === backdrop) close(); }
    function onClick(e){
      if (e.target.closest('[data-action="close"]')) close();
    }
    function onKey(e){ if (e.key === 'Escape') close(); }

    backdrop.addEventListener('click', onBackdrop);
    card.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
  }

  // Delegate clicks from the doctor grid
  document.querySelectorAll('.doctors .card').forEach(card=>{
    const slug = card.getAttribute('data-doc');
    if (!slug) return;
    card.style.cursor = 'pointer';
    card.setAttribute('tabindex','0'); // keyboard focusable
    card.setAttribute('role','button');
    card.setAttribute('aria-label', `More about ${card.querySelector('h3')?.textContent || 'doctor'}`);

    const open = () => {
      const data = DOCTORS[slug];
      if (data) renderModal(data);
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e)=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
})();

/* === Google Reviews: auto-swipe carousel (looping) === */
(function(){
  const viewport = document.querySelector('.reviews__viewport');
  const track = document.getElementById('reviews-track');
  if (!viewport || !track) return;

  const STEP_MS = 3800;             // time between slides
  const EASE_MS = 700;              // slide transition duration
  let index = 0, timer = null, slideW = 0;

  // Clone slides to allow seamless wrap-around
  const slides = Array.from(track.children);
  slides.forEach(s => track.appendChild(s.cloneNode(true)));

  function setTransition(ms){
    track.style.transition = ms ? `transform ${ms}ms var(--ease)` : 'none';
  }

  function measure(){
    // width of 1 slide + gap
    const first = track.children[0];
    slideW = first.getBoundingClientRect().width +
             parseFloat(getComputedStyle(track).gap || 0);
  }

  function go(i, animate=true){
    setTransition(animate ? EASE_MS : 0);
    track.style.transform = `translateX(${-i * slideW}px)`;
  }

  function tick(){
    index++;
    // when we pass original set, jump back without flash
    if (index > slides.length){
      // jump to equivalent slide in the originals (no animation), then advance one with animation
      index = 1;
      go(0, false);
      requestAnimationFrame(()=>requestAnimationFrame(()=> go(index, true)));
    } else {
      go(index, true);
    }
  }

  function play(){
    stop();
    timer = setInterval(tick, STEP_MS);
  }
  function stop(){ if (timer) clearInterval(timer); }

  // Setup
  measure();
  window.addEventListener('resize', measure, { passive:true });

  // Pause on hover / tab hidden
  viewport.addEventListener('mouseenter', stop);
  viewport.addEventListener('mouseleave', play);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else play();
  });

  // Kick off
  go(0, false);
  play();
})();

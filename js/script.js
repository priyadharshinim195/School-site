// ==========================================================================
// Little Sparks Nursery & Primary School — shared behaviour
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Floating toy background ---------- */
  // One place to edit the toys shown on every page.
  const toys = [
    { icon: '🎈', top: '8%',  left: '4%',  size: '2.4rem', delay: '0s',   rot: '-10deg' },
    { icon: '🧸', top: '70%', left: '3%',  size: '2.8rem', delay: '1.4s', rot: '8deg', mobile:false },
    { icon: '⭐', top: '18%', left: '92%', size: '2rem',   delay: '.7s',  rot: '12deg' },
    { icon: '🪁', top: '55%', left: '95%', size: '2.6rem', delay: '2s',   rot: '-6deg', mobile:false },
    { icon: '🧩', top: '85%', left: '90%', size: '2.2rem', delay: '.3s',  rot: '-14deg' },
    { icon: '🌈', top: '38%', left: '2%',  size: '2.2rem', delay: '1.8s', rot: '0deg', mobile:false },
    { icon: '🎨', top: '92%', left: '50%', size: '2rem',   delay: '.9s',  rot: '10deg', mobile:false },
    { icon: '🚂', top: '4%',  left: '48%', size: '1.9rem', delay: '1.1s', rot: '-4deg', mobile:false },
  ];
  const decor = document.createElement('div');
  decor.className = 'bg-decor';
  decor.setAttribute('aria-hidden', 'true');
  toys.forEach(t => {
    const span = document.createElement('span');
    span.textContent = t.icon;
    span.style.top = t.top;
    span.style.left = t.left;
    span.style.fontSize = t.size;
    span.style.animationDelay = t.delay;
    span.style.setProperty('--r', t.rot);
    if (t.mobile === false) span.classList.add('hide-mobile');
    decor.appendChild(span);
  });
  document.body.prepend(decor);

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close menu after clicking a link (mobile)
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* ---------- Highlight active nav link ---------- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 3D tilt on hero blocks + cards ---------- */
  if (!prefersReduced) {
    const tiltTargets = document.querySelectorAll('.toy-block, .tilt-card');
    tiltTargets.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotY = x * 22;
        const rotX = y * -22;
        el.style.transform = `rotate(${el.classList.contains('toy-block') ? '0' : '0'}deg) perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------- Cookie / consent banner (for AdSense + privacy transparency) ---------- */
  const banner = document.getElementById('consentBanner');
  if (banner) {
    const KEY = 'ls_consent_ack';
    let acked = false;
    try { acked = localStorage.getItem(KEY) === '1'; } catch (e) { /* storage blocked */ }
    if (!acked) {
      setTimeout(() => banner.classList.add('show'), 600);
    }
    const btn = banner.querySelector('button');
    if (btn) {
      btn.addEventListener('click', () => {
        banner.classList.remove('show');
        try { localStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }
      });
    }
  }

  /* ---------- Contact form: front-end validation (no backend wired yet) ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const msg = field.closest('.field').querySelector('.field-msg');
        if (!field.value.trim()) {
          valid = false;
          if (msg) msg.textContent = 'This field is required.';
        } else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
          valid = false;
          if (msg) msg.textContent = 'Please enter a valid email.';
        } else if (msg) {
          msg.textContent = '';
        }
      });
      const status = document.getElementById('formStatus');
      if (valid) {
        status.textContent = "Thanks! Your message looks good. Connect this form to Formspree, Netlify Forms, or your own backend to actually receive it — see the note below.";
        status.style.color = 'var(--grass)';
        form.reset();
      } else {
        status.textContent = 'Please fix the highlighted fields above.';
        status.style.color = 'var(--accent)';
      }
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

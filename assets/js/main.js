// ============================================================
// ByteBrew Inc — Main JavaScript
// ============================================================

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Intersection Observer — fade in sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .process__step, .value, .about__visual, .testimonial-card, .work-card')
  .forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

// Contact form — simple UX (no backend; show friendly message)
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;

  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate a brief pause (replace with real API call)
  setTimeout(() => {
    form.innerHTML = `
      <div style="text-align:center; padding: 48px 0;">
        <div style="font-size:48px; margin-bottom:16px;">✅</div>
        <h3 style="font-size:22px; margin-bottom:8px;">Message received!</h3>
        <p style="color:var(--text-muted)">We'll get back to you within 24 hours.</p>
      </div>
    `;
  }, 800);
});

// Typewriter animation in hero
(function typewriter() {
  const el = document.getElementById('heroTyped');
  if (!el) return;
  const words = ['Great Software', 'Web Apps', 'Fast APIs', 'Dev Tools', 'AI Products'];
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

    let delay = deleting ? 60 : 100;
    if (!deleting && ci > word.length) { delay = 1800; deleting = true; }
    else if (deleting && ci < 0)       { deleting = false; ci = 0; wi = (wi + 1) % words.length; delay = 300; }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 600);
})();

// Smooth scroll offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('nav').offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

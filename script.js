// ---------- Header scroll state ----------
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Mobile nav ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.body.style.overflow = '';
  });
});

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(sec => sectionObserver.observe(sec));

// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ---------- Hero role typing effect ----------
const roles = ['Developer', 'YouTuber', 'IT Consultant'];
const typedEl = document.getElementById('typedRole');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typedEl) {
  if (prefersReducedMotion) {
    typedEl.textContent = roles.join(' · ');
  } else {
    let roleIndex = 0, charIndex = 0, deleting = false;

    const tick = () => {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 45 : 85);
    };
    tick();
  }
}

// ---------- Marquee: duplicate track for seamless loop ----------
const marqueeTrack = document.getElementById('marqueeTrack');
if (marqueeTrack) {
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;
}

// ---------- Contact form (front-end only) ----------
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = `Thanks — this is a demo form, so nothing was sent. Reach me directly at ernest.40frimpong@gmail.com.`;
    formNote.style.color = 'var(--accent)';
    form.reset();
  });
}

// ---------- Footer year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── cursor ── */
const cring = document.getElementById('cring');
const cdot  = document.getElementById('cdot');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cdot.style.left = mx + 'px';
  cdot.style.top  = my + 'px';
});

(function tick() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  cring.style.left = rx + 'px';
  cring.style.top  = ry + 'px';
  requestAnimationFrame(tick);
})();

document.querySelectorAll('a,button,.pers-card,.proj-card,.tl-card,.flow-step').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

/* ── theme ── */
const root     = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const icoSun   = document.getElementById('ico-sun');
const icoMoon  = document.getElementById('ico-moon');

themeBtn.addEventListener('click', () => {
  const dark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', dark ? 'light' : 'dark');
  icoSun.style.display  = dark ? 'block' : 'none';
  icoMoon.style.display = dark ? 'none'  : 'block';
});

/* ── rotating word ── */
const words = ['Engineering Student', 'Software Developer', 'Problem Solver', 'Technology Enthusiast'];
let wi = 0;
const rotw = document.getElementById('rotw');

setInterval(() => {
  rotw.style.opacity   = '0';
  rotw.style.transform = 'translateY(-8px)';
  setTimeout(() => {
    wi = (wi + 1) % words.length;
    rotw.textContent     = words[wi];
    rotw.style.transform = 'translateY(8px)';
    setTimeout(() => {
      rotw.style.opacity   = '1';
      rotw.style.transform = 'translateY(0)';
    }, 30);
  }, 230);
}, 2700);

/* ── nav scroll state ── */
const nav  = document.getElementById('nav');
const navA = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

/* ── mobile menu ── */
const burger   = document.getElementById('burger');
const navlinks = document.getElementById('navlinks');
burger.addEventListener('click', () => navlinks.classList.toggle('open'));
navA.forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));

/* ── scroll reveal ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── skill bars ── */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.sb-fill').forEach(f => {
      setTimeout(() => { f.style.width = f.dataset.w + '%'; }, 120);
    });
    skillObs.unobserve(e.target);
  });
}, { threshold: 0.25 });

const skillSec = document.getElementById('skills');
if (skillSec) skillObs.observe(skillSec);

/* ── photo landing ── */
const photoPh = document.querySelector('.photo-ph');
if (photoPh) {
  const photoObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add('photo-landed'), 250);
      photoObs.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  photoObs.observe(photoPh);
}

/* ── smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - nav.offsetHeight, behavior: 'smooth' });
  });
});

/* ── footer year ── */
document.getElementById('yr').textContent = new Date().getFullYear();

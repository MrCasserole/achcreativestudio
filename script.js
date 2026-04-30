// Mobile hamburger menu
const btn = document.getElementById('hamburger');
const menu = document.getElementById('nav-menu');

if (btn && menu) {
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const clickedInsideMenu = menu.contains(event.target);
    const clickedButton = btn.contains(event.target);

    if (!clickedInsideMenu && !clickedButton) {
      menu.classList.remove('open');
      btn.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}
// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14,
});

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// Custom cursor smooth follow
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

const links = document.querySelectorAll('a, button');

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

links.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
  });

  link.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
  });
});

function animateCursor() {
  currentX += (mouseX - currentX) * 0.15;
  currentY += (mouseY - currentY) * 0.15;

  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;

  requestAnimationFrame(animateCursor);
}

animateCursor();
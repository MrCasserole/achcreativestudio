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
cursor.style.zIndex = '1000000';
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

// LIGHTBOX GALLERY + SWIPE
const galleryImages = Array.from(document.querySelectorAll('.gallery img'));

if (galleryImages.length) {
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';

  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Zamknij">×</button>
    <button class="lightbox-btn lightbox-prev" aria-label="Poprzednie zdjęcie">‹</button>
    <img class="lightbox-img" src="" alt="">
    <button class="lightbox-btn lightbox-next" aria-label="Następne zdjęcie">›</button>
    <div class="lightbox-counter"></div>
  `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const counter = lightbox.querySelector('.lightbox-counter');

  function updateLightbox() {
    const img = galleryImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.classList.add('menu-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') showNext();
    if (event.key === 'ArrowLeft') showPrev();
  });

  lightbox.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });

  lightbox.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) return;

    if (swipeDistance < 0) {
      showNext();
    } else {
      showPrev();
    }
  });
}

// CONTACT FORM (NO REDIRECT)
const form = document.getElementById('form');

if (form) {
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Wysyłam...';
    submitBtn.disabled = true;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert('Wiadomość wysłana 🚀');
        form.reset();
      } else {
        alert('Błąd: ' + data.message);
      }
    } catch (error) {
      alert('Coś poszło nie tak. Spróbuj ponownie.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
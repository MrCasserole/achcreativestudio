(async function () {
  try {
    const response = await fetch('/content/site.json', { cache: 'no-store' });
    if (!response.ok) return;
    const site = await response.json();
    const text = (selector, value) => { const node = document.querySelector(selector); if (node && value != null) node.textContent = value; };

    document.title = site.seo_title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = site.seo_description;

    text('.eyebrow span:first-child', site.hero.location);
    text('.eyebrow span:last-child', site.hero.studio_label);
    const heroCopy = document.querySelector('.hero-bottom p');
    if (heroCopy) heroCopy.innerHTML = `${escapeHtml(site.hero.line)}<br><em>${escapeHtml(site.hero.emphasis)}</em>`;
    const scenes = document.querySelector('.hero-scenes');
    if (scenes && site.hero.images?.length) scenes.innerHTML = site.hero.images.map((src, index) => `<div class="scene scene-${index + 1}" style="animation-delay:${index * .6}s"><img src="${escapeAttribute(src)}" alt="Realizacja ACH Creative Studio" style="animation-delay:${index * .6}s"></div>`).join('');

    const studioHeading = document.querySelector('.intro h1');
    if (studioHeading) studioHeading.innerHTML = `${escapeHtml(site.studio.before)} <em>${escapeHtml(site.studio.emphasis)}</em> ${escapeHtml(site.studio.after)}`;
    text('.intro-note', site.studio.note);
    document.querySelectorAll('.ticker span').forEach((node) => { node.textContent = `${site.ticker} `; });
    text('.section-subtitle', site.projects_intro);

    const servicesHeading = document.querySelector('.services-head h2');
    if (servicesHeading) servicesHeading.innerHTML = `${escapeHtml(site.services_heading.line)}<br><em>${escapeHtml(site.services_heading.emphasis)}</em>`;
    const services = document.querySelector('.services-list');
    if (services) services.innerHTML = site.services.map((service) => `<article class="service"><span>${escapeHtml(service.number)}</span><h3>${escapeHtml(service.title)}</h3><p>${escapeHtml(service.text)}</p></article>`).join('');

    text('.footer-top p', site.contact.kicker);
    const contactHeading = document.querySelector('.contact-heading');
    if (contactHeading) contactHeading.innerHTML = `${escapeHtml(site.contact.prompt)}<br><em>${escapeHtml(site.contact.emphasis)}</em>`;
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => { link.href = `mailto:${site.contact.email}`; link.textContent = site.contact.email; });
    document.querySelectorAll('a[href*="instagram.com"]').forEach((link) => { link.href = site.contact.instagram_url; });
    text('.contact-direct > p:last-child', site.contact.location);
  } catch (_) {}

  function escapeHtml(value) { const element = document.createElement('div'); element.textContent = String(value ?? ''); return element.innerHTML; }
  function escapeAttribute(value) { return escapeHtml(value).replace(/"/g, '&quot;'); }
})();

(async function () {
  const container = document.querySelector('.projects');
  if (!container) return;
  try {
    const response = await fetch('/content/projects.json', { cache: 'no-store' });
    if (!response.ok) return;
    const projects = (await response.json()).filter((project) => project.published).sort((a, b) => Number(a.order) - Number(b.order));
    container.innerHTML = projects.map((project) => `
      <a class="project" href="/project/?slug=${encodeURIComponent(project.slug)}" aria-label="Zobacz galerię projektu ${escapeHtml(project.title)}">
        <div class="project-art"><img src="${escapeAttribute(project.cover)}" alt="${escapeAttribute(project.title)} — realizacja ACH Creative Studio" loading="lazy"></div>
        <div class="project-meta"><h2>${escapeHtml(project.title)}</h2><p>${escapeHtml(project.type)}</p><span>Galeria ↗</span></div>
      </a>`).join('');
    const count = document.querySelector('.section-count');
    if (count) count.textContent = `(${String(projects.length).padStart(2, '0')})`;
  } catch (_) {}
  function escapeHtml(value) { const element = document.createElement('div'); element.textContent = String(value ?? ''); return element.innerHTML; }
  function escapeAttribute(value) { return escapeHtml(value).replace(/"/g, '&quot;'); }
})();


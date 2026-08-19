(async function () {
  const slug = new URLSearchParams(location.search).get('slug');
  try {
    const response = await fetch('/content/projects.json', { cache: 'no-store' });
    if (!response.ok) throw new Error();
    const project = (await response.json()).find((item) => item.slug === slug && item.published);
    if (!project) throw new Error();
    document.title = `${project.title} — ACH! Creative Studio`;
    document.querySelector('#project-type').textContent = project.type;
    document.querySelector('#project-title').textContent = project.title;
    document.querySelector('#project-intro').textContent = project.intro;
    document.querySelector('#project-gallery').setAttribute('aria-label', `Galeria projektu ${project.title}`);
    document.querySelector('#project-gallery').innerHTML = project.images.map((src, index) => `<figure class="${index % 5 === 0 ? 'gallery-wide' : ''}"><img src="${escapeAttribute(src)}" alt="${escapeAttribute(project.title)} — zdjęcie ${index + 1}" loading="${index < 2 ? 'eager' : 'lazy'}"><figcaption>${String(index + 1).padStart(2, '0')} / ${String(project.images.length).padStart(2, '0')}</figcaption></figure>`).join('');
  } catch (_) {
    document.querySelector('#project-title').textContent = 'Nie znaleziono projektu';
    document.querySelector('#project-intro').innerHTML = '<a href="/#projekty">Wróć do listy projektów →</a>';
  }
  function escapeAttribute(value) { const element = document.createElement('div'); element.textContent = String(value ?? ''); return element.innerHTML.replace(/"/g, '&quot;'); }
})();

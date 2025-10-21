// UTIL: Efecto máquina de escribir
(function typewriter() {
  const el = document.querySelector('.typewriter');
  const full = el.textContent.trim();
  el.textContent = '';
  let i = 0;
  const tick = () => {
    el.textContent = full.slice(0, i++);
    if (i <= full.length) requestAnimationFrame(tick);
  };
  tick();
})();

// Fondo de partículas (canvas)
(function particles() {
  const canvas = document.getElementById('bg-particles');
  const ctx = canvas.getContext('2d');
  let w, h; let dots = [];
  const rnd = (min, max) => Math.random() * (max - min) + min;
  const reset = () => { w = canvas.width = window.innerWidth; h = canvas.height = document.querySelector('.hero').offsetHeight; dots = Array.from({ length: Math.floor(w * 0.05) }, () => ({ x: rnd(0, w), y: rnd(0, h), r: rnd(0.6, 2.2), vx: rnd(-0.3, 0.3), vy: rnd(-0.3, 0.3) })); };
  const draw = () => {
    ctx.clearRect(0,0,w,h);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;
      ctx.beginPath();
      const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r*4);
      g.addColorStop(0, 'rgba(124,92,255,.9)');
      g.addColorStop(1, 'rgba(0,212,255,0)');
      ctx.fillStyle = g;
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };
  window.addEventListener('resize', reset);
  reset(); draw();
})();

// Galaxia interactiva (habilidades técnicas)
(function galaxy() {
  const canvas = document.getElementById('galaxy');
  const ctx = canvas.getContext('2d');
  const tooltip = document.getElementById('tooltip');
  const categories = {
    frontend: { color: '#7c5cff' },
    backend: { color: '#ff5c7a' },
    data: { color: '#14d46b' },
    devops: { color: '#00d4ff' }
  };
  const nodes = [
    { label: 'JavaScript', cat: 'frontend' },
    { label: 'TypeScript', cat: 'frontend' },
    { label: 'React', cat: 'frontend' },
    { label: 'Angular', cat: 'frontend' },
    { label: 'Vue', cat: 'frontend' },
    { label: 'Node.js', cat: 'backend' },
    { label: 'Express', cat: 'backend' },
    { label: 'Python', cat: 'backend' },
    { label: 'Django', cat: 'backend' },
    { label: 'SQL', cat: 'data' },
    { label: 'NoSQL', cat: 'data' },
    { label: 'Docker', cat: 'devops' },
    { label: 'Kubernetes', cat: 'devops' },
    { label: 'AWS', cat: 'devops' },
    { label: 'Testing', cat: 'frontend' }
  ];
  let w, h; let balls = []; let mouse = { x: 0, y: 0 };
  const rnd = (min, max) => Math.random() * (max - min) + min;
  const reset = () => {
    w = canvas.width = canvas.clientWidth; h = canvas.height = 420;
    balls = nodes.map(n => ({ n, x: rnd(40, w-40), y: rnd(40, h-40), r: 8, vx: rnd(-0.6,0.6), vy: rnd(-0.6,0.6) }));
  };
  const draw = () => {
    ctx.clearRect(0,0,w,h);
    // conexiones suaves
    for (let i=0;i<balls.length;i++) {
      for (let j=i+1;j<balls.length;j++) {
        const a = balls[i], b = balls[j];
        const dist = Math.hypot(a.x-b.x, a.y-b.y);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(124,92,255,${1-dist/120})`;
          ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    // nodos
    for (const ball of balls) {
      ball.x += ball.vx; ball.y += ball.vy;
      if (ball.x < 14 || ball.x > w-14) ball.vx *= -1;
      if (ball.y < 14 || ball.y > h-14) ball.vy *= -1;
      const color = categories[ball.n.cat].color;
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2); ctx.fill();
      // hover
      if (Math.hypot(mouse.x-ball.x, mouse.y-ball.y) < 16) {
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
        tooltip.style.opacity = 1;
        tooltip.style.left = `${mouse.x}px`; tooltip.style.top = `${mouse.y}px`;
        tooltip.textContent = `${ball.n.label} • ${ball.n.cat}`;
      }
    }
    requestAnimationFrame(draw);
  };
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => tooltip.style.opacity = 0);
  window.addEventListener('resize', reset);
  reset(); draw();
})();

// Soft cards: permitir click para girar en móviles
for (const card of document.querySelectorAll('.soft-card')) {
  card.addEventListener('click', () => card.focus());
}

// Datos de proyectos y grid con filtros + modal
const projects = [
  {
    id: 'p1', tech: ['react','node'],
    title: 'UI Motion Lab',
    description: 'Laboratorio de microinteracciones con animaciones fluidas.',
    long: 'Exploré transiciones GSAP/Framer-like en vanilla CSS/JS para mantener rendimiento. Incluye componentes reusables y patrones accesibles.',
    repo: 'https://github.com/', demo: '#'
  },
  {
    id: 'p2', tech: ['python'],
    title: 'Data Pulse',
    description: 'Visualizaciones interactivas de datos con canvas.',
    long: 'Render de gráficos en tiempo real con algoritmos ligeros y pipeline optimizado. UI reactiva.',
    repo: 'https://github.com/', demo: '#'
  },
  {
    id: 'p3', tech: ['react'],
    title: 'Portfolio Engine',
    description: 'Motor estático para portafolios en GitHub Pages.',
    long: 'Arquitectura estática, accesible y responsive. Despliegue simple y sin dependencias pesadas.',
    repo: 'https://github.com/', demo: '#'
  }
];

const grid = document.getElementById('project-grid');
const modal = document.getElementById('project-modal');
const modalBody = modal.querySelector('.modal-body');
const btnClose = modal.querySelector('.modal-close');

// Idiomas: traducción dinámica y botón con deslizamiento
const current = { lang: 'es' };
const T = {
  es: {
    nav_about: 'Sobre mí', nav_skills: 'Habilidades', nav_projects: 'Proyectos', nav_contact: 'Contacto',
    hero_title: 'Hola, soy <span class="highlight">Juan Jose Arrublas Gutierrez</span>',
    hero_role: 'Desarrollador Full Stack', hero_tagline: 'Transformando ideas en código funcional y hermoso',
    btn_projects: 'Ver Proyectos', btn_explore: 'Explorar',
    about_title: 'Sobre mí', about_subtitle: 'Una breve historia de mi pasión por la programación.',
    skills_title: 'Habilidades', skills_subtitle: 'Una obra de arte interactiva: explora la galaxia técnica y mis soft skills.',
    projects_title: 'Proyectos', projects_subtitle: 'Explora el grid, filtra por tecnología y abre detalles.',
    filter_all: 'Todos', filter_react: 'React', filter_node: 'Node', filter_python: 'Python',
    contact_title: 'Contacto', contact_subtitle: 'Conversemos sobre crear experiencias digitales únicas.',
    label_name: 'Nombre', label_email: 'Correo', label_message: 'Mensaje', submit_button: 'Enviar',
    fallback: 'Si el formulario falla: ', footer_text: '© 2025 Juan Jose Arrublas Gutierrez • "Construyendo experiencias digitales que inspiran"',
    legend: '<span class="dot frontend"></span> Frontend\n          <span class="dot backend"></span> Backend\n          <span class="dot data"></span> Bases de Datos\n          <span class="dot devops"></span> DevOps/Cloud',
    timeline: [
      { t: 'Inicio', p: 'Empecé en el mundo del código por curiosidad y creatividad. Desde entonces, me encanta construir experiencias digitales memorables.' },
      { t: 'Stack favorito', p: 'JavaScript/TypeScript, React, Node.js, y bases de datos SQL/NoSQL. Enfocado en patrones limpios y rendimiento.' },
      { t: 'Filosofía', p: 'Diseño centrado en el usuario, accesibilidad, y atención al detalle. Cada interacción cuenta.' },
      { t: 'Un toque personal', p: 'Me inspira el aprendizaje continuo y la creatividad; fuera del teclado, disfruto retos que potencian el pensamiento crítico.' }
    ],
    soft_front: ['Comunicación','Trabajo en equipo','Resolución de problemas','Adaptabilidad','Liderazgo','Creatividad'],
    soft_back: [
      'Transmiso ideas con claridad y empatía.',
      'Colaboro con ownership y respeto por el proceso.',
      'Divido retos en piezas manejables y elegantes.',
      'Aprendo rápido y me adapto a contextos cambiantes.',
      'Guío con ejemplo y foco en resultados.',
      'Diseño soluciones fuera de lo común.'
    ]
  },
  en: {
    nav_about: 'About', nav_skills: 'Skills', nav_projects: 'Projects', nav_contact: 'Contact',
    hero_title: 'Hi, I\'m <span class="highlight">Juan Jose Arrublas Gutierrez</span>',
    hero_role: 'Full‑Stack Developer', hero_tagline: 'Turning ideas into functional, beautiful code',
    btn_projects: 'View Projects', btn_explore: 'Explore',
    about_title: 'About Me', about_subtitle: 'A brief story of my passion for programming.',
    skills_title: 'Skills', skills_subtitle: 'An interactive work of art: explore the tech galaxy and my soft skills.',
    projects_title: 'Projects', projects_subtitle: 'Browse the grid, filter by stack, and open details.',
    filter_all: 'All', filter_react: 'React', filter_node: 'Node', filter_python: 'Python',
    contact_title: 'Contact', contact_subtitle: 'Let\'s talk about crafting unique digital experiences.',
    label_name: 'Name', label_email: 'Email', label_message: 'Message', submit_button: 'Send',
    fallback: 'If the form fails: ', footer_text: '© 2025 Juan Jose Arrublas Gutierrez • "Building inspiring digital experiences"',
    legend: '<span class="dot frontend"></span> Frontend\n          <span class="dot backend"></span> Backend\n          <span class="dot data"></span> Databases\n          <span class="dot devops"></span> DevOps/Cloud',
    timeline: [
      { t: 'Start', p: 'I entered the code world driven by curiosity and creativity. Since then, I love crafting memorable digital experiences.' },
      { t: 'Favorite Stack', p: 'JavaScript/TypeScript, React, Node.js, and SQL/NoSQL databases. Focused on clean patterns and performance.' },
      { t: 'Philosophy', p: 'User‑centered design, accessibility, and attention to detail. Every interaction matters.' },
      { t: 'Personal touch', p: 'Continuous learning and creativity inspire me; off‑keyboard I enjoy challenges that boost critical thinking.' }
    ],
    soft_front: ['Communication','Teamwork','Problem Solving','Adaptability','Leadership','Creativity'],
    soft_back: [
      'I communicate ideas clearly and empathetically.',
      'I collaborate with ownership and respect for process.',
      'I break down challenges into elegant, manageable pieces.',
      'I learn fast and adapt to changing contexts.',
      'I lead by example with focus on outcomes.',
      'I design out‑of‑the‑box solutions.'
    ]
  }
};

function applyLanguage(lang) {
  const L = T[lang];
  // barra superior
  document.getElementById('nav-about').textContent = L.nav_about;
  document.getElementById('nav-skills').textContent = L.nav_skills;
  document.getElementById('nav-projects').textContent = L.nav_projects;
  document.getElementById('nav-contact').textContent = L.nav_contact;
  const toggleText = document.querySelector('#lang-toggle .toggle-text');
  if (toggleText) toggleText.textContent = lang === 'en' ? 'EN' : 'ES';

  // hero
  const heroTitle = document.getElementById('hero-title');
  heroTitle.innerHTML = `${L.hero_title}`;
  document.getElementById('hero-role').textContent = L.hero_role;
  document.getElementById('hero-tagline').textContent = L.hero_tagline;
  document.getElementById('btn-projects').textContent = L.btn_projects;
  document.getElementById('btn-explore').textContent = L.btn_explore;

  // headers
  document.getElementById('about-title').textContent = L.about_title;
  document.getElementById('about-subtitle').textContent = L.about_subtitle;
  document.getElementById('skills-title').textContent = L.skills_title;
  document.getElementById('skills-subtitle').textContent = L.skills_subtitle;
  document.getElementById('projects-title').textContent = L.projects_title;
  document.getElementById('projects-subtitle').textContent = L.projects_subtitle;
  document.getElementById('contact-title').textContent = L.contact_title;
  document.getElementById('contact-subtitle').textContent = L.contact_subtitle;

  // legend del canvas
  const legend = document.querySelector('.legend');
  if (legend) legend.innerHTML = L.legend;

  // timeline
  const tlItems = document.querySelectorAll('.timeline-item');
  L.timeline.forEach((item, i) => {
    const el = tlItems[i];
    if (!el) return;
    const h3 = el.querySelector('h3'); const p = el.querySelector('p');
    if (h3) h3.textContent = item.t; if (p) p.textContent = item.p;
  });

  // soft skills
  const softCards = document.querySelectorAll('.soft-card');
  softCards.forEach((card, i) => {
    const front = card.querySelector('.front span');
    const back = card.querySelector('.back p');
    if (front) front.textContent = L.soft_front[i];
    if (back) back.textContent = L.soft_back[i];
  });

  // filtros
  document.getElementById('filter-all').textContent = L.filter_all;
  document.getElementById('filter-react').textContent = L.filter_react;
  document.getElementById('filter-node').textContent = L.filter_node;
  document.getElementById('filter-python').textContent = L.filter_python;

  // contacto
  document.getElementById('label-name').textContent = L.label_name;
  document.getElementById('label-email').textContent = L.label_email;
  document.getElementById('label-message').textContent = L.label_message;
  document.getElementById('submit-button').textContent = L.submit_button;
  const fb = document.getElementById('fallback');
  fb.innerHTML = `${L.fallback}<a href="mailto:juan.jose.arrublas@example.com?subject=Portfolio%20Contact">juan.jose.arrublas@example.com</a>`;

  // footer
  document.getElementById('footer-text').textContent = L.footer_text;
}

// botón
document.getElementById('lang-toggle')?.addEventListener('click', () => {
  current.lang = current.lang === 'es' ? 'en' : 'es';
  document.body.classList.toggle('lang-en', current.lang === 'en');
  applyLanguage(current.lang);
  // re-render proyectos para traducir títulos/descripciones
  renderCards(document.querySelector('.filter.active')?.dataset.filter || 'all');
});

function openProject(p) {
  modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
  modalBody.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.long}</p>
    <div class="modal-actions">
      <a class="btn" href="${p.demo}" target="_blank" rel="noreferrer">Demo</a>
      <a class="btn" href="${p.repo}" target="_blank" rel="noreferrer">Repositorio</a>
    </div>
  `;
}
btnClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
function closeModal() { modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); }

// Filtros
for (const b of document.querySelectorAll('.filter')) {
  b.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); renderCards(b.dataset.filter);
  });
}

// Contacto: UX de envío
const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
  if (res.ok) {
    alert('¡Gracias! Te responderé pronto.'); form.reset();
  } else {
    alert('No se pudo enviar. Usa el correo de fallback, por favor.');
  }
});

// Datos de proyectos bilingües
const projectsES = [
  {
    id: 'p1', tech: ['react','node'],
    title: 'UI Motion Lab',
    description: 'Laboratorio de microinteracciones con animaciones fluidas.',
    long: 'Exploré transiciones GSAP/Framer-like en vanilla CSS/JS para mantener rendimiento. Incluye componentes reusables y patrones accesibles.',
    repo: 'https://github.com/', demo: '#'
  },
  {
    id: 'p2', tech: ['python'],
    title: 'Data Pulse',
    description: 'Visualizaciones interactivas de datos con canvas.',
    long: 'Render de gráficos en tiempo real con algoritmos ligeros y pipeline optimizado. UI reactiva.',
    repo: 'https://github.com/', demo: '#'
  },
  {
    id: 'p3', tech: ['react'],
    title: 'Portfolio Engine',
    description: 'Motor estático para portafolios en GitHub Pages.',
    long: 'Arquitectura estática, accesible y responsive. Despliegue simple y sin dependencias pesadas.',
    repo: 'https://github.com/', demo: '#'
  }
];

const projectsEN = [
  {
    id: 'p1', tech: ['react','node'],
    title: 'UI Motion Lab',
    description: 'Micro‑interactions lab with fluid animations.',
    long: 'Explored GSAP/Framer‑like transitions in vanilla CSS/JS to keep performance. Reusable components and accessible patterns.',
    repo: 'https://github.com/', demo: '#'
  },
  {
    id: 'p2', tech: ['python'],
    title: 'Data Pulse',
    description: 'Interactive data visualizations using canvas.',
    long: 'Real‑time chart rendering with lightweight algorithms and optimized pipeline. Reactive UI.',
    repo: 'https://github.com/', demo: '#'
  },
  {
    id: 'p3', tech: ['react'],
    title: 'Portfolio Engine',
    description: 'Static engine for portfolios on GitHub Pages.',
    long: 'Static, accessible and responsive architecture. Simple deployment with no heavy dependencies.',
    repo: 'https://github.com/', demo: '#'
  }
];

const getProjects = () => (current.lang === 'en' ? projectsEN : projectsES);

function renderCards(filter = 'all') {
  grid.innerHTML = '';
  const list = getProjects().filter(p => filter === 'all' || p.tech.includes(filter));
  for (const p of list) {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <div class="card-thumb">${p.title}</div>
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <p>${p.description}</p>
        <div class="card-tags">${p.tech.map(t=>`<span class='tag'>${t}</span>`).join('')}</div>
      </div>
    `;
    el.addEventListener('click', () => openProject(p));
    grid.appendChild(el);
  }
}

// Inicializar (aplicar idioma por defecto y renderizar)
applyLanguage('es');
renderCards('all');
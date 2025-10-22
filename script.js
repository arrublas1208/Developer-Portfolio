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
    devops: { color: '#00d4ff' },
    tools: { color: '#9fb0d3' }
  };
  const nodes = [
    // Frontend
    { label: 'JavaScript', cat: 'frontend' },
    { label: 'TypeScript', cat: 'frontend' },
    { label: 'React', cat: 'frontend' },
    { label: 'Angular', cat: 'frontend' },
    { label: 'HTML5', cat: 'frontend' },
    { label: 'CSS3', cat: 'frontend' },
    { label: 'Testing', cat: 'frontend' },

    // Backend
    { label: 'Node.js', cat: 'backend' },
    { label: 'Java', cat: 'backend' },
    { label: 'Spring Boot', cat: 'backend' },
    { label: 'Python', cat: 'backend' },

    // Bases de Datos
    { label: 'MySQL', cat: 'data' },
    { label: 'PostgreSQL', cat: 'data' },

    // DevOps/Cloud
    { label: 'Docker', cat: 'devops' },

    // Herramientas y Otros
    { label: 'Git/GitHub', cat: 'tools' },
    { label: 'VS Code', cat: 'tools' },
    { label: 'Figma', cat: 'tools' },
    { label: 'Linux/Shell', cat: 'tools' },
    { label: 'NetBeans', cat: 'tools' },
    { label: 'IntelliJ IDEA', cat: 'tools' }
    
  ];
  window.TechNodes = nodes;
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
    filter_all: 'Todos', filter_js: 'JavaScript', filter_java: 'Java', filter_sql: 'SQL', filter_html: 'HTML', filter_python: 'Python', filter_ts: 'TypeScript',
    contact_title: 'Contacto', contact_subtitle: 'Conversemos sobre crear experiencias digitales únicas.',
    label_name: 'Nombre', label_email: 'Correo', label_message: 'Mensaje', submit_button: 'Enviar',
    fallback: 'Si el formulario falla: ', footer_text: '© 2025 Juan Jose Arrublas Gutierrez • "Construyendo experiencias digitales que inspiran"',
    legend: '<span class="dot frontend"></span> Frontend\n          <span class="dot backend"></span> Backend\n          <span class="dot data"></span> Bases de Datos\n          <span class="dot devops"></span> DevOps/Cloud\n          <span class="dot tools"></span> Herramientas/Otros',
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
    filter_all: 'All', filter_js: 'JavaScript', filter_java: 'Java', filter_sql: 'SQL', filter_html: 'HTML', filter_python: 'Python', filter_ts: 'TypeScript',
    contact_title: 'Contact', contact_subtitle: 'Let\'s talk about crafting unique digital experiences.',
    label_name: 'Name', label_email: 'Email', label_message: 'Message', submit_button: 'Send',
    fallback: 'If the form fails: ', footer_text: '© 2025 Juan Jose Arrublas Gutierrez • "Building inspiring digital experiences"',
    legend: '<span class="dot frontend"></span> Frontend\n          <span class="dot backend"></span> Backend\n          <span class="dot data"></span> Databases\n          <span class="dot devops"></span> DevOps/Cloud\n          <span class="dot tools"></span> Tools/Other',
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
  document.getElementById('filter-js').textContent = L.filter_js;
  document.getElementById('filter-java').textContent = L.filter_java;
  document.getElementById('filter-sql').textContent = L.filter_sql;
  document.getElementById('filter-html').textContent = L.filter_html;
  document.getElementById('filter-python').textContent = L.filter_python;
  document.getElementById('filter-ts').textContent = L.filter_ts;

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
  // JavaScript
  {
    id: 'js1', tech: ['javascript'],
    title: 'Acme Bank',
    image: 'img/ACME-BANCK.png',
    description: 'Autogestión bancaria: login, operaciones básicas, reportes y seguridad.',
    long: 'Aplicación web de autogestión de cuentas bancarias. Incluye autenticación en tiempo real, registro, recuperación de contraseña, depósitos electrónicos, retiros, pagos de servicios, consulta de saldo, estados de cuenta y certificados digitales. Persiste datos con LocalStorage y Firebase; diseño responsivo y validaciones seguras.',
    repo: 'https://github.com/arrublas1208/Acme-Bank', demo: '#'
  },
  {
    id: 'js2', tech: ['javascript'],
    title: 'Gestor de Turnos (Electron)',
    image: 'img/gestor-turnos.png',
    description: 'App de escritorio para programación semanal con arrastrar y soltar.',
    long: 'Aplicación de escritorio para Windows que gestiona empleados y turnos (mañana/tarde) con validaciones, reglas por cargo, bloqueo inteligente de novedades (descansos, vacaciones, incapacidad), exportación a Excel y respaldo/restauración en JSON. Paquetizada con instalador y portable.',
    repo: 'https://github.com/arrublas1208/GESTOR-TURNOS', demo: '#'
  },
  // Java
  {
    id: 'java1', tech: ['java'],
    title: 'HappyFeet Veterinaria',
    image: 'img/HAPPY-FEET.png',
    description: 'Sistema integral en Java (MVC): pacientes, citas, inventario y facturación.',
    long: 'Arquitectura MVC robusta con módulos de pacientes, agenda médica con estados, consultas completas, control de inventario con alertas, proveedores, facturación con IVA y múltiples pagos, reportes y dashboard. Incluye patrones (Builder, Factory, Singleton, Observer, Repository) y principios SOLID.',
    repo: 'https://github.com/arrublas1208/HAPPY-FEET', demo: '#'
  },
  // SQL
  {
    id: 'sql1', tech: ['sql'],
    title: 'Proyecto SQL',
    image: 'img/MYSQL.png',
    description: 'Colección de esquemas y consultas SQL.',
    long: 'Proyecto centrado en scripts SQL: definición de tablas, integridad referencial y consultas útiles para reportes y análisis. Enfoque en claridad y rendimiento.',
    repo: 'https://github.com/arrublas1208/PROYECTO_SQL', demo: '#'
  },
  // HTML
  {
    id: 'html1', tech: ['html'],
    title: 'Planificador de Bodas (Fotografía)',
    image: 'img/PLANIFICADOR-BODAS.png',
    description: 'Página web de portafolio con servicios y contacto.',
    long: 'Sitio web de fotografía de bodas con galería interactiva, información de paquetes y formulario de contacto. Diseño elegante, minimalista y completamente responsivo.',
    repo: 'https://github.com/arrublas1208/Planificador-de-Bodas', demo: '#'
  },
  // Python
  {
    id: 'py1', tech: ['python'],
    title: 'Gestor de Tareas (Python)',
    image: 'img/gestor-tareas.png',
    description: 'Aplicación de consola para organizar tareas.',
    long: 'Gestor de tareas en Python con operaciones básicas de alta/edición/eliminación y persistencia simple. Ideal para flujos de trabajo rápidos en consola.',
    repo: 'https://github.com/arrublas1208/Gestor-de-tareas-PY', demo: '#'
  },
  {
    id: 'py2', tech: ['python'],
    title: 'Sistema de Gestión de Población',
    image: 'img/SISTEMA-GESTION-POBLACION.png',
    description: 'Consola con JSON, reportes y consultas de población por país.',
    long: 'Aplicación de consola que gestiona y consulta datos de población usando JSON local. Menú interactivo con múltiples reportes: rangos de años, crecimiento, totales por año, países con datos, promedios y más. Sin dependencias externas.',
    repo: 'https://github.com/arrublas1208/Sistema-de-Gestion-de-Poblacion-PY', demo: '#'
  },
  // TypeScript
  {
    id: 'ts1', tech: ['typescript'],
    title: 'BK_TimeProof (NestJS)',
    description: 'Backend TypeScript con NestJS, Prisma y despliegue en Render.',
    long: 'Repositorio NestJS con configuración para desarrollo y producción: scripts de arranque, cobertura de tests, CORS, health check y despliegue en Render con Neon PostgreSQL. Incluye Dockerfile multi-stage y notas para Prisma/migraciones.',
    repo: 'https://github.com/arrublas1208/BK_TimeProof', demo: '#'
  }
];

const projectsEN = [
  // JavaScript
  {
    id: 'js1', tech: ['javascript'],
    title: 'Acme Bank',
    image: 'img/ACME-BANCK.png',
    description: 'Self‑management banking: auth, basic ops, reports and security.',
    long: 'Web app for banking self‑management. Real‑time login validation, registration, password recovery, electronic deposits, withdrawals, utility payments, balance check, statements and digital certificates. Data persistence via LocalStorage/Firebase; responsive design and secure validation.',
    repo: 'https://github.com/arrublas1208/Acme-Bank', demo: '#'
  },
  {
    id: 'js2', tech: ['javascript'],
    title: 'Shift Scheduler (Electron)',
    image: 'img/gestor-turnos.png',
    description: 'Desktop app for weekly scheduling with drag & drop.',
    long: 'Windows desktop app to manage employees and shifts (AM/PM) with validations, role rules, smart blocking for time‑off/vacations/incapacity, Excel export and JSON backup/restore. Packaged with installer and portable build.',
    repo: 'https://github.com/arrublas1208/GESTOR-TURNOS', demo: '#'
  },
  // Java
  {
    id: 'java1', tech: ['java'],
    title: 'HappyFeet Veterinary',
    image: 'img/HAPPY-FEET.png',
    description: 'Java MVC system: patients, appointments, inventory and billing.',
    long: 'Robust MVC architecture with modules for patients, smart agenda with states, full consultations, inventory control with alerts, suppliers, billing with VAT and multiple payments, reports and dashboard. Implements design patterns and SOLID principles.',
    repo: 'https://github.com/arrublas1208/HAPPY-FEET', demo: '#'
  },
  // SQL
  {
    id: 'sql1', tech: ['sql'],
    title: 'SQL Project',
    image: 'img/MYSQL.png',
    description: 'Collection of SQL schemas and queries.',
    long: 'Project focused on SQL scripts: table definitions, referential integrity and queries for reports and analysis. Emphasis on clarity and performance.',
    repo: 'https://github.com/arrublas1208/PROYECTO_SQL', demo: '#'
  },
  // HTML
  {
    id: 'html1', tech: ['html'],
    title: 'Wedding Planner (Photography)',
    image: 'img/PLANIFICADOR-BODAS.png',
    description: 'Portfolio website with services and contact.',
    long: 'Wedding photography site with interactive gallery, package information and contact form. Elegant, minimalist and fully responsive design.',
    repo: 'https://github.com/arrublas1208/Planificador-de-Bodas', demo: '#'
  },
  // Python
  {
    id: 'py1', tech: ['python'],
    title: 'Task Manager (Python)',
    image: 'img/gestor-tareas.png',
    description: 'Console application to organize tasks.',
    long: 'Python task manager with basic CRUD operations and simple persistence. Ideal for quick console workflows.',
    repo: 'https://github.com/arrublas1208/Gestor-de-tareas-PY', demo: '#'
  },
  {
    id: 'py2', tech: ['python'],
    title: 'Population Management System',
    image: 'img/SISTEMA-GESTION-POBLACION.png',
    description: 'Console with JSON, reports and population queries per country.',
    long: 'Console app managing and querying population data using local JSON. Interactive menu with multiple reports: year ranges, growth, totals per year, countries with data, averages and more. No external dependencies.',
    repo: 'https://github.com/arrublas1208/Sistema-de-Gestion-de-Poblacion-PY', demo: '#'
  },
  // TypeScript
  {
    id: 'ts1', tech: ['typescript'],
    title: 'BK_TimeProof (NestJS)',
    description: 'TypeScript backend with NestJS, Prisma and Render deployment.',
    long: 'NestJS repository configured for dev and prod: start scripts, test coverage, CORS, health check and deployment on Render with Neon PostgreSQL. Includes multi‑stage Dockerfile and notes for Prisma/migrations.',
    repo: 'https://github.com/arrublas1208/BK_TimeProof', demo: '#'
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
      <div class="card-thumb">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" loading="lazy">` : `${p.title}`}
      </div>
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
renderSkillsStrip();

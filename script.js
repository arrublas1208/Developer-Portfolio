// ============ HERO v0.1 — Entrada split-text con blur invertido (Anime.js) ============
(function heroIntro() {
  const hero = document.querySelector('.hero');
  const nameEl = document.querySelector('.hero-name');
  if (!hero || !nameEl) return;

  // Split Text: agrupar por palabras (no se parten) y una <span> por letra
  const source = (nameEl.getAttribute('data-text') || nameEl.textContent).trim();
  nameEl.textContent = '';
  const words = source.split(/\s+/);
  words.forEach((word, wi) => {
    const wEl = document.createElement('span');
    wEl.className = 'word';
    for (const ch of word) {
      const s = document.createElement('span');
      s.className = 'letter'; s.textContent = ch; s.setAttribute('aria-hidden', 'true');
      wEl.appendChild(s);
    }
    nameEl.appendChild(wEl);
    // espacio real y separable entre palabras (permite quiebre solo entre palabras)
    if (wi < words.length - 1) nameEl.appendChild(document.createTextNode(' '));
  });
  const letters = nameEl.querySelectorAll('.letter');

  // Revelar el header al pasar el hero
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('header-visible', window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Sin animación: movimiento reducido o Anime.js no disponible → mostrar todo
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || typeof anime === 'undefined') {
    document.documentElement.classList.remove('anim-ready');
    return;
  }

  // Asignar índice de línea a cada letra (para alternar la dirección del deslizamiento, como en SplitText)
  const wordEls = nameEl.querySelectorAll('.word');
  const tops = [];
  wordEls.forEach((w) => { const t = Math.round(w.offsetTop); if (tops.indexOf(t) === -1) tops.push(t); });
  tops.sort((a, b) => a - b);
  wordEls.forEach((w) => {
    const line = tops.indexOf(Math.round(w.offsetTop));
    w.querySelectorAll('.letter').forEach((l) => { l.dataset.line = line; });
  });

  // Timeline: fade general → letras (revelado con máscara vertical + blur) → texto superior → badge → esquinas
  // Movimiento basado en https://animejs.com/documentation/text/splittext
  anime.timeline({ easing: 'easeOutExpo' })
    .add({ targets: hero, opacity: [0, 1], duration: 400, easing: 'linear' })
    .add({
      targets: letters,
      // línea impar entra desde abajo (100%), línea par desde arriba (-100%) — igual que la doc
      translateY: (el) => [parseInt(el.dataset.line, 10) % 2 ? '100%' : '-100%', '0%'],
      filter: ['blur(16px)', 'blur(0px)'],
      opacity: [0, 1],
      duration: 820,
      delay: anime.stagger(30)
    }, '-=120')
    .add({ targets: '.hero-greeting', opacity: [0, 1], translateY: [16, 0], duration: 700 }, '-=520')
    .add({ targets: '.hero-pill', opacity: [0, 1], translateY: [18, 0], duration: 700 }, '-=560')
    // Estrellas: aparecen + se trasladan + giran (izquierda → horario, derecha → antihorario), lento
    .add({
      targets: '.spark',
      opacity: [0, 1],
      translateY: [18, 0],
      rotate: (el, i) => (i < 2 ? [-360, 0] : [360, 0]),
      duration: 1200,
      easing: 'easeOutCubic'
    }, '-=700')
    .add({ targets: '.corner', opacity: [0, 1], translateY: [-10, 0], duration: 600, delay: anime.stagger(120) }, '-=900');
})();


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
    about_eyebrow: '01 — Sobre mí',
    about_text: 'Desarrollo software full-stack de extremo a extremo — de APIs en Java/Spring Boot y NestJS a aplicaciones de escritorio en Electron — sobre bases de datos relacionales bien modeladas en PostgreSQL, con triggers, procedimientos e integridad referencial. Sostengo cada sistema en patrones de diseño, principios SOLID y arquitectura por capas para que escale sin acumular deuda técnica. Lo he aplicado en dominios reales: logística e inventario, nómina, banca en autogestión y e-commerce.',
    about_status: 'Disponible para proyectos', about_cta_projects: 'Ver proyectos →', about_cta_contact: 'Contacto',
    skills_title: 'Stack & herramientas', skills_subtitle: 'Una obra de arte interactiva: explora la galaxia técnica y mis soft skills.',
    projects_title: 'Proyectos', projects_subtitle: 'Sistemas que he construido',
    filter_all: 'Todos', filter_js: 'JavaScript', filter_java: 'Java', filter_sql: 'SQL', filter_html: 'HTML', filter_python: 'Python', filter_ts: 'TypeScript',
    contact_title: 'Contacto', contact_subtitle: 'Conversemos sobre crear experiencias digitales únicas.',
    contact_headline: 'Construyamos algo <span class="serif-italic">juntos</span>',
    label_name: 'Nombre', label_email: 'Correo', label_message: 'Mensaje', submit_button: 'Enviar', message_ph: 'Escribe tu idea...',
    fallback: 'Si el formulario falla: ', footer_text: '© 2025 Juan Jose Arrublas Gutierrez • "Construyendo experiencias digitales que inspiran"',
    contact_github: 'GitHub', contact_email: 'Correo', contact_phone: 'Teléfono',
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
    about_eyebrow: '01 — About me',
    about_text: 'I build full-stack software end to end — from Java/Spring Boot and NestJS APIs to Electron desktop apps — on top of well-modeled relational databases in PostgreSQL, with triggers, stored procedures and referential integrity. I ground every system in design patterns, SOLID principles and layered architecture so it scales without piling up technical debt. I\'ve applied it in real domains: logistics and inventory, payroll, self-service banking and e-commerce.',
    about_status: 'Available for projects', about_cta_projects: 'View projects →', about_cta_contact: 'Contact',
    skills_title: 'Stack & tools', skills_subtitle: 'An interactive work of art: explore the tech galaxy and my soft skills.',
    projects_title: 'Projects', projects_subtitle: 'Systems I\'ve built',
    filter_all: 'All', filter_js: 'JavaScript', filter_java: 'Java', filter_sql: 'SQL', filter_html: 'HTML', filter_python: 'Python', filter_ts: 'TypeScript',
    contact_title: 'Contact', contact_subtitle: 'Let\'s talk about crafting unique digital experiences.',
    contact_headline: 'Let\'s build something <span class="serif-italic">together</span>',
    label_name: 'Name', label_email: 'Email', label_message: 'Message', submit_button: 'Send', message_ph: 'Write your idea...',
    fallback: 'If the form fails: ', footer_text: '© 2025 Juan Jose Arrublas Gutierrez • "Building inspiring digital experiences"',
    contact_github: 'GitHub', contact_email: 'Email', contact_phone: 'Phone',
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

  // hero: la portada v0.1 es estática (no se traduce)

  // About me (nueva sección tasteskill) — acceso seguro por si algún id no existe
  const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setTxt('about-eyebrow', L.about_eyebrow);
  setTxt('about-text', L.about_text);
  setTxt('about-status', L.about_status);
  setTxt('about-cta-projects', L.about_cta_projects);
  setTxt('about-cta-contact', L.about_cta_contact);

  // headers (acceso seguro)
  setTxt('skills-title', L.skills_title);
  setTxt('projects-title', L.projects_title);
  setTxt('projects-subtitle', L.projects_subtitle);
  setTxt('contact-title', L.contact_title);
  setTxt('contact-subtitle', L.contact_subtitle);
  const ch = document.getElementById('contact-headline');
  if (ch) ch.innerHTML = L.contact_headline;

  // contacto
  document.getElementById('label-name').textContent = L.label_name;
  document.getElementById('label-email').textContent = L.label_email;
  document.getElementById('label-message').textContent = L.label_message;
  document.getElementById('submit-button').textContent = L.submit_button;
  const msg = document.getElementById('message');
  if (msg && L.message_ph) msg.placeholder = L.message_ph;
  const fb = document.getElementById('fallback');
  fb.innerHTML = `${L.fallback}<a href="mailto:arrublas1208@gmail.com?subject=Contacto%20Portafolio">arrublas1208@gmail.com</a>`;

  // footer
  document.getElementById('footer-text').textContent = L.footer_text;

  // contact links
  document.getElementById('contact-github').textContent = L.contact_github;
  document.getElementById('contact-email').textContent = L.contact_email;
  document.getElementById('contact-phone').textContent = L.contact_phone;
}

// botón (compatibilidad sin optional chaining)
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    current.lang = current.lang === 'es' ? 'en' : 'es';
    document.body.classList.toggle('lang-en', current.lang === 'en');
    applyLanguage(current.lang);
    const activeFilterEl = document.querySelector('.filter.active');
    const activeFilter = activeFilterEl ? activeFilterEl.dataset.filter : 'all';
    // re-render proyectos para traducir títulos/descripciones
    renderCards(activeFilter);
  });
}
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

function renderCards() {
  grid.innerHTML = '';
  const list = getProjects();
  const build = (p) => {
    const el = document.createElement('article');
    el.className = 'proj-card';
    el.innerHTML = `
      <div class="proj-thumb">${p.image ? `<img src="${p.image}" alt="${p.title}" loading="lazy">` : `<span class="proj-thumb-txt">${p.title}</span>`}</div>
      <div class="proj-body">
        <h3 class="proj-title">${p.title}</h3>
        <p class="proj-desc">${p.description}</p>
        <div class="proj-tags">${p.tech.map(t => `<span class='tk-tag'>${t}</span>`).join('')}</div>
      </div>`;
    el.addEventListener('click', () => openProject(p));
    return el;
  };
  // Duplicar la lista para un marquee continuo y sin costura
  [...list, ...list].forEach((p) => grid.appendChild(build(p)));
}

// Inicializar (aplicar idioma por defecto y renderizar)
applyLanguage('es');
renderCards('all');
if (typeof window.renderSkillsStrip === 'function') { window.renderSkillsStrip(); }

// ============ Reveals al hacer scroll — bidireccional (entra al bajar y al subir) ============
(function scrollReveals() {
  const els = document.querySelectorAll('.sr');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { e.target.classList.toggle('in', e.isIntersecting); });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  els.forEach((e) => io.observe(e));
})();

// ============ Toggle de idioma ES/EN (siempre visible) ============
function setLang(lang) {
  current.lang = lang;
  document.body.classList.toggle('lang-en', lang === 'en');
  applyLanguage(lang);
  renderCards();
  document.querySelectorAll('.lang-float [data-lang]').forEach((b) => b.classList.toggle('active', b.dataset.lang === lang));
}
document.querySelectorAll('.lang-float [data-lang]').forEach((b) => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
});

// ============ Proyectos: el mouse controla el scroll (arrastrar + rueda) + auto-scroll ============
(function projScroll() {
  const vp = document.getElementById('proj-marquee');
  const track = document.getElementById('project-grid');
  if (!vp || !track) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let half = 0;
  const measure = () => { half = track.scrollWidth / 2; };
  measure();
  window.addEventListener('resize', measure);

  let auto = !reduce;
  let dragging = false, moved = false, startX = 0, startScroll = 0;

  const SPEED = 0.6; // px por frame del auto-scroll
  let pos = 0; // acumulador flotante (scrollLeft se redondea, por eso no acumulamos sobre él)
  function frame() {
    if (auto && !dragging) {
      pos += SPEED;
      // loop sin costura (el contenido está duplicado: 'half' = un set completo)
      if (half > 0 && pos >= half) pos -= half;
      vp.scrollLeft = pos;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // Pausa el auto mientras el mouse está encima (para leer / arrastrar)
  vp.addEventListener('mouseenter', () => { auto = false; });
  vp.addEventListener('mouseleave', () => { if (!reduce) auto = true; });

  // Arrastrar para desplazar
  vp.addEventListener('pointerdown', (e) => {
    dragging = true; moved = false; startX = e.clientX; startScroll = vp.scrollLeft;
    vp.classList.add('grabbing');
    try { vp.setPointerCapture(e.pointerId); } catch (err) {}
  });
  vp.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 5) moved = true;
    vp.scrollLeft = startScroll - dx;
    pos = vp.scrollLeft;
  });
  const endDrag = () => { dragging = false; vp.classList.remove('grabbing'); };
  vp.addEventListener('pointerup', endDrag);
  vp.addEventListener('pointercancel', endDrag);

  // Si venías arrastrando, no abrir el modal al soltar
  track.addEventListener('click', (e) => {
    if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; }
  }, true);

  // Rueda horizontal (trackpad) mueve proyectos; la vertical sigue scrolleando la página
  vp.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { vp.scrollLeft += e.deltaX; pos = vp.scrollLeft; e.preventDefault(); }
  }, { passive: false });
})();

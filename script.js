/* =========================================================
   Cristian Potenciano — Portfolio
   script.js
   ========================================================= */
(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  /* =======================================================
     EDITABLE DATA — Portfolio projects
     -------------------------------------------------------
     Para agregar/quitar proyectos solo edita este arreglo.
     Cada objeto acepta:
       title      -> nombre del proyecto (string)
       category   -> "brand" | "collab" | "random"
       tag        -> etiqueta corta mostrada en el hover
       href       -> link externo o interno del proyecto
       image      -> (opcional) ruta a una imagen real de portada.
                      Si se omite, se usa un placeholder generado
                      con CSS (gradiente + monograma) — reemplázalo
                      cuando tengas el asset final.
       size       -> (opcional) "sm" | "md" | "lg" — controla el
                      tamaño de la miniatura dentro del mosaico.
     ======================================================= */
  const PROJECTS = [
    // ---- Brand Development ----
    { title: "Reinmex", category: "brand", tag: "Identidad de marca", href: "#", size: "lg" },
    { title: "Agro", category: "brand", tag: "Naming & branding", href: "#" },
    { title: "Cactus Feliz", category: "brand", tag: "Identidad visual", href: "#" },
    { title: "Mostaza", category: "brand", tag: "Lettering & marca", href: "#" },
    { title: "NieBest", category: "brand", tag: "Logotipo", href: "#" },
    { title: "Trap Cars", category: "brand", tag: "Branding automotriz", href: "#", size: "sm" },
    { title: "Hidrotec", category: "brand", tag: "Identidad corporativa", href: "#", size: "sm" },

    // ---- Collaborations ----
    { title: "Nissan", category: "collab", tag: "Dirección de arte", href: "#", size: "lg" },
    { title: "Mitsubishi Motors", category: "collab", tag: "Campaña", href: "#" },
    { title: "Movimiento Ciudadano", category: "collab", tag: "Comunicación gráfica", href: "#" },
    { title: "Gobierno de Tlaquepaque", category: "collab", tag: "Campaña institucional", href: "#" },
    { title: "Porter", category: "collab", tag: "Colaboración de marca", href: "#", size: "sm" },
    { title: "Cuarto de Kilo", category: "collab", tag: "Colaboración creativa", href: "#", size: "sm" },

    // ---- Random Projects ----
    { title: "Velada Cultural", category: "random", tag: "Proyecto editorial", href: "#" },
    { title: "Consume Local", category: "random", tag: "Campaña social", href: "#" },
    { title: "Vota Unidos", category: "random", tag: "Diseño de campaña", href: "#", size: "sm" },
    // PLACEHOLDER — duplica este bloque para sumar tus propios proyectos random:
    { title: "Proyecto Random 01", category: "random", tag: "Reemplaza este proyecto", href: "#", size: "sm" },
    { title: "Proyecto Random 02", category: "random", tag: "Reemplaza este proyecto", href: "#" },
  ];

  const CATEGORY_LABEL = {
    brand: "Brand Development",
    collab: "Collaborations",
    random: "Random Projects",
  };

  /* Deterministic placeholder gradients per category, so thumbnails
     stay on-brand (gris / negro / verde lima) until real images land. */
  const CATEGORY_STYLE = {
    brand: ["#1c1c1e", "#2c2c2f"],
    collab: ["#000000", "#2a2a2c"],
    random: ["#b9e600", "#7ea300"],
  };

  function monogram(title) {
    return title
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }

  function buildProjectCard(project, index) {
    // NOTE: the <li> (not the inner <a>) must carry the grid sizing
    // classes — it's the direct child of the CSS grid, so only its
    // own grid-column/grid-row rules are honored by the layout.
    const li = document.createElement("li");
    li.className = `project-card${project.size ? ` size-${project.size}` : ""}`;
    li.dataset.category = project.category;
    li.setAttribute("data-reveal", "");
    li.style.setProperty("--reveal-delay", index % 8);

    const [c1, c2] = CATEGORY_STYLE[project.category];
    const markColor = project.category === "random" ? "#0c0c0d" : "#ccff3d";

    const a = document.createElement("a");
    a.href = project.href || "#";
    a.className = "project-link";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute(
      "aria-label",
      `${project.title} — ${CATEGORY_LABEL[project.category]}. Abre el proyecto en una pestaña nueva.`
    );

    a.innerHTML = `
      <span class="project-media" style="background:linear-gradient(155deg, ${c1}, ${c2});">
        <span class="project-mark" style="color:${markColor}">${monogram(project.title)}</span>
      </span>
      <span class="project-glow" aria-hidden="true"></span>
      <span class="project-link-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M7 17 17 7M17 7H9m8 0v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <span class="project-overlay">
        <span class="project-cat">${CATEGORY_LABEL[project.category]}</span>
        <span class="project-title">${project.title}${project.tag ? ` — ${project.tag}` : ""}</span>
      </span>
    `;

    li.appendChild(a);
    return li;
  }


  function renderProjects() {
    const grid = document.getElementById("projectGrid");
    if (!grid) return;
    const frag = document.createDocumentFragment();
    PROJECTS.forEach((project, i) => frag.appendChild(buildProjectCard(project, i)));
    grid.appendChild(frag);
  }

  /* =======================================================
     Portfolio filters
     ======================================================= */
  function setupFilters() {
    const buttons = document.querySelectorAll(".filter-pill");
    const cards = () => document.querySelectorAll("#projectGrid .project-card");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        const filter = btn.dataset.filter;
        cards().forEach((card) => {
          const show = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* =======================================================
     Preloader
     ======================================================= */
  function setupPreloader() {
    const pre = document.getElementById("preloader");
    if (!pre) return;
    document.body.classList.add("is-loading");
    const hide = () => {
      pre.classList.add("is-hidden");
      document.body.classList.remove("is-loading");
      setTimeout(() => pre.remove(), 700);
    };
    window.addEventListener("load", () => setTimeout(hide, prefersReducedMotion ? 0 : 500));
    // Safety fallback in case 'load' never fires quickly
    setTimeout(hide, 2500);
  }

  /* =======================================================
     Scroll reveal
     ======================================================= */
  function setupReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    items.forEach((el) => {
      const delay = el.dataset.revealDelay || el.style.getPropertyValue("--reveal-delay") || 0;
      el.style.setProperty("--reveal-delay", delay);
    });

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach((el) => io.observe(el));
  }

  /* =======================================================
     Scrollspy — highlight active nav link
     ======================================================= */
  function setupScrollspy() {
    const links = document.querySelectorAll("[data-nav-link]");
    const sections = ["about", "portafolio", "contacto"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!links.length || !sections.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            const match = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", match);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
  }

  /* =======================================================
     Hero figure — mousemove parallax + scroll parallax
     ======================================================= */
  function setupFigureParallax() {
    const panel = document.getElementById("figurePanel");
    const about = document.getElementById("about");
    if (!panel || !about || prefersReducedMotion || !isFinePointer) return;

    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    let raf = null;

    function loop() {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      panel.style.transform = `rotateY(${curX}deg) rotateX(${curY}deg)`;
      raf = requestAnimationFrame(loop);
    }

    about.addEventListener("pointermove", (e) => {
      const rect = about.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = px * 14;
      targetY = py * -10;
      if (!raf) raf = requestAnimationFrame(loop);
    });

    about.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
    });
  }

  function setupScrollParallax() {
    if (prefersReducedMotion) return;
    const blobs = document.querySelectorAll(".blob");
    if (!blobs.length) return;

    let ticking = false;
    function update() {
      const y = window.scrollY;
      blobs.forEach((blob, i) => {
        const speed = 0.06 + (i % 3) * 0.03;
        blob.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* =======================================================
     Magnetic hover on project cards
     ======================================================= */
  function setupMagneticCards() {
    if (prefersReducedMotion || !isFinePointer) return;
    const grid = document.getElementById("projectGrid");
    if (!grid) return;

    grid.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".project-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });

    grid.addEventListener(
      "pointerleave",
      (e) => {
        const card = e.target.closest && e.target.closest(".project-card");
        if (card) card.style.transform = "";
      },
      true
    );
  }

  /* =======================================================
     Custom cursor
     ======================================================= */
  function setupCursor() {
    if (prefersReducedMotion || !isFinePointer) return;
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    window.addEventListener("pointermove", (e) => {
      document.body.classList.add("has-cursor");
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(loop);
    }
    loop();

    const interactive = "a, button, .project-card, .soft-chip, .detail-card";
    document.addEventListener("pointerover", (e) => {
      if (e.target.closest && e.target.closest(interactive)) ring.classList.add("is-active");
    });
    document.addEventListener("pointerout", (e) => {
      if (e.target.closest && e.target.closest(interactive)) ring.classList.remove("is-active");
    });
  }

  /* =======================================================
     Misc — footer year
     ======================================================= */
  function setupFooterYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* =======================================================
     Init
     ======================================================= */
  document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
    setupFilters();
    setupPreloader();
    setupReveal();
    setupScrollspy();
    setupFigureParallax();
    setupScrollParallax();
    setupMagneticCards();
    setupCursor();
    setupFooterYear();
  });
})();

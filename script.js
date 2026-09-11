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
                      diámetro de la esfera dentro del cluster.
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
    brand: "Desarrollo de Marca",
    collab: "Colaboraciones",
    random: "Proyectos Random",
  };

  /* Deterministic placeholder gradients per category, so thumbnails
     stay on-brand (gris / negro / verde lima) until real images land. */
  const CATEGORY_STYLE = {
    brand: ["#333336", "#141416"],
    collab: ["#2e2e30", "#000000"],
    random: ["#ddff6e", "#7ea300"],
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
    // NOTE: the <li> (not the inner <a>) must carry the size-* class —
    // it's the flex item the bubble diameter (--size) is set on.
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
      <span class="project-media" style="background:radial-gradient(circle at 34% 30%, ${c1}, ${c2});">
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
     Reveal — plays a staggered entrance for a view's [data-reveal]
     children each time that view is switched into. Not IntersectionObserver
     based: the page doesn't scroll, so entrance is tied to view activation.
     ======================================================= */
  function playReveal(view) {
    if (!view) return;
    const items = view.querySelectorAll("[data-reveal]");
    items.forEach((el) => {
      const delay = el.dataset.revealDelay || 0;
      el.style.setProperty("--reveal-delay", delay);
    });
    if (prefersReducedMotion) {
      items.forEach((el) => el.classList.add("is-visible"));
      animateCounts(view, 0);
      return;
    }
    items.forEach((el) => el.classList.remove("is-visible"));
    void view.offsetWidth; // force reflow so the transition restarts
    requestAnimationFrame(() => items.forEach((el) => el.classList.add("is-visible")));
    animateCounts(view);
  }

  function resetReveal(view) {
    if (!view) return;
    view.querySelectorAll("[data-reveal]").forEach((el) => el.classList.remove("is-visible"));
    view.querySelectorAll("[data-count-to]").forEach((el) => {
      el.textContent = "0" + (el.dataset.suffix || "");
    });
  }

  /* Stat count-up — animates each [data-count-to] number from 0 to its
     target once its surrounding [data-reveal] group becomes visible,
     instead of just fading in as static text. */
  function animateCounts(view, durationMs = 900) {
    view.querySelectorAll("[data-count-to]").forEach((el) => {
      const target = parseFloat(el.dataset.countTo);
      const suffix = el.dataset.suffix || "";
      if (Number.isNaN(target)) return;

      if (!durationMs) {
        el.textContent = target + suffix;
        return;
      }

      const group = el.closest("[data-reveal]");
      const delayMs = Number(group?.dataset.revealDelay || 0) * 90 + 200;

      window.setTimeout(() => {
        const start = performance.now();
        function tick(now) {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }, delayMs);
    });
  }

  /* =======================================================
     View switching — About / Portafolio / Contacto are full-screen
     panels swapped by the dock nav (and any in-page "#id" link),
     never by scrolling the page.
     ======================================================= */
  function setupViewSwitching() {
    const ORDER = ["about", "portafolio", "contacto"];
    const views = [...document.querySelectorAll("[data-view]")];
    const navLinks = [...document.querySelectorAll("[data-nav-link]")];
    if (!views.length) return;

    let activeId = views.find((v) => v.classList.contains("is-active-view"))?.id || ORDER[0];
    const SLIDE = 64; // px — how far a view travels sideways as it enters/leaves

    function activate(id) {
      const target = document.getElementById(id);
      if (!target || !target.hasAttribute("data-view") || id === activeId) {
        if (target) target.scrollTop = 0;
        return;
      }
      const outgoing = document.getElementById(activeId);

      // Sideways direction: moving right through the menu order slides the
      // new view in from the right (and the old one out to the left), and
      // vice-versa — never up/down.
      const dir = ORDER.indexOf(id) > ORDER.indexOf(activeId) ? 1 : -1;

      if (outgoing) {
        resetReveal(outgoing);
        outgoing.style.setProperty("--leave-x", `${-dir * SLIDE}px`);
        outgoing.classList.add("is-leaving");
        outgoing.classList.remove("is-active-view");
        outgoing.setAttribute("inert", "");
        outgoing.setAttribute("aria-hidden", "true");
        window.setTimeout(() => outgoing.classList.remove("is-leaving"), prefersReducedMotion ? 0 : 550);
      }

      // Commit the entering view's starting offset (still inactive) before
      // switching it to active, so the transition has a real "from" frame
      // to animate from instead of jumping straight to rest.
      target.style.setProperty("--enter-x", `${dir * SLIDE}px`);
      void target.offsetWidth;
      requestAnimationFrame(() => {
        target.classList.add("is-active-view");
        target.removeAttribute("inert");
        target.setAttribute("aria-hidden", "false");
        target.scrollTop = 0;
        playReveal(target);
      });

      activeId = id;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });

      if (location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`);
    }

    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target || !target.hasAttribute("data-view")) return; // e.g. the "skip to content" link
      e.preventDefault();
      activate(id);
    });

    const initial = (location.hash || "").slice(1);
    const initialTarget = document.getElementById(initial);
    if (initial && initialTarget && initialTarget.hasAttribute("data-view") && initial !== "about") {
      activate(initial);
    } else {
      playReveal(document.getElementById("about"));
    }
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
     Scroll cue — tells the visitor a view scrolls internally.
     Shown only when the active view's content actually overflows,
     and dismissed the moment the visitor scrolls it even a little.
     ======================================================= */
  function setupScrollCues() {
    const cues = [...document.querySelectorAll("[data-scroll-cue]")];
    if (!cues.length) return;

    const pairs = cues
      .map((cue) => ({ cue, section: cue.closest(".section") }))
      .filter((p) => p.section);

    function refresh() {
      pairs.forEach(({ cue, section }) => {
        const hasOverflow = section.scrollHeight > section.clientHeight + 8;
        cue.style.display = hasOverflow ? "" : "none";
      });
    }

    pairs.forEach(({ cue, section }) => {
      section.addEventListener(
        "scroll",
        () => cue.classList.toggle("is-dismissed", section.scrollTop > 24),
        { passive: true }
      );
    });

    refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
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
    setupViewSwitching();
    setupFigureParallax();
    setupMagneticCards();
    setupCursor();
    setupScrollCues();
    setupFooterYear();
  });
})();

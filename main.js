(() => {
  const root = document.documentElement;
  const STORAGE_KEY = "jl-theme";

  // ---- Theme toggle -------------------------------------------------------
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }
  // No prefers-color-scheme: dark is the intentional default.

  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    const sync = () => {
      const theme = root.getAttribute("data-theme") || "dark";
      toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    };
    sync();
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEY, next);
      sync();
    });
  }

  // ---- Reveal on scroll ---------------------------------------------------
  const revealTargets = document.querySelectorAll(
    ".hero__copy > *, .hero__portrait, .band__lede, .skill, .section-head, .card, .pub, .timeline__item, .contact__card"
  );
  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    const delay = i % 4;
    if (delay) el.classList.add(`delay-${delay}`);
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealTargets.forEach((el) => {
      // If element is already on-screen or above it at load (e.g., direct
      // navigation to an anchor), reveal immediately rather than waiting.
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        el.classList.add("is-in");
      } else {
        io.observe(el);
      }
    });
    // Safety net: after 2s, ensure anything still hidden is revealed.
    setTimeout(() => {
      revealTargets.forEach((el) => el.classList.add("is-in"));
    }, 2000);
  } else {
    revealTargets.forEach((el) => el.classList.add("is-in"));
  }

  // ---- Active section in nav ---------------------------------------------
  const navLinks = Array.from(document.querySelectorAll(".nav__links a"));
  const sectionMap = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (section) sectionMap.set(section, link);
  });

  if (sectionMap.size && "IntersectionObserver" in window) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = sectionMap.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    sectionMap.forEach((_link, section) => navIO.observe(section));
  }
})();

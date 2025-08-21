(function () {
  const header = document.querySelector(".nav");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu-list");
  const dropdowns = document.querySelectorAll(".dropdown");

  // mobile open/close
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    header.classList.toggle("open");
    document.body.classList.toggle("nav-open");
    menu.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  });

  // dropdowns (click on mobile / hover works via CSS on desktop)
  dropdowns.forEach((d) => {
    const btn = d.querySelector(".dropdown-toggle");
    btn.addEventListener("click", (e) => {
      // allow keyboard + click
      e.preventDefault();
      const open = d.getAttribute("aria-expanded") === "true";
      d.setAttribute("aria-expanded", String(!open));
    });
  });

  // simple scroll state
  document.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop >= 100) {
      document.body.classList.add("scrolled");
    } else {
      document.body.classList.remove("scrolled");
    }
  });
})();

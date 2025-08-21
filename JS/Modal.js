(function () {
  const lb = document.getElementById("lightbox");
  const img = lb.querySelector(".lb-img");
  const cap = lb.querySelector(".lb-cap");
  const btnClose = lb.querySelector(".lb-close");
  const btnPrev = lb.querySelector(".lb-prev");
  const btnNext = lb.querySelector(".lb-next");

  // Collect gallery items (support multiple galleries by data-gallery)
  const links = Array.from(document.querySelectorAll(".g-link"));
  let current = -1;
  let lastFocus = null;

  function open(index) {
    if (index < 0 || index >= links.length) return;
    current = index;
    const a = links[current];
    img.src = a.getAttribute("href");
    img.alt = a.querySelector("img")?.alt || "";
    cap.textContent = a.dataset.caption || "";

    lastFocus = document.activeElement;
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // lock scroll
    btnClose.focus();
  }

  function close() {
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    img.removeAttribute("src"); // free memory on mobile
    if (lastFocus) lastFocus.focus();
  }

  function next() {
    open((current + 1) % links.length);
  }

  function prev() {
    open((current - 1 + links.length) % links.length);
  }

  // Click handlers on thumbnails
  links.forEach((a, i) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      open(i);
    });
  });

  // Controls
  btnClose.addEventListener("click", close);
  btnNext.addEventListener("click", next);
  btnPrev.addEventListener("click", prev);

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (lb.getAttribute("aria-hidden") === "true") return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "Tab") {
      // simple focus trap
      const focusables = [btnPrev, btnNext, btnClose];
      const idx = focusables.indexOf(document.activeElement);
      if (e.shiftKey) {
        if (idx <= 0) {
          e.preventDefault();
          focusables[focusables.length - 1].focus();
        }
      } else {
        if (idx === focusables.length - 1) {
          e.preventDefault();
          focusables[0].focus();
        }
      }
    }
  });

  // Click outside image closes
  lb.addEventListener("click", (e) => {
    const withinFigure = e.target.closest(".lb-figure");
    const withinControls = e.target.closest(".lb-close, .lb-prev, .lb-next");
    if (!withinFigure && !withinControls) close();
  });

  // Basic swipe support
  let startX = 0,
    startY = 0;
  lb.addEventListener(
    "touchstart",
    (e) => {
      const t = e.changedTouches[0];
      startX = t.clientX;
      startY = t.clientY;
    },
    { passive: true }
  );
  lb.addEventListener(
    "touchend",
    (e) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dy) < 60) {
        dx < 0 ? next() : prev();
      }
    },
    { passive: true }
  );
})();

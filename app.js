(function () {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = lb && lb.querySelector("img");
  const lbClose = lb && lb.querySelector(".lightbox-close");

  function openLb(src, alt) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLb() {
    if (!lb) return;
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const src = el.getAttribute("href") || el.dataset.full || el.querySelector("img")?.src;
      const alt = el.querySelector("img")?.alt || "";
      if (src) openLb(src, alt);
    });
  });

  if (lbClose) lbClose.addEventListener("click", closeLb);
  if (lb) {
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLb();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLb();
  });
})();

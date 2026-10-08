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

  // Lightbox with gallery navigation
  const lb = document.getElementById("lightbox");
  const lbImg = lb && lb.querySelector("img");
  const lbClose = lb && lb.querySelector(".lightbox-close");
  if (!lb || !lbImg) return;

  // Build navigation buttons once
  const prevBtn = document.createElement("button");
  prevBtn.type = "button";
  prevBtn.className = "lightbox-nav lightbox-prev";
  prevBtn.setAttribute("aria-label", "Previous image");
  prevBtn.innerHTML = "&#10094;";
  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "lightbox-nav lightbox-next";
  nextBtn.setAttribute("aria-label", "Next image");
  nextBtn.innerHTML = "&#10095;";
  lb.appendChild(prevBtn);
  lb.appendChild(nextBtn);

  const counter = document.createElement("div");
  counter.className = "lightbox-counter";
  lb.appendChild(counter);

  let group = [];
  let index = 0;

  function itemFor(el) {
    const src = el.getAttribute("href") || el.dataset.full || el.querySelector("img")?.src;
    const alt = el.querySelector("img")?.alt || "";
    return { src, alt };
  }

  function show(i) {
    if (!group.length) return;
    index = (i + group.length) % group.length;
    const it = group[index];
    lbImg.src = it.src;
    lbImg.alt = it.alt || "";
    const multi = group.length > 1;
    prevBtn.style.display = multi ? "" : "none";
    nextBtn.style.display = multi ? "" : "none";
    counter.style.display = multi ? "" : "none";
    if (multi) counter.textContent = (index + 1) + " / " + group.length;
  }

  function openFrom(el) {
    const container = el.closest(".gallery, .product-gallery, .story-aside");
    const scope = container || document;
    const anchors = Array.from(scope.querySelectorAll("[data-lightbox]"));
    group = anchors.map(itemFor).filter((it) => it.src);
    const clicked = itemFor(el);
    index = Math.max(0, group.findIndex((it) => it.src === clicked.src));
    show(index);
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLb() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openFrom(el);
    });
  });

  prevBtn.addEventListener("click", (e) => { e.stopPropagation(); show(index - 1); });
  nextBtn.addEventListener("click", (e) => { e.stopPropagation(); show(index + 1); });
  if (lbClose) lbClose.addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
  });
})();

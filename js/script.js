// ================= HEADER SCROLL =================
// BUG CORRIGIDO: transparente no topo, véu suave ao rolar — sem faixa preta
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.background = "rgba(0,0,0,0.55)";
    header.style.borderBottom = "none";
    header.style.boxShadow = "none";
  } else {
    header.style.background = "transparent";
    header.style.borderBottom = "none";
    header.style.boxShadow = "none";
  }
});

// ================= ANIMAÇÃO SCROLL =================
const elementos = document.querySelectorAll(".animar");
function animarScroll() {
  const altura = window.innerHeight * 0.85;
  elementos.forEach(el => {
    if (el.getBoundingClientRect().top < altura)
      el.classList.add("mostrar");
  });
}
window.addEventListener("scroll", animarScroll);
animarScroll();

// ================= CARROSSEL — APENAS CLIQUE (SEM AUTO-AVANÇO) =================
(function () {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const view   = document.querySelector('.carousel-view');
  const images = Array.from(carousel.querySelectorAll('img'));
  let currentIndex = 0;

  function goTo(idx) {
    if (idx < 0) idx = images.length - 1;
    if (idx >= images.length) idx = 0;
    currentIndex = idx;

    images.forEach((img, i) => {
      img.classList.toggle('active', i === currentIndex);
    });

    const viewW = view.offsetWidth;
    const imgW  = images[currentIndex].offsetWidth;
    const gap   = parseInt(getComputedStyle(carousel).gap) || 40;

    let offsetLeft = 0;
    for (let i = 0; i < currentIndex; i++) {
      offsetLeft += images[i].offsetWidth + gap;
    }

    const shift = offsetLeft - (viewW / 2 - imgW / 2);
    carousel.style.transform = `translateX(${-shift}px)`;
  }

  /* clique em qualquer imagem — PC e mobile (touch) */
  images.forEach((img, i) => {
    img.addEventListener('click', () => goTo(i));
    img.addEventListener('touchend', (e) => {
      e.preventDefault();
      goTo(i);
    }, { passive: false });
  });

  goTo(0);
})();

// ================= LIGHTBOX =================
const lightbox = document.createElement("div");
Object.assign(lightbox.style, {
  position:       "fixed",
  top:            "0", left: "0",
  width:          "100%", height: "100%",
  background:     "rgba(0,0,0,0.92)",
  display:        "none",
  alignItems:     "center",
  justifyContent: "center",
  zIndex:         "2000",
  cursor:         "zoom-out",
});

const lbImg = document.createElement("img");
Object.assign(lbImg.style, {
  maxWidth:     "88%",
  maxHeight:    "88%",
  borderRadius: "12px",
  boxShadow:    "0 0 40px #c7a66b",
});

lightbox.appendChild(lbImg);
document.body.appendChild(lightbox);

document.addEventListener("click", function (e) {
  const img = e.target.closest(".grid-estudio img");
  if (!img) return;
  lbImg.src = img.src;
  lightbox.style.display = "flex";
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
  lbImg.src = "";
});

// ================= MENU MOBILE =================
const menuToggle = document.querySelector('.menu-toggle');
const nav        = document.querySelector('nav');
menuToggle?.addEventListener('click', () => nav.classList.toggle('active'));
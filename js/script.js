// ================= HEADER SCROLL =================
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.style.background = window.scrollY > 50
    ? "rgba(0,0,0,0.8)"
    : "rgba(0,0,0,0.4)";
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

// ================= CARROSSEL — IMAGEM CENTRAL ATIVA =================
(function () {
  const carousel   = document.querySelector('.carousel');
  if (!carousel) return;

  const view       = document.querySelector('.carousel-view');
  const images     = Array.from(carousel.querySelectorAll('img'));
  let currentIndex = 0;
  let autoTimer    = null;

  /* ---------- centraliza a imagem de índice idx ---------- */
  function goTo(idx) {
    // loop circular
    if (idx < 0) idx = images.length - 1;
    if (idx >= images.length) idx = 0;
    currentIndex = idx;

    // marca a ativa
    images.forEach((img, i) => {
      img.classList.toggle('active', i === currentIndex);
    });

    // calcula o deslocamento para centralizar a imagem ativa
    const viewW   = view.offsetWidth;
    const imgW    = images[currentIndex].offsetWidth;
    const gap     = parseInt(getComputedStyle(carousel).gap) || 40;

    // posição left da imagem ativa relativa ao início do carousel
    let offsetLeft = 0;
    for (let i = 0; i < currentIndex; i++) {
      offsetLeft += images[i].offsetWidth + gap;
    }

    // queremos que o centro da imagem ativa coincida com o centro da view
    const shift = offsetLeft - (viewW / 2 - imgW / 2);
    carousel.style.transform = `translateX(${-shift}px)`;
  }

  /* ---------- botões (ocultos no CSS, mas funcionando caso reapareçam) ---------- */
  document.querySelector('.carousel-btn.prev')
    ?.addEventListener('click', () => { resetAuto(); goTo(currentIndex - 1); });
  document.querySelector('.carousel-btn.next')
    ?.addEventListener('click', () => { resetAuto(); goTo(currentIndex + 1); });

  /* ---------- clique em qualquer imagem ---------- */
  images.forEach((img, i) => {
    img.addEventListener('click', () => {
      resetAuto();
      goTo(i);
    });
  });

  /* ---------- auto-avanço a cada 2,5 s ---------- */
  function startAuto() {
    autoTimer = setInterval(() => goTo(currentIndex + 1), 2500);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  /* ---------- pausa ao passar o mouse ---------- */
  carousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carousel.addEventListener('mouseleave', startAuto);

  /* ---------- inicializa ---------- */
  goTo(0);
  startAuto();
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
  const img = e.target.closest(".carousel img, .grid-estudio img");
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
// ================= HEADER SCROLL =================
window.addEventListener("scroll", function() {
  let header = document.querySelector("header");
  header.style.background = window.scrollY > 50
    ? "rgba(0,0,0,0.8)"
    : "rgba(0,0,0,0.4)";
});

// ================= ANIMAÇÃO SCROLL =================
const elementos = document.querySelectorAll(".animar");
function animarScroll() {
  const altura = window.innerHeight * 0.85;
  elementos.forEach(el => {
    const posicao = el.getBoundingClientRect().top;
    if(posicao < altura){
      el.classList.add("mostrar");
    }
  });
}
window.addEventListener("scroll", animarScroll);
animarScroll();

// ================= LIGHTBOX GALERIA =================
// Só aplica em todas as imagens da galeria e do estúdio
const lightboxImgs = document.querySelectorAll(".grid-estudio img, .grid img");
const lightbox = document.createElement("div");
lightbox.style.position = "fixed";
lightbox.style.top = "0";
lightbox.style.left = "0";
lightbox.style.width = "100%";
lightbox.style.height = "100%";
lightbox.style.background = "rgba(0,0,0,0.9)";
lightbox.style.display = "none";
lightbox.style.alignItems = "center";
lightbox.style.justifyContent = "center";
lightbox.style.zIndex = "2000";

const lbImg = document.createElement("img");
lbImg.style.maxWidth = "90%";
lbImg.style.maxHeight = "90%";
lightbox.appendChild(lbImg);
document.body.appendChild(lightbox);

lightboxImgs.forEach(image => {
  image.addEventListener("click", () => {
    lbImg.src = image.src;
    lightbox.style.display = "flex";
  });
});
lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// ================= MENU MOBILE =================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuToggle?.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// ================= CARROSSEL CIRCULAR =================

const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 1; // Começa mostrando a segunda imagem como centro

function updateCarousel() {
  images.forEach(img => img.classList.remove('active'));
  images[currentIndex].classList.add('active');

  const containerWidth = document.querySelector('.carousel-view').offsetWidth;
  const imgWidth = images[currentIndex].offsetWidth;
  const gap = parseInt(getComputedStyle(carousel).gap) || 60;

  const offset = currentIndex * (imgWidth + gap) - (containerWidth/2 - imgWidth/2);
  carousel.style.transform = `translateX(${-offset}px)`;
}

prevBtn.addEventListener('click', () => {
  if(currentIndex > 0) currentIndex--;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  if(currentIndex < images.length - 1) currentIndex++;
  updateCarousel();
});

// Clicar em qualquer imagem para centralizar
images.forEach((img, i) => {
  img.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel();
  });
});

updateCarousel();
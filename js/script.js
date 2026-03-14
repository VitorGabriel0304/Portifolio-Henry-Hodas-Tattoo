// HEADER SCROLL

window.addEventListener("scroll", function(){

let header = document.querySelector("header");

header.style.background =
window.scrollY > 50
? "rgba(0,0,0,0.8)"
: "rgba(0,0,0,0.4)";

});



// ANIMAÇÃO SCROLL

const elementos = document.querySelectorAll(".animar");

function animarScroll(){

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



// LIGHTBOX GALERIA

const imagens = document.querySelectorAll(".grid img");

const lightbox = document.createElement("div");

lightbox.style.position="fixed";
lightbox.style.top="0";
lightbox.style.left="0";
lightbox.style.width="100%";
lightbox.style.height="100%";
lightbox.style.background="rgba(0,0,0,0.9)";
lightbox.style.display="none";
lightbox.style.alignItems="center";
lightbox.style.justifyContent="center";
lightbox.style.zIndex="2000";

const img = document.createElement("img");

img.style.maxWidth="90%";
img.style.maxHeight="90%";

lightbox.appendChild(img);

document.body.appendChild(lightbox);

imagens.forEach(image=>{

image.addEventListener("click",()=>{

img.src=image.src;

lightbox.style.display="flex";

});

});

lightbox.addEventListener("click",()=>{

lightbox.style.display="none";

});
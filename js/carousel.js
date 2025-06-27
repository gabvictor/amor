const carouselSlide = document.getElementById('carouselSlide');
const carouselIndicator = document.getElementById('carouselIndicator');

let currentIndex = 0;
let startX = 0;
let isDragging = false;
let autoSlideInterval;

// Lista de imagens
const imagens = [
  { src: './img/1.jpg', alt: 'Foto 1' },
  { src: './img/2.jpg', alt: 'Foto 2' },
  { src: './img/3.jpg', alt: 'Foto 3' },
  { src: './img/4.webp', alt: 'Foto 4' },
  { src: './img/5.webp', alt: 'Foto 5' },
  { src: './img/6.webp', alt: 'Foto 6' },
  { src: './img/7.webp', alt: 'Foto 7' },
  { src: './img/8.webp', alt: 'Foto 8' },
  { src: './img/9.webp', alt: 'Foto 9' },
  { src: './img/10.webp', alt: 'Foto 10' },
  { src: './img/11.webp', alt: 'Foto 11' },
  { src: './img/12.webp', alt: 'Foto 12' },
  { src: './img/13.webp', alt: 'Foto 13' },
  { src: './img/14.webp', alt: 'Foto 14' },
  { src: './img/15.webp', alt: 'Foto 15' },
  { src: './img/16.webp', alt: 'Foto 16' },
  { src: './img/17.webp', alt: 'Foto 17' },
  { src: './img/18.webp', alt: 'Foto 18' },
  { src: './img/19.webp', alt: 'Foto 19' },
  { src: './img/20.webp', alt: 'Foto 20' },
  { src: './img/21.webp', alt: 'Foto 21' },
  { src: './img/22.webp', alt: 'Foto 22' },
  { src: './img/23.webp', alt: 'Foto 23' },
  { src: './img/24.webp', alt: 'Foto 24' },
  { src: './img/25.webp', alt: 'Foto 25' },
  { src: './img/26.webp', alt: 'Foto 26' },
  { src: './img/27.webp', alt: 'Foto 27' },
  { src: './img/28.webp', alt: 'Foto 28' },
  { src: './img/29.webp', alt: 'Foto 29' },
  { src: './img/30.webp', alt: 'Foto 30' },
  { src: './img/31.webp', alt: 'Foto 31' }
];


// Cria os itens do carrossel
imagens.forEach(imagem => {
  const item = document.createElement('div');
  item.classList.add('carousel-item');

  const img = document.createElement('img');
  img.src = imagem.src;
  img.alt = imagem.alt;

  item.appendChild(img);
  carouselSlide.appendChild(item);
});

// Agora que os itens existem, capturamos eles
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;

// Atualiza o indicador de página
function updateIndicator() {
  carouselIndicator.textContent = `${currentIndex + 1} / ${totalItems}`;
}

// Função para mover o carrossel
function moveToSlide(index) {
  if (index >= totalItems) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalItems - 1;
  } else {
    currentIndex = index;
  }

  carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateIndicator();
}

// Próximo slide
function nextSlide() {
  moveToSlide(currentIndex + 1);
}

// Slide anterior
function prevSlide() {
  moveToSlide(currentIndex - 1);
}

// Drag início
function startDragging(e) {
  isDragging = true;
  startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
}

// Drag fim
function endDragging(e) {
  if (!isDragging) return;
  isDragging = false;

  const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
  const diffX = startX - endX;

  const minSwipeDistance = 50;
  if (Math.abs(diffX) > minSwipeDistance) {
    diffX > 0 ? nextSlide() : prevSlide();
  }
}

// Carrossel automático
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 10000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Eventos de toque
carouselSlide.addEventListener('touchstart', startDragging);
carouselSlide.addEventListener('touchend', endDragging);

// Inicia
startAutoSlide();
updateIndicator();

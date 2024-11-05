const carouselSlide = document.getElementById('carouselSlide');
const carouselIndicator = document.getElementById('carouselIndicator');
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
const totalItems = carouselItems.length;

let startX = 0;
let isDragging = false;
let autoSlideInterval;

// Atualiza o indicador de página
function updateIndicator() {
  carouselIndicator.textContent = `${currentIndex + 1} / ${totalItems}`;
}

// Função para mover o carrossel para o slide específico
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

// Função para avançar para o próximo slide
function nextSlide() {
  moveToSlide(currentIndex + 1);
}

// Função para voltar ao slide anterior
function prevSlide() {
  moveToSlide(currentIndex - 1);
}

// Função para iniciar o arraste
function startDragging(e) {
  isDragging = true;
  startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
}

// Função para finalizar o arraste
function endDragging(e) {
  if (!isDragging) return;
  isDragging = false;

  const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
  const diffX = startX - endX;

  const minSwipeDistance = 50; // pixels

  if (Math.abs(diffX) > minSwipeDistance) {
    if (diffX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

// Função para iniciar o carrossel automático
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 10000); // 10 segundos
}

// Função para parar o carrossel automático
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Eventos para toque (dispositivos móveis)
carouselSlide.addEventListener('touchstart', startDragging);
carouselSlide.addEventListener('touchend', endDragging);

// Iniciar carrossel automático ao carregar a página
startAutoSlide();

// Inicializa o indicador
updateIndicator();

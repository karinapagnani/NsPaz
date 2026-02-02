// Gallery Slider - Carrossel Infinito
let currentSlide = 0;
const slider = document.getElementById('gallerySlider');
const galleryItems = document.querySelectorAll('.gallery-item'); // Renomeado
const totalSlides = galleryItems.length;
let isTransitioning = false;
let slideWidth = 0; // Será calculado depois

// Clone items para efeito infinito
function setupInfiniteSlider() {
    // Clone primeiros 3 itens e adiciona no final
    for (let i = 0; i < 3; i++) {
        const clone = galleryItems[i].cloneNode(true);
        slider.appendChild(clone);
    }
    
    // Clone últimos 3 itens e adiciona no início
    for (let i = totalSlides - 1; i >= totalSlides - 3; i--) {
        const clone = galleryItems[i].cloneNode(true);
        slider.insertBefore(clone, slider.firstChild);
    }
    
    // Calcula slideWidth DEPOIS de clonar
    const firstItem = slider.querySelector('.gallery-item');
    slideWidth = firstItem.offsetWidth + 30; // width + gap
    
    // Posiciona no slide inicial (após os clones do início)
    currentSlide = 3;
    updateSliderPosition(false);
}

function updateSliderPosition(animate = true) {
    if (!animate) {
        slider.style.transition = 'none';
    } else {
        slider.style.transition = 'transform 0.5s ease';
    }
    
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function slideGallery(direction) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    currentSlide += direction;
    
    updateSliderPosition(true);
    
    // Verifica se precisa resetar posição para criar efeito infinito
    setTimeout(() => {
        const allItems = slider.querySelectorAll('.gallery-item');
        const totalWithClones = allItems.length;
        
        // Se passou dos slides reais + clones do final, volta ao início
        if (currentSlide >= totalSlides + 3) {
            currentSlide = 3;
            updateSliderPosition(false);
        } 
        // Se passou dos clones do início, volta ao final
        else if (currentSlide < 3) {
            currentSlide = totalSlides;
            updateSliderPosition(false);
        }
        
        isTransitioning = false;
    }, 500);
}

// Inicializa o carrossel infinito
setupInfiniteSlider();

// Atualiza posição ao redimensionar janela
window.addEventListener('resize', () => {
    const firstItem = slider.querySelector('.gallery-item');
    slideWidth = firstItem.offsetWidth + 30;
    updateSliderPosition(false);
});

// ... resto do código

// Pastorals Slider
let currentPastoralSlide = 0;
const pastoralsSlider = document.getElementById('pastoralsSlider');
const pastoralCards = document.querySelectorAll('.pastoral-card');
const totalPastoralSlides = pastoralCards.length;

function slidePastorals(direction) {
    currentPastoralSlide += direction;
    
    if (currentPastoralSlide < 0) {
        currentPastoralSlide = totalPastoralSlides - 3;
    } else if (currentPastoralSlide > totalPastoralSlides - 3) {
        currentPastoralSlide = 0;
    }
    
    const slideWidth = pastoralCards[0].offsetWidth + 30; // width + gap
    pastoralsSlider.style.transform = `translateX(-${currentPastoralSlide * slideWidth}px)`;
}

// Atualiza ao redimensionar
window.addEventListener('resize', () => {
    const slideWidth = pastoralCards[0].offsetWidth + 30;
    pastoralsSlider.style.transform = `translateX(-${currentPastoralSlide * slideWidth}px)`;
});
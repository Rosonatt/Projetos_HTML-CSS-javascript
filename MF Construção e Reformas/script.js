document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const itemWidth = carouselItems[0].clientWidth;

    let currentIndex = 0;

   
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length; // Alterna entre os itens
        const offset = -itemWidth * currentIndex;
        carousel.style.transform = `translateX(${offset}px)`;
        carousel.style.transition = 'transform 1s ease-in-out';
    }

    
    setInterval(() => {
        nextSlide();
    }, 5000); 
});

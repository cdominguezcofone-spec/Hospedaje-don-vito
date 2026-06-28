// Espera a que todo el documento cargue correctamente
document.addEventListener("DOMContentLoaded", function () {
    
    // Configuración del Carrusel (Hero Slider)
    const slides = document.querySelectorAll(".carousel-slide");
    let currentSlide = 0;
    const slideInterval = 4000; // Tiempo en milisegundos (4 segundos)

    function nextSlide() {
        // Quita la clase 'active' de la foto actual
        slides[currentSlide].classList.remove("active");
        
        // Pasa a la siguiente foto (y vuelve a 0 si llega al final)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Agrega la clase 'active' a la nueva foto
        slides[currentSlide].classList.add("active");
    }

    // Ejecuta el cambio automático cada intervalo de tiempo determinado
    if(slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    // Efecto extra opcional: Desplazamiento suave para los links del menú
    const links = document.querySelectorAll(".nav-links a");
    for (const link of links) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }
});

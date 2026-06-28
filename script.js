document.addEventListener('DOMContentLoaded', () => {
    // 1. Carrusel Automático de Portada
    const slides = document.querySelectorAll('.hero .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // Cambia cada 5 segundos

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }

    // 2. Simulador de Cotización
    const nightsInput = document.getElementById('nights');
    const seasonSelect = document.getElementById('season');
    const totalPriceSpan = document.getElementById('totalPrice');
    const form = document.getElementById('bookingForm');

    function calculatePrice() {
        const nights = parseInt(nightsInput.value) || 0;
        const pricePerNight = seasonSelect.value === 'alta' ? 85 : 60;
        totalPriceSpan.innerText = nights * pricePerNight;
    }

    if (nightsInput && seasonSelect) {
        nightsInput.addEventListener('input', calculatePrice);
        seasonSelect.addEventListener('change', calculatePrice);
        calculatePrice(); // Cálculo inicial
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí iría la lógica para enviar los datos a Google Sheets
            // Por ahora, simulamos el éxito
            form.reset();
            calculatePrice();
            document.getElementById('successMessage').style.display = 'block';
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 3000);
        });
    }

    // 3. Funcionalidad Lightbox (Ampliar Imágenes)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    // Función para abrir el Lightbox
    function openLightbox(event) {
        const trigger = event.currentTarget;
        const fullImageUrl = trigger.getAttribute('data-full');
        
        lightboxImg.src = fullImageUrl;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
    }

    // Función para cerrar el Lightbox
    function closeLightbox() {
        lightbox.classList.remove('open');
        lightboxImg.src = ''; // Limpia la imagen al cerrar
        document.body.style.overflow = ''; // Restaura el scroll
    }

    // Asignar eventos a las imágenes de la galería
    triggers.forEach(trigger => {
        trigger.addEventListener('click', openLightbox);
    });

    // Cerrar al hacer clic en la 'X'
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Cerrar al hacer clic fuera de la imagen
    if (lightbox) {
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Cerrar con la tecla 'Esc'
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
});

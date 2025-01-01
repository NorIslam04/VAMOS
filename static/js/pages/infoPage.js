document.addEventListener('DOMContentLoaded', function () {
    // ...................................................... Smooth scrolling ......................................................
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });

    // ............................................... Bookmark functionality ...................................................
    const bookmarkIcons = document.querySelectorAll('.fa-bookmark');
    bookmarkIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            this.classList.toggle('fas');
            this.classList.toggle('far');
        });
    });

    // ................................................ Book Now button animation ..........................................................
    const bookNowBtn = document.querySelector('.book-now-btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // ............................................................ SLIDER ...............................................................
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function goToSlide(n) {
        currentSlide = (n + totalSlides) % totalSlides;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Add click events to buttons
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Add touch support
    let touchStartX = 0;
    let touchEndX = 0;

    if (slider) {
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextSlide();
            if (touchStartX - touchEndX < -50) prevSlide();
        });
    }

    // ............................................................ MAP ...............................................................
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Initialisation de la carte
        const map = L.map('map').setView([43.6947, 7.2652], 15);

        // Ajout du layer OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        // Ajout du marqueur
        const marker = L.marker([43.6947, 7.2652])
            .addTo(map)
            .bindPopup('Hyatt Regency Nice Palais de la Méditerranée')
            .openPopup();

        // Style personnalisé pour la carte
        map.getContainer().style.border = '1px solid #ddd';
    }

    // ...................................................... Open Google Maps ......................................................
    window.openGoogleMaps = function () {
        const latitude = 43.6947;
        const longitude = 7.2652;
        const label = 'Hyatt Regency Nice Palais de la Méditerranée';
        const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&label=${encodeURIComponent(label)}`;
        window.open(googleMapsUrl, '_blank');
    };
});

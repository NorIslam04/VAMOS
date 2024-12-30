// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    const topBar = document.getElementById('top-bar');
    const searchBar = document.querySelector('.search-bar');
    
    // Définir la couleur initiale
    topBar.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    // Configuration Flatpickr
    const dateConfig = {
        dateFormat: "d/m/Y",
        minDate: "today",
        position: "below",
        locale: "fr",
        allowInput: true,
        monthSelectorType: "static",
        yearSelectorType: "static"
    };

    // Initialiser le datepicker de départ
    const departurePicker = flatpickr("#departure-date", {
        ...dateConfig,
        onChange: function(selectedDates) {
            // Mettre à jour la date minimum du datepicker d'arrivée
            arrivalPicker.set('minDate', selectedDates[0]);
        }
    });

    // Initialiser le datepicker d'arrivée
    const arrivalPicker = flatpickr("#arrival-date", {
        ...dateConfig,
        onChange: function(selectedDates) {
            if (selectedDates[0] < departurePicker.selectedDates[0]) {
                this.setDate(departurePicker.selectedDates[0]);
            }
        }
    });

    // Gestion du carousel des agences
    const images = document.querySelectorAll(".carousel-image");
    let currentIndex = 0;

    function showNextImage() {
        // Supprimer la classe active de l'image actuelle
        images[currentIndex].classList.remove("active");
        // Passer à l'image suivante (ou revenir à la première si à la fin)
        currentIndex = (currentIndex + 1) % images.length;
        // Ajouter la classe active à la nouvelle image
        images[currentIndex].classList.add("active");
    }

    // Changer d'image toutes les 3 secondes
    setInterval(showNextImage, 3000);

    // Gestion du budget
    const budgetRange = document.getElementById("budget-range");
    const chosenBudget = document.getElementById("chosen-budget");

    budgetRange.addEventListener("input", (event) => {
        const budgetValue = parseInt(event.target.value).toLocaleString("fr-DZ") + " DZD";
        chosenBudget.textContent = `Budget choisi : ${budgetValue}`;
    });

    // Gestion des options de filtres
    const filterButtons = document.querySelectorAll(".filter-option");
    const chosenFilters = document.getElementById("chosen-filters");
    const selectedFilters = new Set();

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            if (button.classList.contains("active")) {
                button.classList.remove("active");
                selectedFilters.delete(filter);
            } else {
                button.classList.add("active");
                selectedFilters.add(filter);
            }
            // Mettre à jour la liste des filtres choisis
            chosenFilters.textContent = `Options choisies : ${[...selectedFilters].join(", ") || "Aucune"}`;
        });
    });

    // Gestion de la top bar
    window.addEventListener('scroll', function() {
        // Vérifier si searchBar existe avant d'accéder à ses propriétés
        if (searchBar) {
            const searchBarRect = searchBar.getBoundingClientRect();
            const searchBarBottom = searchBarRect.bottom + 50;
            // Changer la couleur en fonction de la position du scroll
            if (window.scrollY > searchBarBottom) {
                topBar.style.backgroundColor = 'rgba(84, 153, 250, 0.8)';
            } else {
                // Calculer l'opacité en fonction du scroll
                const scrollProgress = window.scrollY / searchBarBottom;
                const opacity = Math.min(scrollProgress * 0.8, 0.8);
                topBar.style.backgroundColor = `rgba(84, 153, 250, ${opacity})`;
            }
        }
    });

    // Appliquer les filtres
    const applyButton = document.querySelector('.apply-button');
    if (applyButton) {
        applyButton.addEventListener('click', () => {
            // Fermer le dropdown
            const dropdownContent = document.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        });
    }
});
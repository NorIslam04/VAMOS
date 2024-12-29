flatpickr("#arrival-date", {
  dateFormat: "d/m/Y",
  minDate: "today", // Désactiver les dates passées
  position: "below", 
});

flatpickr("#departure-date", {
  dateFormat: "d/m/Y",
  minDate: "today",
  position: "below", 
});

/*.................caroussel agence............................*/
document.addEventListener("DOMContentLoaded", () => {
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
});
/*.................................dropdown budjet ....................*/
document.addEventListener("DOMContentLoaded", () => {
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
});
/*..................................top bar.......................................*/
window.addEventListener('scroll', function() {
var topBar = document.getElementById('top-bar');
var searchBar = document.querySelector('.search-bar');
var searchBarBottom = searchBar.getBoundingClientRect().bottom;

if (window.scrollY > searchBarBottom) {
    topBar.style.backgroundColor = 'rgba(84, 153, 250, 0.8)'; // Change to desired color and opacity
} else {
    topBar.style.backgroundColor = 'transparent'; // Original color
}
});


document.addEventListener('DOMContentLoaded', function() {
  // Chargement dynamique de Flatpickr
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/flatpickr';
  script.async = true;
  document.body.appendChild(script);
});
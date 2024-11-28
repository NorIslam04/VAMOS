document.addEventListener('DOMContentLoaded', function() {
    // Assurez-vous que le DOM est complètement chargé avant d'exécuter ce script
    const form = document.getElementById("login-form");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    // Vérifiez si le formulaire existe
    if (form) {
        // Ajoutez un gestionnaire d'événements pour la soumission du formulaire
        form.addEventListener("submit", function (event) {
            console.log("Form submitted"); // Affiche un message dans la console lorsque le formulaire est soumis
            
            event.preventDefault(); // Empêche le formulaire d'être envoyé immédiatement
            
            console.log("Password value:", passwordInput.value); // Affiche la valeur saisie dans le champ mot de passe

            // Validation du mot de passe
            if (passwordInput.value !== "qq") { // Vérifie si le mot de passe n'est pas égal à "qq"
                console.log("Password is incorrect"); // Message dans la console pour indiquer que le mot de passe est incorrect
                
                passwordInput.classList.add("error"); // Ajoute une classe 'error' pour styliser le champ avec une erreur
                errorMessage.style.display = "block"; // Affiche le message d'erreur
            } else {
                console.log("Password is correct"); // Message dans la console pour indiquer que le mot de passe est correct
                
                passwordInput.classList.remove("error"); // Supprime la classe 'error'
                errorMessage.style.display = "none"; // Masque le message d'erreur
                form.submit(); // Soumet le formulaire si la validation est réussie
            }
        });
    }
});

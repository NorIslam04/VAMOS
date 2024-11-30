document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Empêche l'envoi classique du formulaire

            // Récupère les données des champs
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Envoie une requête AJAX vers le backend Django
            fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',// Type de données envoyées
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,// Token CSRF
                    'X-Requested-With': 'XMLHttpRequest'  // Indique que c'est une requête AJAX
                },
                body: new URLSearchParams({// Corps de la requête
                    username: username,// Nom des champs le premier est le nom de la variable en python et le deuxième est le nom de l'input
                    password: password
                })
            })
            .then(response => response.json())// Récupère la réponse en JSON (objet JavaScript) et la renvoie à la prochaine étape de la chaîne.
            .then(data => {
                if (data.success) {
                    // Succès : redirection vers la page profil
                    window.location.href = data.redirect_url;// Redirige vers la page profil
                } else {
                    // Échec : affiche le message d'erreur
                    errorMessage.textContent = data.error;
                    errorMessage.style.display = "block";
                }
            })
            .catch(error => {
                console.error("Erreur AJAX :", error);
            });
        });
    }
});

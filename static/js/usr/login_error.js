// Écouteur pour exécuter le script lorsque le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments HTML liés au formulaire de connexion
    const form = document.getElementById("login-form"); // Le formulaire de connexion
    const usernameInput = document.getElementById("username"); // Champ pour le nom d'utilisateur
    const passwordInput = document.getElementById("password"); // Champ pour le mot de passe
    const usernameErrorMessage = document.getElementById("username-error-message"); // Message d'erreur pour le champ nom d'utilisateur
    const passwordErrorMessage = document.getElementById("password-error-message"); // Message d'erreur pour le champ mot de passe
    // Vérification si le formulaire existe pour éviter les erreurs si le script est chargé sur une autre page
    if (form) {
        // Écouteur d'événement pour intercepter la soumission du formulaire
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
            // Réinitialisation des styles d'erreur pour tous les champs avant une nouvelle vérification
            passwordInput.classList.remove('error');
            usernameInput.classList.remove('error');
            usernameErrorMessage.style.display = "none"; // Cache le message d'erreur pour le nom d'utilisateur
            passwordErrorMessage.style.display = "none"; // Cache le message d'erreur pour le mot de passe
            // Récupération des valeurs saisies dans les champs
            const username = usernameInput.value; // Valeur du nom d'utilisateur
            const password = passwordInput.value; // Valeur du mot de passe
            // Envoi d'une requête AJAX au serveur en utilisant l'API Fetch
            fetch(form.action, { // L'URL est extraite de l'attribut "action" du formulaire
                //ajax post request
                method: 'POST', // Méthode HTTP utilisée
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Type de contenu des données envoyées
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value, // Inclusion du jeton CSRF pour sécuriser la requête
                    'X-Requested-With': 'XMLHttpRequest' // Indique que la requête est de type AJAX
                },
                body: new URLSearchParams({ // Construction des données à envoyer au serveur
                    username: username, // Correspond au paramètre attendu par la vue Django
                    password: password
                })
            })
            .then(response => response.json()) // Convertit la réponse en JSON
            .then(data => { // Traite les données JSON reçues
                if (data.success) {
                    // Si la connexion réussit, redirige l'utilisateur vers l'URL fournie
                    window.location.href = data.redirect_url;
                } else {
                    // Gestion des erreurs en fonction du type d'erreur renvoyée par le serveur
                    if (data.error === 'Incorrect password') {
                        // Affiche un message d'erreur pour un mot de passe incorrect
                        passwordErrorMessage.textContent = data.error;
                        passwordErrorMessage.style.display = "block";
                        passwordInput.classList.add('error'); // Ajoute une classe CSS pour mettre en évidence le champ en erreur
                    } else if (data.error === 'User not found') {
                        // Affiche un message d'erreur si l'utilisateur est introuvable
                        usernameErrorMessage.textContent = data.error;
                        usernameErrorMessage.style.display = "block";
                        usernameInput.classList.add('error'); // Ajoute une classe CSS pour le champ nom d'utilisateur
                    }
                }
            })
            .catch(error => {
                // Gestion des erreurs inattendues lors de l'exécution de la requête AJAX
                console.error("Erreur AJAX :", error);
            });
        });

        // Ajout d'écouteurs pour effacer les styles d'erreur lorsque l'utilisateur modifie le champ
        usernameInput.addEventListener('input', function() {
            this.classList.remove('error'); // Supprime la classe d'erreur pour le champ nom d'utilisateur
            usernameErrorMessage.style.display = "none"; // Cache le message d'erreur associé
        });

        passwordInput.addEventListener('input', function() {
            this.classList.remove('error'); // Supprime la classe d'erreur pour le champ mot de passe
            passwordErrorMessage.style.display = "none"; // Cache le message d'erreur associé
        });
    }
});
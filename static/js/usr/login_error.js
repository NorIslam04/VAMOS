document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameErrorMessage = document.getElementById("username-error-message");
    const passwordErrorMessage = document.getElementById("password-error-message");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            // Réinitialise tous les styles d'erreur
            passwordInput.classList.remove('error');
            usernameInput.classList.remove('error');
            usernameErrorMessage.style.display = "none";
            passwordErrorMessage.style.display = "none";

            const username = usernameInput.value;
            const password = passwordInput.value;

            fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: new URLSearchParams({
                    username: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Succès : redirection vers la page profil
                    window.location.href = data.redirect_url;
                } else {
                    // Gestion des différents types d'erreurs
                    if (data.error === 'Incorrect password') {
                        passwordErrorMessage.textContent = data.error;
                        passwordErrorMessage.style.display = "block";
                        passwordInput.classList.add('error');
                    } else if (data.error === 'User not found') {
                        usernameErrorMessage.textContent = data.error;
                        usernameErrorMessage.style.display = "block";
                        usernameInput.classList.add('error');
                    }
                }
            })
            .catch(error => {
                console.error("Erreur AJAX :", error);
            });
        });

        // Écouteurs pour effacer les erreurs lors de la saisie
        usernameInput.addEventListener('input', function() {
            this.classList.remove('error');
            usernameErrorMessage.style.display = "none";
        });

        passwordInput.addEventListener('input', function() {
            this.classList.remove('error');
            passwordErrorMessage.style.display = "none";
        });
    }
});
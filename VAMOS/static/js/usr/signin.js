document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("signin-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const emailInput = document.getElementById("email");
    const usernameErrorMessage = document.getElementById("username-error-message");
    const passwordErrorMessage = document.getElementById("password-error-message");
    const emailErrorMessage = document.getElementById("email-error-message");
    const globalErrorMessage = document.getElementById("global-error-message");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            [usernameInput, passwordInput, emailInput].forEach(input => input.classList.remove('error'));
            [usernameErrorMessage, passwordErrorMessage, emailErrorMessage, globalErrorMessage].forEach(msg => {
                if (msg) msg.style.display = "none";
            });

            const username = usernameInput.value;
            const password = passwordInput.value;
            const email = emailInput.value;

            fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: new URLSearchParams({ username, password, email })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = data.redirect_url;
                    } else {
                        if (data.error && data.error.field) {
                            const field = data.error.field;
                            const errorMessage = document.getElementById(`${field}-error-message`);
                            const inputField = document.getElementById(field);
                            if (errorMessage && inputField) {
                                errorMessage.textContent = data.error.message;
                                errorMessage.style.display = "block";
                                inputField.classList.add('error');
                            }
                        }
                        if (data.error && data.error.global) {
                            globalErrorMessage.textContent = data.error.global;
                            globalErrorMessage.style.display = "block";
                        }
                    }
                })
                .catch(error => {
                    console.error("Erreur AJAX :", error);
                    if (globalErrorMessage) {
                        globalErrorMessage.textContent = "Une erreur inattendue est survenue. Veuillez réessayer.";
                        globalErrorMessage.style.display = "block";
                    }
                });
        });

        [usernameInput, passwordInput, emailInput].forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMessage = document.getElementById(`${this.id}-error-message`);
                if (errorMessage) errorMessage.style.display = "none";
            });
        });
    }
});

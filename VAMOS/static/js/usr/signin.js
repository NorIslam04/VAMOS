// Configuration des constantes pour l'animation
const ANIMATION_DURATION = 300; // durée en millisecondes
const ANIMATION_EASING = 'ease-in-out';

// Classe utilitaire pour gérer les animations
class FormAnimator {
    static shake(element) {
        element.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: ANIMATION_DURATION,
            easing: ANIMATION_EASING
        });
    }

    static fadeIn(element) {
        element.style.opacity = '0';
        element.style.display = 'block';
        element.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: ANIMATION_DURATION,
            easing: ANIMATION_EASING
        }).onfinish = () => element.style.opacity = '1';
    }

    static fadeOut(element) {
        element.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: ANIMATION_DURATION,
            easing: ANIMATION_EASING
        }).onfinish = () => {
            element.style.display = 'none';
            element.style.opacity = '0';
        };
    }
}

// Classe principale pour gérer le formulaire d'inscription
class SignupForm {
    constructor() {
        this.form = document.getElementById('signup-form');
        this.usernameInput = document.getElementById('username');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.usernameErrorMessage = document.getElementById('username-error-message');
        this.emailErrorMessage = document.getElementById('email-error-message');
        this.passwordErrorMessage = document.getElementById('password-error-message');
        this.loadingSpinner = this.createLoadingSpinner();

        this.initialize();
    }

    createLoadingSpinner() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.style.display = 'none';
        this.form.appendChild(spinner);
        return spinner;
    }

    initialize() {
        if (!this.form) return;

        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.setupInputListeners();
        this.setupPasswordStrengthIndicator();
    }

    setupInputListeners() {
        this.usernameInput.addEventListener('input', () => this.clearError(this.usernameInput, this.usernameErrorMessage));
        this.emailInput.addEventListener('input', () => this.clearError(this.emailInput, this.emailErrorMessage));
        this.passwordInput.addEventListener('input', () => this.clearError(this.passwordInput, this.passwordErrorMessage));
    }

    setupPasswordStrengthIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'password-strength';
        this.passwordInput.parentNode.appendChild(indicator);

        this.passwordInput.addEventListener('input', (e) => {
            const strength = this.calculatePasswordStrength(e.target.value);
            this.updatePasswordStrengthIndicator(indicator, strength);
        });
    }

    calculatePasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    }

    updatePasswordStrengthIndicator(indicator, strength) {
        const colors = ['#ff4444', '#ffaa33', '#ffff33', '#33ff33', '#00ff00'];
        indicator.style.width = `${(strength / 5) * 100}%`;
        indicator.style.backgroundColor = colors[strength - 1] || colors[0];
    }

    clearError(input, errorMessage) {
        input.classList.remove('error');
        FormAnimator.fadeOut(errorMessage);
    }

    showError(input, errorMessage, errorText) {
        input.classList.add('error');
        errorMessage.textContent = errorText;
        FormAnimator.fadeIn(errorMessage);
        FormAnimator.shake(input);
    }

    async handleSubmit(event) {
        event.preventDefault();

        // Réinitialisation des erreurs
        this.clearError(this.usernameInput, this.usernameErrorMessage);
        this.clearError(this.emailInput, this.emailErrorMessage);
        this.clearError(this.passwordInput, this.passwordErrorMessage);

        // Animation du bouton de soumission
        const submitButton = this.form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        FormAnimator.fadeIn(this.loadingSpinner);

        try {
            const response = await fetch(this.form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: new URLSearchParams({
                    username: this.usernameInput.value,
                    email: this.emailInput.value,
                    password: this.passwordInput.value
                })
            });

            const data = await response.json();

            if (data.success) {
                // Animation de succès avant la redirection
                this.form.classList.add('success');
                setTimeout(() => window.location.href = data.redirect_url, ANIMATION_DURATION);
            } else {
                if (data.error.field === 'username') {
                    this.showError(this.usernameInput, this.usernameErrorMessage, data.error.message);
                } else if (data.error.field === 'email') {
                    this.showError(this.emailInput, this.emailErrorMessage, data.error.message);
                } else if (data.error.field === 'password') {
                    this.showError(this.passwordInput, this.passwordErrorMessage, data.error.message);
                }
            }
        } catch (error) {
            console.error("Erreur AJAX :", error);
        } finally {
            submitButton.disabled = false;
            FormAnimator.fadeOut(this.loadingSpinner);
        }
    }
}

// Initialisation du formulaire lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => new SignupForm());

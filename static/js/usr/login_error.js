document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
  
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche l'envoi du formulaire pour cette démo
  
        // Validation simulée
        if (passwordInput && errorMessage) {
          if (passwordInput.value !== "expectedPassword") {
            passwordInput.classList.add("error");
            errorMessage.style.display = "block";
          } else {
            passwordInput.classList.remove("error");
            errorMessage.style.display = "none";
            form.submit(); // Soumet le formulaire si la validation est réussie
          }
        }
      });
    }
  });
  
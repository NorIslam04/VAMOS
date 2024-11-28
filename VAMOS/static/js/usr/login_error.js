
document.addEventListener('DOMContentLoaded', function() { //DOMContentLoaded oubligation d'attendre que le DOM soit chargé pour exécuter le script
  const form = document.getElementById("login-form");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");
  if (form) {
    form.addEventListener("submit", function (event) {
      console.log("Form submitted");
      event.preventDefault();
      
      console.log("Password value:", passwordInput.value);
      
      if (passwordInput.value !== "qq") {
        console.log("Password is incorrect");
        passwordInput.classList.add("error");
        errorMessage.style.display = "block";
      } else {
        console.log("Password is correct");
        passwordInput.classList.remove("error");
        errorMessage.style.display = "none";
        form.submit();
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
    
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents form submission for this demo
    
        // Simulated validation
        if (passwordInput && errorMessage) {
          if (passwordInput.value !== "expectedPassword") {
            passwordInput.classList.add("error"); // Add error class for styling
            errorMessage.style.display = "block"; // Display the error message
          } else {
            passwordInput.classList.remove("error");
            errorMessage.style.display = "none"; // Hide the error message when valid
            form.submit(); // Submit the form if validation is successful
          }
        }
      });
    }
  });
  
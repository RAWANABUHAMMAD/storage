function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailPattern.test(email);
}

function login(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    if (!validateEmail(emailInput.value)) {
        errorMessage.textContent = "Invalid email. Please enter a valid email address.";
        return;
    }


    const username = emailInput.value.split("@")[0]; 
    localStorage.setItem("username", username);
    localStorage.setItem("password", passwordInput.value);


    window.location.href = "home.html";}
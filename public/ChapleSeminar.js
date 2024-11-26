document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const seminar = document.getElementById('seminar').value;

    // Basic validation
    if (name === "" || email === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Simple email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Display a confirmation message
    const confirmationMessage = `Thank you, ${name}! You have registered for the seminar: ${seminar}.`;
    document.getElementById('confirmation-message').innerText = confirmationMessage;

    // Clear the form
    this.reset();
});
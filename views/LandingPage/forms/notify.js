document.addEventListener('DOMContentLoaded', function() {
    // Select the form element with the class "php-email-form"
    const subscribeForm = document.querySelector('.php-email-form');

    if (subscribeForm) {
        // Add a submit event listener to the form
        subscribeForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission

            // Get the email value from the input field
            const emailInput = subscribeForm.querySelector('input[name="email"]');
            const email = emailInput.value;

            // Get the reCAPTCHA response
            const recaptchaResponse = grecaptcha.getResponse();

            // Regular expression for email validation
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if (!emailRegex.test(email)) {
                // Email is not valid, show an alert message
                alert('Invalid email address. Please enter a valid email.');
            } else if (!recaptchaResponse) {
                // reCAPTCHA not solved, show an alert message
                alert('Please complete the reCAPTCHA.');
            } else {
                // Email is valid, and reCAPTCHA is complete, proceed with form submission

                // Create an object to hold the data you want to send to the server
                const data = {
                    email: email,
                    recaptchaResponse: recaptchaResponse
                };

                // Make a POST request to the server using the Fetch API
                fetch('/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.status === 200) {
                        // Success: Handle a successful response here
                        console.log('Subscription successful');
                        const subscribeDiv = document.querySelector('.subscribe');
                        subscribeDiv.innerHTML = '<h4>Thank you for subscribing!</h4>';
                        subscribeForm.reset(); // Clear the form
                    } else {
                        // Error: Handle errors or validation failures
                        console.error('Subscription failed');
                        alert('Subscription failed. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                });
            }
        });
    }
});


    function toggleForm() {
        const action = document.getElementById('loginMethod').value;
        const loginFields = document.getElementById('emailLogin');
        const phoneFields = document.getElementById('phoneLogin');
        const signupForm = document.querySelector('.signup-form');

        if (action === 'login') {
            loginFields.style.display = 'block';
            phoneFields.style.display = 'none';
            signupForm.style.display = 'none';
        } else if (action === 'signup') {
            loginFields.style.display = 'none';
            phoneFields.style.display = 'none';
            signupForm.style.display = 'block';
        }
    }

    async function performAction() {
        const action = document.getElementById('loginMethod').value;

        if (action === 'login') {
            const emailOrPhone = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ emailOrPhone, password })
                });

                if (response.ok) {
                    // Login successful, you can redirect or perform desired action
                    // Example: window.location.href = '/dashboard';
                } else {
                    const data = await response.json();
                    // Handle login failure, display an error message
                    alert(data.message);
                }
            } catch (error) {
                // Handle network error
                console.error('Network error:', error);
            }
        } else if (action === 'signup') {
            // Show the signup form and hide the login form
            toggleForm();
        }
    }

    async function performSignUp() {
        const emailOrPhone = document.getElementById('signupEmailOrPhone').value;
        const location = document.getElementById('signupLocation').value;
        const password = document.getElementById('signupPassword').value;
        const retypePassword = document.getElementById('signupRetypePassword').value;

        // Password validation: At least 4 characters, containing one capital letter
        const passwordRegex = /^(?=.*[A-Z]).{4,}$/;

        if (!password.match(passwordRegex) || password !== retypePassword) {
            alert('Invalid password. Please enter a password of at least 4 characters with one capital letter.');
            return;
        }

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emailOrPhone, location, password })
            });

            if (response.ok) {
                // Signup successful, you can redirect or perform desired action
                // Example: window.location.href = '/dashboard';
            } else {
                const data = await response.json();
                // Handle signup failure, display an error message
                alert(data.message);
            }
        } catch (error) {
            // Handle network error
            console.error('Network error:', error);
        }
    }


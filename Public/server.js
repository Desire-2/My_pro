const express = require('express');
const bodyParser = require('body-parser');
const randomstring = require('randomstring'); // for generating confirmation codes
const bcrypt = require('bcrypt'); // for password hashing

const app = express();
app.use(bodyParser.json());

const users = []; // Store user data here

// Endpoint for user registration
app.post('/register', async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;

        // Generate a random 5-digit confirmation code
        const confirmationCode = randomstring.generate({
            length: 5,
            charset: 'numeric'
        });

        // Hash and salt the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user data
        const user = {
            emailOrPhone,
            hashedPassword,
            confirmationCode,
            confirmed: false // User is not confirmed initially
        };
        users.push(user);

        // Send confirmation code (simulate email/SMS)
        console.log(`Confirmation code for ${emailOrPhone}: ${confirmationCode}`);

        res.status(201).json({ message: 'User registered. Check your email or phone for confirmation code.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint for confirming the user
app.post('/confirm', (req, res) => {
    try {
        const { confirmationCode } = req.body;

        // Find the user with the provided confirmation code
        const user = users.find(u => u.confirmationCode === confirmationCode);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            // Mark the user as confirmed
            user.confirmed = true;
            res.status(200).json({ message: 'User confirmed. You can now log in.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

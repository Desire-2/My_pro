const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// In-memory storage for user data (replace this with a database in a real application)
const users = [];

app.use(express.static('public'));

app.post('/signup', (req, res) => {
    const { emailOrPhone, location, password, retypePassword } = req.body;

    // Password validation: At least 4 characters, containing one capital letter
    const passwordRegex = /^(?=.*[A-Z]).{4,}$/;

    if (!password.match(passwordRegex) || password !== retypePassword) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    // Check if the email or phone number is already registered (replace with database query)
    const isExistingUser = users.some(user => user.emailOrPhone === emailOrPhone);

    if (isExistingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    // Store user data (replace with database storage)
    users.push({ emailOrPhone, location, password });

    res.status(201).json({ message: 'User signed up successfully' });
});

app.post('/login', (req, res) => {
    const { emailOrPhone, password } = req.body;

    // Find user by email or phone number (replace with database query)
    const user = users.find(user => user.emailOrPhone === emailOrPhone);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches (replace with secure password hashing and validation)
    if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

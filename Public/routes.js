// routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// In-memory storage for user data (replace this with a database in a real application)
const users = [];

// In-memory storage for house data (replace this with a database in a real application)
const houses = [];

// Create a multer storage engine for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for user registration
router.post('/signup', (req, res) => {
    const { emailOrPhone, password } = req.body;

    // Check if the email or phone number is already registered (replace with database query)
    const isExistingUser = users.some((user) => user.emailOrPhone === emailOrPhone);

    if (isExistingUser) {
        return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password (you should use bcrypt or a similar library for secure password hashing)
    const hashedPassword = password;

    // Store the user in memory (replace with database storage)
    users.push({ emailOrPhone, password: hashedPassword });

    // Create a session for the user after registration
    req.session.user = { emailOrPhone };

    res.status(201).json({ message: 'User registered successfully' });
});

// Route for user login
router.post('/login', (req, res) => {
    const { emailOrPhone, password } = req.body;

    // Find the user by email or phone number (replace with database query)
    const user = users.find((user) => user.emailOrPhone === emailOrPhone);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches (you should use bcrypt for secure password hashing and validation)
    if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    // Create a session for the user after login
    req.session.user = { emailOrPhone };

    res.status(200).json({ message: 'Login successful' });
});

// Route for user logout
router.get('/logout', (req, res) => {
    // Destroy the user's session to log them out
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

// Route for posting houses (requires authentication)
router.post('/post-house', isAuthenticated, upload.array('houseImages', 5), (req, res) => {
    const { picture, location, description } = req.body;

    // Handle image files (req.files contains the uploaded images)
    const images = req.files.map(file => ({
        filename: file.originalname,
        data: file.buffer
    }));

    // Store the house in memory (replace with database storage)
    houses.push({ picture, location, description, images });

    res.status(201).json({ message: 'House posted successfully' });
});

// Middleware for checking user authentication
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
}

module.exports = router;

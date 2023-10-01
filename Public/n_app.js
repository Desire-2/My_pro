const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line to include the 'path' module

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Include the routes defined in routes.js
const routes = require('./routes'); // Make sure the path to routes.js is correct
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

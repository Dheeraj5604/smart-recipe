require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// --- IMPORT ROUTER ---
const recipeRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE CONFIGURATION
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// USE ROUTES
// Tell Express to use the router for all requests to the root path
app.use('/', recipeRoutes);

// START SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
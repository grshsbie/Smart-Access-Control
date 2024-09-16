const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');

// Import route files
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
//P5DjNdhbIaG9Rr6H
// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Enable CORS for all routes
app.use(cors());

// Handle preflight requests for all routes
app.options('*', cors());  // This will handle OPTIONS requests sent by the browser for preflight checks

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); // For handling cookies

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
   res.status(404).send('Page not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

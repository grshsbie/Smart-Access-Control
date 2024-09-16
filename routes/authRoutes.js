const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();



// User registration routes
router.get('/register/user', authController.registerUserPage);
router.post('/register/user', authController.registerUser);

// Admin registration routes
router.get('/register/admin', authController.registerAdminPage);
router.post('/register/admin', authController.registerAdmin);

// Login routes for both users and admins
router.get('/login', authController.loginPage);
router.post('/login', authController.login);

module.exports = router;

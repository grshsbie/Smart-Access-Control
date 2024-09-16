const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Protect user routes with the isUser middleware
router.get('/control', authMiddleware.isUser, userController.controlPage);

module.exports = router;

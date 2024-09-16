const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Protect admin routes with the isAdmin middleware
router.get('/dashboard', authMiddleware.isAdmin, adminController.dashboardPage);
router.post('/log', authMiddleware.isAdmin, adminController.logActivity);

module.exports = router;

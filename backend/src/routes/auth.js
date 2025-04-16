const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', authController.getCurrentUser);
router.put('/profile', authController.updateProfile);

module.exports = router; 
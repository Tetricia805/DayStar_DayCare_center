const express = require('express');
const router = express.Router();
const childController = require('../controllers/child');
const { auth, checkRole } = require('../middlewares/auth');

// Protected routes - uncomment when authentication is implemented
// router.use(auth);

// Child management routes
router.post('/', childController.createChild);
router.get('/', childController.getAllChildren);
router.get('/:id', childController.getChildById);
router.put('/:id', childController.updateChild);
router.delete('/:id', childController.deleteChild);

module.exports = router; 
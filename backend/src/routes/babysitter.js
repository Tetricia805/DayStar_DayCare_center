const express = require('express');
const router = express.Router();
const babysitterController = require('../controllers/babysitter');
const { auth, checkRole } = require('../middlewares/auth');

// Protected routes - uncomment these when you implement authentication
// router.use(auth);

// Babysitter management routes
router.post('/', babysitterController.createBabysitter);
router.get('/', babysitterController.getAllBabysitters);
router.get('/:id', babysitterController.getBabysitterById);
router.put('/:id', babysitterController.updateBabysitter);
router.delete('/:id', babysitterController.deleteBabysitter);

// Babysitter-specific routes
router.get('/:id/schedule', babysitterController.getBabysitterSchedule);
router.get('/:id/children', babysitterController.getBabysitterChildren);

module.exports = router; 
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance');
const { auth, checkRole } = require('../middlewares/auth');

// Protected routes
router.use(auth);

// Attendance management routes
router.post('/', checkRole(['manager', 'babysitter']), attendanceController.createAttendance);
router.get('/', checkRole(['manager', 'babysitter']), attendanceController.getAttendance);
router.get('/child/:childId', checkRole(['manager', 'babysitter', 'parent']), attendanceController.getChildAttendance);
router.put('/:id', checkRole(['manager', 'babysitter']), attendanceController.updateAttendance);
router.get('/report', checkRole(['manager']), attendanceController.getAttendanceReport);

module.exports = router; 
const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incident');
const { auth, checkRole } = require('../middlewares/auth');
const { createIncident } = require('../controllers/incident');

// Protected routes
router.use(auth);

// Incident management routes
router.post('/', checkRole(['manager', 'babysitter']), incidentController.createIncident);
router.get('/', checkRole(['manager', 'babysitter']), incidentController.getIncidents);
router.get('/child/:childId', checkRole(['manager', 'babysitter', 'parent']), incidentController.getChildIncidents);
router.put('/:id', checkRole(['manager']), incidentController.updateIncident);
router.get('/report', checkRole(['manager']), incidentController.getIncidentReport);

// creating a new incident reporrt
router.post('/', createIncident);

module.exports = router; 
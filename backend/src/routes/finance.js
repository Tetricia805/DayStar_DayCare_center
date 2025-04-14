const express = require('express');
const router = express.Router();
const financeController = require('../controllers/finance');
const { auth, checkRole } = require('../middlewares/auth');

// Protected routes
router.use(auth);

// Financial management routes
router.get('/dashboard', checkRole(['manager']), financeController.getFinancialDashboard);
router.get('/income', checkRole(['manager']), financeController.getIncome);
router.post('/income', checkRole(['manager']), financeController.createIncome);
router.get('/expenses', checkRole(['manager']), financeController.getExpenses);
router.post('/expenses', checkRole(['manager']), financeController.createExpense);
router.get('/budget', checkRole(['manager']), financeController.getBudget);
router.post('/budget', checkRole(['manager']), financeController.createBudget);
router.get('/reports', checkRole(['manager']), financeController.getFinancialReports);

// Payment routes
router.get('/payments', checkRole(['manager']), financeController.getPayments);
router.post('/payments', checkRole(['manager']), financeController.createPayment);
router.put('/payments/:id', checkRole(['manager']), financeController.updatePaymentStatus);

module.exports = router; 
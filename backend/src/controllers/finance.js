const pool = require('../config/database');

const getFinancialDashboard = async (req, res) => {
  try {
    // Get total income for current month
    const [income] = await pool.execute(
      `SELECT SUM(amount) as total_income 
      FROM income 
      WHERE MONTH(income_date) = MONTH(CURRENT_DATE()) 
      AND YEAR(income_date) = YEAR(CURRENT_DATE())`
    );

    // Get total expenses for current month
    const [expenses] = await pool.execute(
      `SELECT SUM(amount) as total_expenses 
      FROM expenses 
      WHERE MONTH(expense_date) = MONTH(CURRENT_DATE()) 
      AND YEAR(expense_date) = YEAR(CURRENT_DATE())`
    );

    // Get pending payments
    const [pendingPayments] = await pool.execute(
      `SELECT COUNT(*) as count 
      FROM payments 
      WHERE status = 'pending'`
    );

    res.json({
      total_income: income[0].total_income || 0,
      total_expenses: expenses[0].total_expenses || 0,
      pending_payments: pendingPayments[0].count
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getIncome = async (req, res) => {
  try {
    const [income] = await pool.execute(
      'SELECT * FROM income ORDER BY income_date DESC'
    );
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createIncome = async (req, res) => {
  try {
    const { amount, source, description, income_date } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO income (amount, source, description, income_date) VALUES (?, ?, ?, ?)',
      [amount, source, description, income_date]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Income recorded successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getExpenses = async (req, res) => {
  try {
    const [expenses] = await pool.execute(
      'SELECT * FROM expenses ORDER BY expense_date DESC'
    );
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createExpense = async (req, res) => {
  try {
    const { amount, category, description, expense_date } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO expenses (amount, category, description, expense_date) VALUES (?, ?, ?, ?)',
      [amount, category, description, expense_date]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Expense recorded successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBudget = async (req, res) => {
  try {
    const [budget] = await pool.execute(
      'SELECT * FROM budget ORDER BY month DESC'
    );
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createBudget = async (req, res) => {
  try {
    const { category, amount, month } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO budget (category, amount, month) VALUES (?, ?, ?)',
      [category, amount, month]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Budget created successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getFinancialReports = async (req, res) => {
  try {
    // Get monthly income
    const [monthlyIncome] = await pool.execute(
      `SELECT MONTH(income_date) as month, YEAR(income_date) as year, SUM(amount) as total 
      FROM income 
      GROUP BY YEAR(income_date), MONTH(income_date) 
      ORDER BY year DESC, month DESC`
    );

    // Get monthly expenses
    const [monthlyExpenses] = await pool.execute(
      `SELECT MONTH(expense_date) as month, YEAR(expense_date) as year, SUM(amount) as total 
      FROM expenses 
      GROUP BY YEAR(expense_date), MONTH(expense_date) 
      ORDER BY year DESC, month DESC`
    );

    // Get payment status
    const [paymentStatus] = await pool.execute(
      `SELECT status, COUNT(*) as count 
      FROM payments 
      GROUP BY status`
    );

    res.json({
      monthly_income: monthlyIncome,
      monthly_expenses: monthlyExpenses,
      payment_status: paymentStatus
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPayments = async (req, res) => {
  try {
    const [payments] = await pool.execute(
      `SELECT p.*, c.first_name as child_first_name, c.last_name as child_last_name, 
      u.first_name as parent_first_name, u.last_name as parent_last_name 
      FROM payments p 
      JOIN children c ON p.child_id = c.id 
      JOIN users u ON p.parent_id = u.id 
      ORDER BY p.payment_date DESC`
    );
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createPayment = async (req, res) => {
  try {
    const {
      parent_id,
      child_id,
      amount,
      payment_type,
      payment_date,
      due_date
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO payments 
      (parent_id, child_id, amount, payment_type, status, payment_date, due_date) 
      VALUES (?, ?, ?, ?, 'pending', ?, ?)`,
      [parent_id, child_id, amount, payment_type, payment_date, due_date]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Payment created successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    await pool.execute(
      'UPDATE payments SET status = ? WHERE id = ?',
      [status, req.params.id]
    );

    res.json({ message: 'Payment status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getFinancialDashboard,
  getIncome,
  createIncome,
  getExpenses,
  createExpense,
  getBudget,
  createBudget,
  getFinancialReports,
  getPayments,
  createPayment,
  updatePaymentStatus
}; 
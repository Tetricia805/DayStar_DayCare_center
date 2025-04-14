const pool = require('../config/database');

const createAttendance = async (req, res) => {
  try {
    const {
      child_id,
      date,
      check_in,
      check_out,
      status,
      notes
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO attendance 
      (child_id, date, check_in, check_out, status, notes) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [child_id, date, check_in, check_out, status, notes]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Attendance recorded successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAttendance = async (req, res) => {
  try {
    const [attendance] = await pool.execute(
      `SELECT a.*, c.first_name as child_first_name, c.last_name as child_last_name 
      FROM attendance a 
      JOIN children c ON a.child_id = c.id 
      ORDER BY a.date DESC`
    );
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getChildAttendance = async (req, res) => {
  try {
    const [attendance] = await pool.execute(
      `SELECT a.*, c.first_name as child_first_name, c.last_name as child_last_name 
      FROM attendance a 
      JOIN children c ON a.child_id = c.id 
      WHERE a.child_id = ? 
      ORDER BY a.date DESC`,
      [req.params.childId]
    );
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const {
      check_in,
      check_out,
      status,
      notes
    } = req.body;

    await pool.execute(
      `UPDATE attendance 
      SET check_in = ?, check_out = ?, status = ?, notes = ? 
      WHERE id = ?`,
      [check_in, check_out, status, notes, req.params.id]
    );

    res.json({ message: 'Attendance updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAttendanceReport = async (req, res) => {
  try {
    // Get monthly attendance summary
    const [monthlySummary] = await pool.execute(
      `SELECT 
        MONTH(date) as month, 
        YEAR(date) as year,
        COUNT(*) as total_days,
        SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present_days,
        SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent_days,
        SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as late_days
      FROM attendance 
      GROUP BY YEAR(date), MONTH(date) 
      ORDER BY year DESC, month DESC`
    );

    // Get child attendance summary
    const [childSummary] = await pool.execute(
      `SELECT 
        c.id,
        c.first_name,
        c.last_name,
        COUNT(*) as total_days,
        SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present_days,
        SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END) as absent_days,
        SUM(CASE WHEN a.status = 'late' THEN 1 ELSE 0 END) as late_days
      FROM children c 
      LEFT JOIN attendance a ON c.id = a.child_id 
      GROUP BY c.id, c.first_name, c.last_name`
    );

    res.json({
      monthly_summary: monthlySummary,
      child_summary: childSummary
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createAttendance,
  getAttendance,
  getChildAttendance,
  updateAttendance,
  getAttendanceReport
}; 
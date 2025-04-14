const pool = require('../config/database');

const createIncident = async (req, res) => {
  try {
    const {
      child_id,
      incident_date,
      incident_time,
      incident_type,
      description,
      location,
      severity,
      action_taken,
      reported_by
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO incidents (
        child_id,
        incident_date,
        incident_time,
        incident_type,
        description,
        location,
        severity,
        action_taken,
        reported_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        child_id,
        incident_date,
        incident_time,
        incident_type,
        description,
        location,
        severity,
        action_taken,
        reported_by
      ]
    );

    res.status(201).json({
      message: 'Incident report submitted successfully',
      incidentId: result.insertId
    });
  } catch (error) {
    console.error('Error submitting incident report:', error);
    res.status(500).json({ 
      message: 'Error submitting incident report',
      error: error.message 
    });
  }
};

const getIncidents = async (req, res) => {
  try {
    const [incidents] = await pool.execute(
      `SELECT i.*, 
        c.first_name as child_first_name, c.last_name as child_last_name,
        b.user_id as babysitter_id, u.first_name as babysitter_first_name, u.last_name as babysitter_last_name
      FROM incidents i 
      JOIN children c ON i.child_id = c.id 
      JOIN babysitters b ON i.babysitter_id = b.id 
      JOIN users u ON b.user_id = u.id 
      ORDER BY i.reported_at DESC`
    );
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getChildIncidents = async (req, res) => {
  try {
    const [incidents] = await pool.execute(
      `SELECT i.*, 
        b.user_id as babysitter_id, u.first_name as babysitter_first_name, u.last_name as babysitter_last_name
      FROM incidents i 
      JOIN babysitters b ON i.babysitter_id = b.id 
      JOIN users u ON b.user_id = u.id 
      WHERE i.child_id = ? 
      ORDER BY i.reported_at DESC`,
      [req.params.childId]
    );
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateIncident = async (req, res) => {
  try {
    const {
      incident_type,
      description,
      severity,
      action_taken
    } = req.body;

    await pool.execute(
      `UPDATE incidents 
      SET incident_type = ?, description = ?, severity = ?, action_taken = ? 
      WHERE id = ?`,
      [incident_type, description, severity, action_taken, req.params.id]
    );

    res.json({ message: 'Incident updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getIncidentReport = async (req, res) => {
  try {
    // Get incident summary by type
    const [typeSummary] = await pool.execute(
      `SELECT 
        incident_type,
        COUNT(*) as total_incidents,
        SUM(CASE WHEN severity = 'high' THEN 1 ELSE 0 END) as high_severity,
        SUM(CASE WHEN severity = 'medium' THEN 1 ELSE 0 END) as medium_severity,
        SUM(CASE WHEN severity = 'low' THEN 1 ELSE 0 END) as low_severity
      FROM incidents 
      GROUP BY incident_type`
    );

    // Get monthly incident summary
    const [monthlySummary] = await pool.execute(
      `SELECT 
        MONTH(reported_at) as month,
        YEAR(reported_at) as year,
        COUNT(*) as total_incidents,
        SUM(CASE WHEN severity = 'high' THEN 1 ELSE 0 END) as high_severity,
        SUM(CASE WHEN severity = 'medium' THEN 1 ELSE 0 END) as medium_severity,
        SUM(CASE WHEN severity = 'low' THEN 1 ELSE 0 END) as low_severity
      FROM incidents 
      GROUP BY YEAR(reported_at), MONTH(reported_at) 
      ORDER BY year DESC, month DESC`
    );

    res.json({
      type_summary: typeSummary,
      monthly_summary: monthlySummary
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createIncident,
  getIncidents,
  getChildIncidents,
  updateIncident,
  getIncidentReport
}; 
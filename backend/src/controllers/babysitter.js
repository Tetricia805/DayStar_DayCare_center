const pool = require('../config/database');

// Create a new babysitter
const createBabysitter = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      nin,
      dateOfBirth,
      nextOfKinName,
      nextOfKinPhone,
      nextOfKinRelationship
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO babysitters (
        first_name, 
        last_name, 
        email, 
        phone_number, 
        nin, 
        date_of_birth, 
        next_of_kin_name, 
        next_of_kin_phone, 
        next_of_kin_relationship
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        email,
        phoneNumber,
        nin,
        dateOfBirth,
        nextOfKinName,
        nextOfKinPhone,
        nextOfKinRelationship
      ]
    );

    res.status(201).json({
      message: 'Babysitter registered successfully',
      babysitterId: result.insertId
    });
  } catch (error) {
    console.error('Error creating babysitter:', error);
    res.status(500).json({ message: 'Error registering babysitter' });
  }
};

// Get all babysitters
const getAllBabysitters = async (req, res) => {
  try {
    const [babysitters] = await pool.query('SELECT * FROM babysitters ORDER BY created_at DESC');
    res.json(babysitters);
  } catch (error) {
    console.error('Error fetching babysitters:', error);
    res.status(500).json({ message: 'Error fetching babysitters' });
  }
};

// Get a single babysitter by ID
const getBabysitterById = async (req, res) => {
  try {
    const [babysitter] = await pool.query(
      'SELECT * FROM babysitters WHERE id = ?',
      [req.params.id]
    );

    if (babysitter.length === 0) {
      return res.status(404).json({ message: 'Babysitter not found' });
    }

    res.json(babysitter[0]);
  } catch (error) {
    console.error('Error fetching babysitter:', error);
    res.status(500).json({ message: 'Error fetching babysitter details' });
  }
};

// Update a babysitter
const updateBabysitter = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      nin,
      dateOfBirth,
      nextOfKinName,
      nextOfKinPhone,
      nextOfKinRelationship
    } = req.body;

    const [result] = await pool.query(
      `UPDATE babysitters SET 
        first_name = ?, 
        last_name = ?, 
        email = ?, 
        phone_number = ?, 
        nin = ?, 
        date_of_birth = ?, 
        next_of_kin_name = ?, 
        next_of_kin_phone = ?, 
        next_of_kin_relationship = ?
      WHERE id = ?`,
      [
        firstName,
        lastName,
        email,
        phoneNumber,
        nin,
        dateOfBirth,
        nextOfKinName,
        nextOfKinPhone,
        nextOfKinRelationship,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Babysitter not found' });
    }

    res.json({ message: 'Babysitter updated successfully' });
  } catch (error) {
    console.error('Error updating babysitter:', error);
    res.status(500).json({ message: 'Error updating babysitter' });
  }
};

// Delete a babysitter
const deleteBabysitter = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM babysitters WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Babysitter not found' });
    }

    res.json({ message: 'Babysitter deleted successfully' });
  } catch (error) {
    console.error('Error deleting babysitter:', error);
    res.status(500).json({ message: 'Error deleting babysitter' });
  }
};

// Get babysitter's schedule
const getBabysitterSchedule = async (req, res) => {
  try {
    const [schedule] = await pool.query(
      `SELECT s.*, c.full_name as child_name 
      FROM schedules s 
      JOIN children c ON s.child_id = c.id 
      WHERE s.babysitter_id = ?`,
      [req.params.id]
    );
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ message: 'Error fetching schedule' });
  }
};

// Get babysitter's assigned children
const getBabysitterChildren = async (req, res) => {
  try {
    const [children] = await pool.query(
      `SELECT DISTINCT c.* 
      FROM children c 
      JOIN schedules s ON c.id = s.child_id 
      WHERE s.babysitter_id = ?`,
      [req.params.id]
    );
    res.json(children);
  } catch (error) {
    console.error('Error fetching children:', error);
    res.status(500).json({ message: 'Error fetching children' });
  }
};

module.exports = {
  createBabysitter,
  getAllBabysitters,
  getBabysitterById,
  updateBabysitter,
  deleteBabysitter,
  getBabysitterSchedule,
  getBabysitterChildren
}; 
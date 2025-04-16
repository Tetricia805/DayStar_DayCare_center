const pool = require('../config/database');

// Create a new child
const createChild = async (req, res) => {
  try {
    const {
      full_name,
      age,
      session_type,
      parent_name,
      parent_phone,
      alternate_contact_name,
      alternate_contact_phone,
      relationship_to_child,
      allergies,
      medical_conditions,
      dietary_restrictions,
      additional_notes
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO children (
        full_name,
        age,
        session_type,
        parent_name,
        parent_phone,
        alternate_contact_name,
        alternate_contact_phone,
        relationship_to_child,
        allergies,
        medical_conditions,
        dietary_restrictions,
        additional_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        full_name,
        age,
        session_type,
        parent_name,
        parent_phone,
        alternate_contact_name,
        alternate_contact_phone,
        relationship_to_child,
        allergies || null,
        medical_conditions || null,
        dietary_restrictions || null,
        additional_notes || null
      ]
    );

    res.status(201).json({
      message: 'Child registered successfully',
      childId: result.insertId
    });
  } catch (error) {
    console.error('Error creating child:', error);
    res.status(500).json({ message: 'Error registering child', error: error.message });
  }
};

// Get all children
const getAllChildren = async (req, res) => {
  try {
    const [children] = await pool.query('SELECT * FROM children ORDER BY created_at DESC');
    res.json(children);
  } catch (error) {
    console.error('Error fetching children:', error);
    res.status(500).json({ message: 'Error fetching children' });
  }
};

// Get a single child by ID
const getChildById = async (req, res) => {
  try {
    const [child] = await pool.query(
      'SELECT * FROM children WHERE id = ?',
      [req.params.id]
    );

    if (child.length === 0) {
      return res.status(404).json({ message: 'Child not found' });
    }

    res.json(child[0]);
  } catch (error) {
    console.error('Error fetching child:', error);
    res.status(500).json({ message: 'Error fetching child details' });
  }
};

// Update a child
const updateChild = async (req, res) => {
  try {
    const {
      fullName,
      age,
      sessionType,
      parentName,
      parentPhone,
      alternateContactName,
      alternateContactPhone,
      relationshipToChild,
      allergies,
      medicalConditions,
      dietaryRestrictions,
      additionalNotes
    } = req.body;

    const [result] = await pool.query(
      `UPDATE children SET
        full_name = ?,
        age = ?,
        session_type = ?,
        parent_name = ?,
        parent_phone = ?,
        alternate_contact_name = ?,
        alternate_contact_phone = ?,
        relationship_to_child = ?,
        allergies = ?,
        medical_conditions = ?,
        dietary_restrictions = ?,
        additional_notes = ?
      WHERE id = ?`,
      [
        fullName,
        age,
        sessionType,
        parentName,
        parentPhone,
        alternateContactName,
        alternateContactPhone,
        relationshipToChild,
        allergies,
        medicalConditions,
        dietaryRestrictions,
        additionalNotes,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Child not found' });
    }

    res.json({ message: 'Child updated successfully' });
  } catch (error) {
    console.error('Error updating child:', error);
    res.status(500).json({ message: 'Error updating child' });
  }
};

// Delete a child
const deleteChild = async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM children WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Child not found' });
    }

    res.json({ message: 'Child deleted successfully' });
  } catch (error) {
    console.error('Error deleting child:', error);
    res.status(500).json({ message: 'Error deleting child' });
  }
};

module.exports = {
  createChild,
  getAllChildren,
  getChildById,
  updateChild,
  deleteChild
}; 
const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  // First, connect without specifying a database
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  try {
    // Create the database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} created or already exists`);

    // Switch to the new database
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Drop existing tables in correct order (due to foreign key constraints)
    console.log('Dropping existing tables...');
    await connection.query('DROP TABLE IF EXISTS payments');
    await connection.query('DROP TABLE IF EXISTS incidents');
    await connection.query('DROP TABLE IF EXISTS attendance');
    await connection.query('DROP TABLE IF EXISTS children');
    await connection.query('DROP TABLE IF EXISTS babysitters');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creating new tables...');

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'staff') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create babysitters table with all frontend fields
    await connection.query(`
      CREATE TABLE IF NOT EXISTS babysitters (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone_number VARCHAR(20) NOT NULL,
        nin VARCHAR(255) NOT NULL,
        date_of_birth DATE NOT NULL,
        next_of_kin_name VARCHAR(255) NOT NULL,
        next_of_kin_phone VARCHAR(20) NOT NULL,
        next_of_kin_relationship VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create children table with all frontend fields
    await connection.query(`
      CREATE TABLE IF NOT EXISTS children (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        session_type ENUM('half-day', 'full-day') NOT NULL,
        parent_name VARCHAR(255) NOT NULL,
        parent_phone VARCHAR(20) NOT NULL,
        alternate_contact_name VARCHAR(255) NOT NULL,
        alternate_contact_phone VARCHAR(20) NOT NULL,
        relationship_to_child VARCHAR(255) NOT NULL,
        allergies TEXT,
        medical_conditions TEXT,
        dietary_restrictions TEXT,
        additional_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create attendance table with all frontend fields
    await connection.query(`
      CREATE TABLE IF NOT EXISTS attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        child_id INT NOT NULL,
        date DATE NOT NULL,
        session_type ENUM('half-day', 'full-day') NOT NULL,
        status ENUM('present', 'absent', 'late') NOT NULL,
        check_in_time TIME,
        check_out_time TIME,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (child_id) REFERENCES children(id)
      )
    `);

    // Create incidents table with all frontend fields
    await connection.query(`
      CREATE TABLE IF NOT EXISTS incidents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        child_id INT NOT NULL,
        date DATE NOT NULL,
        incident_type VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        action_taken TEXT NOT NULL,
        reported_by VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (child_id) REFERENCES children(id)
      )
    `);

    console.log('All tables created successfully!');

    console.log('Inserting mock data...');

    // Create default admin user
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await connection.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      ['admin', hashedPassword, 'admin']
    );
    console.log('Default admin user created');

    // Mock babysitter
    await connection.query(`
      INSERT INTO babysitters (
        first_name, last_name, email, phone_number, nin, 
        date_of_birth, next_of_kin_name, next_of_kin_phone, next_of_kin_relationship
      ) VALUES (
        'Jane', 'Doe', 'jane.doe@example.com', '+256700000000', 'CM12345678',
        '1990-01-01', 'John Doe', '+256700000001', 'Brother'
      )
    `);
    console.log('Mock babysitter created');

    // Mock child
    await connection.query(`
      INSERT INTO children (
        full_name, age, session_type, parent_name, parent_phone,
        alternate_contact_name, alternate_contact_phone, relationship_to_child,
        allergies, medical_conditions, dietary_restrictions, additional_notes
      ) VALUES (
        'Baby Smith', 3, 'full-day', 'Mr. Smith', '+256700000002',
        'Mrs. Johnson', '+256700000003', 'Aunt',
        'Peanuts', 'None', 'No pork', 'Likes to play with blocks'
      )
    `);
    console.log('Mock child created');

    // Mock attendance
    await connection.query(`
      INSERT INTO attendance (
        child_id, date, session_type, status, check_in_time, check_out_time, notes
      ) VALUES (
        1, CURDATE(), 'full-day', 'present', '08:00:00', '16:00:00', 'Had a great day'
      )
    `);
    console.log('Mock attendance record created');

    // Mock incident
    await connection.query(`
      INSERT INTO incidents (
        child_id, date, incident_type, description, action_taken, reported_by
      ) VALUES (
        1, CURDATE(), 'Minor Injury', 'Small scratch while playing',
        'Cleaned and applied band-aid', 'Jane Doe'
      )
    `);
    console.log('Mock incident record created');

    console.log('All mock data inserted successfully!');

  } catch (error) {
    console.error('Error setting up database:', error);
    console.error('Error details:', error.message);
    if (error.sql) {
      console.error('Failed SQL:', error.sql);
    }
  } finally {
    await connection.end();
  }
}

setupDatabase(); 
const pool = require('./database');

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database!');
    connection.release();
    
    // Test query
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Test query result:', rows[0].result);
    
    process.exit(0);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

testConnection(); 
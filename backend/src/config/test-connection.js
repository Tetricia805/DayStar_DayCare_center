const mysql = require('mysql2/promise');
require('dotenv').config();

async function testDatabaseConnection() {
  console.log('Attempting to connect to database...');
  console.log('Database configuration:');
  console.log('Host:', process.env.DB_HOST);
  console.log('User:', process.env.DB_USER);
  console.log('Database:', process.env.DB_NAME);

  try {
    // Create the connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('\n✅ Successfully connected to MySQL database!');

    // Get server information
    const [serverInfo] = await connection.query('SELECT VERSION() as version');
    console.log('\nMySQL Server Version:', serverInfo[0].version);

    // List all tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log('\nAvailable tables in database:');
    tables.forEach(table => {
      console.log('-', Object.values(table)[0]);
    });

    // Test a simple query
    const [result] = await connection.query('SELECT COUNT(*) as userCount FROM users');
    console.log('\nNumber of users in database:', result[0].userCount);

    await connection.end();
    console.log('\nDatabase connection closed successfully.');

  } catch (error) {
    console.error('\n❌ Error connecting to database:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\nPossible issues:');
      console.log('1. Wrong password in .env file');
      console.log('2. Wrong username in .env file');
      console.log('3. MySQL user permissions not set correctly');
    }
    if (error.code === 'ECONNREFUSED') {
      console.log('\nPossible issues:');
      console.log('1. MySQL server is not running');
      console.log('2. Wrong host in .env file');
      console.log('3. MySQL server is running on a different port');
    }
  }
}

testDatabaseConnection(); 
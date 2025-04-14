const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/auth');
const babysitterRoutes = require('./routes/babysitter');
const childRoutes = require('./routes/child');
const attendanceRoutes = require('./routes/attendance');
const incidentRoutes = require('./routes/incident');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // Your frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/babysitters', babysitterRoutes);
app.use('/api/children', childRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/incidents', incidentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
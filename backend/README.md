# Daystar Daycare Backend

This is the backend server for the Daystar Daycare Management System. It provides a RESTful API for managing all aspects of the daycare operations, including child management, babysitter management, attendance tracking, incident reporting, and financial management.

## Project Structure

```
server/
├── config/
│   ├── db.config.js         # Database configuration
│   ├── auth.config.js       # JWT and authentication config
│   └── config.js            # General app configuration
│
├── controllers/
│   ├── auth.controller.js   # Authentication logic
│   ├── user.controller.js   # User management
│   ├── babysitter.controller.js
│   ├── child.controller.js
│   ├── finance.controller.js
│   ├── attendance.controller.js
│   ├── schedule.controller.js
│   ├── notification.controller.js
│   └── report.controller.js
│
├── middleware/
│   ├── auth.middleware.js   # JWT verification
│   ├── role.middleware.js   # Role-based access control
│   ├── error.middleware.js  # Error handling
│   └── validation.middleware.js # Request validation
│
├── models/
│   ├── user.model.js
│   ├── babysitter.model.js
│   ├── child.model.js
│   ├── finance.model.js
│   ├── attendance.model.js
│   ├── schedule.model.js
│   └── notification.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── babysitter.routes.js
│   ├── child.routes.js
│   ├── finance.routes.js
│   ├── attendance.routes.js
│   ├── schedule.routes.js
│   ├── notification.routes.js
│   └── report.routes.js
│
├── services/
│   ├── email.service.js     # Email notifications
│   ├── payment.service.js   # Payment processing
│   └── report.service.js    # Report generation
│
├── utils/
│   ├── logger.js
│   ├── validators.js
│   └── helpers.js
│
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── server.js              # Main application file
```

## System Responsibilities

### 1. User Management
- **Authentication & Authorization**
  - User registration and login
  - Role-based access control (Manager, Babysitter, Parent)
  - JWT token-based authentication
  - Password hashing and security
  - Profile management

### 2. Child Management
- **Child Records**
  - Registration of new children
  - Maintaining child profiles
  - Medical information tracking
  - Emergency contact management
  - Parent-child relationship management
  - Child status updates

### 3. Babysitter Management
- **Babysitter Operations**
  - Babysitter registration and profiles
  - Qualification and experience tracking
  - Availability management
  - Schedule assignment
  - Performance monitoring
  - Payment tracking

### 4. Attendance System
- **Daily Operations**
  - Check-in/check-out tracking
  - Attendance status monitoring
  - Late arrival tracking
  - Absence recording
  - Attendance reports generation
  - Historical attendance data

### 5. Incident Management
- **Safety & Reporting**
  - Incident recording and tracking
  - Severity level classification
  - Action taken documentation
  - Incident reporting to parents
  - Safety trend analysis
  - Preventive measure tracking

### 6. Financial Management
- **Financial Operations**
  - Payment processing and tracking
  - Income recording
  - Expense management
  - Budget planning and monitoring
  - Financial reporting
  - Payment status tracking

## Core Functionalities

### 1. Authentication System
```javascript
// User registration and login
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
PUT /api/auth/profile
```

### 2. Child Management
```javascript
// Child operations
POST /api/children
GET /api/children
GET /api/children/:id
PUT /api/children/:id
DELETE /api/children/:id
GET /api/children/parent/:parentId
```

### 3. Babysitter Management
```javascript
// Babysitter operations
POST /api/babysitters
GET /api/babysitters
GET /api/babysitters/:id
PUT /api/babysitters/:id
DELETE /api/babysitters/:id
GET /api/babysitters/:id/schedule
GET /api/babysitters/:id/children
GET /api/babysitters/:id/payments
```

### 4. Attendance System
```javascript
// Attendance operations
POST /api/attendance
GET /api/attendance
GET /api/attendance/child/:childId
PUT /api/attendance/:id
GET /api/attendance/report
```

### 5. Incident Management
```javascript
// Incident operations
POST /api/incidents
GET /api/incidents
GET /api/incidents/child/:childId
PUT /api/incidents/:id
GET /api/incidents/report
```

### 6. Financial Management
```javascript
// Financial operations
GET /api/finance/dashboard
GET /api/finance/income
POST /api/finance/income
GET /api/finance/expenses
POST /api/finance/expenses
GET /api/finance/budget
POST /api/finance/budget
GET /api/finance/reports
GET /api/finance/payments
POST /api/finance/payments
PUT /api/finance/payments/:id
```

## Data Management

### Database Schema
The system maintains the following core tables:
- Users (Authentication and profiles)
- Children (Child information)
- Babysitters (Babysitter details)
- Attendance (Daily records)
- Incidents (Safety records)
- Payments (Financial transactions)
- Expenses (Cost tracking)
- Income (Revenue tracking)
- Budget (Financial planning)

### Data Relationships
- One-to-many relationships between parents and children
- Many-to-many relationships between babysitters and children
- One-to-many relationships between children and attendance records
- One-to-many relationships between children and incidents
- One-to-many relationships between children and payments

## Security Features

### 1. Authentication
- JWT token-based authentication
- Password hashing using bcrypt
- Token expiration and refresh mechanisms
- Secure session management

### 2. Authorization
- Role-based access control
- Permission levels for different user types
- Resource access restrictions
- Operation-level permissions

### 3. Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Data encryption for sensitive information

## Reporting Capabilities

### 1. Attendance Reports
- Daily attendance summaries
- Monthly attendance trends
- Child-specific attendance history
- Late arrival analysis
- Absence patterns

### 2. Incident Reports
- Incident type analysis
- Severity level tracking
- Trend identification
- Preventive measure effectiveness
- Safety compliance reports

### 3. Financial Reports
- Revenue analysis
- Expense tracking
- Budget vs. actual comparisons
- Payment status reports
- Financial forecasting

## System Integration

### 1. Frontend Integration
- RESTful API endpoints
- JSON data format
- Standard HTTP status codes
- Error handling and messaging
- CORS configuration

### 2. Database Integration
- MySQL database connection
- Connection pooling
- Query optimization
- Transaction management
- Data consistency checks

## Error Handling

The system implements comprehensive error handling:
- HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- Detailed error messages
- Logging and monitoring
- Error recovery mechanisms
- User-friendly error responses

## Performance Optimization

### 1. Database Optimization
- Indexed queries
- Optimized joins
- Cached results
- Batch operations
- Connection pooling

### 2. API Optimization
- Response compression
- Pagination
- Caching strategies
- Rate limiting
- Load balancing support

## Monitoring and Maintenance

### 1. System Monitoring
- Performance metrics
- Error tracking
- Usage statistics
- Security monitoring
- Resource utilization

### 2. Maintenance Features
- Database backups
- Data archiving
- System updates
- Security patches
- Performance tuning

## Development Guidelines

### 1. Code Standards
- ES6+ JavaScript
- Async/await patterns
- Error handling
- Code documentation
- Testing requirements

### 2. Version Control
- Git workflow
- Branch management
- Code review process
- Deployment procedures
- Release management

## Deployment

### 1. Environment Setup
- Development environment
- Testing environment
- Staging environment
- Production environment
- Environment-specific configurations

### 2. Deployment Process
- Build procedures
- Testing requirements
- Deployment checklist
- Rollback procedures
- Monitoring setup

## Support and Maintenance

### 1. Technical Support
- Issue tracking
- Bug reporting
- Feature requests
- Documentation updates
- User assistance

### 2. System Maintenance
- Regular updates
- Security patches
- Performance optimization
- Database maintenance
- Backup procedures

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=daystar_daycare
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   ```
5. Import the database schema:
   ```bash
   mysql -u your_db_user -p < src/config/schema.sql
   ```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### 1. Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /refresh-token` - Refresh JWT token
- `POST /forgot-password` - Password recovery
- `POST /reset-password` - Reset password

### 2. User Routes (`/api/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get specific user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### 3. Babysitter Routes (`/api/babysitters`)
- `GET /` - Get all babysitters
- `POST /` - Create new babysitter
- `GET /:id` - Get specific babysitter
- `PUT /:id` - Update babysitter
- `DELETE /:id` - Delete babysitter
- `GET /:id/schedule` - Get babysitter schedule
- `GET /:id/payments` - Get babysitter payments
- `GET /:id/attendance` - Get babysitter attendance

### 4. Child Routes (`/api/children`)
- `GET /` - Get all children
- `POST /` - Add new child
- `GET /:id` - Get specific child
- `PUT /:id` - Update child info
- `DELETE /:id` - Delete child
- `GET /:id/attendance` - Get child attendance
- `GET /:id/schedule` - Get child schedule

### 5. Finance Routes (`/api/finance`)
- `GET /` - Get all financial records
- `POST /` - Add new financial record
- `GET /:id` - Get specific record
- `PUT /:id` - Update record
- `DELETE /:id` - Delete record
- `GET /summary` - Get financial summary
- `GET /reports` - Generate financial reports

### 6. Attendance Routes (`/api/attendance`)
- `GET /` - Get all attendance records
- `POST /` - Mark attendance
- `GET /:id` - Get specific record
- `PUT /:id` - Update attendance
- `GET /reports` - Generate attendance reports

### 7. Schedule Routes (`/api/schedules`)
- `GET /` - Get all schedules
- `POST /` - Create new schedule
- `GET /:id` - Get specific schedule
- `PUT /:id` - Update schedule
- `DELETE /:id` - Delete schedule
- `GET /conflicts` - Check schedule conflicts

### 8. Notification Routes (`/api/notifications`)
- `GET /` - Get all notifications
- `POST /` - Create notification
- `GET /:id` - Get specific notification
- `PUT /:id` - Update notification
- `DELETE /:id` - Delete notification
- `PUT /:id/read` - Mark as read

### 9. Report Routes (`/api/reports`)
- `GET /attendance` - Generate attendance reports
- `GET /finance` - Generate financial reports
- `GET /performance` - Generate performance reports
- `GET /summary` - Generate summary reports

## System Components

### 1. Configuration (`/config`)
- Database connection settings
- Authentication configuration
- Application-wide settings
- Environment variables

### 2. Controllers (`/controllers`)
- Business logic implementation
- Request handling
- Response formatting
- Error management

### 3. Middleware (`/middleware`)
- Authentication verification
- Role-based access control
- Request validation
- Error handling
- Logging

### 4. Models (`/models`)
- Database schema definitions
- Data relationships
- Validation rules
- Business rules

### 5. Routes (`/routes`)
- API endpoint definitions
- Route middleware
- Request validation
- Response handling

### 6. Services (`/services`)
- External service integration
- Email notifications
- Payment processing
- Report generation

### 7. Utilities (`/utils`)
- Helper functions
- Validation utilities
- Logging utilities
- Common utilities

## Security

- All routes except login and register require JWT authentication
- Passwords are hashed using bcrypt
- Role-based access control is implemented
- Input validation is performed on all requests

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 
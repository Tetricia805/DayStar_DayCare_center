# Daystar Daycare Management System - Frontend

A comprehensive frontend implementation for the Daystar Daycare Management System, built with React and Vite. This system provides a complete solution for managing daycare operations, including child management, babysitter management, and financial tracking.

## Project Structure

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images, fonts, and other static files
│   ├── components/           # Reusable UI components
│   │   ├── auth/            # Authentication-related components
│   │   │   └── ProtectedRoute.jsx  # Route protection component
│   │   └── layout/          # Layout components
│   │       ├── Header.jsx   # Navigation header
│   │       ├── Sidebar.jsx  # Navigation sidebar
│   │       └── MainLayout.jsx # Main layout wrapper
│   ├── context/             # React context providers
│   ├── pages/               # Page components
│   │   ├── babysitter/     # Babysitter management pages
│   │   │   ├── BabysitterList.jsx      # List of babysitters
│   │   │   ├── BabysitterRegister.jsx  # Babysitter registration
│   │   │   ├── BabysitterSchedule.jsx  # Schedule management
│   │   │   ├── BabysitterPayments.jsx  # Payment tracking
│   │   │   ├── BabysitterChildren.jsx  # Assigned children
│   │   │   ├── BabysitterIncidents.jsx # Incident reporting
│   │   │   └── BabysitterDashboard.jsx # Babysitter overview
│   │   ├── child/          # Child management pages
│   │   │   ├── ChildList.jsx          # List of children
│   │   │   ├── ChildRegister.jsx      # Child registration
│   │   │   ├── ChildAttendance.jsx    # Attendance tracking
│   │   │   └── IncidentReporting.jsx  # Incident management
│   │   ├── finance/        # Financial management pages
│   │   │   ├── FinancialDashboard.jsx # Financial overview
│   │   │   ├── IncomeTracking.jsx     # Income management
│   │   │   ├── ExpenseTracking.jsx    # Expense management
│   │   │   ├── BudgetPlanning.jsx     # Budget management
│   │   │   └── FinancialReports.jsx   # Financial reporting
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration page
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── ParentDashboard.jsx # Parent dashboard
│   │   └── LandingPage.jsx # Home page
│   ├── App.jsx             # Main application component with routing
│   ├── index.jsx           # Application entry point
│   ├── main.jsx            # Root component
│   └── index.css           # Global styles
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
└── style.css               # Additional styles
```

## Features

### Authentication & Authorization
- Role-based access control (Manager, Babysitter, Parent)
- Secure login and registration
- Protected routes based on user roles
- Session management

### Dashboard
- Manager Dashboard
  - Overview of daycare operations
  - Quick access to key features
  - Statistics and analytics
- Babysitter Dashboard
  - Schedule management
  - Child assignments
  - Incident reporting
- Parent Dashboard
  - Child information
  - Attendance tracking
  - Payment history

### Child Management
- Child registration and profile management
- Attendance tracking
- Incident reporting
- Parent communication

### Babysitter Management
- Babysitter registration
- Schedule management
- Payment tracking
- Performance monitoring
- Child assignment

### Financial Management
- Income tracking
- Expense management
- Budget planning
- Financial reports
- Payment processing

## Technologies Used

### Core Technologies
- **React 18**: JavaScript library for building user interfaces
- **Vite**: Next-generation frontend tooling
- **TypeScript**: Static type checking
- **React Router v6**: Client-side routing

### UI Components & Styling
- **Material-UI (MUI)**: React UI framework
- **Styled Components**: CSS-in-JS styling
- **@emotion/react**: CSS-in-JS solution
- **@emotion/styled**: Styled components with emotion

### State Management & Data Handling
- **React Context API**: State management
- **Axios**: HTTP client for API requests
- **React Hook Form**: Form handling and validation

### Data Visualization
- **Chart.js**: Data visualization
- **react-chartjs-2**: React wrapper for Chart.js

### User Experience
- **react-toastify**: Toast notifications
- **react-icons**: Icon library

## Component Architecture

### Layout Components
- `MainLayout`: Main application layout with navigation
- `AuthLayout`: Authentication pages layout

### Authentication Components
- `Login`: User login form
- `Register`: User registration form
- `ProtectedRoute`: Route protection based on user roles

### Page Components
- **Manager Pages**
  - `Dashboard`: Main management dashboard
  - `BabysitterList`: Babysitter management
  - `ChildList`: Child management
  - `FinancialDashboard`: Financial overview

- **Babysitter Pages**
  - `BabysitterDashboard`: Babysitter overview
  - `BabysitterSchedule`: Schedule management
  - `BabysitterChildren`: Assigned children
  - `BabysitterIncidents`: Incident reporting

- **Child Management Pages**
  - `ChildRegister`: Child registration
  - `ChildAttendance`: Attendance tracking
  - `IncidentReporting`: Incident management

- **Financial Pages**
  - `IncomeTracking`: Income management
  - `ExpenseTracking`: Expense management
  - `BudgetPlanning`: Budget management
  - `FinancialReports`: Financial reporting

## Routing Structure

The application uses React Router v6 with protected routes based on user roles:

```javascript
// Public Routes
/                   # Landing Page
/login              # Login Page
/register           # Registration Page

// Manager Routes
/dashboard          # Manager Dashboard
/babysitters        # Babysitter Management
/children           # Child Management
/finance            # Financial Management

// Babysitter Routes
/babysitter-dashboard  # Babysitter Dashboard
/babysitter/children   # Assigned Children
/babysitter/schedule   # Schedule Management
/babysitter/payments   # Payment Information
/babysitter/incidents  # Incident Reporting
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url
VITE_APP_NAME=Daystar Daycare
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Best Practices

- Follow the established component structure
- Use TypeScript for type safety
- Implement proper error handling
- Follow Material-UI design guidelines
- Write unit tests for components
- Document complex logic and components

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
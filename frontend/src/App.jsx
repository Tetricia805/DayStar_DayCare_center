import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import global styles
import './index.css';

// Layout Components
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';

// Auth Pages
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import ParentDashboard from './pages/ParentDashboard';
import BabysitterDashboard from './pages/BabysitterDashboard';

// Babysitter Management Pages
import BabysitterList from './pages/babysitter/BabysitterList';
import BabysitterRegister from './pages/babysitter/BabysitterRegister';
import BabysitterPayments from './pages/babysitter/BabysitterPayments';
import BabysitterSchedule from './pages/babysitter/BabysitterSchedule';
import BabysitterChildren from './pages/babysitter/BabysitterChildren';
import BabysitterIncidents from './pages/babysitter/BabysitterIncidents';

// Child Management Pages
import ChildList from './pages/child/ChildList';
import ChildRegister from './pages/child/ChildRegister';
import ChildAttendance from './pages/child/ChildAttendance';
import IncidentReporting from './pages/child/IncidentReporting';

// Financial Management Pages
import FinancialDashboard from './pages/finance/FinancialDashboard';
import IncomeTracking from './pages/finance/IncomeTracking';
import ExpenseTracking from './pages/finance/ExpenseTracking';
import BudgetPlanning from './pages/finance/BudgetPlanning';
import FinancialReports from './pages/finance/FinancialReports';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isManager, isBabysitter, isParent } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  const hasRequiredRole = allowedRoles.some(role => {
    if (role === 'manager') return isManager();
    if (role === 'babysitter') return isBabysitter();
    if (role === 'parent') return isParent();
    return false;
  });

  if (!hasRequiredRole) {
    // Redirect to appropriate dashboard based on role
    if (isManager()) {
      return <Navigate to="/dashboard" replace />;
    }
    if (isBabysitter()) {
      return <Navigate to="/babysitter-dashboard" replace />;
    }
    if (isParent()) {
      return <Navigate to="/parent-dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Manager Routes */}
          <Route element={
            <ProtectedRoute allowedRoles={['manager']}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/babysitters" element={<BabysitterList />} />
            <Route path="/babysitters/register" element={<BabysitterRegister />} />
            <Route path="/babysitters/payments" element={<BabysitterPayments />} />
            <Route path="/babysitters/schedule" element={<BabysitterSchedule />} />
            <Route path="/children" element={<ChildList />} />
            <Route path="/children/register" element={<ChildRegister />} />
            <Route path="/children/attendance" element={<ChildAttendance />} />
            <Route path="/incidents" element={<IncidentReporting />} />
            <Route path="/finance" element={<FinancialDashboard />} />
            <Route path="/finance/income" element={<IncomeTracking />} />
            <Route path="/finance/expenses" element={<ExpenseTracking />} />
            <Route path="/finance/budget" element={<BudgetPlanning />} />
            <Route path="/finance/reports" element={<FinancialReports />} />
          </Route>
              
              {/* Babysitter Routes */}
          <Route element={
            <ProtectedRoute allowedRoles={['babysitter']}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="/babysitter-dashboard" element={<BabysitterDashboard />} />
            <Route path="/babysitter/children" element={<BabysitterChildren />} />
            <Route path="/babysitter/schedule" element={<BabysitterSchedule />} />
            <Route path="/babysitter/payments" element={<BabysitterPayments />} />
            <Route path="/babysitter/incidents" element={<BabysitterIncidents />} />
          </Route>

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

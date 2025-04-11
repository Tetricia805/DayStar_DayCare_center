import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import global styles
import './index.css';

// Layout Components
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth Pages
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';

// Dashboard Pages
import Dashboard from './pages/Dashboard';

// Babysitter Management Pages
import BabysitterList from './pages/babysitter/BabysitterList';
import BabysitterRegister from './pages/babysitter/BabysitterRegister';
import BabysitterPayments from './pages/babysitter/BabysitterPayments';
import BabysitterSchedule from './pages/babysitter/BabysitterSchedule';

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
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              
              {/* Babysitter Routes */}
              <Route path="babysitters" element={<BabysitterList />} />
              <Route path="babysitters/register" element={<BabysitterRegister />} />
              <Route path="babysitters/payments" element={<BabysitterPayments />} />
              <Route path="babysitters/schedule" element={<BabysitterSchedule />} />
              
              {/* Child Routes */}
              <Route path="children" element={<ChildList />} />
              <Route path="children/register" element={<ChildRegister />} />
              <Route path="children/attendance" element={<ChildAttendance />} />
              <Route path="incidents" element={<IncidentReporting />} />
              
              {/* Financial Routes */}
              <Route path="finance" element={<FinancialDashboard />} />
              <Route path="finance/income" element={<IncomeTracking />} />
              <Route path="finance/expenses" element={<ExpenseTracking />} />
              <Route path="finance/budget" element={<BudgetPlanning />} />
              <Route path="finance/reports" element={<FinancialReports />} />
            </Route>
          </Route>

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

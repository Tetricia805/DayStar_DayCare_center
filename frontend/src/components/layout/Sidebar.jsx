import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { 
  MdDashboard, 
  MdPeople, 
  MdChildCare, 
  MdPayment, 
  MdSchedule,
  MdWarning,
  MdPersonAdd,
  MdAttachMoney, 
  MdAssessment,
  MdReceipt,
  MdAccountBalance,
  MdLogout 
} from 'react-icons/md';

const SidebarContainer = styled.div`
  width: ${props => props.isOpen ? '250px' : '70px'};
  height: 100vh;
  background: var(--sidebar-bg);
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s ease;
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
`;

const Nav = styled.nav`
  padding: 1rem 0;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background: var(--hover-bg);
    color: var(--primary);
  }

  &.active {
    background: var(--primary);
    color: white;
  }
  
  svg {
    min-width: 24px;
    margin-right: 1rem;
  }
`;

const NavText = styled.span`
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  font-weight: 500;
  transition: background-color 0.2s;
  width: 100%;
  justify-content: center;
  
  &:hover {
    background: #60a5fa;
  }
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <SidebarContainer isOpen={isOpen}>
      <Logo>
        <NavText isOpen={isOpen}>DayStar</NavText>
      </Logo>
      <Nav>
        {user?.role === 'manager' && (
          <>
            <NavItem to="/dashboard" active={location.pathname === '/dashboard'}>
            <MdDashboard />
              <NavText isOpen={isOpen}>Dashboard</NavText>
            </NavItem>
            <NavItem to="/babysitters" active={location.pathname === '/babysitters'}>
              <MdPeople />
              <NavText isOpen={isOpen}>Babysitters</NavText>
            </NavItem>
            <NavItem to="/babysitters/register">
              <MdPersonAdd />
              <NavText isOpen={isOpen}>Register Babysitter</NavText>
            </NavItem>
            <NavItem to="/children" active={location.pathname === '/children'}>
              <MdChildCare />
              <NavText isOpen={isOpen}>Children</NavText>
            </NavItem>
            <NavItem to="/children/register">
              <MdPersonAdd />
              <NavText isOpen={isOpen}>Register Child</NavText>
          </NavItem>
            <NavItem to="/children/attendance" active={location.pathname === '/children/attendance'}>
              <MdSchedule />
              <NavText isOpen={isOpen}>Attendance</NavText>
          </NavItem>
            <NavItem to="/incidents" active={location.pathname === '/incidents'}>
              <MdWarning />
              <NavText isOpen={isOpen}>Incidents</NavText>
          </NavItem>
            <NavItem to="/finance" active={location.pathname === '/finance'}>
            <MdAttachMoney />
              <NavText isOpen={isOpen}>Finance</NavText>
          </NavItem>
            <NavItem to="/finance/income">
              <MdReceipt />
              <NavText isOpen={isOpen}>Income</NavText>
          </NavItem>
            <NavItem to="/finance/expenses">
              <MdAccountBalance />
              <NavText isOpen={isOpen}>Expenses</NavText>
          </NavItem>
            <NavItem to="/finance/budget">
              <MdAssessment />
              <NavText isOpen={isOpen}>Budget</NavText>
          </NavItem>
            <NavItem to="/finance/reports">
              <MdAssessment />
              <NavText isOpen={isOpen}>Reports</NavText>
          </NavItem>
            <NavItem to="/settings" active={location.pathname === '/settings'}>
              <MdAssessment />
              <NavText isOpen={isOpen}>Settings</NavText>
          </NavItem>
          </>
        )}
        
        {user?.role === 'babysitter' && (
          <>
            <NavItem to="/babysitter-dashboard" active={location.pathname === '/babysitter-dashboard'}>
              <MdDashboard />
              <NavText isOpen={isOpen}>Dashboard</NavText>
          </NavItem>
            <NavItem to="/babysitter/children" active={location.pathname === '/babysitter/children'}>
              <MdChildCare />
              <NavText isOpen={isOpen}>My Children</NavText>
          </NavItem>
            <NavItem to="/babysitter/schedule" active={location.pathname === '/babysitter/schedule'}>
              <MdSchedule />
              <NavText isOpen={isOpen}>My Schedule</NavText>
          </NavItem>
            <NavItem to="/babysitter/payments" active={location.pathname === '/babysitter/payments'}>
              <MdPayment />
              <NavText isOpen={isOpen}>My Payments</NavText>
          </NavItem>
            <NavItem to="/babysitter/incidents" active={location.pathname === '/babysitter/incidents'}>
              <MdWarning />
              <NavText isOpen={isOpen}>Incident Reports</NavText>
          </NavItem>
          </>
        )}
      </Nav>
      
      {isOpen && (
        <LogoutButton onClick={handleLogout}>
          <MdLogout /> Logout
      </LogoutButton>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;

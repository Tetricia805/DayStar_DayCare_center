import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import styled from 'styled-components';
import { 
  MdDashboard, 
  MdChildCare, 
  MdBabyChangingStation, 
  MdAttachMoney, 
  MdNotifications, 
  MdLogout 
} from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const SidebarContainer = styled.aside`
  background-color: #fff;
  box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  width: ${props => props.isOpen ? '250px' : '80px'};
  position: fixed;
  height: 100vh;
  transition: all 0.3s ease;
  z-index: 1000;
  overflow-x: hidden;
`;

const Logo = styled.div`
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    height: ${props => props.isOpen ? '40px' : '30px'};
    transition: all 0.3s ease;
  }
  
  h1 {
    margin-left: 10px;
    color: var(--primary-color);
    font-size: 1.5rem;
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: var(--text-color);
  transition: all 0.3s ease;
  margin-bottom: 5px;
  
  &:hover, &.active {
    background-color: var(--primary-light);
    color: var(--primary-color);
    border-left: 4px solid var(--primary-color);
  }
  
  svg {
    font-size: 1.5rem;
    margin-right: ${props => props.isOpen ? '10px' : '0'};
  }
  
  span {
    display: ${props => props.isOpen ? 'block' : 'none'};
    white-space: nowrap;
  }
`;

const NavSection = styled.div`
  margin-bottom: 20px;
  
  h3 {
    padding: 0 20px;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: var(--dark-gray);
    margin-bottom: 10px;
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: var(--text-color);
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    background-color: #ffebee;
    color: var(--danger-color);
  }
  
  svg {
    font-size: 1.5rem;
    margin-right: ${props => props.isOpen ? '10px' : '0'};
  }
  
  span {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const Sidebar = ({ isOpen }) => {
  const { logout, user } = useContext(AuthContext) || { logout: () => console.log('Logout clicked'), user: { role: 'manager' } };
  
  return (
    <SidebarContainer isOpen={isOpen}>
      <Logo isOpen={isOpen}>
        <img src="/logo-placeholder.png" alt="Daystar Daycare" />
        {isOpen && <h1>Daystar</h1>}
      </Logo>
      
      <nav>
        <NavSection isOpen={isOpen}>
          {isOpen && <h3>Main</h3>}
          <NavItem to="/dashboard" isOpen={isOpen}>
            <MdDashboard />
            <span>Dashboard</span>
          </NavItem>
        </NavSection>
        
        <NavSection isOpen={isOpen}>
          {isOpen && <h3>Babysitter Management</h3>}
          <NavItem to="/dashboard/babysitters" isOpen={isOpen}>
            <MdBabyChangingStation />
            <span>Babysitters</span>
          </NavItem>
          <NavItem to="/dashboard/babysitters/register" isOpen={isOpen}>
            <MdBabyChangingStation />
            <span>Register Babysitter</span>
          </NavItem>
          <NavItem to="/dashboard/babysitters/payments" isOpen={isOpen}>
            <MdAttachMoney />
            <span>Babysitter Payments</span>
          </NavItem>
          <NavItem to="/dashboard/babysitters/schedule" isOpen={isOpen}>
            <FaCalendarAlt />
            <span>Scheduling</span>
          </NavItem>
        </NavSection>
        
        <NavSection isOpen={isOpen}>
          {isOpen && <h3>Child Management</h3>}
          <NavItem to="/dashboard/children" isOpen={isOpen}>
            <MdChildCare />
            <span>Children</span>
          </NavItem>
          <NavItem to="/dashboard/children/register" isOpen={isOpen}>
            <MdChildCare />
            <span>Register Child</span>
          </NavItem>
          <NavItem to="/dashboard/children/attendance" isOpen={isOpen}>
            <FaCalendarAlt />
            <span>Attendance</span>
          </NavItem>
          <NavItem to="/dashboard/incidents" isOpen={isOpen}>
            <MdNotifications />
            <span>Incident Reports</span>
          </NavItem>
        </NavSection>
        
        <NavSection isOpen={isOpen}>
          {isOpen && <h3>Financial Management</h3>}
          <NavItem to="/dashboard/finance" isOpen={isOpen}>
            <MdAttachMoney />
            <span>Financial Dashboard</span>
          </NavItem>
          <NavItem to="/dashboard/finance/income" isOpen={isOpen}>
            <MdAttachMoney />
            <span>Income Tracking</span>
          </NavItem>
          <NavItem to="/dashboard/finance/expenses" isOpen={isOpen}>
            <MdAttachMoney />
            <span>Expense Tracking</span>
          </NavItem>
          <NavItem to="/dashboard/finance/budget" isOpen={isOpen}>
            <MdAttachMoney />
            <span>Budget Planning</span>
          </NavItem>
          <NavItem to="/dashboard/finance/reports" isOpen={isOpen}>
            <MdAttachMoney />
            <span>Financial Reports</span>
          </NavItem>
        </NavSection>
        
        <NavSection isOpen={isOpen}>
          {isOpen && <h3>Notifications</h3>}
          <NavItem to="/dashboard/notifications" isOpen={isOpen}>
            <MdNotifications />
            <span>Notification Center</span>
          </NavItem>
        </NavSection>
      </nav>
      
      <LogoutButton onClick={logout} isOpen={isOpen}>
        <MdLogout />
        <span>Logout</span>
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;

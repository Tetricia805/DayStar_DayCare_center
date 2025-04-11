
import { useContext } from 'react';
import styled from 'styled-components';
import { MdMenu, MdNotifications, MdSettings } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  font-size: 1.5rem;
  position: relative;
  
  &:hover {
    color: var(--primary-color);
  }
  
  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: var(--danger-color);
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--primary-light);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    font-weight: bold;
  }
  
  .user-details {
    display: flex;
    flex-direction: column;
    
    .name {
      font-weight: 600;
    }
    
    .role {
      font-size: 0.8rem;
      color: var(--dark-gray);
    }
  }
`;

const Header = ({ toggleSidebar }) => {
  const { user } = useContext(AuthContext) || { 
    user: { name: 'Admin User', role: 'Manager', initials: 'AU' } 
  };
  
  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ToggleButton onClick={toggleSidebar}>
          <MdMenu />
        </ToggleButton>
        <PageTitle>Daystar Daycare Management</PageTitle>
      </div>
      
      <RightSection>
        <IconButton>
          <MdNotifications />
          <span className="notification-badge">3</span>
        </IconButton>
        <IconButton>
          <MdSettings />
        </IconButton>
        <UserInfo>
          <div className="avatar">
            {user.initials || user.name.charAt(0)}
          </div>
          <div className="user-details">
            <span className="name">{user.name}</span>
            <span className="role">{user.role}</span>
          </div>
        </UserInfo>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;

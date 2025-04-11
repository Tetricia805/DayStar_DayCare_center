
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: ${props => props.sidebarOpen ? '250px' : '80px'};
  transition: margin-left 0.3s ease;
`;

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={sidebarOpen} />
      <div style={{ flex: 1 }}>
        <Header toggleSidebar={toggleSidebar} />
        <MainContent sidebarOpen={sidebarOpen}>
          <Outlet />
        </MainContent>
      </div>
    </LayoutContainer>
  );
};

export default MainLayout;

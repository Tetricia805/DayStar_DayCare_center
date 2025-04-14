import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Header from './Header';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f6fa;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: ${props => props.sidebarOpen ? '250px' : '80px'};
  transition: margin-left 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f5f6fa;
`;

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={sidebarOpen} />
      <ContentWrapper sidebarOpen={sidebarOpen}>
        <Header toggleSidebar={toggleSidebar} />
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default MainLayout;

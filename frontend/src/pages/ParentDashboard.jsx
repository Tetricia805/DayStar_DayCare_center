import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const WelcomeMessage = styled.h1`
  color: var(--text-color);
  margin-bottom: 2rem;
`;

const ParentDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardContainer>
      <WelcomeMessage>
        Welcome, {user?.name || 'Parent'}!
      </WelcomeMessage>
      <p>This is the parent dashboard. You can view your children's information and activities.</p>
    </DashboardContainer>
  );
};

export default ParentDashboard; 
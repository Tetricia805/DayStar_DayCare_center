import React from 'react';
import styled from 'styled-components';
import { MdChildCare, MdBabyChangingStation, MdAttachMoney, MdNotifications, MdDashboard, MdPeople, MdWarning, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--text-color);
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  background: ${props => props.color};
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const StatInfo = styled.div`
  h3 {
    color: var(--dark-gray);
      font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-color);
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const RecentActivity = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    color: var(--text-color);
    margin-bottom: 1rem;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 4px;
  background: #f8f9fa;

  .icon {
    color: var(--primary-color);
  }

  .content {
  flex: 1;

  h4 {
    color: var(--text-color);
      margin-bottom: 0.25rem;
    }

    p {
      color: var(--dark-gray);
      font-size: 0.9rem;
    }
  }

  .time {
    color: var(--dark-gray);
    font-size: 0.8rem;
  }
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

  &:hover {
    background: #60a5fa;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    {
      title: 'Total Children',
      value: '45',
      icon: <MdChildCare />,
      color: '#4CAF50'
    },
    {
      title: 'Active Babysitters',
      value: '12',
      icon: <MdBabyChangingStation />,
      color: '#2196F3'
    },
    {
      title: 'Monthly Revenue',
      value: '$15,240',
      icon: <MdAttachMoney />,
      color: '#FF9800'
    },
    {
      title: 'Pending Reports',
      value: '3',
      icon: <MdNotifications />,
      color: '#F44336'
    }
  ];

  const recentActivities = [
    {
      icon: <MdChildCare />,
      title: 'New Child Registration',
      description: 'Emma Thompson was registered by Sarah',
      time: '2 hours ago'
    },
    {
      icon: <MdBabyChangingStation />,
      title: 'Babysitter Schedule Updated',
      description: 'Jane updated her availability for next week',
      time: '3 hours ago'
    },
    {
      icon: <MdAttachMoney />,
      title: 'Payment Received',
      description: 'Monthly payment received from Thompson family',
      time: '5 hours ago'
    }
  ];

  return (
    <DashboardContainer>
      <Title>Dashboard Overview</Title>
      
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <IconWrapper color={stat.color}>
              {stat.icon}
            </IconWrapper>
          <StatInfo>
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
          </StatInfo>
        </StatCard>
        ))}
      </StatsGrid>

      <RecentActivity>
        <h2>Recent Activity</h2>
        <ActivityList>
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index}>
              <div className="icon">
                {activity.icon}
              </div>
              <div className="content">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
              </div>
              <div className="time">
                {activity.time}
                </div>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivity>

      <LogoutButton onClick={handleLogout}>
        <MdLogout /> Logout
      </LogoutButton>
    </DashboardContainer>
  );
};

export default Dashboard;
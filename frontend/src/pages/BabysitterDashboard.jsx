import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { MdChildCare, MdSchedule, MdNotifications, MdPayment, MdWarning, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
`;

const WelcomeMessage = styled.h1`
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  color: var(--text-color);
  margin: 2rem 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChildCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChildName = styled.h3`
  color: var(--text-color);
  margin: 0;
`;

const ChildInfo = styled.p`
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9rem;
`;

const ScheduleCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const DayLabel = styled.span`
  color: var(--text-color);
  font-weight: 500;
`;

const TimeLabel = styled.span`
  color: var(--text-secondary);
`;

const NotificationCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.type === 'alert' ? 'var(--error-light)' : 'var(--card-bg)'};
  border-radius: 6px;
`;

const NotificationIcon = styled.div`
  color: ${props => props.type === 'alert' ? 'var(--error)' : 'var(--primary)'};
  font-size: 1.5rem;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h4`
  color: var(--text-color);
  margin: 0 0 0.5rem;
`;

const NotificationMessage = styled.p`
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9rem;
`;

const NotificationTime = styled.span`
  color: var(--text-secondary);
  font-size: 0.8rem;
`;

const PaymentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--card-bg);
  border-radius: 6px;
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaymentDate = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const PaymentAmount = styled.span`
  color: var(--success);
  font-weight: 500;
`;

const IncidentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const IncidentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--error-light);
  border-radius: 6px;
`;

const IncidentTitle = styled.h4`
  color: var(--error);
  margin: 0;
`;

const IncidentDescription = styled.p`
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9rem;
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

const BabysitterDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock data for assigned children
  const assignedChildren = [
    { id: 1, name: 'Emma Johnson', age: 4, schedule: 'Mon-Fri, 8AM-3PM' },
    { id: 2, name: 'Liam Smith', age: 3, schedule: 'Mon-Wed, 9AM-2PM' },
    { id: 3, name: 'Olivia Brown', age: 5, schedule: 'Thu-Fri, 8AM-4PM' }
  ];

  // Mock data for weekly schedule
  const weeklySchedule = [
    { day: 'Monday', time: '8:00 AM - 4:00 PM' },
    { day: 'Tuesday', time: '8:00 AM - 4:00 PM' },
    { day: 'Wednesday', time: '8:00 AM - 4:00 PM' },
    { day: 'Thursday', time: '8:00 AM - 4:00 PM' },
    { day: 'Friday', time: '8:00 AM - 4:00 PM' }
  ];

  // Mock data for recent payments
  const recentPayments = [
    { id: 1, date: '2024-03-15', amount: '$500.00', status: 'Paid' },
    { id: 2, date: '2024-02-15', amount: '$500.00', status: 'Paid' },
    { id: 3, date: '2024-01-15', amount: '$500.00', status: 'Paid' }
  ];

  // Mock data for incidents
  const incidents = [
    {
      id: 1,
      title: 'Minor Fall',
      description: 'Emma had a minor fall during outdoor play. No injuries, parent notified.',
      date: '2024-03-10'
    },
    {
      id: 2,
      title: 'Allergic Reaction',
      description: 'Liam showed signs of allergic reaction to new snack. Medical attention provided.',
      date: '2024-03-05'
    }
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Schedule Update',
      message: 'Your schedule for next week has been updated. Please review.',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Payment Processing',
      message: 'Your payment for March will be processed on March 15th.',
      time: '1 day ago'
    }
  ];

  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeMessage>
          Welcome, {user?.name || 'Babysitter'}!
        </WelcomeMessage>
      </WelcomeSection>

      <SectionTitle>
        <MdChildCare /> Children Under Your Care
      </SectionTitle>
      <Grid>
        {assignedChildren.map(child => (
          <ChildCard key={child.id}>
            <ChildName>{child.name}</ChildName>
            <ChildInfo>Age: {child.age}</ChildInfo>
            <ChildInfo>Schedule: {child.schedule}</ChildInfo>
          </ChildCard>
        ))}
      </Grid>

      <SectionTitle>
        <MdSchedule /> Your Schedule
      </SectionTitle>
      <ScheduleCard>
        {weeklySchedule.map((schedule, index) => (
          <ScheduleItem key={index}>
            <DayLabel>{schedule.day}</DayLabel>
            <TimeLabel>{schedule.time}</TimeLabel>
          </ScheduleItem>
        ))}
      </ScheduleCard>

      <SectionTitle>
        <MdPayment /> Recent Payments
      </SectionTitle>
      <PaymentCard>
        {recentPayments.map(payment => (
          <PaymentItem key={payment.id}>
            <PaymentInfo>
              <PaymentDate>{payment.date}</PaymentDate>
              <span>{payment.status}</span>
            </PaymentInfo>
            <PaymentAmount>{payment.amount}</PaymentAmount>
          </PaymentItem>
        ))}
      </PaymentCard>

      <SectionTitle>
        <MdWarning /> Recent Incidents
      </SectionTitle>
      <IncidentCard>
        {incidents.map(incident => (
          <IncidentItem key={incident.id}>
            <IncidentTitle>{incident.title}</IncidentTitle>
            <IncidentDescription>{incident.description}</IncidentDescription>
            <PaymentDate>{incident.date}</PaymentDate>
          </IncidentItem>
        ))}
      </IncidentCard>

      <SectionTitle>
        <MdNotifications /> Notifications
      </SectionTitle>
      <NotificationCard>
        {notifications.map(notification => (
          <NotificationItem key={notification.id} type={notification.type}>
            <NotificationIcon type={notification.type}>
              {notification.type === 'alert' ? <MdWarning /> : <MdNotifications />}
            </NotificationIcon>
            <NotificationContent>
              <NotificationTitle>{notification.title}</NotificationTitle>
              <NotificationMessage>{notification.message}</NotificationMessage>
              <NotificationTime>{notification.time}</NotificationTime>
            </NotificationContent>
          </NotificationItem>
        ))}
      </NotificationCard>

      <LogoutButton onClick={handleLogout}>
        <MdLogout /> Logout
      </LogoutButton>
    </DashboardContainer>
  );
};

export default BabysitterDashboard; 
import React from 'react';
import styled from 'styled-components';
import { MdSchedule } from 'react-icons/md';

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
    color: var(--text-color);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ScheduleCard = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
`;

const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const DayLabel = styled.span`
    color: var(--text-color);
    font-weight: 500;
  font-size: 1.1rem;
`;

const TimeLabel = styled.span`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const BabysitterSchedule = () => {
  const weeklySchedule = [
    { day: 'Monday', time: '8:00 AM - 4:00 PM', children: 'Emma, Liam' },
    { day: 'Tuesday', time: '8:00 AM - 4:00 PM', children: 'Emma, Liam' },
    { day: 'Wednesday', time: '8:00 AM - 4:00 PM', children: 'Emma, Liam' },
    { day: 'Thursday', time: '8:00 AM - 4:00 PM', children: 'Emma, Olivia' },
    { day: 'Friday', time: '8:00 AM - 4:00 PM', children: 'Emma, Olivia' }
  ];
  
  return (
    <Container>
      <Title>
        <MdSchedule /> My Weekly Schedule
      </Title>
      <ScheduleCard>
        {weeklySchedule.map((schedule, index) => (
          <ScheduleItem key={index}>
            <div>
              <DayLabel>{schedule.day}</DayLabel>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Children: {schedule.children}
              </div>
            </div>
            <TimeLabel>{schedule.time}</TimeLabel>
          </ScheduleItem>
        ))}
      </ScheduleCard>
    </Container>
  );
};

export default BabysitterSchedule;

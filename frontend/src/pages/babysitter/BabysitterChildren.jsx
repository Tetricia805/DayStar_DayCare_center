import React from 'react';
import styled from 'styled-components';
import { MdChildCare } from 'react-icons/md';

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ChildCard = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChildName = styled.h3`
  color: var(--text-color);
  margin: 0 0 1rem;
`;

const ChildInfo = styled.p`
  color: var(--text-secondary);
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const BabysitterChildren = () => {
  // Mock data for assigned children
  const assignedChildren = [
    { 
      id: 1, 
      name: 'Emma Johnson', 
      age: 4, 
      schedule: 'Mon-Fri, 8AM-3PM',
      allergies: 'None',
      emergencyContact: 'Sarah Johnson (Mother) - 555-0123'
    },
    { 
      id: 2, 
      name: 'Liam Smith', 
      age: 3, 
      schedule: 'Mon-Wed, 9AM-2PM',
      allergies: 'Peanuts',
      emergencyContact: 'John Smith (Father) - 555-0124'
    },
    { 
      id: 3, 
      name: 'Olivia Brown', 
      age: 5, 
      schedule: 'Thu-Fri, 8AM-4PM',
      allergies: 'None',
      emergencyContact: 'Mary Brown (Mother) - 555-0125'
    }
  ];

  return (
    <Container>
      <Title>
        <MdChildCare /> Children Under My Care
      </Title>
      <Grid>
        {assignedChildren.map(child => (
          <ChildCard key={child.id}>
            <ChildName>{child.name}</ChildName>
            <ChildInfo>Age: {child.age} years</ChildInfo>
            <ChildInfo>Schedule: {child.schedule}</ChildInfo>
            <ChildInfo>Allergies: {child.allergies}</ChildInfo>
            <ChildInfo>Emergency Contact: {child.emergencyContact}</ChildInfo>
          </ChildCard>
        ))}
      </Grid>
    </Container>
  );
};

export default BabysitterChildren; 
import React from 'react';
import styled from 'styled-components';
import { MdPayment } from 'react-icons/md';

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

const PaymentCard = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
`;

const PaymentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaymentDate = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const PaymentStatus = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const PaymentAmount = styled.span`
  color: var(--success);
      font-weight: 500;
  font-size: 1.1rem;
`;

const BabysitterPayments = () => {
  const recentPayments = [
  {
    id: 1,
      date: '2024-03-15', 
      amount: '$500.00', 
      status: 'Paid',
      hours: 40,
      rate: '$12.50/hour'
  },
  {
    id: 2,
      date: '2024-02-15', 
      amount: '$500.00', 
      status: 'Paid',
      hours: 40,
      rate: '$12.50/hour'
  },
  {
    id: 3,
      date: '2024-01-15', 
      amount: '$500.00', 
      status: 'Paid',
      hours: 40,
      rate: '$12.50/hour'
    }
  ];
  
  return (
    <Container>
      <Title>
        <MdPayment /> My Payment History
      </Title>
      <PaymentCard>
        {recentPayments.map(payment => (
          <PaymentItem key={payment.id}>
            <PaymentInfo>
              <PaymentDate>Date: {payment.date}</PaymentDate>
              <PaymentStatus>Status: {payment.status}</PaymentStatus>
              <PaymentStatus>Hours: {payment.hours}</PaymentStatus>
              <PaymentStatus>Rate: {payment.rate}</PaymentStatus>
            </PaymentInfo>
            <PaymentAmount>{payment.amount}</PaymentAmount>
          </PaymentItem>
        ))}
      </PaymentCard>
    </Container>
  );
};

export default BabysitterPayments;

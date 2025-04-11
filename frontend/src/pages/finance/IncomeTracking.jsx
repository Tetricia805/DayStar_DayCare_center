
import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 1.5rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h1 {
    margin: 0;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--medium-gray);
  background-color: white;
`;

const IncomeTable = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--light-gray);
  }
  
  th {
    background-color: var(--light-gray);
    font-weight: 600;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  background-color: ${props => 
    props.status === 'Paid' ? 'var(--success-light)' : 
    props.status === 'Pending' ? 'var(--warning-light)' : 
    'var(--danger-light)'};
  color: ${props => 
    props.status === 'Paid' ? 'var(--success-color)' : 
    props.status === 'Pending' ? 'var(--warning-color)' : 
    'var(--danger-color)'};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  background-color: ${props => props.variant === 'primary' ? 'var(--primary-color)' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : 'var(--text-color)'};
  border: 1px solid ${props => props.variant === 'primary' ? 'var(--primary-color)' : 'var(--medium-gray)'};
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const SummaryCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  
  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
`;

const SummaryStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatItem = styled.div`
  h4 {
    margin: 0 0 0.5rem 0;
    color: var(--dark-gray);
    font-size: 0.9rem;
    font-weight: normal;
  }
  
  p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => props.color || 'var(--text-color)'};
  }
`;

const IncomeTracking = () => {
  // Sample data
  const [incomeEntries, setIncomeEntries] = useState([
    {
      id: 1,
      date: '2023-05-15',
      description: 'Monthly payment - Emma Thompson',
      amount: 150000,
      status: 'Paid',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 2,
      date: '2023-05-14',
      description: 'Weekly payment - Noah Johnson',
      amount: 50000,
      status: 'Paid',
      paymentMethod: 'Cash'
    },
    {
      id: 3,
      date: '2023-05-12',
      description: 'Monthly payment - Olivia Williams',
      amount: 150000,
      status: 'Pending',
      paymentMethod: 'Mobile Money'
    },
    {
      id: 4,
      date: '2023-05-10',
      description: 'Event fee - Birthday party',
      amount: 75000,
      status: 'Paid',
      paymentMethod: 'Cash'
    },
    {
      id: 5,
      date: '2023-05-05',
      description: 'Monthly payment - Liam Brown',
      amount: 150000,
      status: 'Overdue',
      paymentMethod: 'Pending'
    }
  ]);
  
  // Filters
  const [filters, setFilters] = useState({
    month: 'May',
    year: '2023',
    status: 'All'
  });
  
  // Calculate summary statistics
  const totalReceived = incomeEntries
    .filter(entry => entry.status === 'Paid')
    .reduce((sum, entry) => sum + entry.amount, 0);
    
  const totalPending = incomeEntries
    .filter(entry => entry.status === 'Pending')
    .reduce((sum, entry) => sum + entry.amount, 0);
    
  const totalOverdue = incomeEntries
    .filter(entry => entry.status === 'Overdue')
    .reduce((sum, entry) => sum + entry.amount, 0);
  
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()} UGX`;
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Income Tracking</h1>
        <Button variant="primary">Add Income Entry</Button>
      </PageHeader>
      
      <SummaryCard>
        <h3>Income Summary</h3>
        <SummaryStats>
          <StatItem>
            <h4>Total Received</h4>
            <p>{formatCurrency(totalReceived)}</p>
          </StatItem>
          
          <StatItem color="var(--warning-color)">
            <h4>Total Pending</h4>
            <p>{formatCurrency(totalPending)}</p>
          </StatItem>
          
          <StatItem color="var(--danger-color)">
            <h4>Total Overdue</h4>
            <p>{formatCurrency(totalOverdue)}</p>
          </StatItem>
          
          <StatItem color="var(--primary-color)">
            <h4>Total</h4>
            <p>{formatCurrency(totalReceived + totalPending + totalOverdue)}</p>
          </StatItem>
        </SummaryStats>
      </SummaryCard>
      
      <FilterContainer>
        <FilterSelect 
          name="month" 
          value={filters.month} 
          onChange={handleFilterChange}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </FilterSelect>
        
        <FilterSelect 
          name="year" 
          value={filters.year} 
          onChange={handleFilterChange}
        >
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </FilterSelect>
        
        <FilterSelect 
          name="status" 
          value={filters.status} 
          onChange={handleFilterChange}
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </FilterSelect>
      </FilterContainer>
      
      <IncomeTable>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomeEntries.map(entry => (
              <tr key={entry.id}>
                <td>{entry.date}</td>
                <td>{entry.description}</td>
                <td>{formatCurrency(entry.amount)}</td>
                <td>
                  <StatusBadge status={entry.status}>
                    {entry.status}
                  </StatusBadge>
                </td>
                <td>{entry.paymentMethod}</td>
                <td>
                  <ButtonGroup>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </IncomeTable>
    </PageContainer>
  );
};

export default IncomeTracking;

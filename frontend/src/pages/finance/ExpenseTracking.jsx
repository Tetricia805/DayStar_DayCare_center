
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

const ExpenseTable = styled.div`
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

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  background-color: ${props => {
    switch(props.category) {
      case 'Supplies': return '#e3f2fd';
      case 'Salaries': return '#e8f5e9';
      case 'Rent': return '#fff8e1';
      case 'Food': return '#f3e5f5';
      case 'Utilities': return '#e0f7fa';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.category) {
      case 'Supplies': return '#1976d2';
      case 'Salaries': return '#388e3c';
      case 'Rent': return '#f57c00';
      case 'Food': return '#7b1fa2';
      case 'Utilities': return '#00acc1';
      default: return '#616161';
    }
  }};
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

const ExpenseTracking = () => {
  // Sample data
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: '2023-05-15',
      description: 'Educational supplies',
      amount: 75000,
      category: 'Supplies',
      paymentMethod: 'Cash'
    },
    {
      id: 2,
      date: '2023-05-14',
      description: 'Staff salaries',
      amount: 250000,
      category: 'Salaries',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 3,
      date: '2023-05-10',
      description: 'Monthly rent',
      amount: 150000,
      category: 'Rent',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 4,
      date: '2023-05-08',
      description: 'Children\'s meals',
      amount: 85000,
      category: 'Food',
      paymentMethod: 'Cash'
    },
    {
      id: 5,
      date: '2023-05-05',
      description: 'Electricity bill',
      amount: 35000,
      category: 'Utilities',
      paymentMethod: 'Mobile Money'
    }
  ]);
  
  // Filters
  const [filters, setFilters] = useState({
    month: 'May',
    year: '2023',
    category: 'All'
  });
  
  // Calculate summary statistics
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});
  
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
        <h1>Expense Tracking</h1>
        <Button variant="primary">Add Expense</Button>
      </PageHeader>
      
      <SummaryCard>
        <h3>Expense Summary</h3>
        <SummaryStats>
          <StatItem color="var(--danger-color)">
            <h4>Total Expenses</h4>
            <p>{formatCurrency(totalExpenses)}</p>
          </StatItem>
          
          {Object.entries(expensesByCategory).map(([category, amount]) => (
            <StatItem key={category}>
              <h4>{category}</h4>
              <p>{formatCurrency(amount)}</p>
            </StatItem>
          ))}
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
          name="category" 
          value={filters.category} 
          onChange={handleFilterChange}
        >
          <option value="All">All Categories</option>
          <option value="Supplies">Supplies</option>
          <option value="Salaries">Salaries</option>
          <option value="Rent">Rent</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
        </FilterSelect>
      </FilterContainer>
      
      <ExpenseTable>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>{formatCurrency(expense.amount)}</td>
                <td>
                  <CategoryBadge category={expense.category}>
                    {expense.category}
                  </CategoryBadge>
                </td>
                <td>{expense.paymentMethod}</td>
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
      </ExpenseTable>
    </PageContainer>
  );
};

export default ExpenseTracking;

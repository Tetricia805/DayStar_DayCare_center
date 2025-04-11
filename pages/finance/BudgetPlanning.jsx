
import React, { useState } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';

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

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  
  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
`;

const PeriodSelect = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  
  label {
    font-weight: 500;
    color: var(--text-color);
  }
  
  select {
    padding: 0.5rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--medium-gray);
    background-color: white;
  }
`;

const BudgetItemTable = styled.div`
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--light-gray);
  }
  
  th {
    font-weight: 600;
    color: var(--text-color);
  }
  
  tr:last-child td {
    border-bottom: none;
  }

  input[type="number"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--medium-gray);
    border-radius: var(--border-radius);
  }
`;

const BudgetSummary = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--light-gray);
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    
    span {
      font-weight: 500;
    }
    
    &.total {
      font-weight: 600;
      font-size: 1.1rem;
      margin-top: 1rem;
    }
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-bottom: 1.5rem;
`;

const ProgressSection = styled.div`
  margin-top: 1.5rem;
`;

const ProgressItem = styled.div`
  margin-bottom: 1rem;
  
  .progress-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    
    span {
      font-size: 0.9rem;
      color: var(--text-color);
    }
  }
  
  .progress-bar {
    height: 8px;
    background-color: var(--light-gray);
    border-radius: 4px;
    position: relative;
    
    .progress-fill {
      position: absolute;
      height: 100%;
      background-color: ${props => 
        props.percentage > 100 ? 'var(--danger-color)' : 
        props.percentage > 90 ? 'var(--warning-color)' : 
        'var(--success-color)'};
      border-radius: 4px;
      width: ${props => Math.min(props.percentage, 100)}%;
    }
  }
`;

const BudgetPlanning = () => {
  // Sample data
  const [period, setPeriod] = useState('May 2023');
  
  const [budgetItems, setBudgetItems] = useState([
    {
      id: 1,
      category: 'Salaries',
      budgeted: 1200000,
      actual: 1100000
    },
    {
      id: 2,
      category: 'Rent',
      budgeted: 500000,
      actual: 500000
    },
    {
      id: 3,
      category: 'Supplies',
      budgeted: 300000,
      actual: 350000
    },
    {
      id: 4,
      category: 'Food',
      budgeted: 400000,
      actual: 425000
    },
    {
      id: 5,
      category: 'Utilities',
      budgeted: 150000,
      actual: 135000
    },
    {
      id: 6,
      category: 'Maintenance',
      budgeted: 100000,
      actual: 85000
    }
  ]);
  
  // Budget summary calculations
  const totalBudgeted = budgetItems.reduce((sum, item) => sum + item.budgeted, 0);
  const totalActual = budgetItems.reduce((sum, item) => sum + item.actual, 0);
  const budgetVariance = totalBudgeted - totalActual;
  
  // Handle budget item changes
  const handleBudgetChange = (id, value) => {
    setBudgetItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, budgeted: Number(value) } : item
      )
    );
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()} UGX`;
  };
  
  // Prepare chart data
  const chartData = {
    labels: budgetItems.map(item => item.category),
    datasets: [
      {
        label: 'Budgeted',
        data: budgetItems.map(item => item.budgeted),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Actual',
        data: budgetItems.map(item => item.actual),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Budget Planning</h1>
        <Button variant="primary">Save Budget</Button>
      </PageHeader>
      
      <PeriodSelect>
        <label>Budget Period:</label>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="May 2023">May 2023</option>
          <option value="June 2023">June 2023</option>
          <option value="July 2023">July 2023</option>
        </select>
      </PeriodSelect>
      
      <GridLayout>
        <Card>
          <h3>Budget Allocations</h3>
          <BudgetItemTable>
            <Table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Budget (UGX)</th>
                </tr>
              </thead>
              <tbody>
                {budgetItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.category}</td>
                    <td>
                      <input 
                        type="number" 
                        value={item.budgeted}
                        onChange={(e) => handleBudgetChange(item.id, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </BudgetItemTable>
          
          <BudgetSummary>
            <div className="summary-row">
              <span>Total Budget:</span>
              <span>{formatCurrency(totalBudgeted)}</span>
            </div>
            <div className="summary-row">
              <span>Actual Expenses:</span>
              <span>{formatCurrency(totalActual)}</span>
            </div>
            <div className="summary-row total">
              <span>Balance:</span>
              <span 
                style={{ color: budgetVariance >= 0 ? 'var(--success-color)' : 'var(--danger-color)' }}
              >
                {formatCurrency(budgetVariance)}
              </span>
            </div>
          </BudgetSummary>
        </Card>
        
        <Card>
          <h3>Budget vs. Actual</h3>
          <ChartContainer>
            <Bar data={chartData} options={chartOptions} />
          </ChartContainer>
          
          <ProgressSection>
            <h3>Budget Utilization</h3>
            {budgetItems.map(item => {
              const percentage = (item.actual / item.budgeted) * 100;
              return (
                <ProgressItem key={item.id} percentage={percentage}>
                  <div className="progress-header">
                    <span>{item.category}</span>
                    <span>{percentage.toFixed(1)}% ({formatCurrency(item.actual)} of {formatCurrency(item.budgeted)})</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                </ProgressItem>
              );
            })}
          </ProgressSection>
        </Card>
      </GridLayout>
    </PageContainer>
  );
};

export default BudgetPlanning;

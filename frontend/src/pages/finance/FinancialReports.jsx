
import React, { useState } from 'react';
import styled from 'styled-components';
import { Line, Pie } from 'react-chartjs-2';

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

const ReportFilters = styled.div`
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

const FilterRow = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  
  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
      font-weight: 500;
      color: var(--text-color);
    }
    
    select, input {
      padding: 0.5rem;
      border-radius: var(--border-radius);
      border: 1px solid var(--medium-gray);
      background-color: white;
      min-width: 200px;
    }
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
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

const ChartContainer = styled.div`
  height: 300px;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SummaryCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  text-align: center;
  
  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--dark-gray);
    font-size: 1rem;
    font-weight: normal;
  }
  
  p {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: ${props => props.color || 'var(--text-color)'};
  }
`;

const FinancialReports = () => {
  // Sample data
  const [filters, setFilters] = useState({
    reportType: 'income-expense',
    dateRange: 'year-to-date',
    fromDate: '2023-01-01',
    toDate: '2023-05-15'
  });
  
  // Mock financial data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const incomeData = [380000, 420000, 390000, 450000, 480000];
  const expenseData = [310000, 325000, 300000, 340000, 350000];
  
  // Calculate financial summaries
  const totalIncome = incomeData.reduce((sum, val) => sum + val, 0);
  const totalExpenses = expenseData.reduce((sum, val) => sum + val, 0);
  const netIncome = totalIncome - totalExpenses;
  const profitMargin = (netIncome / totalIncome) * 100;
  
  // Expense breakdown data for pie chart
  const expenseCategories = ['Salaries', 'Rent', 'Supplies', 'Food', 'Utilities', 'Maintenance'];
  const expenseBreakdown = [45, 20, 12, 15, 5, 3];
  
  // Format currency
  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()} UGX`;
  };
  
  // Prepare chart data
  const incomeExpenseData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Expenses',
        data: expenseData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };
  
  const profitabilityData = {
    labels: months,
    datasets: [
      {
        label: 'Profit',
        data: months.map((_, index) => incomeData[index] - expenseData[index]),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };
  
  const expensePieData = {
    labels: expenseCategories,
    datasets: [
      {
        data: expenseBreakdown,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Financial Reports</h1>
        <ButtonGroup>
          <Button>Generate PDF</Button>
          <Button>Export Excel</Button>
          <Button variant="primary">Print Report</Button>
        </ButtonGroup>
      </PageHeader>
      
      <ReportFilters>
        <h3>Report Settings</h3>
        <FilterRow>
          <div className="filter-group">
            <label>Report Type</label>
            <select 
              name="reportType" 
              value={filters.reportType} 
              onChange={handleFilterChange}
            >
              <option value="income-expense">Income & Expense</option>
              <option value="profitability">Profitability</option>
              <option value="expense-breakdown">Expense Breakdown</option>
              <option value="cash-flow">Cash Flow</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Date Range</label>
            <select 
              name="dateRange" 
              value={filters.dateRange} 
              onChange={handleFilterChange}
            >
              <option value="month-to-date">Month to Date</option>
              <option value="year-to-date">Year to Date</option>
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          {filters.dateRange === 'custom' && (
            <>
              <div className="filter-group">
                <label>From Date</label>
                <input 
                  type="date" 
                  name="fromDate" 
                  value={filters.fromDate} 
                  onChange={handleFilterChange}
                />
              </div>
              
              <div className="filter-group">
                <label>To Date</label>
                <input 
                  type="date" 
                  name="toDate" 
                  value={filters.toDate} 
                  onChange={handleFilterChange}
                />
              </div>
            </>
          )}
        </FilterRow>
      </ReportFilters>
      
      <SummaryGrid>
        <SummaryCard color="var(--primary-color)">
          <h3>Total Income</h3>
          <p>{formatCurrency(totalIncome)}</p>
        </SummaryCard>
        
        <SummaryCard color="var(--danger-color)">
          <h3>Total Expenses</h3>
          <p>{formatCurrency(totalExpenses)}</p>
        </SummaryCard>
        
        <SummaryCard color={netIncome >= 0 ? 'var(--success-color)' : 'var(--danger-color)'}>
          <h3>Net Income</h3>
          <p>{formatCurrency(netIncome)}</p>
        </SummaryCard>
        
        <SummaryCard color={profitMargin >= 15 ? 'var(--success-color)' : 'var(--warning-color)'}>
          <h3>Profit Margin</h3>
          <p>{profitMargin.toFixed(1)}%</p>
        </SummaryCard>
      </SummaryGrid>
      
      <ChartGrid>
        <ChartCard>
          <h3>Income & Expenses</h3>
          <ChartContainer>
            <Line 
              data={incomeExpenseData} 
              options={chartOptions}
            />
          </ChartContainer>
        </ChartCard>
        
        <ChartCard>
          <h3>Profitability</h3>
          <ChartContainer>
            <Line 
              data={profitabilityData} 
              options={chartOptions}
            />
          </ChartContainer>
        </ChartCard>
        
        <ChartCard>
          <h3>Expense Breakdown</h3>
          <ChartContainer>
            <Pie 
              data={expensePieData} 
              options={pieOptions}
            />
          </ChartContainer>
        </ChartCard>
      </ChartGrid>
    </PageContainer>
  );
};

export default FinancialReports;

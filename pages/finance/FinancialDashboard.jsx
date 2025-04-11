
import { useState } from 'react';
import styled from 'styled-components';
import { MdAttachMoney, MdShowChart, MdWarning, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  
  .icon-container {
    background-color: ${props => `var(--${props.color}-color)`}20;
    color: ${props => `var(--${props.color}-color)`};
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    
    svg {
      font-size: 1.8rem;
    }
  }
  
  .content {
    flex: 1;
    
    h3 {
      font-size: 1.8rem;
      margin-bottom: 0.25rem;
      color: var(--text-color);
    }
    
    p {
      color: var(--dark-gray);
      margin: 0;
    }
    
    .trend {
      display: flex;
      align-items: center;
      margin-top: 0.5rem;
      font-size: 0.9rem;
      
      &.up {
        color: var(--success-color);
      }
      
      &.down {
        color: var(--danger-color);
      }
      
      svg {
        margin-right: 0.25rem;
      }
    }
  }
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  
  h2 {
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }
`;

const AlertsSection = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  
  h2 {
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }
`;

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  background-color: ${props => props.type === 'warning' ? '#fff8e1' : '#ffebee'};
  border-left: 4px solid ${props => props.type === 'warning' ? 'var(--warning-color)' : 'var(--danger-color)'};
  
  .alert-icon {
    margin-right: 1rem;
    color: ${props => props.type === 'warning' ? 'var(--warning-color)' : 'var(--danger-color)'};
  }
  
  .alert-content {
    flex: 1;
    
    h4 {
      margin: 0 0 0.25rem 0;
      color: var(--text-color);
    }
    
    p {
      margin: 0;
      color: var(--dark-gray);
    }
  }
`;

const FinancialDashboard = () => {
  // Mock financial data
  const [financialData, setFinancialData] = useState({
    totalIncome: 2450000,
    totalExpenses: 1820000,
    netProfit: 630000,
    budgetAdherence: 92,
    monthlyGrowth: 8.5
  });
  
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Toys & Play Materials Budget',
      message: 'Current spending is at 85% of the allocated budget. Monitor closely.'
    },
    {
      id: 2,
      type: 'danger',
      title: 'Utilities Expenses',
      message: 'Exceeded budget by 15%. Review and adjust budget allocation.'
    }
  ]);
  
  // Income vs Expenses data
  const incomeVsExpensesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [1200000, 1350000, 1500000, 1650000, 1800000, 2450000],
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 1
      },
      {
        label: 'Expenses',
        data: [950000, 1050000, 1200000, 1400000, 1600000, 1820000],
        backgroundColor: 'rgba(244, 67, 54, 0.6)',
        borderColor: 'rgba(244, 67, 54, 1)',
        borderWidth: 1
      }
    ]
  };
  
  // Expense Breakdown
  const expenseBreakdownData = {
    labels: ['Babysitter Salaries', 'Toys & Materials', 'Maintenance', 'Utilities', 'Food & Supplies', 'Other'],
    datasets: [
      {
        data: [65, 12, 8, 10, 15, 5],
        backgroundColor: [
          'rgba(74, 109, 167, 0.7)',
          'rgba(76, 175, 80, 0.7)',
          'rgba(255, 152, 0, 0.7)',
          'rgba(244, 67, 54, 0.7)',
          'rgba(156, 39, 176, 0.7)',
          'rgba(158, 158, 158, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  // Revenue Trends
  const revenueTrendsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weekly Revenue (K UGX)',
        data: [580000, 620000, 590000, 660000],
        fill: false,
        borderColor: 'rgba(33, 150, 243, 1)',
        tension: 0.1
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false
      },
    }
  };
  
  return (
    <DashboardContainer>
      <h1>Financial Dashboard</h1>
      
      <StatsGrid>
        <StatCard color="success">
          <div className="icon-container">
            <MdAttachMoney />
          </div>
          <div className="content">
            <h3>{financialData.totalIncome.toLocaleString()}</h3>
            <p>Total Income (UGX)</p>
            <div className="trend up">
              <MdTrendingUp />
              <span>12.5% from last month</span>
            </div>
          </div>
        </StatCard>
        
        <StatCard color="danger">
          <div className="icon-container">
            <MdAttachMoney />
          </div>
          <div className="content">
            <h3>{financialData.totalExpenses.toLocaleString()}</h3>
            <p>Total Expenses (UGX)</p>
            <div className="trend up">
              <MdTrendingUp />
              <span>8.2% from last month</span>
            </div>
          </div>
        </StatCard>
        
        <StatCard color="primary">
          <div className="icon-container">
            <MdAttachMoney />
          </div>
          <div className="content">
            <h3>{financialData.netProfit.toLocaleString()}</h3>
            <p>Net Profit (UGX)</p>
            <div className="trend up">
              <MdTrendingUp />
              <span>15.3% from last month</span>
            </div>
          </div>
        </StatCard>
        
        <StatCard color="info">
          <div className="icon-container">
            <MdShowChart />
          </div>
          <div className="content">
            <h3>{financialData.budgetAdherence}%</h3>
            <p>Budget Adherence</p>
            <div className="trend down">
              <MdTrendingDown />
              <span>3.5% from last month</span>
            </div>
          </div>
        </StatCard>
      </StatsGrid>
      
      <ChartSection>
        <ChartCard>
          <h2>Income vs Expenses (6 Months)</h2>
          <Bar data={incomeVsExpensesData} options={chartOptions} />
        </ChartCard>
        
        <ChartCard>
          <h2>Expense Breakdown</h2>
          <Doughnut data={expenseBreakdownData} options={doughnutOptions} />
        </ChartCard>
      </ChartSection>
      
      <ChartCard>
        <h2>Monthly Revenue Trends</h2>
        <Line data={revenueTrendsData} options={chartOptions} />
      </ChartCard>
      
      <AlertsSection>
        <h2>Budget Alerts</h2>
        {alerts.map(alert => (
          <AlertItem key={alert.id} type={alert.type}>
            <div className="alert-icon">
              <MdWarning size={24} />
            </div>
            <div className="alert-content">
              <h4>{alert.title}</h4>
              <p>{alert.message}</p>
            </div>
          </AlertItem>
        ))}
      </AlertsSection>
    </DashboardContainer>
  );
};

export default FinancialDashboard;

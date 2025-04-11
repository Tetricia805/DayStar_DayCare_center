import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdChildCare, MdPerson, MdAttachMoney, MdWarning, MdCalendarToday, MdAdd, MdList } from 'react-icons/md';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

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

const StatCard = styled(Link)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: ${props => props.bgColor || 'var(--primary-light)'};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 30px;
    color: ${props => props.iconColor || 'var(--primary-color)'};
  }
`;

const StatInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    color: var(--text-color);
    margin: 0 0 0.25rem 0;
  }

  p {
    color: var(--dark-gray);
    margin: 0;
  }
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
`;

const ChartCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  height: 300px;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .chart-container {
    height: calc(100% - 40px);
  }
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ScheduleCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      font-size: 0.9rem;
      color: var(--primary-color);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ScheduleDay = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--light-gray);

  &:last-child {
    border-bottom: none;
  }

  h4 {
    margin: 0 0 0.5rem 0;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: var(--primary-color);
    }
  }

  .event {
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;

    p {
      margin: 0;
      color: var(--dark-gray);
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const IncidentCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      font-size: 0.9rem;
      color: var(--primary-color);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const IncidentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const IncidentItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  background-color: ${props => props.severity === 'High' ? '#fff5f5' : props.severity === 'Medium' ? '#fff8e1' : '#f1f8e9'};
  border-left: 4px solid ${props => props.severity === 'High' ? 'var(--danger-color)' : props.severity === 'Medium' ? 'var(--warning-color)' : 'var(--success-color)'};
`;

const IncidentIcon = styled.div`
  color: ${props => props.severity === 'High' ? 'var(--danger-color)' : props.severity === 'Medium' ? 'var(--warning-color)' : 'var(--success-color)'};

  svg {
    font-size: 24px;
  }
`;

const IncidentInfo = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 0.25rem 0;
    font-size: 0.95rem;
    color: var(--text-color);
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--dark-gray);
  }
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary-dark);
  }
`;

// Mock data for demonstration
const mockStats = {
  childrenTotal: 28,
  babysittersTotal: 6,
  financialSummary: {
    income: 450000,
    expenses: 320000,
    pending: 75000
  }
};

const mockIncidents = [
  {
    id: 1,
    childName: 'Emma Thompson',
    timestamp: '2023-05-15 14:30',
    description: 'Minor fall during outdoor play, knee scrape treated with antiseptic',
    severity: 'Low'
  },
  {
    id: 2,
    childName: 'Noah Johnson',
    timestamp: '2023-05-15 11:15',
    description: 'Allergic reaction to snack, parents notified, antihistamine administered',
    severity: 'Medium'
  },
  {
    id: 3,
    childName: 'Oliver Brown',
    timestamp: '2023-05-14 09:45',
    description: 'Fever of 38.5°C, parents contacted for pickup, rest prescribed',
    severity: 'High'
  }
];

const mockSchedule = [
  {
    date: '2023-05-16',
    events: [
      { babysitter: 'Jane Doe', shift: 'Full Day', children: 5 },
      { babysitter: 'Sarah Smith', shift: 'Half Day (Morning)', children: 3 }
    ]
  },
  {
    date: '2023-05-17',
    events: [
      { babysitter: 'Michael Johnson', shift: 'Full Day', children: 4 },
      { babysitter: 'Jane Doe', shift: 'Half Day (Afternoon)', children: 5 }
    ]
  },
  {
    date: '2023-05-18',
    events: [
      { babysitter: 'Sarah Smith', shift: 'Full Day', children: 3 },
      { babysitter: 'Michael Johnson', shift: 'Full Day', children: 4 }
    ]
  }
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // In a real application, you'd fetch data from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setStats(mockStats);
      setIncidents(mockIncidents);
      setSchedule(mockSchedule);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  // Prepare chart data
  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Children Attendance',
        data: [22, 24, 25, 23, 21, 15, 10],
        backgroundColor: 'rgba(74, 109, 167, 0.2)',
        borderColor: 'rgba(74, 109, 167, 1)',
        borderWidth: 2
      }
    ]
  };

  const financialData = {
    labels: ['Income', 'Expenses', 'Pending Payments'],
    datasets: [
      {
        data: [stats.financialSummary.income, stats.financialSummary.expenses, stats.financialSummary.pending],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [320000, 350000, 310000, 380000, 400000, 450000],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3
      },
      {
        label: 'Expenses',
        data: [250000, 280000, 260000, 300000, 310000, 320000],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3
      }
    ]
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()} UGX`;
  };

  return (
    <DashboardContainer>
      <StatsGrid>
        <StatCard to="/dashboard/children">
          <StatIcon bgColor="#e3f2fd" iconColor="#1976d2">
            <MdChildCare />
          </StatIcon>
          <StatInfo>
            <h3>{mockStats.childrenTotal}</h3>
            <p>Total Children</p>
          </StatInfo>
        </StatCard>

        <StatCard to="/dashboard/babysitters">
          <StatIcon bgColor="#f3e5f5" iconColor="#9c27b0">
            <MdPerson />
          </StatIcon>
          <StatInfo>
            <h3>{mockStats.babysittersTotal}</h3>
            <p>Babysitters</p>
          </StatInfo>
        </StatCard>

        <StatCard to="/dashboard/finance">
          <StatIcon bgColor="#e8f5e9" iconColor="#2e7d32">
            <MdAttachMoney />
          </StatIcon>
          <StatInfo>
            <h3>{formatCurrency(mockStats.financialSummary.income)}</h3>
            <p>Monthly Income</p>
          </StatInfo>
        </StatCard>

        <StatCard to="/dashboard/incidents">
          <StatIcon bgColor="#fff3e0" iconColor="#f57c00">
            <MdWarning />
          </StatIcon>
          <StatInfo>
            <h3>{mockIncidents.length}</h3>
            <p>Recent Incidents</p>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <TwoColumnLayout>
        <ScheduleCard>
          <h3>
            Today's Schedule
            <Link to="/dashboard/babysitters/schedule">View All</Link>
          </h3>

          {schedule.map((day, index) => (
            <ScheduleDay key={index}>
              <h4>
                <MdCalendarToday />
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
              </h4>

              {day.events.map((event, eventIndex) => (
                <div className="event" key={eventIndex}>
                  <p><strong>{event.babysitter}</strong> - {event.shift}</p>
                  <p>Children assigned: {event.children}</p>
                </div>
              ))}
            </ScheduleDay>
          ))}
        </ScheduleCard>

        <IncidentCard>
          <h3>
            Recent Incidents
            <Link to="/dashboard/incidents">View All</Link>
          </h3>

          <IncidentList>
            {mockIncidents.map(incident => (
              <IncidentItem key={incident.id} severity={incident.severity}>
                <IncidentIcon severity={incident.severity}>
                  <MdWarning />
                </IncidentIcon>
                <IncidentInfo>
                  <h4>{incident.childName}</h4>
                  <p>{incident.description}</p>
                  <small>{incident.timestamp}</small>
                </IncidentInfo>
              </IncidentItem>
            ))}
          </IncidentList>
        </IncidentCard>
      </TwoColumnLayout>

      <ChartSection>
        <ChartCard>
          <h3>Monthly Attendance</h3>
          <Bar 
            data={attendanceData}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              },
              plugins: {
                legend: {
                  display: false
                }
              },
              maintainAspectRatio: false
            }}
            height={200}
          />
        </ChartCard>

        <ChartCard>
          <h3>Financial Overview</h3>
          <div style={{ maxHeight: '200px' }}>
            <Doughnut 
              data={financialData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                },
                maintainAspectRatio: false
              }}
            />
          </div>
        </ChartCard>
      </ChartSection>

      <ChartCard>
        <h3>Financial Trends (Last 6 Months)</h3>
        <Line 
          data={revenueData}
          options={{
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                position: 'top'
              }
            },
            maintainAspectRatio: false
          }}
          height={250}
        />
      </ChartCard>

      {/* Quick Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <ActionButton to="/dashboard/children/register">
          <MdAdd /> Register New Child
        </ActionButton>
        <ActionButton to="/dashboard/babysitters/register">
          <MdAdd /> Register New Babysitter
        </ActionButton>
        <ActionButton to="/dashboard/incidents">
          <MdList /> Report Incident
        </ActionButton>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
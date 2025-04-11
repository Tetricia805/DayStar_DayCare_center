
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdMonetizationOn, MdPrint, MdDownload, MdFilterList } from 'react-icons/md';
import { toast } from 'react-toastify';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h1 {
    font-size: 1.75rem;
    color: var(--text-color);
    margin: 0;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 24px;
    color: var(--primary-color);
  }
`;

const StatInfo = styled.div`
  h3 {
    font-size: 1.25rem;
    color: var(--text-color);
    margin: 0 0 0.25rem 0;
  }
  
  p {
    color: var(--dark-gray);
    margin: 0;
    font-size: 0.9rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: white;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-size: 0.9rem;
    color: var(--dark-gray);
  }
  
  select, input {
    padding: 0.5rem;
    border: 1px solid var(--medium-gray);
    border-radius: var(--border-radius);
    min-width: 150px;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.secondary ? 'white' : 'var(--primary-color)'};
  color: ${props => props.secondary ? 'var(--text-color)' : 'white'};
  border: ${props => props.secondary ? '1px solid var(--medium-gray)' : 'none'};
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${props => props.secondary ? 'var(--light-gray)' : 'var(--primary-dark)'};
  }
  
  svg {
    font-size: 1.25rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
`;

const TableHead = styled.thead`
  background-color: var(--primary-light);
  
  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--text-color);
  }
`;

const TableBody = styled.tbody`
  tr {
    &:hover {
      background-color: var(--light-gray);
    }
    
    &:not(:last-child) {
      border-bottom: 1px solid var(--medium-gray);
    }
  }
  
  td {
    padding: 1rem;
    color: var(--dark-gray);
    
    &.name {
      color: var(--text-color);
      font-weight: 500;
    }
    
    &.amount {
      font-weight: 500;
      color: var(--success-color);
    }
    
    &.status {
      font-weight: 500;
      
      span {
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.8rem;
        
        &.paid {
          background-color: #e7f5e7;
          color: var(--success-color);
        }
        
        &.pending {
          background-color: #fff8e1;
          color: var(--warning-color);
        }
      }
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  
  .info {
    color: var(--dark-gray);
    font-size: 0.9rem;
  }
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PaginationButton = styled.button`
  background-color: ${props => props.active ? 'var(--primary-color)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--text-color)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--medium-gray)'};
  border-radius: var(--border-radius);
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-dark)' : 'var(--light-gray)'};
  }
  
  &:disabled {
    background-color: var(--light-gray);
    color: var(--medium-gray);
    cursor: not-allowed;
  }
`;

// Mock data for demonstration
const mockPayments = [
  {
    id: 1,
    babysitter: { id: 1, name: 'Jane Doe' },
    date: '2023-05-15',
    childrenCount: 5,
    sessions: { fullDay: 3, halfDay: 2 },
    amount: 19000,
    status: 'paid'
  },
  {
    id: 2,
    babysitter: { id: 2, name: 'Sarah Smith' },
    date: '2023-05-15',
    childrenCount: 3,
    sessions: { fullDay: 2, halfDay: 1 },
    amount: 12000,
    status: 'paid'
  },
  {
    id: 3,
    babysitter: { id: 3, name: 'Michael Johnson' },
    date: '2023-05-15',
    childrenCount: 4,
    sessions: { fullDay: 1, halfDay: 3 },
    amount: 11000,
    status: 'pending'
  },
  {
    id: 4,
    babysitter: { id: 1, name: 'Jane Doe' },
    date: '2023-05-14',
    childrenCount: 4,
    sessions: { fullDay: 2, halfDay: 2 },
    amount: 14000,
    status: 'paid'
  },
  {
    id: 5,
    babysitter: { id: 2, name: 'Sarah Smith' },
    date: '2023-05-14',
    childrenCount: 3,
    sessions: { fullDay: 3, halfDay: 0 },
    amount: 15000,
    status: 'paid'
  }
];

const BabysitterPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [filterBabysitter, setFilterBabysitter] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  useEffect(() => {
    // In a real application, you'd fetch data from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setPayments(mockPayments);
      setLoading(false);
    }, 500);
  }, []);
  
  // Calculate stats for summary cards
  const totalPaid = payments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const totalPending = payments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const totalPayments = totalPaid + totalPending;
  
  // Filter payments based on selected filters
  const filteredPayments = payments.filter(payment => {
    return (
      (filterDate ? payment.date === filterDate : true) &&
      (filterBabysitter ? payment.babysitter.id === parseInt(filterBabysitter) : true) &&
      (filterStatus ? payment.status === filterStatus : true)
    );
  });
  
  // Paginate results
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const handleApprovePayment = (id) => {
    if (window.confirm('Are you sure you want to approve this payment?')) {
      const updatedPayments = payments.map(payment => 
        payment.id === id ? { ...payment, status: 'paid' } : payment
      );
      setPayments(updatedPayments);
      toast.success('Payment approved successfully');
    }
  };
  
  // Get unique babysitters for filter dropdown
  const uniqueBabysitters = [...new Set(payments.map(payment => payment.babysitter.id))];
  const babysitterOptions = uniqueBabysitters.map(id => {
    const payment = payments.find(p => p.babysitter.id === id);
    return {
      id,
      name: payment ? payment.babysitter.name : `Babysitter ${id}`
    };
  });
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Babysitter Payments</h1>
      </PageHeader>
      
      <StatsContainer>
        <StatCard>
          <StatIcon>
            <MdMonetizationOn />
          </StatIcon>
          <StatInfo>
            <h3>{totalPayments.toLocaleString()} UGX</h3>
            <p>Total Payments</p>
          </StatInfo>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <MdMonetizationOn />
          </StatIcon>
          <StatInfo>
            <h3>{totalPaid.toLocaleString()} UGX</h3>
            <p>Total Paid</p>
          </StatInfo>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <MdMonetizationOn />
          </StatIcon>
          <StatInfo>
            <h3>{totalPending.toLocaleString()} UGX</h3>
            <p>Pending Payments</p>
          </StatInfo>
        </StatCard>
      </StatsContainer>
      
      <FiltersContainer>
        <FilterGroup>
          <label htmlFor="date-filter">Date</label>
          <input 
            id="date-filter"
            type="date" 
            value={filterDate} 
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </FilterGroup>
        
        <FilterGroup>
          <label htmlFor="babysitter-filter">Babysitter</label>
          <select 
            id="babysitter-filter"
            value={filterBabysitter} 
            onChange={(e) => setFilterBabysitter(e.target.value)}
          >
            <option value="">All Babysitters</option>
            {babysitterOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </FilterGroup>
        
        <FilterGroup>
          <label htmlFor="status-filter">Status</label>
          <select 
            id="status-filter"
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </FilterGroup>
        
        <FilterGroup>
          <label>&nbsp;</label>
          <ActionButton 
            secondary 
            onClick={() => {
              setFilterDate('');
              setFilterBabysitter('');
              setFilterStatus('');
            }}
          >
            <MdFilterList />
            Clear Filters
          </ActionButton>
        </FilterGroup>
      </FiltersContainer>
      
      <ActionsBar>
        <div>
          <ActionButton secondary>
            <MdPrint />
            Print
          </ActionButton>
          <ActionButton secondary style={{ marginLeft: '10px' }}>
            <MdDownload />
            Export
          </ActionButton>
        </div>
      </ActionsBar>
      
      {loading ? (
        <p>Loading payments...</p>
      ) : currentItems.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <tr>
                <th>Babysitter</th>
                <th>Date</th>
                <th>Children</th>
                <th>Sessions</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </TableHead>
            <TableBody>
              {currentItems.map(payment => (
                <tr key={payment.id}>
                  <td className="name">{payment.babysitter.name}</td>
                  <td>{payment.date}</td>
                  <td>{payment.childrenCount}</td>
                  <td>
                    {payment.sessions.fullDay} full-day, {payment.sessions.halfDay} half-day
                  </td>
                  <td className="amount">{payment.amount.toLocaleString()} UGX</td>
                  <td className="status">
                    <span className={payment.status}>
                      {payment.status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    {payment.status === 'pending' && (
                      <ActionButton onClick={() => handleApprovePayment(payment.id)}>
                        Approve
                      </ActionButton>
                    )}
                  </td>
                </tr>
              ))}
            </TableBody>
          </Table>
          
          <PaginationContainer>
            <div className="info">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPayments.length)} of {filteredPayments.length} entries
            </div>
            <PaginationButtons>
              <PaginationButton 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </PaginationButton>
              
              {[...Array(totalPages).keys()].map(number => (
                <PaginationButton
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  active={currentPage === number + 1}
                >
                  {number + 1}
                </PaginationButton>
              ))}
              
              <PaginationButton 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </PaginationButton>
            </PaginationButtons>
          </PaginationContainer>
        </>
      ) : (
        <p>No payments found. Try a different filter.</p>
      )}
    </PageContainer>
  );
};

export default BabysitterPayments;


import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdCheckCircle, MdCancel, MdAdd, MdCalendarToday, MdAccessTime, MdPerson } from 'react-icons/md';
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

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.secondary ? 'white' : 'var(--primary-color)'};
  color: ${props => props.secondary ? 'var(--text-color)' : 'white'};
  border: ${props => props.secondary ? '1px solid var(--medium-gray)' : 'none'};
  border-radius: var(--border-radius);
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-weight: 500;
  
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
    
    &.status {
      font-weight: 500;
      
      &.present {
        color: var(--success-color);
      }
      
      &.absent {
        color: var(--danger-color);
      }
    }
  }
`;

const StatusIcon = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1.25rem;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  width: 95%;
  max-width: 500px;
  
  h2 {
    margin-top: 0;
    color: var(--text-color);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-color);
    font-weight: 500;
  }
  
  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--medium-gray);
    border-radius: var(--border-radius);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
  
  .error-message {
    color: var(--danger-color);
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &.primary {
    background-color: var(--primary-color);
    color: white;
    border: none;
    
    &:hover {
      background-color: var(--primary-dark);
    }
  }
  
  &.secondary {
    background-color: white;
    color: var(--text-color);
    border: 1px solid var(--medium-gray);
    
    &:hover {
      background-color: var(--light-gray);
    }
  }
`;

// Mock data for demonstration
const mockChildren = [
  { id: 1, name: 'Emma Thompson', age: 3 },
  { id: 2, name: 'Noah Johnson', age: 4 },
  { id: 3, name: 'Oliver Brown', age: 2 },
  { id: 4, name: 'Ava Garcia', age: 5 }
];

const generateMockAttendance = () => {
  const today = new Date();
  const attendanceRecords = [];
  
  // Generate records for the last 7 days
  for (let i = 0; i < 7; i++) {
    const recordDate = new Date(today);
    recordDate.setDate(today.getDate() - i);
    const dateString = recordDate.toISOString().split('T')[0];
    
    mockChildren.forEach(child => {
      // Randomly assign present/absent
      const isPresent = Math.random() > 0.2; // 80% chance of being present
      
      attendanceRecords.push({
        id: attendanceRecords.length + 1,
        childId: child.id,
        childName: child.name,
        date: dateString,
        status: isPresent ? 'present' : 'absent',
        checkInTime: isPresent ? `0${Math.floor(Math.random() * 3) + 8}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : null,
        checkOutTime: isPresent ? `${Math.floor(Math.random() * 3) + 16}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : null,
        sessionType: Math.random() > 0.5 ? 'Full Day' : 'Half Day',
        notes: ''
      });
    });
  }
  
  return attendanceRecords;
};

// Format date for display
const formatDate = (dateString) => {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const ChildAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [filterChild, setFilterChild] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    childId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    checkInTime: '',
    checkOutTime: '',
    sessionType: 'Full Day',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    // In a real application, you'd fetch data from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setAttendance(generateMockAttendance());
      setLoading(false);
    }, 500);
  }, []);
  
  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      childId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      checkInTime: '',
      checkOutTime: '',
      sessionType: 'Full Day',
      notes: ''
    });
    setFormErrors({});
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If status is changed to 'absent', clear check-in and check-out times
    if (name === 'status' && value === 'absent') {
      setFormData({
        ...formData,
        [name]: value,
        checkInTime: '',
        checkOutTime: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.childId) {
      errors.childId = 'Child is required';
    }
    
    if (!formData.date) {
      errors.date = 'Date is required';
    }
    
    if (formData.status === 'present') {
      if (!formData.checkInTime) {
        errors.checkInTime = 'Check-in time is required for present status';
      }
      
      if (!formData.checkOutTime) {
        errors.checkOutTime = 'Check-out time is required for present status';
      }
      
      if (formData.checkInTime && formData.checkOutTime && formData.checkInTime >= formData.checkOutTime) {
        errors.checkOutTime = 'Check-out time must be after check-in time';
      }
    }
    
    return errors;
  };
  
  const handleSubmit = () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const selectedChild = mockChildren.find(child => child.id === parseInt(formData.childId));
    
    const newAttendance = {
      id: attendance.length + 1,
      childId: parseInt(formData.childId),
      childName: selectedChild.name,
      date: formData.date,
      status: formData.status,
      checkInTime: formData.status === 'present' ? formData.checkInTime : null,
      checkOutTime: formData.status === 'present' ? formData.checkOutTime : null,
      sessionType: formData.sessionType,
      notes: formData.notes
    };
    
    setAttendance([newAttendance, ...attendance]);
    toast.success('Attendance record added successfully');
    
    handleCloseModal();
  };
  
  // Filter attendance records based on selected filters
  const filteredAttendance = attendance.filter(record => {
    return (
      (filterDate ? record.date === filterDate : true) &&
      (filterChild ? record.childId === parseInt(filterChild) : true) &&
      (filterStatus ? record.status === filterStatus : true)
    );
  });
  
  // Sort by date (newest first)
  const sortedAttendance = [...filteredAttendance].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  const clearFilters = () => {
    setFilterDate('');
    setFilterChild('');
    setFilterStatus('');
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Child Attendance</h1>
        <ActionButton onClick={handleOpenModal}>
          <MdAdd />
          Record Attendance
        </ActionButton>
      </PageHeader>
      
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
          <label htmlFor="child-filter">Child</label>
          <select 
            id="child-filter"
            value={filterChild} 
            onChange={(e) => setFilterChild(e.target.value)}
          >
            <option value="">All Children</option>
            {mockChildren.map(child => (
              <option key={child.id} value={child.id}>{child.name}</option>
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
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </FilterGroup>
        
        <FilterGroup>
          <label>&nbsp;</label>
          <ActionButton secondary onClick={clearFilters}>
            Clear Filters
          </ActionButton>
        </FilterGroup>
      </FiltersContainer>
      
      {loading ? (
        <p>Loading attendance records...</p>
      ) : sortedAttendance.length > 0 ? (
        <Table>
          <TableHead>
            <tr>
              <th>Date</th>
              <th>Child</th>
              <th>Session</th>
              <th>Status</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Notes</th>
            </tr>
          </TableHead>
          <TableBody>
            {sortedAttendance.map(record => (
              <tr key={record.id}>
                <td>{formatDate(record.date)}</td>
                <td className="name">{record.childName}</td>
                <td>{record.sessionType}</td>
                <td className={`status ${record.status}`}>
                  <StatusIcon>
                    {record.status === 'present' ? (
                      <>
                        <MdCheckCircle />
                        Present
                      </>
                    ) : (
                      <>
                        <MdCancel />
                        Absent
                      </>
                    )}
                  </StatusIcon>
                </td>
                <td>{record.checkInTime || '-'}</td>
                <td>{record.checkOutTime || '-'}</td>
                <td>{record.notes || '-'}</td>
              </tr>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No attendance records found. Try a different filter or add a new record.</p>
      )}
      
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>Record Attendance</h2>
            
            <FormGroup>
              <label htmlFor="childId">Child</label>
              <select
                id="childId"
                name="childId"
                value={formData.childId}
                onChange={handleInputChange}
              >
                <option value="">Select Child</option>
                {mockChildren.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
              {formErrors.childId && <p className="error-message">{formErrors.childId}</p>}
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="date">Date</label>
              <input 
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
              {formErrors.date && <p className="error-message">{formErrors.date}</p>}
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="sessionType">Session Type</label>
              <select
                id="sessionType"
                name="sessionType"
                value={formData.sessionType}
                onChange={handleInputChange}
              >
                <option value="Full Day">Full Day</option>
                <option value="Half Day">Half Day</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="status">Attendance Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
            </FormGroup>
            
            {formData.status === 'present' && (
              <>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <FormGroup style={{ flex: 1 }}>
                    <label htmlFor="checkInTime">Check-in Time</label>
                    <input 
                      type="time"
                      id="checkInTime"
                      name="checkInTime"
                      value={formData.checkInTime}
                      onChange={handleInputChange}
                    />
                    {formErrors.checkInTime && <p className="error-message">{formErrors.checkInTime}</p>}
                  </FormGroup>
                  
                  <FormGroup style={{ flex: 1 }}>
                    <label htmlFor="checkOutTime">Check-out Time</label>
                    <input 
                      type="time"
                      id="checkOutTime"
                      name="checkOutTime"
                      value={formData.checkOutTime}
                      onChange={handleInputChange}
                    />
                    {formErrors.checkOutTime && <p className="error-message">{formErrors.checkOutTime}</p>}
                  </FormGroup>
                </div>
              </>
            )}
            
            <FormGroup>
              <label htmlFor="notes">Notes (Optional)</label>
              <input 
                type="text"
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any additional information..."
              />
            </FormGroup>
            
            <ButtonGroup>
              <Button className="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button className="primary" onClick={handleSubmit}>
                Save
              </Button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};

export default ChildAttendance;


import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdAdd, MdEdit, MdDelete, MdCalendarToday, MdPerson } from 'react-icons/md';
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

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  svg {
    font-size: 1.25rem;
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

const ScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  overflow-x: auto;
`;

const DayColumn = styled.div`
  min-width: 200px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
`;

const ColumnHeader = styled.div`
  background-color: var(--primary-light);
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid var(--medium-gray);
  
  h3 {
    margin: 0;
    font-size: 1rem;
    color: var(--primary-color);
  }
  
  p {
    margin: 0.25rem 0 0 0;
    font-size: 0.9rem;
    color: var(--dark-gray);
  }
`;

const ShiftsList = styled.div`
  padding: 1rem;
  min-height: 300px;
`;

const ShiftCard = styled.div`
  background-color: var(--light-gray);
  border-left: 4px solid var(--primary-color);
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary-color);
    }
  }
  
  p {
    margin: 0.25rem 0;
    font-size: 0.85rem;
    color: var(--dark-gray);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ShiftActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${props => props.delete ? 'var(--danger-color)' : 'var(--text-color)'};
  
  &:hover {
    color: ${props => props.delete ? '#ff0000' : 'var(--primary-color)'};
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

// Generate dates for the current week
const generateWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const dates = [];
  
  // Start from Sunday of the current week
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - dayOfWeek + i);
    dates.push(date);
  }
  
  return dates;
};

// Format date as "Day, DD Mon"
const formatDate = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  
  return `${day}, ${dayOfMonth} ${month}`;
};

// Format date for backend use (YYYY-MM-DD)
const formatDateForBackend = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Mock data for babysitters
const mockBabysitters = [
  { id: 1, name: 'Jane Doe' },
  { id: 2, name: 'Sarah Smith' },
  { id: 3, name: 'Michael Johnson' }
];

// Mock data for schedules
const generateMockSchedules = () => {
  const weekDates = generateWeekDates();
  const schedules = [];
  
  weekDates.forEach(date => {
    const dateString = formatDateForBackend(date);
    
    // Add 1-3 random shifts per day
    const shiftsCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < shiftsCount; i++) {
      const babysitterId = Math.floor(Math.random() * 3) + 1;
      const babysitter = mockBabysitters.find(b => b.id === babysitterId);
      
      schedules.push({
        id: schedules.length + 1,
        date: dateString,
        babysitter: { id: babysitter.id, name: babysitter.name },
        shift: Math.random() > 0.5 ? 'fullDay' : 'halfDay',
        startTime: Math.random() > 0.5 ? '08:00' : '13:00',
        endTime: Math.random() > 0.5 ? '17:00' : '18:00',
        childrenCount: Math.floor(Math.random() * 5) + 1
      });
    }
  });
  
  return schedules;
};

const BabysitterSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weekDates] = useState(generateWeekDates());
  const [filterBabysitter, setFilterBabysitter] = useState('');
  const [filterShift, setFilterShift] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    date: '',
    babysitterId: '',
    shift: 'fullDay',
    startTime: '08:00',
    endTime: '17:00',
    childrenCount: 1
  });
  const [formErrors, setFormErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  
  useEffect(() => {
    // In a real application, you'd fetch data from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setSchedules(generateMockSchedules());
      setLoading(false);
    }, 500);
  }, []);
  
  const handleOpenModal = (date = null) => {
    if (date) {
      setFormData({
        ...formData,
        date: formatDateForBackend(date)
      });
    }
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      id: null,
      date: '',
      babysitterId: '',
      shift: 'fullDay',
      startTime: '08:00',
      endTime: '17:00',
      childrenCount: 1
    });
    setFormErrors({});
    setIsEditMode(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
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
    
    if (!formData.date) {
      errors.date = 'Date is required';
    }
    
    if (!formData.babysitterId) {
      errors.babysitterId = 'Babysitter is required';
    }
    
    if (!formData.shift) {
      errors.shift = 'Shift type is required';
    }
    
    if (!formData.startTime) {
      errors.startTime = 'Start time is required';
    }
    
    if (!formData.endTime) {
      errors.endTime = 'End time is required';
    }
    
    if (formData.childrenCount < 1) {
      errors.childrenCount = 'Children count must be at least 1';
    }
    
    return errors;
  };
  
  const handleSubmit = () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const selectedBabysitter = mockBabysitters.find(b => b.id === parseInt(formData.babysitterId));
    
    const newSchedule = {
      id: isEditMode ? formData.id : schedules.length + 1,
      date: formData.date,
      babysitter: {
        id: parseInt(formData.babysitterId),
        name: selectedBabysitter.name
      },
      shift: formData.shift,
      startTime: formData.startTime,
      endTime: formData.endTime,
      childrenCount: parseInt(formData.childrenCount)
    };
    
    if (isEditMode) {
      setSchedules(schedules.map(schedule => 
        schedule.id === formData.id ? newSchedule : schedule
      ));
      toast.success('Schedule updated successfully');
    } else {
      setSchedules([...schedules, newSchedule]);
      toast.success('Schedule created successfully');
    }
    
    handleCloseModal();
  };
  
  const handleEdit = (schedule) => {
    setFormData({
      id: schedule.id,
      date: schedule.date,
      babysitterId: schedule.babysitter.id.toString(),
      shift: schedule.shift,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      childrenCount: schedule.childrenCount
    });
    setIsEditMode(true);
    setShowModal(true);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(schedules.filter(schedule => schedule.id !== id));
      toast.success('Schedule deleted successfully');
    }
  };
  
  // Filter schedules based on selected filters
  const filteredSchedules = schedules.filter(schedule => {
    return (
      (filterBabysitter ? schedule.babysitter.id === parseInt(filterBabysitter) : true) &&
      (filterShift ? schedule.shift === filterShift : true)
    );
  });
  
  // Group schedules by date
  const schedulesByDate = {};
  
  weekDates.forEach(date => {
    const dateString = formatDateForBackend(date);
    schedulesByDate[dateString] = filteredSchedules.filter(schedule => schedule.date === dateString);
  });
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Babysitter Schedule</h1>
        <ActionButton onClick={() => handleOpenModal()}>
          <MdAdd />
          Add New Schedule
        </ActionButton>
      </PageHeader>
      
      <FiltersContainer>
        <FilterGroup>
          <label htmlFor="babysitter-filter">Babysitter</label>
          <select 
            id="babysitter-filter"
            value={filterBabysitter} 
            onChange={(e) => setFilterBabysitter(e.target.value)}
          >
            <option value="">All Babysitters</option>
            {mockBabysitters.map(babysitter => (
              <option key={babysitter.id} value={babysitter.id}>{babysitter.name}</option>
            ))}
          </select>
        </FilterGroup>
        
        <FilterGroup>
          <label htmlFor="shift-filter">Shift</label>
          <select 
            id="shift-filter"
            value={filterShift} 
            onChange={(e) => setFilterShift(e.target.value)}
          >
            <option value="">All Shifts</option>
            <option value="fullDay">Full Day</option>
            <option value="halfDay">Half Day</option>
          </select>
        </FilterGroup>
      </FiltersContainer>
      
      {loading ? (
        <p>Loading schedules...</p>
      ) : (
        <ScheduleGrid>
          {weekDates.map((date, index) => {
            const dateString = formatDateForBackend(date);
            const formattedDate = formatDate(date);
            const isToday = new Date().toDateString() === date.toDateString();
            
            return (
              <DayColumn key={index}>
                <ColumnHeader style={isToday ? { backgroundColor: 'var(--primary-color)', color: 'white' } : {}}>
                  <h3 style={isToday ? { color: 'white' } : {}}>{formattedDate.split(',')[0]}</h3>
                  <p style={isToday ? { color: 'white' } : {}}>{formattedDate.split(', ')[1]}</p>
                </ColumnHeader>
                <ShiftsList>
                  {schedulesByDate[dateString] && schedulesByDate[dateString].length > 0 ? (
                    schedulesByDate[dateString].map(schedule => (
                      <ShiftCard key={schedule.id}>
                        <h4>
                          <MdPerson />
                          {schedule.babysitter.name}
                        </h4>
                        <p>
                          <MdCalendarToday />
                          {schedule.shift === 'fullDay' ? 'Full Day' : 'Half Day'}
                        </p>
                        <p>Time: {schedule.startTime} - {schedule.endTime}</p>
                        <p>Children: {schedule.childrenCount}</p>
                        <ShiftActions>
                          <IconButton onClick={() => handleEdit(schedule)}>
                            <MdEdit />
                          </IconButton>
                          <IconButton delete onClick={() => handleDelete(schedule.id)}>
                            <MdDelete />
                          </IconButton>
                        </ShiftActions>
                      </ShiftCard>
                    ))
                  ) : (
                    <p style={{ color: 'var(--dark-gray)', textAlign: 'center', fontSize: '0.9rem' }}>
                      No schedules
                    </p>
                  )}
                  <ActionButton
                    onClick={() => handleOpenModal(date)}
                    style={{ 
                      padding: '0.5rem', 
                      width: '100%', 
                      justifyContent: 'center',
                      marginTop: '1rem'
                    }}
                  >
                    <MdAdd />
                    Add
                  </ActionButton>
                </ShiftsList>
              </DayColumn>
            );
          })}
        </ScheduleGrid>
      )}
      
      {showModal && (
        <Modal>
          <ModalContent>
            <h2>{isEditMode ? 'Edit Schedule' : 'Add New Schedule'}</h2>
            
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
              <label htmlFor="babysitterId">Babysitter</label>
              <select
                id="babysitterId"
                name="babysitterId"
                value={formData.babysitterId}
                onChange={handleInputChange}
              >
                <option value="">Select Babysitter</option>
                {mockBabysitters.map(babysitter => (
                  <option key={babysitter.id} value={babysitter.id}>
                    {babysitter.name}
                  </option>
                ))}
              </select>
              {formErrors.babysitterId && <p className="error-message">{formErrors.babysitterId}</p>}
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="shift">Shift Type</label>
              <select
                id="shift"
                name="shift"
                value={formData.shift}
                onChange={handleInputChange}
              >
                <option value="fullDay">Full Day</option>
                <option value="halfDay">Half Day</option>
              </select>
              {formErrors.shift && <p className="error-message">{formErrors.shift}</p>}
            </FormGroup>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <FormGroup style={{ flex: 1 }}>
                <label htmlFor="startTime">Start Time</label>
                <input 
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                />
                {formErrors.startTime && <p className="error-message">{formErrors.startTime}</p>}
              </FormGroup>
              
              <FormGroup style={{ flex: 1 }}>
                <label htmlFor="endTime">End Time</label>
                <input 
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                />
                {formErrors.endTime && <p className="error-message">{formErrors.endTime}</p>}
              </FormGroup>
            </div>
            
            <FormGroup>
              <label htmlFor="childrenCount">Number of Children</label>
              <input 
                type="number"
                id="childrenCount"
                name="childrenCount"
                min="1"
                value={formData.childrenCount}
                onChange={handleInputChange}
              />
              {formErrors.childrenCount && <p className="error-message">{formErrors.childrenCount}</p>}
            </FormGroup>
            
            <ButtonGroup>
              <Button className="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button className="primary" onClick={handleSubmit}>
                {isEditMode ? 'Update' : 'Save'}
              </Button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};

export default BabysitterSchedule;

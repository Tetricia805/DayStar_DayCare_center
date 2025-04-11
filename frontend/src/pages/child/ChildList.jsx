
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdEdit, MdDelete, MdAdd, MdSearch, MdFilterList, MdWarning } from 'react-icons/md';
import { FaChild } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1rem;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  svg {
    font-size: 1.25rem;
  }
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: white;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: var(--light-gray);
  border-radius: var(--border-radius);
  padding: 0 1rem;
  
  svg {
    color: var(--dark-gray);
    margin-right: 0.5rem;
  }
  
  input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 0.75rem 0;
    outline: none;
    font-size: 1rem;
    color: var(--text-color);
    
    &::placeholder {
      color: var(--medium-gray);
    }
  }
`;

const FilterGroup = styled.div`
  min-width: 200px;
  
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--medium-gray);
    border-radius: var(--border-radius);
    background-color: white;
    font-size: 1rem;
    color: var(--text-color);
    outline: none;
    
    &:focus {
      border-color: var(--primary-color);
    }
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  color: var(--text-color);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius);
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: var(--light-gray);
  }
  
  svg {
    color: var(--primary-color);
  }
`;

const ChildrenGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ChildCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
`;

const CardHeader = styled.div`
  background-color: var(--primary-light);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ChildAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 30px;
    color: var(--primary-color);
  }
`;

const ChildInfo = styled.div`
  h3 {
    margin: 0 0 0.25rem 0;
    color: var(--text-color);
  }
  
  p {
    margin: 0;
    color: var(--dark-gray);
    font-size: 0.9rem;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const InfoSection = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    color: var(--text-color);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--light-gray);
  }
  
  p {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary-color);
      font-size: 1.1rem;
    }
  }
`;

const SpecialCare = styled.div`
  background-color: ${props => props.alert ? '#fff8e1' : 'transparent'};
  border-left: ${props => props.alert ? '3px solid var(--warning-color)' : 'none'};
  padding: ${props => props.alert ? '0.5rem' : '0'};
  margin-bottom: 0.5rem;
  
  p {
    margin: 0;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    
    svg {
      color: var(--warning-color);
      margin-top: 0.25rem;
    }
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--light-gray);
`;

const ActionLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--danger-color);
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Mock data for demonstration
const mockChildren = [
  {
    id: 1,
    fullName: 'Emma Thompson',
    age: 3,
    parent: {
      name: 'Sarah Thompson',
      phone: '+256 700 123456',
      relationship: 'Mother'
    },
    sessionType: 'Full Day',
    specialCare: {
      allergies: 'Peanuts, dairy products',
      medicalConditions: '',
      dietaryRestrictions: 'No dairy products',
      additionalNotes: ''
    }
  },
  {
    id: 2,
    fullName: 'Noah Johnson',
    age: 4,
    parent: {
      name: 'Michael Johnson',
      phone: '+256 700 234567',
      relationship: 'Father'
    },
    sessionType: 'Half Day',
    specialCare: {
      allergies: '',
      medicalConditions: 'Mild asthma',
      dietaryRestrictions: '',
      additionalNotes: 'Has an inhaler that should be kept accessible'
    }
  },
  {
    id: 3,
    fullName: 'Oliver Brown',
    age: 2,
    parent: {
      name: 'Jessica Brown',
      phone: '+256 700 345678',
      relationship: 'Mother'
    },
    sessionType: 'Full Day',
    specialCare: {
      allergies: '',
      medicalConditions: '',
      dietaryRestrictions: '',
      additionalNotes: 'Gets anxious when separated from his stuffed bear'
    }
  },
  {
    id: 4,
    fullName: 'Ava Garcia',
    age: 5,
    parent: {
      name: 'Robert Garcia',
      phone: '+256 700 456789',
      relationship: 'Father'
    },
    sessionType: 'Half Day',
    specialCare: {
      allergies: 'Bee stings',
      medicalConditions: '',
      dietaryRestrictions: 'Vegetarian',
      additionalNotes: ''
    }
  }
];

const ChildList = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sessionFilter, setSessionFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  
  useEffect(() => {
    // In a real application, you'd fetch data from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setChildren(mockChildren);
      setLoading(false);
    }, 500);
  }, []);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this child from the system?')) {
      // In a real application, you'd make an API call to delete the child
      setChildren(children.filter(child => child.id !== id));
      toast.success('Child record removed successfully');
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSessionFilter('');
    setAgeFilter('');
  };
  
  // Filter children based on search term and filters
  const filteredChildren = children.filter(child => {
    const matchesSearch = child.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         child.parent.phone.includes(searchTerm);
    
    const matchesSession = sessionFilter ? child.sessionType === sessionFilter : true;
    
    let matchesAge = true;
    if (ageFilter) {
      if (ageFilter === '0-2') {
        matchesAge = child.age >= 0 && child.age <= 2;
      } else if (ageFilter === '3-4') {
        matchesAge = child.age >= 3 && child.age <= 4;
      } else if (ageFilter === '5+') {
        matchesAge = child.age >= 5;
      }
    }
    
    return matchesSearch && matchesSession && matchesAge;
  });
  
  const hasSpecialCare = (child) => {
    return (
      child.specialCare.allergies ||
      child.specialCare.medicalConditions ||
      child.specialCare.dietaryRestrictions
    );
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Children</h1>
        <ActionButton to="/children/register">
          <MdAdd />
          Register New Child
        </ActionButton>
      </PageHeader>
      
      <FilterBar>
        <SearchInput>
          <MdSearch />
          <input 
            type="text" 
            placeholder="Search by name, parent, or phone..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </SearchInput>
        
        <FilterGroup>
          <select 
            value={sessionFilter}
            onChange={(e) => setSessionFilter(e.target.value)}
          >
            <option value="">All Sessions</option>
            <option value="Full Day">Full Day</option>
            <option value="Half Day">Half Day</option>
          </select>
        </FilterGroup>
        
        <FilterGroup>
          <select 
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
          >
            <option value="">All Ages</option>
            <option value="0-2">0-2 years</option>
            <option value="3-4">3-4 years</option>
            <option value="5+">5+ years</option>
          </select>
        </FilterGroup>
        
        <FilterButton onClick={clearFilters}>
          <MdFilterList />
          Clear Filters
        </FilterButton>
      </FilterBar>
      
      {loading ? (
        <p>Loading children records...</p>
      ) : filteredChildren.length > 0 ? (
        <ChildrenGrid>
          {filteredChildren.map(child => (
            <ChildCard key={child.id}>
              <CardHeader>
                <ChildAvatar>
                  <FaChild />
                </ChildAvatar>
                <ChildInfo>
                  <h3>{child.fullName}</h3>
                  <p>{child.age} years old • {child.sessionType}</p>
                </ChildInfo>
              </CardHeader>
              
              <CardBody>
                <InfoSection>
                  <h4>Parent/Guardian Information</h4>
                  <p>{child.parent.name} ({child.parent.relationship})</p>
                  <p>{child.parent.phone}</p>
                </InfoSection>
                
                <InfoSection>
                  <h4>Special Care Needs</h4>
                  {hasSpecialCare(child) ? (
                    <>
                      {child.specialCare.allergies && (
                        <SpecialCare alert>
                          <p>
                            <MdWarning />
                            <span><strong>Allergies:</strong> {child.specialCare.allergies}</span>
                          </p>
                        </SpecialCare>
                      )}
                      
                      {child.specialCare.medicalConditions && (
                        <SpecialCare alert>
                          <p>
                            <MdWarning />
                            <span><strong>Medical Conditions:</strong> {child.specialCare.medicalConditions}</span>
                          </p>
                        </SpecialCare>
                      )}
                      
                      {child.specialCare.dietaryRestrictions && (
                        <SpecialCare alert>
                          <p>
                            <MdWarning />
                            <span><strong>Dietary Restrictions:</strong> {child.specialCare.dietaryRestrictions}</span>
                          </p>
                        </SpecialCare>
                      )}
                    </>
                  ) : (
                    <p>No special care needs</p>
                  )}
                  
                  {child.specialCare.additionalNotes && (
                    <SpecialCare>
                      <p><strong>Notes:</strong> {child.specialCare.additionalNotes}</p>
                    </SpecialCare>
                  )}
                </InfoSection>
              </CardBody>
              
              <CardActions>
                <div>
                  <ActionLink to={`/children/edit/${child.id}`}>
                    <MdEdit />
                    Edit
                  </ActionLink>
                  &nbsp;&nbsp;
                  <ActionLink to={`/children/attendance/${child.id}`}>
                    Attendance
                  </ActionLink>
                </div>
                <DeleteButton onClick={() => handleDelete(child.id)}>
                  <MdDelete />
                  Delete
                </DeleteButton>
              </CardActions>
            </ChildCard>
          ))}
        </ChildrenGrid>
      ) : (
        <p>No children found. Try a different search or register a new child.</p>
      )}
    </PageContainer>
  );
};

export default ChildList;

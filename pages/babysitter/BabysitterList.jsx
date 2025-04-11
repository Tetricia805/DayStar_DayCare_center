
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
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

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  
  input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid var(--medium-gray);
    border-radius: var(--border-radius);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const BabysitterCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BabysitterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--primary-color);
`;

const Details = styled.div`
  flex: 1;
  
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

const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid var(--light-gray);
  padding-top: 1rem;
  
  h4 {
    margin: 0;
    color: var(--text-color);
    font-size: 1rem;
  }
  
  p {
    margin: 0;
    color: var(--dark-gray);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
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
const mockBabysitters = [
  {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+256 700 123456',
    nin: 'CM12345678ABC',
    age: 28,
    nextOfKin: { name: 'John Doe', phone: '+256 701 123456' },
    childrenCount: 5,
    status: 'Active'
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarah.smith@example.com',
    phone: '+256 700 234567',
    nin: 'CM98765432XYZ',
    age: 25,
    nextOfKin: { name: 'James Smith', phone: '+256 701 234567' },
    childrenCount: 3,
    status: 'Active'
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@example.com',
    phone: '+256 700 345678',
    nin: 'CM45678901DEF',
    age: 30,
    nextOfKin: { name: 'Lisa Johnson', phone: '+256 701 345678' },
    childrenCount: 4,
    status: 'Active'
  }
];

const BabysitterList = () => {
  const [babysitters, setBabysitters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, you'd fetch data from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setBabysitters(mockBabysitters);
      setLoading(false);
    }, 500);
  }, []);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredBabysitters = babysitters.filter(babysitter => 
    `${babysitter.firstName} ${babysitter.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    babysitter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    babysitter.phone.includes(searchTerm)
  );
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this babysitter?')) {
      // In a real application, you'd make an API call to delete the babysitter
      setBabysitters(babysitters.filter(b => b.id !== id));
      toast.success('Babysitter removed successfully');
    }
  };
  
  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Babysitters</h1>
        <ActionButton to="/babysitters/register">
          <MdAdd />
          Register New Babysitter
        </ActionButton>
      </PageHeader>
      
      <SearchBar>
        <input 
          type="text" 
          placeholder="Search by name, email or phone..." 
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchBar>
      
      {loading ? (
        <p>Loading babysitters...</p>
      ) : filteredBabysitters.length > 0 ? (
        <CardGrid>
          {filteredBabysitters.map(babysitter => (
            <BabysitterCard key={babysitter.id}>
              <BabysitterInfo>
                <Avatar>{getInitials(babysitter.firstName, babysitter.lastName)}</Avatar>
                <Details>
                  <h3>{babysitter.firstName} {babysitter.lastName}</h3>
                  <p>{babysitter.email}</p>
                  <p>{babysitter.phone}</p>
                </Details>
              </BabysitterInfo>
              
              <CardSection>
                <h4>Basic Information</h4>
                <p>Age: {babysitter.age} years</p>
                <p>NIN: {babysitter.nin}</p>
                <p>Status: {babysitter.status}</p>
              </CardSection>
              
              <CardSection>
                <h4>Next of Kin</h4>
                <p>{babysitter.nextOfKin.name}</p>
                <p>{babysitter.nextOfKin.phone}</p>
              </CardSection>
              
              <CardSection>
                <h4>Assignment</h4>
                <p>Children under care: {babysitter.childrenCount}</p>
              </CardSection>
              
              <CardActions>
                <ActionLink to={`/babysitters/edit/${babysitter.id}`}>
                  <MdEdit /> Edit
                </ActionLink>
                <ActionLink to={`/babysitters/schedule/${babysitter.id}`}>
                  Schedule
                </ActionLink>
                <DeleteButton onClick={() => handleDelete(babysitter.id)}>
                  <MdDelete /> Delete
                </DeleteButton>
              </CardActions>
            </BabysitterCard>
          ))}
        </CardGrid>
      ) : (
        <p>No babysitters found. Try a different search or register a new babysitter.</p>
      )}
    </PageContainer>
  );
};

export default BabysitterList;

import React from 'react';
import styled from 'styled-components';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
  
const Title = styled.h1`
    color: var(--text-color);
`;

const AddButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  
  &:hover {
    background: var(--primary-dark);
  }
`;

const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
    color: var(--dark-gray);
  border-bottom: 2px solid #eee;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
    color: var(--text-color);
`;

const Status = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background: ${props => props.active ? '#E3F2FD' : '#FFEBEE'};
  color: ${props => props.active ? '#1976D2' : '#D32F2F'};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--dark-gray);
  cursor: pointer;
  padding: 0.25rem;
  margin: 0 0.25rem;
  
  &:hover {
    color: ${props => props.delete ? 'var(--danger-color)' : 'var(--primary-color)'};
  }
`;

const BabysitterList = () => {
  const babysitters = [
  {
    id: 1,
      name: 'Jane Smith',
      email: 'jane@daystar.com',
      phone: '(555) 123-4567',
      status: 'Active',
      children: 5
  },
  {
    id: 2,
      name: 'John Doe',
      email: 'john@daystar.com',
      phone: '(555) 234-5678',
      status: 'Active',
      children: 4
  },
  {
    id: 3,
      name: 'Sarah Wilson',
      email: 'sarah@daystar.com',
      phone: '(555) 345-6789',
      status: 'Inactive',
      children: 0
  }
];

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit babysitter:', id);
  };
  
  const handleDelete = (id) => {
    // Implement delete functionality
    console.log('Delete babysitter:', id);
  };
  
  return (
    <Container>
      <Header>
        <Title>Babysitters</Title>
        <AddButton to="/babysitters/register">
          <MdAdd />
          Add Babysitter
        </AddButton>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Status</Th>
            <Th>Assigned Children</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {babysitters.map(babysitter => (
            <tr key={babysitter.id}>
              <Td>{babysitter.name}</Td>
              <Td>{babysitter.email}</Td>
              <Td>{babysitter.phone}</Td>
              <Td>
                <Status active={babysitter.status === 'Active'}>
                  {babysitter.status}
                </Status>
              </Td>
              <Td>{babysitter.children}</Td>
              <Td>
                <ActionButton onClick={() => handleEdit(babysitter.id)}>
                  <MdEdit size={20} />
                </ActionButton>
                <ActionButton delete onClick={() => handleDelete(babysitter.id)}>
                  <MdDelete size={20} />
        </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BabysitterList;

import React, { useState } from 'react';
import styled from 'styled-components';
import { MdWarning, MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--text-color);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2rem;
  
  &:hover {
    background: var(--primary-dark);
  }
`;

const IncidentCard = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const IncidentTitle = styled.h3`
  color: var(--error);
  margin: 0 0 1rem;
`;

const IncidentDescription = styled.p`
  color: var(--text-secondary);
  margin: 0 0 1rem;
  font-size: 0.9rem;
`;

const IncidentDate = styled.span`
  color: var(--text-secondary);
  font-size: 0.8rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--text-color);
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &.primary {
    background: var(--primary);
    color: white;
    border: none;
    
    &:hover {
      background: var(--primary-dark);
    }
  }
  
  &.secondary {
    background: transparent;
    color: var(--text-color);
    border: 1px solid var(--border-color);
    
    &:hover {
      background: var(--hover-bg);
    }
  }
`;

const BabysitterIncidents = () => {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      title: 'Minor Fall',
      description: 'Emma had a minor fall during outdoor play. No injuries, parent notified.',
      date: '2024-03-10'
    },
    {
      id: 2,
      title: 'Allergic Reaction',
      description: 'Liam showed signs of allergic reaction to new snack. Medical attention provided.',
      date: '2024-03-05'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newIncident.title || !newIncident.description) {
      toast.error('Please fill in all fields');
      return;
    }

    const incident = {
      id: incidents.length + 1,
      ...newIncident
    };

    setIncidents([incident, ...incidents]);
    setShowModal(false);
    setNewIncident({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    toast.success('Incident report added successfully');
  };

  return (
    <Container>
      <Title>
        <MdWarning /> Incident Reports
      </Title>
      
      <AddButton onClick={() => setShowModal(true)}>
        <MdAdd /> Add New Incident
      </AddButton>

      {incidents.map(incident => (
        <IncidentCard key={incident.id}>
          <IncidentTitle>{incident.title}</IncidentTitle>
          <IncidentDescription>{incident.description}</IncidentDescription>
          <IncidentDate>Reported on: {incident.date}</IncidentDate>
        </IncidentCard>
      ))}

      {showModal && (
        <Modal>
          <ModalContent>
            <h2>Report New Incident</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  value={newIncident.title}
                  onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                  placeholder="Brief description of the incident"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                  placeholder="Detailed description of what happened"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newIncident.date}
                  onChange={(e) => setNewIncident({...newIncident, date: e.target.value})}
                />
              </FormGroup>
              
              <ButtonGroup>
                <Button 
                  type="button" 
                  className="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="primary">
                  Submit Report
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default BabysitterIncidents; 
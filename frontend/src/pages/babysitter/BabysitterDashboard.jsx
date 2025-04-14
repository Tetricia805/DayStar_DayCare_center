import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaChild, FaMoneyBillWave, FaExclamationTriangle, FaChartLine } from 'react-icons/fa';
import { toast } from 'react-toastify';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
    color: #4a90e2;
  }
`;

const Button = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #357abd;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8f9fa;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 1000;
  max-width: 500px;
  width: 90%;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

const BabysitterDashboard = () => {
  const [babysitter, setBabysitter] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+256 700 123 456',
    nin: 'CM12345678',
    age: 25,
    nextOfKin: {
      name: 'John Doe',
      phone: '+256 700 987 654'
    }
  });

  const [children, setChildren] = useState([
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      age: 3, 
      checkIn: '08:00 AM', 
      checkOut: null,
      sessionType: 'full-day',
      specialNeeds: 'None',
      parentContact: '+256 700 111 222'
    },
    { 
      id: 2, 
      name: 'Michael Brown', 
      age: 4, 
      checkIn: '08:15 AM', 
      checkOut: null,
      sessionType: 'half-day',
      specialNeeds: 'Allergic to peanuts',
      parentContact: '+256 700 333 444'
    },
    { 
      id: 3, 
      name: 'Emma Wilson', 
      age: 2, 
      checkIn: '08:30 AM', 
      checkOut: null,
      sessionType: 'full-day',
      specialNeeds: 'None',
      parentContact: '+256 700 555 666'
    }
  ]);

  const [schedule, setSchedule] = useState([
    { 
      date: '2024-03-20', 
      shift: 'Full Day', 
      startTime: '08:00 AM', 
      endTime: '05:00 PM',
      childrenAssigned: [1, 3]
    },
    { 
      date: '2024-03-21', 
      shift: 'Half Day (Morning)', 
      startTime: '08:00 AM', 
      endTime: '01:00 PM',
      childrenAssigned: [2]
    }
  ]);

  const [payments, setPayments] = useState({
    currentMonth: {
      total: 150000,
      pending: 50000,
      paid: 100000,
      breakdown: {
        fullDay: 100000,
        halfDay: 50000
      }
    },
    lastPayment: {
      date: '2024-03-15',
      amount: 50000
    },
    paymentHistory: [
      { date: '2024-03-15', amount: 50000, status: 'paid' },
      { date: '2024-02-15', amount: 45000, status: 'paid' }
    ]
  });

  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [incidentReport, setIncidentReport] = useState({
    type: '',
    description: '',
    severity: 'low',
    actionTaken: ''
  });

  const calculateDailyPayment = (childrenList) => {
    return childrenList.reduce((total, child) => {
      const rate = child.sessionType === 'full-day' ? 5000 : 2000;
      return total + rate;
    }, 0);
  };

  const handleCheckOut = (childId) => {
    setChildren(children.map(child => 
      child.id === childId 
        ? { ...child, checkOut: new Date().toLocaleTimeString() }
        : child
    ));
    toast.success('Check-out recorded successfully');
  };

  const handleReportIncident = (childId) => {
    setSelectedChild(childId);
    setShowIncidentModal(true);
  };

  const submitIncidentReport = (e) => {
    e.preventDefault();
    // In a real application, this would send the report to the backend
    toast.success('Incident report submitted successfully');
    setShowIncidentModal(false);
    setIncidentReport({
      type: '',
      description: '',
      severity: 'low',
      actionTaken: ''
    });
  };

  const validateBabysitterAge = (age) => {
    return age >= 21 && age <= 35;
  };

  useEffect(() => {
    if (!validateBabysitterAge(babysitter.age)) {
      toast.error('Babysitter age must be between 21 and 35 years');
    }
  }, [babysitter.age]);

  return (
    <DashboardContainer>
      <Header>
        <h1>Babysitter Dashboard</h1>
        <Button onClick={() => toast.info('Profile edit feature coming soon')}>
          Edit Profile
        </Button>
      </Header>

      <ProfileSection>
        <h2>Profile Information</h2>
        <GridContainer>
          <div>
            <p><strong>Name:</strong> {babysitter.firstName} {babysitter.lastName}</p>
            <p><strong>Email:</strong> {babysitter.email}</p>
            <p><strong>Phone:</strong> {babysitter.phone}</p>
            <p><strong>Age:</strong> {babysitter.age} years</p>
          </div>
          <div>
            <p><strong>NIN:</strong> {babysitter.nin}</p>
            <p><strong>Next of Kin:</strong> {babysitter.nextOfKin.name}</p>
            <p><strong>Next of Kin Phone:</strong> {babysitter.nextOfKin.phone}</p>
          </div>
        </GridContainer>
      </ProfileSection>

      <GridContainer>
        <Card>
          <CardHeader>
            <FaCalendarAlt />
            <h3>Today's Schedule</h3>
          </CardHeader>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Shift</th>
                <th>Time</th>
                <th>Children</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((slot, index) => (
                <tr key={index}>
                  <td>{new Date(slot.date).toLocaleDateString()}</td>
                  <td>{slot.shift}</td>
                  <td>{slot.startTime} - {slot.endTime}</td>
                  <td>{slot.childrenAssigned.length} children</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Card>
          <CardHeader>
            <FaChild />
            <h3>Children Under Care</h3>
          </CardHeader>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Session</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Special Needs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {children.map(child => (
                <tr key={child.id}>
                  <td>{child.name}</td>
                  <td>{child.sessionType}</td>
                  <td>{child.checkIn}</td>
                  <td>{child.checkOut || '-'}</td>
                  <td>{child.specialNeeds}</td>
                  <td>
                    {!child.checkOut && (
                      <>
                        <Button onClick={() => handleCheckOut(child.id)}>Check Out</Button>
                        <Button onClick={() => handleReportIncident(child.id)}>Report Incident</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Card>
          <CardHeader>
            <FaMoneyBillWave />
            <h3>Payment Information</h3>
          </CardHeader>
          <div>
            <p><strong>Current Month Total:</strong> {payments.currentMonth.total} UGX</p>
            <p><strong>Pending Payment:</strong> {payments.currentMonth.pending} UGX</p>
            <p><strong>Last Payment:</strong> {payments.lastPayment.amount} UGX on {payments.lastPayment.date}</p>
            <h4>Payment Breakdown</h4>
            <p>Full Day Sessions: {payments.currentMonth.breakdown.fullDay} UGX</p>
            <p>Half Day Sessions: {payments.currentMonth.breakdown.halfDay} UGX</p>
            <h4>Today's Expected Payment</h4>
            <p>{calculateDailyPayment(children)} UGX</p>
          </div>
        </Card>
      </GridContainer>

      {showIncidentModal && (
        <>
          <ModalOverlay onClick={() => setShowIncidentModal(false)} />
          <Modal>
            <h3>Report Incident</h3>
            <Form onSubmit={submitIncidentReport}>
              <div>
                <label>Incident Type:</label>
                <Input
                  type="text"
                  value={incidentReport.type}
                  onChange={(e) => setIncidentReport({...incidentReport, type: e.target.value})}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <TextArea
                  value={incidentReport.description}
                  onChange={(e) => setIncidentReport({...incidentReport, description: e.target.value})}
                  required
                />
              </div>
              <div>
                <label>Severity:</label>
                <select
                  value={incidentReport.severity}
                  onChange={(e) => setIncidentReport({...incidentReport, severity: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label>Action Taken:</label>
                <TextArea
                  value={incidentReport.actionTaken}
                  onChange={(e) => setIncidentReport({...incidentReport, actionTaken: e.target.value})}
                  required
                />
              </div>
              <Button type="submit">Submit Report</Button>
            </Form>
          </Modal>
        </>
      )}
    </DashboardContainer>
  );
};

export default BabysitterDashboard; 
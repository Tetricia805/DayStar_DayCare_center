import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdChildCare, MdSecurity, MdPayment, MdAssignment, MdPerson, MdAttachMoney, MdWarning, MdCalendarToday, MdPersonAdd, MdLogin } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';

const LandingContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Roboto', sans-serif;
`;

const Hero = styled.div`
  background-color: var(--primary-color);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &.primary {
    background-color: white;
    color: var(--primary-color);
    
    &:hover {
      background-color: #f0f0f0;
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: white;
    border: 1px solid white;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-color);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    margin: 1.5rem 0 1rem;
    color: var(--text-color);
  }
  
  p {
    color: var(--dark-gray);
    line-height: 1.6;
  }
`;

const FeatureLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  
  svg {
    font-size: 35px;
    color: var(--primary-color);
  }
`;

const Footer = styled.footer`
  background-color: var(--primary-dark);
  color: white;
  padding: 3rem 2rem;
  text-align: center;
  
  p {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: white;
    text-decoration: underline;
    
    &:hover {
      color: var(--primary-light);
    }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  img {
    height: 40px;
  }
  
  h1 {
    margin: 0;
    color: var(--primary-color);
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const AuthButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.primary ? 'var(--primary-color)' : 'white'};
  color: ${props => props.primary ? 'white' : 'var(--primary-color)'};
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.primary ? 'var(--primary-dark)' : 'var(--primary-light)'};
  }
`;

const BabysitterCard = styled.div`
  background: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BabysitterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    h3 {
      margin: 0;
      color: var(--text-color);
    }

    p {
      margin: 0.25rem 0 0 0;
      color: var(--dark-gray);
      font-size: 0.9rem;
    }
  }
`;

const BabysitterRate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--light-gray);

  .rate {
    font-size: 1.2rem;
    color: var(--primary-color);
    font-weight: bold;
  }

  .availability {
    color: var(--success-color);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const BookButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
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

const BabysittersSection = styled.section`
  padding: 4rem 2rem;
  background-color: var(--light-gray);
  text-align: center;

  h2 {
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  p {
    color: var(--dark-gray);
    margin-bottom: 2rem;
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: white;
  color: var(--primary-color);
  border-radius: var(--border-radius);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-light);
  }
`;

const Features = styled.section`
  padding: 4rem 2rem;
  text-align: center;

  h2 {
    color: var(--text-color);
    margin-bottom: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

// Mock data for available babysitters
const availableBabysitters = [
  {
    id: 1,
    name: 'Sarah Johnson',
    experience: '5 years',
    rate: '15,000 UGX/hour',
    image: '/babysitter1.jpg',
    available: true
  },
  {
    id: 2,
    name: 'Emily Brown',
    experience: '3 years',
    rate: '12,000 UGX/hour',
    image: '/babysitter2.jpg',
    available: true
  },
  {
    id: 3,
    name: 'Michael Smith',
    experience: '4 years',
    rate: '14,000 UGX/hour',
    image: '/babysitter3.jpg',
    available: true
  }
];

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFeatureClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate('/login', { state: { from: path } });
    }
  };

  return (
    <>
      <Header>
        <Logo>
          <img src="/logo-placeholder.png" alt="Daystar Daycare" />
          <h1>Daystar Daycare</h1>
        </Logo>
        {user ? (
          <AuthButton to="/dashboard">Go to Dashboard</AuthButton>
        ) : (
          <AuthButtons>
            <AuthButton to="/login">
              <MdLogin /> Sign In
            </AuthButton>
            <AuthButton primary to="/register">
              <MdPersonAdd /> Create Account
            </AuthButton>
          </AuthButtons>
        )}
      </Header>

      <Hero>
        <HeroContent>
          <h1>Welcome to Daystar Daycare</h1>
          <p>Your trusted partner in childcare and early education</p>
          {user ? (
            <HeroButton to="/dashboard">Go to Dashboard</HeroButton>
          ) : (
            <HeroButton to="/register">Get Started</HeroButton>
          )}
        </HeroContent>
      </Hero>

      <Features>
        <h2>Our Services</h2>
        <FeaturesGrid>
          <FeatureCard onClick={() => handleFeatureClick('/dashboard/children')}>
            <MdChildCare />
            <h3>Child Management</h3>
            <p>Track attendance, health records, and development milestones</p>
          </FeatureCard>
          <FeatureCard onClick={() => handleFeatureClick('/dashboard/babysitters')}>
            <MdPerson />
            <h3>Babysitter Management</h3>
            <p>Manage schedules, track performance, and handle payments</p>
          </FeatureCard>
          <FeatureCard onClick={() => handleFeatureClick('/dashboard/finance')}>
            <MdAttachMoney />
            <h3>Financial Management</h3>
            <p>Track income, expenses, and generate financial reports</p>
          </FeatureCard>
          <FeatureCard onClick={() => handleFeatureClick('/dashboard/incidents')}>
            <MdWarning />
            <h3>Incident Reporting</h3>
            <p>Report and track incidents with detailed documentation</p>
          </FeatureCard>
        </FeaturesGrid>
      </Features>

      <BabysittersSection>
        <h2>Available Babysitters</h2>
        <p>Book a qualified babysitter for your needs</p>
        <FeaturesGrid>
          {availableBabysitters.map(babysitter => (
            <BabysitterCard key={babysitter.id}>
              <BabysitterInfo>
                <img src={babysitter.image} alt={babysitter.name} />
                <div>
                  <h3>{babysitter.name}</h3>
                  <p>{babysitter.experience} experience</p>
                </div>
              </BabysitterInfo>
              <BabysitterRate>
                <span className="rate">{babysitter.rate}</span>
                <span className="availability">
                  <MdCalendarToday />
                  Available Now
                </span>
              </BabysitterRate>
              <BookButton to="/register">
                Book Now
              </BookButton>
            </BabysitterCard>
          ))}
        </FeaturesGrid>
      </BabysittersSection>

      <Footer>
        <p>&copy; 2024 Daystar Daycare. All rights reserved.</p>
      </Footer>
    </>
  );
};

export default LandingPage;

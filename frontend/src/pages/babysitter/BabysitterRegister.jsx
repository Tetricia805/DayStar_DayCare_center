import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--dark-gray);
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--medium-gray);
    border-radius: var(--border-radius);
    font-size: 16px;
    transition: var(--transition);
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(74, 109, 167, 0.2);
    }
  }
  
  .error-message {
    color: var(--danger-color);
    font-size: 14px;
    margin-top: 0.25rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &.btn-primary {
    background-color: var(--primary-color);
    color: white;
    
    &:hover {
      background-color: #3a5b8a;
    }
  }
  
  &.btn-secondary {
    background-color: var(--medium-gray);
    color: var(--text-color);
    
    &:hover {
      background-color: var(--dark-gray);
      color: white;
    }
  }
  
  &:disabled {
    background-color: var(--medium-gray);
    cursor: not-allowed;
  }
`;

const BabysitterRegister = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Make API call to backend
      const response = await axios.post('http://localhost:5000/api/babysitters', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email || null, // Handle optional email
        phoneNumber: data.phone,
        nin: data.nin,
        dateOfBirth: data.dob,
        nextOfKinName: data.kinName,
        nextOfKinPhone: data.kinPhone,
        nextOfKinRelationship: data.kinRelationship
      });

      toast.success('Babysitter registered successfully!');
      reset(); // Reset form
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Failed to register babysitter. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <FormHeader>
        <h1>Register New Babysitter</h1>
        <p>Fill in the details to register a new babysitter</p>
      </FormHeader>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGrid>
          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              {...register('firstName', { 
                required: 'First name is required'
              })}
            />
            {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              {...register('lastName', { 
                required: 'Last name is required'
              })}
            />
            {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="email">Email Address (Optional)</label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format'
                }
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be 10 digits'
                }
              })}
            />
            {errors.phone && <p className="error-message">{errors.phone.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="nin">National Identification Number (NIN)</label>
            <input
              id="nin"
              type="text"
              {...register('nin', { 
                required: 'NIN is required'
              })}
            />
            {errors.nin && <p className="error-message">{errors.nin.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              type="date"
              {...register('dob', { 
                required: 'Date of birth is required',
                validate: {
                  ageValidation: value => {
                    const birthDate = new Date(value);
                    const today = new Date();
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                      age--;
                    }
                    return (age >= 21 && age <= 35) || 'Age must be between 21 and 35 years';
                  }
                }
              })}
            />
            {errors.dob && <p className="error-message">{errors.dob.message}</p>}
          </FormGroup>
        </FormGrid>
        
        <h2>Next of Kin Information</h2>
        
        <FormGrid>
          <FormGroup>
            <label htmlFor="kinName">Next of Kin Name</label>
            <input
              id="kinName"
              type="text"
              {...register('kinName', { 
                required: 'Next of kin name is required'
              })}
            />
            {errors.kinName && <p className="error-message">{errors.kinName.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="kinPhone">Next of Kin Phone</label>
            <input
              id="kinPhone"
              type="tel"
              {...register('kinPhone', { 
                required: 'Next of kin phone is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be 10 digits'
                }
              })}
            />
            {errors.kinPhone && <p className="error-message">{errors.kinPhone.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="kinRelationship">Relationship</label>
            <input
              id="kinRelationship"
              type="text"
              {...register('kinRelationship', { 
                required: 'Relationship is required'
              })}
            />
            {errors.kinRelationship && <p className="error-message">{errors.kinRelationship.message}</p>}
          </FormGroup>
        </FormGrid>
        
        <ButtonContainer>
          <Button 
            type="button" 
            className="btn-secondary"
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register Babysitter'}
          </Button>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default BabysitterRegister;

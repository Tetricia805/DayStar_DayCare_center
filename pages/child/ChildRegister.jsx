
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';

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
  
  input, select, textarea {
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
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  .error-message {
    color: var(--danger-color);
    font-size: 14px;
    margin-top: 0.25rem;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
  
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    
    input {
      margin-right: 0.5rem;
      width: auto;
    }
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

const ChildRegister = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // This would be an API call in production
      console.log('Form data submitted:', data);
      
      // Mock successful registration
      setTimeout(() => {
        toast.success('Child registered successfully!');
        reset();
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to register child. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <FormHeader>
        <h1>Register New Child</h1>
        <p>Fill in the details to enroll a new child</p>
      </FormHeader>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Child Information</h2>
        
        <FormGrid>
          <FormGroup>
            <label htmlFor="fullName">Child's Full Name</label>
            <input
              id="fullName"
              type="text"
              {...register('fullName', { 
                required: 'Child\'s full name is required'
              })}
            />
            {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="age">Child's Age (in years)</label>
            <input
              id="age"
              type="number"
              {...register('age', { 
                required: 'Age is required',
                min: { value: 0, message: 'Age must be 0 or higher' },
                max: { value: 12, message: 'Age must be 12 or lower' }
              })}
            />
            {errors.age && <p className="error-message">{errors.age.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="sessionType">Session Type</label>
            <RadioGroup>
              <label>
                <input
                  type="radio"
                  value="halfDay"
                  {...register('sessionType', { required: 'Session type is required' })}
                />
                Half-day (4 hours)
              </label>
              <label>
                <input
                  type="radio"
                  value="fullDay"
                  {...register('sessionType', { required: 'Session type is required' })}
                />
                Full-day (8 hours)
              </label>
            </RadioGroup>
            {errors.sessionType && <p className="error-message">{errors.sessionType.message}</p>}
          </FormGroup>
        </FormGrid>
        
        <h2>Parent/Guardian Information</h2>
        
        <FormGrid>
          <FormGroup>
            <label htmlFor="parentName">Parent/Guardian Full Name</label>
            <input
              id="parentName"
              type="text"
              {...register('parentName', { 
                required: 'Parent/Guardian name is required'
              })}
            />
            {errors.parentName && <p className="error-message">{errors.parentName.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="parentPhone">Parent/Guardian Phone Number</label>
            <input
              id="parentPhone"
              type="tel"
              {...register('parentPhone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be 10 digits'
                }
              })}
            />
            {errors.parentPhone && <p className="error-message">{errors.parentPhone.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="alternateContact">Alternate Contact Person & Number</label>
            <input
              id="alternateContact"
              type="text"
              {...register('alternateContact', { 
                required: 'Alternate contact is required'
              })}
            />
            {errors.alternateContact && <p className="error-message">{errors.alternateContact.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="relationship">Relationship to Child</label>
            <input
              id="relationship"
              type="text"
              {...register('relationship', { 
                required: 'Relationship is required'
              })}
            />
            {errors.relationship && <p className="error-message">{errors.relationship.message}</p>}
          </FormGroup>
        </FormGrid>
        
        <h2>Special Care Needs</h2>
        
        <FormGrid>
          <FormGroup>
            <label htmlFor="allergies">Allergies (if any)</label>
            <textarea
              id="allergies"
              {...register('allergies')}
              placeholder="List any allergies here..."
            ></textarea>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="medicalConditions">Medical Conditions (if any)</label>
            <textarea
              id="medicalConditions"
              {...register('medicalConditions')}
              placeholder="List any medical conditions here..."
            ></textarea>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="dietaryRestrictions">Dietary Restrictions (if any)</label>
            <textarea
              id="dietaryRestrictions"
              {...register('dietaryRestrictions')}
              placeholder="List any dietary restrictions here..."
            ></textarea>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="additionalNotes">Additional Notes</label>
            <textarea
              id="additionalNotes"
              {...register('additionalNotes')}
              placeholder="Any other information we should know..."
            ></textarea>
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
            {loading ? 'Registering...' : 'Register Child'}
          </Button>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default ChildRegister;

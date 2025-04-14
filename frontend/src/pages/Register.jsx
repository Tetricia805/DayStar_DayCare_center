import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--light-gray);
`;

const RegisterCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  width: 100%;
  max-width: 450px;
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--dark-gray);
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
  
  input {
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
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--medium-gray);
    cursor: not-allowed;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Register = () => {
  const { register: registerForm, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (data.password !== data.confirmPassword) {
        toast.error('Passwords do not match.');
        setLoading(false);
        return;
      }
      
      const result = await register({
        name: data.name,
        email: data.email,
        password: data.password
      });
      
      if (result.success) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        toast.error(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterHeader>
          <h1>Daystar Daycare</h1>
          <p>Create a new account</p>
        </RegisterHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              {...registerForm('name', { 
                required: 'Full name is required'
              })}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...registerForm('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format'
                }
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...registerForm('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...registerForm('confirmPassword', { 
                required: 'Please confirm your password'
              })}
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
          </FormGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>
        
        <LoginLink>
          Already have an account? <Link to="/login">Login here</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;

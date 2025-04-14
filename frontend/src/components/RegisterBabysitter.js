import React, { useState } from 'react';
import axios from 'axios';

const RegisterBabysitter = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    nin: '',
    dateOfBirth: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    nextOfKinRelationship: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/babysitters', formData);
      setMessage('Babysitter registered successfully!');
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        nin: '',
        dateOfBirth: '',
        nextOfKinName: '',
        nextOfKinPhone: '',
        nextOfKinRelationship: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Error registering babysitter');
    }
  };

  return (
    <div className="register-babysitter">
      <h2>Register New Babysitter</h2>
      <p>Fill in the details to register a new babysitter</p>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address (Optional)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nin">National Identification Number (NIN)</label>
          <input
            type="text"
            id="nin"
            name="nin"
            value={formData.nin}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <h3>Next of Kin Information</h3>

        <div className="form-group">
          <label htmlFor="nextOfKinName">Next of Kin Name</label>
          <input
            type="text"
            id="nextOfKinName"
            name="nextOfKinName"
            value={formData.nextOfKinName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nextOfKinPhone">Next of Kin Phone</label>
          <input
            type="tel"
            id="nextOfKinPhone"
            name="nextOfKinPhone"
            value={formData.nextOfKinPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nextOfKinRelationship">Relationship</label>
          <input
            type="text"
            id="nextOfKinRelationship"
            name="nextOfKinRelationship"
            value={formData.nextOfKinRelationship}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Register Babysitter</button>
      </form>
    </div>
  );
};

export default RegisterBabysitter; 
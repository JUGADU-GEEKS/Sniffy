import React, { useState } from 'react';
import { User, Mail, Phone, Settings, Flame } from 'lucide-react';
import '../App.css';

const Registration = ({ onRegister, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deviceId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.deviceId) {
      alert('Please fill in all fields');
      return;
    }
    onRegister(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="page registration-page">
      <div className="fire-background">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="fire-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }} />
        ))}
      </div>
      
      <div className="registration-container">
        <div className="registration-header">
          <Flame size={48} className="header-flame" />
          <h1>Smart LPG Safety System</h1>
          <p>Register your device for enhanced fire safety monitoring</p>
        </div>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <User size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <Mail size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <Phone size={20} />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <Settings size={20} />
            <input
              type="text"
              name="deviceId"
              placeholder="Device ID"
              value={formData.deviceId}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="register-btn">
            Register Device
          </button>

          <div className="form-footer">
            <p className="switch-form-text">
              Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration; 
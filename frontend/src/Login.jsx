import React, { useState } from 'react';
import { Mail, Lock, Flame } from 'lucide-react';
import './App.css';

const Login = ({ onLogin, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    onLogin(formData);
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
          <p>Login to access your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="registration-form">
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
            <Lock size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="register-btn">
            Login
          </button>

          <div className="form-footer">
            <p className="switch-form-text">
              Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>Register here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 
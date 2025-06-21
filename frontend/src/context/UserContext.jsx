import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (formData) => {
    setIsLoading(true);
    try {
      const { deviceId, email, phone, password } = formData;
      const response = await axios.post('/api/user/register', {
        deviceCode: deviceId,
        email,
        phone,
        password
      });

      if (response.data.success) {
        // Automatically log in user after registration
        await handleLogin({ email, password });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        alert(`Registration failed: ${error.response.data.message || 'Server responded with an error.'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request:', error.request);
        alert('Registration failed: No response from server. Is the backend running?');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
        alert(`Registration failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/user/login', formData);
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        alert(`Login failed: ${error.response.data.message || 'Server responded with an error.'}`);
      } else if (error.request) {
        console.error('Request:', error.request);
        alert('Login failed: No response from server. Is the backend running?');
      } else {
        console.error('Error', error.message);
        alert(`Login failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoading,
      handleRegistration,
      handleLogin,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}; 
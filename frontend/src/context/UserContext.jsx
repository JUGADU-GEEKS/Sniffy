import React, { createContext, useContext, useState } from 'react';

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

  const handleRegistration = (formData) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(formData);
      setIsLoading(false);
    }, 2000);
  };

  const handleLogin = (formData) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({
        name: 'Demo User',
        email: formData.email
      });
      setIsLoading(false);
    }, 2000);
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
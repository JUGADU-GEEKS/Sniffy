import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Preloader from './Preloader';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 
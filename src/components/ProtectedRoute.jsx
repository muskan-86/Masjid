import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth(); 
  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }
  return children; 
};

export default ProtectedRoute;

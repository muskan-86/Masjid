import React, { useEffect } from 'react';
import { SignIn, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isSignedIn } = useAuth(); // Get the sign-in state
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/admin-panel'); // Redirect to sidebar after login
    }
  }, [isSignedIn, navigate]); // Runs whenever `isSignedIn` changes

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {/* Render Clerk's sign-in form */}
        <SignIn />
      </div>
    </div>
  );
};
export default Login;

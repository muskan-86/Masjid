// AdminLogin.jsx
import React, { useState } from 'react';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

const AdminLogin = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin(); // Notify parent component of successful login
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div id="admin-login"className="fixed inset-0 flex items-center justify-center bg-black bg-w-full bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="admin-username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="admin-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="admin-password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Login</button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;

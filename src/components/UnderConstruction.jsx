import React from 'react';
import { Link } from 'react-router-dom';

const UnderConstruction = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 font-noto-sans">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">This page is under construction</h1>
        <p className="text-lg">
       <Link to="/" className="text-mediumseagreen-300 hover:underline">Go to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;

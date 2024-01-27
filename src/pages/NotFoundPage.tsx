import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-4xl font-bold">404 - Not Found</h1>
      <button
        onClick={navigateToHome}
        className="px-6 py-3 font-semibold text-white transition duration-300 ease-in-out bg-blue-500 rounded hover:bg-blue-600"
      >
        Go back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;

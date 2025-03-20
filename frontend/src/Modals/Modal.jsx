import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};



export const LoginPromptModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      {/* Title */}
      <h2 className="text-2xl font-bold text-center mb-6">Login Required</h2>

      {/* Message */}
      <p className="text-gray-600 text-center mb-8">
        You need to log in to view all details.
      </p>

      {/* Buttons Container */}
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleLoginRedirect}
          className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
        >
          Log In
        </button>
        <button
          onClick={onClose}
          className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-gray-500 text-white text-lg font-bold"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
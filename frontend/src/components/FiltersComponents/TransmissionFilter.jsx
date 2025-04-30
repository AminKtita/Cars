// TransmissionFilter.jsx
import React from 'react';

export const TransmissionFilter = ({ selectedTransmissions, handleTransmissionSelect }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mt-6 bg-white shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">TRANSMISSION</h3>
      <div className="flex gap-3">
        {['Manual', 'Auto'].map((transmission) => (
          <button
            key={transmission}
            className={`w-full px-4 py-2 border-2 rounded-md text-sm font-medium transition-colors duration-200
              ${
                selectedTransmissions.includes(transmission)
                  ? 'border-red-600 bg-red-50 text-red-900'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-red-500'
              }`}
            onClick={() => handleTransmissionSelect(transmission)}
          >
            {transmission}
          </button>
        ))}
      </div>
    </div>
  );
};
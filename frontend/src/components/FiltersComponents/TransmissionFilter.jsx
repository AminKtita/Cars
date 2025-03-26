import React from 'react';

export const TransmissionFilter = ({ selectedTransmissions, handleTransmissionSelect }) => {
  return (
    <div className='border border-gray-300 px-2 py-3 mt-6'>
      <p className='mb-3 text-sm font-medium text-center'>TRANSMISSION</p>
      <div className='flex gap-2'>
        {['Manual', 'Auto'].map((transmission) => (
          <button
            key={transmission}
            className={`w-1/2 p-2 border ${
              selectedTransmissions.includes(transmission) ? 'border-blue-500' : 'border-gray-300'
            } rounded`}
            onClick={() => handleTransmissionSelect(transmission)}
          >
            {transmission}
          </button>
        ))}
      </div>
    </div>
  );
};
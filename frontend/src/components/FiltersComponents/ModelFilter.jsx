import React from 'react';

export const ModelFilter = ({ models, selectedModel, setSelectedModel }) => {
  return (
    <div className='border border-gray-300 px-2 py-3 mt-6'>
      <p className='mb-3 text-sm font-medium text-center'>MODEL</p>
      <select
        className='w-full p-2 border border-gray-300 rounded'
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        <option value=''>All Models</option>
        {models.map((model, index) => (
          <option key={index} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};
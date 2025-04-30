import React from 'react';

export const ModelFilter = ({ models, selectedModel, setSelectedModel }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mt-6 bg-white shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">MODEL</h3>
      <div className="relative group-select">
        <select
          className="w-full px-4 py-2.5 pr-8 border border-gray-300 rounded-md text-sm 
                     focus:ring-2 focus:ring-red-600 focus:border-red-600
                     appearance-none bg-no-repeat"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="" className="text-gray-400">All Models</option>
          {models.map((model, index) => (
            <option 
              key={index} 
              value={model}
              className="text-gray-700 hover:bg-red-300 focus:bg-red-300"
            >
              {model}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-red-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { assets } from '../assets/assets';

export const ViewSelector = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md">
      <button 
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'grid' 
            ? 'bg-white border-2 border-red-600 shadow-sm' 
            : 'hover:bg-gray-50'
        }`}
        title="Grid view"
      >
        <img 
          src={assets.grid_icon} 
          alt="Grid view" 
          className={`w-4 h-4 ${viewMode === 'grid' ? 'opacity-100' : 'opacity-50'}`}
        />
      </button>
      <button 
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'list' 
            ? 'bg-white border-2 border-red-600 shadow-sm' 
            : 'hover:bg-gray-50'
        }`}
        title="List view"
      >
        <img 
          src={assets.list_icon} 
          alt="List view" 
          className={`w-4 h-4 ${viewMode === 'list' ? 'opacity-100' : 'opacity-50'}`}
        />
      </button>
    </div>
  );
};
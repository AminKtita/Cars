import React from 'react';
import { assets } from '../assets/assets';

export const ViewSelector = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center gap-2 mr-4">
      <button 
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Grid view"
      >
        <img 
          src={assets.grid_icon} 
          alt="Grid view" 
          className="w-4 h-4 opacity-75"
        />
      </button>
      <button 
        onClick={() => setViewMode('list')}
        className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="List view"

      >
        <img 
          src={assets.list_icon} 
          alt="List view" 
          className="w-4 h-4 opacity-75"
        />
      </button>
    </div>
  );
};
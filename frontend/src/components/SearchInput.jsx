// components/SearchInput.js
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

export const SearchInput = () => {
  const { search, setSearch } = useContext(AppContext);

  return (
    <div className="mb-4">
      <div className="relative">
        <input
          type="search"
          className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full 
                     focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500
                     [-webkit-appearance:none] [-moz-appearance:textfield]"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <img 
                src={assets.cross_icon} 
                className="w-3 h-3 text-red-500" 
                alt="Clear" 
              />
            </button>
          )}
          <img 
            src={assets.search_icon} 
            className="w-4 h-4 text-gray-400" 
            alt="Search" 
          />
        </div>
      </div>
    </div>
  );
};
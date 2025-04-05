import React, { useState, useEffect } from 'react';
import { SavedFilterCard } from '../components/SavedFilterCard';
import { getFilterPresets } from '../services/api';
import { Title } from '../components/Title';


export const SavedFiltersPage = () => {
  const [savedFilters, setSavedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const filters = await getFilterPresets();
        setSavedFilters(filters);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, []);

  if (loading) return <div className="p-4 text-gray-600">Loading saved filters...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Title text1="Saved" text2="Filters" />
      </div>      
      {savedFilters.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No saved filters found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {savedFilters.map(filter => (
            <SavedFilterCard key={filter._id} filter={filter} />
          ))}
        </div>
      )}
    </div>
  );
};
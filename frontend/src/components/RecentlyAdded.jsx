import React, { useEffect, useState } from 'react';
import { Title } from './Title';
import { getCars } from '../services/api';
import { CarItem } from './CarItem';

export const RecentlyAdded = () => {
  const [latestCars, setLatestCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cars data
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars(); // Fetch all cars
        
        setLatestCars(data.slice(-10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (loading) {
    return <div className="flex flex-col items-center justify-center gap-2 min-h-[200px]">
    {/* Spinner */}
    <div
      className="w-12 h-12 rounded-full animate-spin
      border-2 border-solid border-current border-t-transparent"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>;
  }

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'Recently'} text2={'Added'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestCars.map((item) => (
          <CarItem
            key={item._id}
            id={item._id}
            name={item.vehicle_title}
            price={item.price}
            image={item.images}
            brand={item.brand_name}
            model={item.model_name}
          />
        ))}
      </div>
    </div>
  );
};
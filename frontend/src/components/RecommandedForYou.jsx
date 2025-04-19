import React, { useEffect, useState } from 'react';
import { Title } from './Title';
import { getRecommendations ,getCarById} from '../services/api';
import { CarItem } from './CarItem';


export const RecommandedForYou = () => {
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [recommendations, setRecommendations] = useState([]);

      useEffect(() => {
        const fetchRecommendations = async () => {
          try {
            // First get the recommendation IDs
            const recommendationData = await getRecommendations();
            
            // Then fetch details for each recommended car
            const carsPromises = recommendationData.recommended_cars.map(async (carId) => {
              try {
                return await getCarById(carId);
              } catch (err) {
                console.error(`Failed to fetch car ${carId}:`, err);
                return null; // Handle individual errors but keep other results
              }
            });
    
            // Wait for all car details to load
            const cars = await Promise.all(carsPromises);
            
            // Filter out any null values from failed fetches
            setRecommendations(cars.filter(car => car !== null));
    
          } catch (err) {
            console.error('Failed to load recommendations:', err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchRecommendations();
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
    <div className='mt-10 px-4 sm:px-4 md:px-6 lg:px-8'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'Recommended'} text2={'For You'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {recommendations.map((item) => (
          <CarItem
            key={item._id}
            id={item._id}
            name={item.vehicle_title}
            price={item.price}
            image={item.images}
            brand={item.brand_name}
            model={item.model_name}
            fuel={item.fuel_type}
            year={item.year}
            mileage={item.mileage}
            gearbox={item.gearbox_type}
    
          />
        ))}
      </div>
    </div>  )
}

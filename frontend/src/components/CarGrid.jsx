import React from 'react';
import { CarItem } from './CarItem';

export const CarGrid = ({ filterProducts }) => {
  return (
   <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
      {filterProducts.map((item) => (
        <CarItem
          key={item._id}
          id={item._id}
          name={item.vehicle_title}
          price={item.price}
          image={item.images}
          brand={item.brand_name}
          model={item.model_name}
          fuel={item.fuel_type}
          gearbox={item.gearbox_type}
          mileage={item.mileage}
        />
      ))}
    </div>
  );
};
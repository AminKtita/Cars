import React from 'react';
import { CarListItem } from './CarListItem';

export const CarListView = ({ filterProducts }) => {
  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {filterProducts.map((item) => (
        <CarListItem
          key={item._id}
          id={item._id}
          name={item.vehicle_title}
          price={item.price}
          image={item.images}
          brand={item.brand_name}
          model={item.model_name}
          year={item.year}
          mileage={item.mileage}
        />
      ))}
    </div>
  );
};
import React from 'react';

const Car = ({ car }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="car-container">
      {/* Image Slider on the Left */}
      <div className="car-images">
        <Slider {...settings}>
          {car.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Car ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Car Details on the Right */}
      <div className="car-details">
        <h2>{car.vehicle_title}</h2>
        <p><strong>Price:</strong> ${car.price}</p>
        <p><strong>Mileage:</strong> {car.mileage} km</p>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Fuel Type:</strong> {car.fuel_type}</p>
        <p><strong>Gearbox:</strong> {car.gearbox_type}</p>
        <p><strong>Color:</strong> {car.color}</p>
        <p><strong>Country:</strong> {car.country}</p>
      </div>
    </div>
  );
};

export default Car;
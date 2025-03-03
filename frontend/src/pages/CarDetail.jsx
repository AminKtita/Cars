import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/api';
import { CarContext } from '../context/CarContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Keyboard, FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';

export const CarDetail = () => {
  const { CarId } = useParams();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency } = useContext(CarContext);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSwiperRef = useRef(null);

  const fetchCar = async () => {
    try {
      const car = await getCarById(CarId);
      setCarData(car);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isKeyDown = false;

    const handleKeyDown = (e) => {
      if (isKeyDown || !mainSwiperRef.current) return;

      isKeyDown = true;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        mainSwiperRef.current.swiper.slidePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        mainSwiperRef.current.swiper.slideNext();
      }

      setTimeout(() => {
        isKeyDown = false;
      }, 200);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    fetchCar();
  }, [CarId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!carData) return <div>No car data found</div>;

  const specifications = [
    { label: "Brand", value: carData.brand_name },
    { label: "Model", value: carData.model_name },
    { label: "Year", value: carData.year },
    { label: "Mileage", value: `${carData.mileage} km` },
    { label: "Fuel Type", value: carData.fuel_type },
    { label: "Gearbox", value: carData.gearbox_type },
    { label: "Power (CV)", value: carData.power_cv },
    { label: "Color", value: carData.color },
    { label: "Country", value: carData.country },
  ].filter(item => item.value);


  const optimizedImageURL = (url) => 
    url.replace(/\.(jpeg|jpg|png)/, '.webp');
  

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Image Section with Swiper */}
          <div className="lg:w-1/2 flex flex-col gap-4">
  {/* Main Slider */}
  <Swiper
    ref={mainSwiperRef}
    spaceBetween={10}
    navigation
    keyboard={{ enabled: true }}
    thumbs={{ swiper: thumbsSwiper }}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }}
    onAutoplayTimeLeft={(swiper, timeLeft, percentage) => {
      const progressBar = swiper.el.querySelector('.autoplay-progress');
      if (progressBar) {
        progressBar.style.width = `${(1 - percentage) * 100}%`;
      }
    }}
    onSlideChange={(swiper) => {
      const progressBar = swiper.el.querySelector('.autoplay-progress');
      if (progressBar) {
        progressBar.style.width = '100%';
      }
    }}
    modules={[Navigation, Thumbs, Keyboard, Autoplay]}
    className="w-full aspect-square rounded-lg overflow-hidden"
  >

    {/* Slides */}
    {carData.images.map((img, index) => (
      <SwiperSlide key={index}>
        <div className="w-full h-full bg-gray-100 flex items-center justify-center relative">
          <img
            src={img}
            alt={`Slide ${index}`}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Thumbnail Slider with Navigation Arrows */}
  <div className="relative"> {/* Add relative positioning for arrows */}
    <Swiper
      onSwiper={setThumbsSwiper}
      spaceBetween={10}
      slidesPerView="auto"
      freeMode={true}
      watchSlidesProgress={true}
      navigation={{
        nextEl: '.thumbnail-next',
        prevEl: '.thumbnail-prev',
      }}
      breakpoints={{
        320: { slidesPerView: 3 }, // Small screens
        640: { slidesPerView: 4 }, // Medium screens
        1024: { slidesPerView: 5 }, // Large screens
      }}
      modules={[FreeMode, Thumbs, Navigation]}
      className="thumbnail-slider !pb-2"
    >
      {carData.images.map((img, index) => (
        <SwiperSlide
          key={index}
          className="!w-20 !h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition-transform hover:scale-105"
        >
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Navigation Arrows */}
    <div className="hidden lg:block"> {/* Only show arrows on large screens */}
      <button className="thumbnail-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button className="thumbnail-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</div>

          {/* Car Details */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{carData.vehicle_title}</h1>
            <div className="text-2xl font-bold text-blue-600 mb-6">
              {carData.price} {currency}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {specifications.map((spec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">{spec.label}</div>
                  <div className="font-medium">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            {carData.power_cv_fiscal && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Additional Info</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Fiscal Power</div>
                    <div className="font-medium">{carData.power_cv_fiscal}</div>
                  </div>
                </div> 
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
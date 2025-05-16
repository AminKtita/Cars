import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/api';
import { AppContext } from '../context/AppContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { logUserAction, toggleFavorite, checkFavorite ,getCarReviews} from '../services/api';
import { assets } from '../assets/assets';
import { ReviewsSection, ReviewForm } from '../components/Reviews';


// Import required styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

export const CarDetail = () => {
  const { CarId } = useParams();
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency } = useContext(AppContext);
  const mainSwiperRef = useRef(null);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [reviews, setReviews] = useState([]);


  const mockReviews = [
    {
      id: 1,
      author: "John Doe",
      rating: 4,
      date: "2024-03-15",
      comment: "Great car! Loved the comfortable seats and smooth driving experience.",
      avatar: "https://example.com/avatar1.jpg"
    },
    {
      id: 2,
      author: "Jane Smith",
      rating: 5,
      date: "2024-03-14",
      comment: "Excellent performance and amazing interior design. Highly recommend!"
    },
    // Add more mock reviews as needed
  ];


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getCarReviews(CarId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    
    fetchReviews();
  }, [CarId]);
  
const handleNewReview = async (newReview) => {
  if (newReview) {
    // Add directly if we have full data
    setReviews(prev => [newReview, ...prev]);
  } else {
    // Otherwise refresh from server
    const reviewsData = await getCarReviews(CarId);
    setReviews(reviewsData);
  }
};
  

  // Add autoplay effect with useEffect
  useEffect(() => {
    let interval;
    if (autoPlay && carData?.images) {
      interval = setInterval(() => {
        setSelectedImageIndex(prev => (prev + 1) % carData.images.length);
      }, 3000); // Change image every 3 seconds
    }
    return () => clearInterval(interval);
  }, [autoPlay, carData?.images]);



  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const { isFavorite } = await checkFavorite(CarId);
        setIsFavorite(isFavorite);
      } catch (err) {
        console.error('Error checking favorite:', err);
      }
    };
    
    checkFavoriteStatus();
  }, [CarId]);

  const handleFavoriteToggle = async () => {
    try {
      const { isFavorite: newStatus } = await toggleFavorite(CarId);
      setIsFavorite(newStatus);
      
      // Log the action
      await logUserAction({
        actionType: newStatus ? 'favorite' : 'unfavorite',
        carId: CarId
      });
      
    } catch (err) {
      console.error('Error toggling favorite:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };
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
  // data collect
  useEffect(() => {
    const startTime = Date.now();
    let timeoutId;
    // Final tracking when leaving
    return () => {
      clearTimeout(timeoutId); // Clear preliminary ping if user leaves early
  
      const totalDuration = Date.now() - startTime;
  
      // Only log final action if user stayed for more than 1 second
      if (totalDuration > 1000) {
        logUserAction({
          actionType: 'view',
          carId: CarId,
          details: {
            duration: totalDuration
          }
        });
      }
    };
  }, [CarId]);
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
    { 
      label: "Brand", 
      value: carData.brand_name,
      icon: assets.car_icon 
    },
    { 
      label: "Model", 
      value: carData.model_name,
      icon: assets.car_icon 
    },
    { 
      label: "Body Type", 
      value: carData.body_type,
      icon: assets.body_type 
    },
    { 
      label: "Year", 
      value: carData.year,
      icon: assets.calender 
    },
    { 
      label: "Mileage", 
      value: `${carData.mileage} Km`,
      icon: assets.speedometer 
    },
    { 
      label: "Fuel Type", 
      value: carData.fuel_type,
      icon: assets.fuel 
    },
    { 
      label: "Gearbox", 
      value: carData.gearbox_type,
      icon: assets.gearbox 
    },
    { 
      label: "Power (CV)", 
      value: carData.power_cv,
      icon: assets.car_engine 
    },
    { 
      label: "Color", 
      value: carData.color,
      icon: assets.color 
    },
    { 
      label: "Country", 
      value: carData.country,
      icon: assets.country 
    },
  ].filter(item => item.value);
  
  
  const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 10,
    observer: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
  };
  
  return (
<div className="widget-property-detail px-4 max-w-7xl mx-auto">
  <div className="themesflat-container">
        {/* Breadcrumb */}
        <div className="widget-breakcrumb py-4 border-b">
          <div className="breakcrumb">
            <div className="title-breakcrumb flex gap-2 text-gray-500">
              <button onClick={() => navigate(-1)} className="hover:text-red-600">
                Home
              </button>
              <span>/</span>
              <span className="text-gray-700">{carData.vehicle_title}</span>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="row mt-8 bg-white rounded-xl p-8 shadow-lg">
         <div className="col-lg-12">
            <div className="wrap-property-car flex flex-col md:flex-row justify-between">
              <div className="box-1">
                <div className="icon-box-info flex flex-wrap gap-4 mb-4">
                  <div className="info-sale">
                    <span className="sale bg-red-500 text-white px-3 py-1 rounded">
                      New Arrival
                    </span>
                  </div>
                  {specifications.slice(0, 3).map((spec, index) => (
                    <div key={index} className="info flex gap-2">
                      <span className="font-medium">{spec.label}:</span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <h1 className="title-heading text-4xl font-bold mb-2 tracking-tight">
                {carData.vehicle_title}
                </h1>
                <div className="text-address flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>{carData.country}</p>
                </div>
              </div>

              <div className="box-2 mt-4 md:mt-0">
                <div className="price-wrap flex flex-col items-end">
                <p className="price-sale text-3xl font-bold text-red-600">
                {carData.price} {currency}
                  </p>
                  <button 
                    onClick={handleFavoriteToggle}
                    className="flex items-center gap-2 mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <svg
                      className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="text-sm">
                      {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

       {/* Main Image Gallery */}
       <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-6 py-4"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}>
          <img
            src={carData.images[selectedImageIndex]}
            alt="Main view"
            className="w-full h-full object-cover transition-opacity duration-300"
          />
  
  {/* Navigation Arrows */}
  <button 
    onClick={() => {
      setSelectedImageIndex(prev => (prev - 1 + carData.images.length) % carData.images.length);
      setAutoPlay(false);
    }}
    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
  <button 
    onClick={() => {
      setSelectedImageIndex(prev => (prev + 1) % carData.images.length);
      setAutoPlay(false);
    }}
    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>


{/* Thumbnail Slider */}
<div className="gallary-property-details relative mb-12">
  <Swiper
    modules={[Navigation, Autoplay]}
    slidesPerView={4}
    spaceBetween={10}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    }}
    navigation={{
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }}
    breakpoints={{
      640: { slidesPerView: 5 },
      1024: { slidesPerView: 6 },
      1280: { slidesPerView: 7 },
    }}
    className="swiper-container rounded-xl overflow-hidden"
  >
    {carData.images.map((img, index) => (
      <SwiperSlide 
        key={index} 
        onClick={() => {
          setSelectedImageIndex(index);
          setAutoPlay(false);
        }}
        className="cursor-pointer"
      >
        <div className={`relative aspect-square border-2 ${
          index === selectedImageIndex ? 'border-red-500' : 'border-transparent'
        } rounded-lg overflow-hidden transition-all`}>
          <img
            src={img}
            alt={`Thumbnail ${index}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </SwiperSlide>
    ))}
    
    {/* Navigation arrows */}
    <div className="swiper-button-prev !text-white !w-8 !h-8 !bg-black/30 !rounded-full" />
    <div className="swiper-button-next !text-white !w-8 !h-8 !bg-black/30 !rounded-full" />
  </Swiper>
</div>

        {/* Specifications Grid */}
        <div className="row mt-8">
        <div className="col-lg-8">
            <div className="post-property">
              <div className="wrap-car-overview wrap-style bg-white p-6 rounded-lg shadow">
                <h4 className="title text-xl font-bold mb-4">Vehicle Overview</h4>
                <div className="listing-info">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                      <div key={index} className="col-md-6">
                        <div className="inner listing-infor-box flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                          {/* Icon */}
                          <div className="shrink-0">
                            <img 
                              src={spec.icon} 
                              alt={spec.label}
                              className="w-6 h-6 object-contain filter-red" 
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">
                              {spec.label}:
                            </span>
                            
                            {/* Special cases for country and color */}
                            <div className="flex items-center gap-2">
                              {spec.label === 'Country' && (
                                <img
                                  src={spec.value.toLowerCase() === 'france' ? assets.france : assets.germany}
                                  alt={spec.value}
                                  className="w-5 h-5 object-contain"
                                />
                              )}
                              
                              {spec.label === 'Color' && (
                                <div 
                                  className="w-4 h-4 rounded-full shadow-sm border border-gray-200"
                                  style={{ backgroundColor: spec.value.toLowerCase().replace(' ', '') }}
                                />
                              )}
                              
                              <span className="text-sm font-medium text-gray-900">
                                {spec.value}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4 mt-8 md:mt-8">  {/* Changed from md:mt-0 to md:mt-8 */}
              <div className="author-contact-listing-wrap bg-white p-6 rounded-lg shadow">
                <div className="author-contact-wrap flex items-center gap-4 mb-6">
                  <div className="author-contact-info">
                    <h4 className="name text-lg font-bold">Seller Information</h4>
                    <p className="desc text-gray-600">Contact the seller for more details</p>
                    {carData.url && (
                      <button 
                        onClick={() => window.open(carData.url, '_blank')}
                        className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Go to Source
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="mt-12">
          <ReviewsSection reviews={reviews} />
          <ReviewForm carId={CarId} onReviewSubmit={handleNewReview} />
        </div>
            
        {/* Related Vehicles */}
        <div className="widget-related-single-listing mt-12">
          <h3 className="text-2xl font-bold mb-6">Related Vehicles</h3>
          <Swiper {...swiperOptions} className="swiper-container">
            {/* Add related vehicles swiper slides here */}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
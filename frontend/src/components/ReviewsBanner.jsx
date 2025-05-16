import { useState, useEffect } from 'react';
import { getTopReviews } from '../services/api'; // Add this import
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { assets } from '../assets/assets';
import axios from 'axios';

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  navigation: {
    nextEl: ".swiper-button-next-tes",
    prevEl: ".swiper-button-prev-tes",
  },
  loop: true,
  speed: 600,
  parallax: true,
  autoplay: {
    delay: 5000,
  },
};

const getInitialColor = (username) => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#E67E22'
  ];
  const initial = username?.charAt(0).toUpperCase() || '?';
  return colors[initial.charCodeAt(0) % colors.length];
};

export const ReviewsBanner = () => {
  const [topReviews, setTopReviews] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopReviews();
        setTopReviews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load reviews:', error);
        setTopReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-12">Loading testimonials...</div>;
  if (!topReviews?.length) return null; 

  const featuredReview = topReviews[0];

  return (
    <div className="container mx-auto px-4 py-12 bg-fixed" style={{ backgroundImage: `url(${assets.map_bg})` }}>
      <div className="flex flex-col md:flex-row items-center gap-4">
          {/* LEFT STATIC SECTION */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start ml-8">
            <div className="relative group">
              <img
                src={assets.reviwes}  
                alt="Customer reviews"
                className="rounded-xl w-64 h-64 object-cover"
              />
            </div>
     </div>


        {/* RIGHT SWIPER SECTION */}
        <div className="w-full md:w-2/3">
          <Swiper {...swiperOptions}>
            {topReviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="text-left px-4">
                  <span className="text-red-500 text-sm uppercase tracking-wide font-semibold">
                    Customer Testimonials
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                    What Our Clients Say
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg italic">
                    "{review.comment}"
                  </p>

                  <div className="flex items-center gap-4">
                    {review.user?.profileImage ? (
                      <img
                        src={`http://localhost:8001${review.user.profileImage}`}
                        alt={review.user.username}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    ) : (
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ 
                          backgroundColor: getInitialColor(review.user?.username),
                          fontSize: '1.25rem'
                        }}
                      >
                        {review.user?.username?.charAt(0).toUpperCase() || '?'}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-gray-900">
                        {review.user?.username || 'Anonymous User'}
                      </div>
                      <div className="text-sm text-gray-500">
                        Reviewed on{' '}
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-sm ${
                              i < Math.floor(review.averageRating) 
                                ? 'text-orange-400' 
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4 mt-8">
            <div className="swiper-button-prev-tes bg-white rounded-full shadow p-3 cursor-pointer hover:bg-gray-50">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="swiper-button-next-tes bg-white rounded-full shadow p-3 cursor-pointer hover:bg-gray-50">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
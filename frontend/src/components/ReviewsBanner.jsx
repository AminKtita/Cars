import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { assets } from '../assets/assets'

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  navigation: {
    nextEl: ".swiper-button-next-tes",
    prevEl: ".swiper-button-prev-tes",
  },
  loop: true,
  speed: 600,
  parallax: true,
}

export const ReviewsBanner = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-fixed " style={{ backgroundImage: `url(${assets.map_bg})` }}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* LEFT STATIC IMAGE + RATING */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start ml-8">
          <div className="relative">
            <img
              src={assets.reviwer}
              alt="testimonial person"
              className="rounded-xl w-64 h-auto object-cover"
            />
            <div className="absolute top-0 left-0 bg-red-500 w-12 h-12 rounded-full flex items-center justify-center">
              <img
                src={assets.quote}
                alt="quote"
                className="w-5 h-5 object-contain"
              />
            </div>
          </div>
          {/* Star Rating */}
          <div className="mt-4 flex gap-1 items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-orange-400 text-xl">★</span>
            ))}
          </div>
        </div>

        {/* RIGHT SWIPER SECTION */}
        <div className="w-full md:w-2/3">
          <Swiper {...swiperOptions}>
            {[1, 2, 3].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="text-left">
                  <span className="text-red-500 text-sm uppercase tracking-wide font-semibold">
                    Trusted Car Dealer Service
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                    What Client’s Says
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    The other hand we denounce with righteous indignation and
                    dislike men who are so beguiled and demoralized by the pleasure
                    of events moment. Dislike men who are so beguiled and demoralized
                    worlds by the charms of pleasure “
                  </p>
                  <div className="flex items-center gap-4 mt-8">
                    <div className="text-left">
                      <div className="font-bold text-gray-900">Leslie Alexander</div>
                      <div className="text-sm text-gray-500">ThemeForest Exclusive</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper Navigation Arrows */}
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
  )
}

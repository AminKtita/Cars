import {CounterUp} from "./CounterUp";
import { useInView } from 'react-intersection-observer';
import { assets } from '../assets/assets';


export const CounterBanner = () =>{
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Background Image using assets */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${assets.road_bg})` }}
      ></div>

      <div className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-500 font-semibold uppercase tracking-wide">
              Find your car by car brand
            </span>
            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
              Leading The Best Car Deals in Europe
            </h2>
            <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
              There are many variations of simply free text passages of Lorem available 
              but the majority have suffered alteration in some form by injected hum 
              randomised words which don't slightly.
            </p>
          </div>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {/* Vehicle in Stock */}
            <div className="text-center p-6 bg-none  rounded-lg shadow-xl hover:transform hover:scale-105 transition-all">
              <div className="mb-4 inline-block group">
                <img 
                  src={assets.cars}
                  className="w-20 h-20 mx-auto hover:animate-rotate-y"
                  alt="Vehicle icon"
                />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
              {inView && <><CounterUp count={200} duration={2}/>+</>}
              </div>
              <p className="text-white font-semibold">Vehicles</p>
            </div>

            {/* Satisfied Customers */}
            <div className="text-center p-6 bg-none rounded-lg shadow-xl hover:transform hover:scale-105 transition-all">
              <div className="mb-4 inline-block group">
                <img 
                  src={assets.customer}
                  className="w-20 h-20 mx-auto hover:animate-rotate-y"
                  alt="Customer icon"
                />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
              {inView && <><CounterUp count={50} duration={2}/>+</>}
              </div>
              <p className="text-white font-semibold">Satisfied Customers</p>
            </div>

            {/* countries */}
            <div className="text-center p-6 bg-none  rounded-lg shadow-xl hover:transform hover:scale-105 transition-all">
              <div className="mb-4 inline-block group">
                <img 
                  src={assets.europe}
                  className="w-20 h-20 mx-auto hover:animate-rotate-y"
                  alt="Showroom icon"
                />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {inView && <><CounterUp count={2} duration={2}/>+</>}
              </div>
              <p className="text-white font-semibold">European Countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
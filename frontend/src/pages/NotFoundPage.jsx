// NotFoundPage.js
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets';

export const NotFoundPage = () => {
  return (
    <section className="bg-white py-6 md:py-12 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Page Header */}
        <div className="text-center mb-16">
          <NavLink 
            to="/" 
            className="text-red-600 hover:text-red-700 inline-flex items-center gap-1 mb-4"
          >
            ← Back to Home
          </NavLink>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oops! The page you're looking for seems to have taken a wrong turn. Let's get you back on track.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Illustration */}
          <div className="text-center p-6">
            <div className="text-9xl mb-6">🤖</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Lost in the Digital Garage?
            </h2>
            <p className="text-gray-600 mb-6">
              Don't worry, even the best mechanics take wrong turns sometimes. 
              Try these helpful links:
            </p>
            <NavLink 
              to="/cars" 
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Explore Cars
            </NavLink>
          </div>

          {/* Common Links */}
          <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Car Listings', path: '/cars' },
                { title: 'FAQ', path: '/faq' },
                { title: 'Your Favorites', path: '/favorites' },
                { title: 'Contact Support', path: '/contact' },
                { title: 'Privacy Policy', path: '/terms' },
                { title: 'Search Filters', path: '/filters' }
              ].map((link) => (
                <NavLink
                  key={link.title}
                  to={link.path}
                  className="p-3 bg-white rounded-lg hover:bg-red-50 transition-colors border border-gray-200 flex items-center gap-2"
                >
                  <span className="text-red-600">→</span>
                  {link.title}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements matching footer */}
        <div className="relative mt-16">
          <img 
            src={assets.ftLeft} 
            alt="left" 
            className="absolute left-0 bottom-0 z-0 w-40 md:w-48 opacity-70 select-none pointer-events-none" 
          />
          <img 
            src={assets.ftRight} 
            alt="right" 
            className="absolute right-0 bottom-0 z-0 w-40 md:w-48 opacity-70 select-none pointer-events-none" 
          />
        </div>
      </div>
    </section>
  )
}
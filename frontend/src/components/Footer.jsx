import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets';

export const Footer = () => {
  // Link configurations
  const quickLinks = [
    { title: 'Cars List', path: '/cars' },
    { title: 'FAQ', path: '/faq' },
    { title: 'Your History', path: '/history' },
    { title: 'Your Favorites', path: '/favorites' },
    { title: 'Your Filters', path: '/filters' }
  ];

  const legalLinks = [
    { title: 'Privacy Policy', path: '/terms' },
  
  ];

  const socialLinks = [
    { title: 'Facebook', path: 'https://facebook.com' },
    { title: 'Twitter', path: 'https://twitter.com' },
    { title: 'Instagram', path: 'https://instagram.com' },
    { title: 'LinkedIn', path: 'https://linkedin.com' }
  ];

  return (
    <footer className="relative bg-black text-white pt-20 pb-8 overflow-hidden">
      {/* Decorative shapes */}
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

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 lg:mb-20 gap-8">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Do you want <span className="text-red-600">To Buy</span> a car?
            </h2>
          </div>
          <div className="lg:w-1/2 text-center lg:text-right">
            <NavLink 
              to="/cars" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg transition-colors duration-300 text-sm md:text-base"
            >
              Buy a car today
            </NavLink>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <img src={assets.logo} alt="Logo" className="h-12 w-auto" />
            <p className="text-white text-sm md:text-base">
              Find and compare the best car deals from Europe, updated daily. Designed for Tunisians with FCR looking to import their perfect vehicle.
            </p>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-2">
                <span className="mt-1">📍</span>
                <p className="text-sm md:text-base">Imm Jaballah App 9,Rue de la plage, Hammem-Sousse 4011, Tunisia</p>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <p className="text-sm md:text-base">contact@cardealer.com</p>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:pl-8">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <NavLink 
                    to={link.path} 
                    className="text-white hover:text-red-600 transition-colors text-sm md:text-base"
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-start-4 lg:row-start-1">
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <form className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter Email Address" 
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-sm md:text-base"
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-3 text-red-600 hover:text-red-700 transition-colors"
                >
                  ➔
                </button>
              </div>
              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1 w-4 h-4 text-red-600 bg-gray-800 rounded focus:ring-red-600"
                />
                <label htmlFor="terms" className="text-sm text-gray-400 flex-1">
                  I agree to all terms and policies
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white-400">
            <div className="text-center md:text-left mb-4 md:mb-0">
              Made with ❤️ by <NavLink to="/" className="hover:text-red-600">Ostrix</NavLink>
            </div>
            
            <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
              {socialLinks.map((social) => (
                <a
                  key={social.title}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-base hover:text-red-600 transition-colors"
                >
                  {social.title}
                </a>
              ))}
            </div>

            <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
              {legalLinks.map((link) => (
                <NavLink 
                  key={link.title} 
                  to={link.path} 
                  className="text-sm md:text-base hover:text-red-600 transition-colors"
                >
                  {link.title}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
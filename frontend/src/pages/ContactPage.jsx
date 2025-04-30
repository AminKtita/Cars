// ContactPage.js
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets';

export const ContactPage = () => {
  return (
    <section className="bg-white py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <NavLink 
            to="/" 
            className="text-red-600 hover:text-red-700 inline-flex items-center gap-1 mb-4"
          >
            ← Back to Home
          </NavLink>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for any inquiries or support needs. We typically respond within 24 hours.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <div className="space-y-8 p-6 bg-gray-50 rounded-xl">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Office Information</h2>
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-gray-900 font-medium">Visit Us</p>
                  <p className="text-gray-600">Imm Jaballah App 9, Rue de la plage<br/>
                  Hammem-Sousse 4011, Tunisia</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="text-gray-900 font-medium">Email Us</p>
                  <a href="mailto:contact@cardealer.com" className="text-red-600 hover:text-red-700">
                    contact@cardealer.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="text-gray-900 font-medium">Call Us</p>
                  <a href="tel:+21612345678" className="text-red-600 hover:text-red-700">
                    +216 12 345 678
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 bg-gray-50 rounded-xl">
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
<div className="bg-gray-50 rounded-xl overflow-hidden h-96">
  {/* OpenStreetMap Integration */}
  <iframe
    title="Office Location"
    width="100%"
    height="100%"
    frameBorder="0"
    scrolling="no"
    marginHeight="0"
    marginWidth="0"
    src={`https://www.openstreetmap.org/export/embed.html?bbox=10.595804%2C35.855207%2C10.605804%2C35.865207&amp;layer=mapnik&marker=35.860207%2C10.600804`}
    className="border-0"
  >
  </iframe>
</div>

{/* Small text under map */}
<p className="text-gray-500 text-sm mt-4 text-center">
  View larger map on <a 
    href="https://www.openstreetmap.org/#map=16/35.860207/10.600804" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-red-600 hover:text-red-700"
  >
    OpenStreetMap
  </a>
</p>
      </div>
    </section>
  )
}
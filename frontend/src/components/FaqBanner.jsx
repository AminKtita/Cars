// FaqBanner.js (Main banner)
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

export const FaqBanner = () => {
    return (
        <section className="bg-gray-50 py-12 md:py-24 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-15 z-0">
                <img 
                    src={assets.faq_bg} 
                    alt="Background pattern"
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-red-600 text-sm uppercase font-semibold tracking-wide">
                                Car Import Made Easy
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Your European Car Import Gateway
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Simplified car import process for Tunisians with FSR status. 
                                Find your perfect European vehicle through our verified network.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                { 
                                    icon: assets.search,
                                    title: "Smart Search",
                                    text: "Advanced filters & price tracking"
                                },
                                { 
                                    icon: assets.shield_icon,
                                    title: "Verified Listings",
                                    text: "Direct from European markets"
                                },
                                { 
                                    icon: assets.currency_icon,
                                    title: "Price Transparency",
                                    text: "Accurate car prices from European markets"
                                },
                                { 
                                    icon: assets.bell_icon,
                                    title: "Alerts",
                                    text: "Get notified for new matches"
                                }
                            ].map((feature, index) => (
                                <div key={index} className="p-4 bg-white rounded-lg border-l-4 border-red-100 hover:border-red-200 transition-all">
                                    <div className="flex items-start gap-3">
                                        <img src={feature.icon} className="w-8 h-8 mt-1" alt={feature.title} />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                            <p className="text-gray-600 text-sm">{feature.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <NavLink 
                            to="/faq" 
                            className="inline-flex items-center gap-2 group mt-6"
                        >
                            <span className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                                Explore FAQs
                            </span>
                            <span className="text-red-600 group-hover:text-red-700 transition-colors">
                                Common questions answered →
                            </span>
                        </NavLink>
                    </div>

                    {/* Image Section */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent rounded-xl" />
                        <img
                            src={assets.car2}
                            alt="Car import process visualization"
                            className="w-full h-auto rounded-xl shadow-xl transform group-hover:scale-95 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
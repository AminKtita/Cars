// FaqPage.js (Dedicated FAQ page)
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

export const FaqPage = () => {
    const faqs = [
        {
            question: "What is FSR and how does it help me import a car?",
            answer: "FSR (Franchise Spéciale de Retour) is a special customs benefit for Tunisians returning from abroad, allowing you to import a car with reduced or zero customs duties. Our platform is designed specifically for FSR holders."
        },
        {
            question: "Can I trust the cars listed on your website?",
            answer: "Yes, we only scrape data from verified and reliable European marketplaces. We also show the original source so you can double-check the details before making a decision."
        },
        {
            question: "Do you handle the car import process?",
            answer: "We currently provide a discovery and recommendation service. We help you find the right car and connect you with the seller. Import logistics must be handled independently or through a third-party import agent."
        },
        {
            question: "Is this service free to use?",
            answer: "Yes! Our platform is completely free to browse and use. We aim to help Tunisians make informed decisions without paying extra for search services."
        },
        {
            question: "How does the recommendation system work?",
            answer: "We track your searches, filters, and preferences to suggest cars that match your needs — making your search smarter and faster over time."
        },
        {
            question: "Are the prices in Dinars or Euros?",
            answer: "All listings show the original price in Euros as displayed on the European marketplace. You can use our currency converter or consult with customs agents for an estimate of total cost in Dinars."
        },
        {
            question: "Can I save cars or build a favorites list?",
            answer: "Absolutely. You can log in and start favoriting any car you're interested in. This helps us recommend better options and lets you track your top choices."
        },
        {
            question: "Do you offer support in choosing a car?",
            answer: "While we don’t offer direct consultations, our recommendation system and filters help you narrow down the best choices based on budget, model, year, mileage, and more."
        },
        {
            question: "How often is the car listing data updated?",
            answer: "We regularly update our listings to reflect new cars and remove outdated ones, so you’re always seeing the most recent offers."
        },
        {
            question: "Can I contact the seller directly?",
            answer: "Yes, we include links or contact info from the original listing so you can reach out to the seller yourself."
        },
        {
            question: "What if the car I like gets sold?",
            answer: "No worries! Our platform will show you similar cars and even notify you of new listings that match your interest if you're signed in."
        }
    ]

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
                        Frequently Asked Questions
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about importing cars through our platform. <br />
                        Can't find your answer? Contact our support team.
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className="p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-red-50"
                        >
                            <div className="flex gap-3 mb-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <img 
                                        src={assets.faq_icon} 
                                        className="w-4 h-4 text-red-600" 
                                        alt="Question icon"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {faq.question}
                                </h3>
                            </div>
                            <p className="text-gray-600 pl-11">{faq.answer}</p>
                        </div>
                    ))}
                </div>

                {/* Support CTA */}
                <div className="mt-16 text-center bg-red-50 rounded-xl p-8">
                    <img 
                        src={assets.support_icon} 
                        className="w-16 h-16 mx-auto mb-6" 
                        alt="Support"
                    />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Still have questions?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Our support team is here to help you with any additional questions
                    </p>
                    <NavLink 
                        to="/contact" 
                        className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Contact Support
                    </NavLink>
                </div>
            </div>
        </section>
    )
}
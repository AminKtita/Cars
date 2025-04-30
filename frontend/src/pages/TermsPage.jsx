// TermsPage.js
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

export const TermsPage = () => {
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
                        Terms of Service & Privacy Policy
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Effective Date: [22/04/2025] | Last Updated: [22/04/2025]
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8 max-w-3xl mx-auto">
                    <div className="p-6 bg-gray-50 rounded-xl">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                        <p className="text-gray-600 mb-4">
                            Welcome to [Your Platform Name]. By accessing our services and creating an account, 
                            you agree to these Terms of Service and our data practices outlined below.
                        </p>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Data Collection</h2>
                        <p className="text-gray-600 mb-4">
                            To enhance your experience and provide personalized recommendations, we collect:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Navigation patterns and visited pages</li>
                            <li>Time spent viewing vehicle listings</li>
                            <li>Search queries and filter preferences</li>
                            <li>Interaction with recommendation features</li>
                            <li>Saved favorites and comparison history</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use of Collected Data</h2>
                        <p className="text-gray-600 mb-4">
                            We utilize your data to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Generate personalized vehicle recommendations</li>
                            <li>Improve our search algorithms and matching systems</li>
                            <li>Enhance user experience through predictive filtering</li>
                            <li>Develop new features based on usage patterns</li>
                            <li>Maintain platform security and prevent fraud</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Consent & Control</h2>
                        <p className="text-gray-600 mb-4">
                            By creating an account, you explicitly consent to our data collection practices. 
                            You maintain the right to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Access your collected data through account settings</li>
                            <li>Opt-out of data collection (will disable recommendations)</li>
                            <li>Request deletion of your data (subject to legal obligations)</li>
                            <li>Export your interaction history</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                        <p className="text-gray-600 mb-4">
                            We implement industry-standard measures including:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>SSL encryption for all data transfers</li>
                            <li>Anonymization of behavioral data</li>
                            <li>Regular security audits</li>
                            <li>Limited access to raw data</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Changes to Terms</h2>
                        <p className="text-gray-600">
                            We reserve the right to modify these terms. Continued use after changes constitutes 
                            acceptance. Major changes will be notified via email 30 days prior to implementation.
                        </p>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-16 text-center bg-red-50 rounded-xl p-8">
                    <img 
                        src={assets.terms} 
                        className="w-16 h-16 mx-auto mb-6" 
                        alt="Terms and Policies"
                    />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Need Clarification?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Contact us regarding any terms or data practices
                    </p>
                    <NavLink 
                        to="/contact" 
                        className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Contact Legal Team
                    </NavLink>
                </div>
            </div>
        </section>
    )
}
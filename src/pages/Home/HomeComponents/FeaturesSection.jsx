import React from 'react';

const FeaturesSection = () => {
    const features = [
        {
            icon: 'Fast',
            title: 'Instant Access',
            description: 'Connect with doctors in minutes, not days. Get healthcare when you need it.'
        },
        {
            icon: 'Secure',
            title: 'Secure & Private',
            description: 'End-to-end encrypted consultations. Your health data is completely confidential.'
        },
        {
            icon: '$',
            title: 'Affordable Care',
            description: 'Skip the travel costs and wait times. Affordable consultations for everyone.'
        },
        {
            icon: 'MD',
            title: 'Expert Doctors',
            description: 'Consult with verified, experienced specialists across multiple fields.'
        },
        {
            icon: 'Chat',
            title: 'Multiple Formats',
            description: 'Chat, call, or video - choose what works best for you.'
        },
        {
            icon: '24/7',
            title: '24/7 Availability',
            description: 'Healthcare on your schedule. Available round the clock for emergencies.'
        }
    ];

    return (
        <div className="w-full py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose <span className="text-blue-600">MEDIT</span>?
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Experience healthcare reimagined for the modern age. We bring world-class medical expertise to your fingertips.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition duration-300 bg-gradient-to-br from-gray-50 to-white"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;

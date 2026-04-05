import React from 'react';

const CTASection = () => {
    return (
        <div className="w-full py-16 bg-gradient-to-r from-blue-600 to-blue-800">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Take Control of Your Health?
                </h2>
                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                    Join thousands of patients who've discovered better, more accessible healthcare. Start your consultation with a qualified doctor today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300 shadow-lg">
                        Book Appointment Now
                    </button>
                    <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
                        Explore Doctors
                    </button>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
                    <div>
                        <p className="text-3xl font-bold">10K+</p>
                        <p className="text-blue-100">Happy Patients</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold">500+</p>
                        <p className="text-blue-100">Verified Doctors</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold">50K+</p>
                        <p className="text-blue-100">Consultations Completed</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTASection;

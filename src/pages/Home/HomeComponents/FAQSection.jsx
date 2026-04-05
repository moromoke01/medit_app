import React, { useState } from 'react';

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const faqs = [
        {
            question: 'How do I book a consultation?',
            answer: 'Simply click on "Book an Appointment", select your preferred doctor and consultation type (chat, call, or video), choose your time slot, and complete the payment. You\'ll receive a confirmation immediately.'
        },
        {
            question: 'Are the doctors qualified and verified?',
            answer: 'Yes, all our doctors are licensed medical professionals with verified credentials. They specialize in various fields and have years of clinical experience.'
        },
        {
            question: 'Is my medical information secure?',
            answer: 'Absolutely. We use end-to-end encryption and comply with international healthcare data protection standards. Your privacy is our priority.'
        },
        {
            question: 'Can I get a prescription online?',
            answer: 'Yes! After consultation, doctors can issue digital prescriptions which you can fill at any authorized pharmacy. You\'ll receive it via email as well.'
        },
        {
            question: 'What if I have an emergency?',
            answer: 'For life-threatening emergencies, please call emergency services (911/112) immediately. Our 24/7 service is for non-emergency consultations.'
        },
        {
            question: 'Can I request a specific doctor?',
            answer: 'Yes, you can view all available doctors, their specialties, and ratings. You can select your preferred doctor based on availability and expertise.'
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <div className="w-full py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Find answers to common questions about our service
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 bg-gray-50 hover:bg-blue-50 flex justify-between items-center transition"
                            >
                                <span className="font-semibold text-gray-900 text-left">{faq.question}</span>
                                <span className={`text-2xl text-blue-600 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}>
                                    v
                                </span>
                            </button>

                            {activeIndex === index && (
                                <div className="px-6 py-4 bg-white border-t border-gray-200">
                                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg text-center">
                    <p className="text-gray-700 mb-4">Didn't find your answer?</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;

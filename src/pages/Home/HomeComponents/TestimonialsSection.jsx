import React from 'react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: 'Amara Johnson',
            role: 'Patient',
            text: "I was amazed at how quick and professional the consultation was. Dr. Amara diagnosed my skin condition in just 15 minutes via video call. Highly recommended!",
            rating: 5
        },
        {
            name: 'Chisom Okafor',
            role: 'Patient',
            text: "Finally, healthcare that doesn't require me to sit in crowded waiting rooms. The platform is intuitive and the doctors are very attentive.",
            rating: 5
        },
        {
            name: 'Ebube Anyanwu',
            role: 'Patient',
            text: "Affordable, accessible, and convenient. This service has made managing my health so much easier. Worth every penny.",
            rating: 5
        },
        {
            name: 'Zainab Hassan',
            role: 'Patient',
            text: "The prescription I received was detailed and easy to follow. The follow-up consultation reminder was also very helpful.",
            rating: 5
        }
    ];

  const StarRating = ({ rating }) => (
    <div className="flex gap-1 mb-3">
      {[...Array(rating)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">*</span>
      ))}
    </div>
  );

  return (
        <div className="w-full py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Trusted by Thousands of Patients
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Real stories from real people who've experienced better healthcare
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                        >
                            <StarRating rating={testimonial.rating} />
                            <p className="text-gray-700 text-sm mb-4 italic">"{testimonial.text}"</p>
                            <div className="border-t pt-4">
                                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                <p className="text-blue-600 text-sm">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;

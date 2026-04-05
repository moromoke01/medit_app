
import pic1 from '../../../assets/Home/general-consultation.jpg';
import pic2 from '../../../assets/Home/ginecologia.jpg';
import pic3 from '../../../assets/Home/dermatologist.jpg';
import pic4 from '../../../assets/Home/sexology.png';

const ConsultationSegment = () => {
  const specializations = [
    {
      name: 'General Medicine',
      description: 'Comprehensive health consultations addressing general health concerns, treatment plans, and therapeutic interventions for common ailments.',
      image: pic1,
      icon: 'General'
    },
    {
      name: 'Gynecology & Obstetrics',
      description: 'Specialized care for women\'s health, reproductive system concerns, pregnancy support, and maternal healthcare guidance.',
      image: pic2,
      icon: 'Women\'s Health'
    },
    {
      name: 'Dermatology',
      description: 'Expert diagnosis and treatment for all skin conditions, including acne, eczema, psoriasis, and other dermatological concerns.',
      image: pic3,
      icon: 'Skin Care'
    },
    {
      name: 'Sexology',
      description: 'Professional consultation on sexual health, reproductive concerns, and intimate wellness with complete confidentiality.',
      image: pic4,
      icon: 'Sexual Health'
    }
  ];

  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Medical <span className="text-blue-600">Specializations</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect with top specialists across various medical fields. Each doctor is verified and has years of clinical experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specializations.map((spec, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden h-full flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={spec.image}
                  alt={spec.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />

              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{spec.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{spec.description}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 self-start">
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultationSegment;
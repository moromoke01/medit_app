
import medpic from '../../../assets/Home/show2doc.png';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
        <div className="flex flex-1 flex-col justify-center text-left md:mr-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4">
            Healthcare That <span className="text-blue-600">Comes to You</span>
          </h1>
          <p className="font-light text-gray-600 text-base md:text-lg lg:text-xl mb-8 max-w-lg">
            Get expert medical consultations from certified doctors in minutes, not days. Available 24/7 via chat, call, or video—all from the comfort of your home.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/appointments')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Book Appointment
            </button>
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
              Learn More
            </button>
          </div>

          <div className="flex gap-8 mt-8 pt-8 border-t border-gray-200">
            <div>
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-gray-600 text-sm">Verified Doctors</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="text-gray-600 text-sm">Always Available</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">50K+</p>
              <p className="text-gray-600 text-sm">Happy Patients</p>
            </div>
          </div>
        </div>

        <div className="flex-1 mt-8 md:mt-0">
          <div className="relative">
            <img src={medpic} alt="med-consult" className="w-full rounded-lg shadow-2xl" />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <p className="text-sm font-semibold text-gray-900">Quick Response Time</p>
              <p className="text-xs text-gray-600">Average consultation starts within 5 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
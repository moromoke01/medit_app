import React from 'react'
import EachDoc from './EachDoc'
import doc7 from '../../../assets/Doctors/doc7.jpg'
import doc2 from '../../../assets/Doctors/doc2.jpeg'
import doc3 from '../../../assets/Doctors/doc3.jpg'
import doc6 from '../../../assets/Doctors/doc6.jpg'  

const MeetDoc = () => {
  const doctors = [
    {
      img: doc7,
      name: 'Dr. Cecilia Adam',
      dept: 'Physiotherapist',
      contact: '070376897872'
    },
    {
      img: doc2,
      name: 'Dr. Samson Ebele',
      dept: 'Dermatologist',
      contact: '0807867523827'
    },
    {
      img: doc3,
      name: 'Dr. Christian Anthony',
      dept: 'General Medicine',
      contact: '070376897872'
    },
    {
      img: doc6,
      name: 'Dr. Juliana Preston',
      dept: 'Physiologist',
      contact: '070376897872'
    }
  ];

  return (
    <div className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-blue-600">Medical Team</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our team of experienced and certified doctors are here to provide you with expert medical guidance and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={doctor.img}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-4">{doctor.dept}</p>

                <button className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300">
            View All Doctors
          </button>
        </div>
      </div>
    </div>
  );
}

export default MeetDoc
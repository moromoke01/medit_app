
import chat from '../../../assets/Home/chat-icon.png';
import call from '../../../assets/Home/telephone.png';
import video from '../../../assets/Home/video-icon.png';

const ConsultProcess = () => {
  const consultationMethods = [
    {
      icon: chat,
      title: 'Chat Consultation',
      description: 'Perfect for non-urgent concerns and detailed discussions.',
      steps: [
        'Describe your health concerns in detail',
        'Choose from specialized doctors',
        'Make secure payment',
        'Start chatting immediately'
      ]
    },
    {
      icon: call,
      title: 'Phone Consultation',
      description: 'Direct voice communication for better understanding.',
      steps: [
        'Fill consultation form with details',
        'Attach medical reports if needed',
        'Schedule your preferred time',
        'Receive encrypted phone call from doctor'
      ]
    },
    {
      icon: video,
      title: 'Video Consultation',
      description: 'Face-to-face consultation for comprehensive assessment.',
      steps: [
        'Complete health assessment form',
        'Upload relevant medical documents',
        'Choose convenient date & time',
        'Join secure video call with specialist'
      ]
    }
  ];

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How to Get <span className="text-blue-600">Consulted</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Simple, secure, and straightforward. Choose how you want to consult and get expert medical advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {consultationMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200"
            >
              <div className="mb-6">
                <img src={method.icon} alt={method.title} className="w-16 h-16 object-contain" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 text-sm mb-6">{method.description}</p>

              <div className="space-y-3 mb-6">
                {method.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">{stepIndex + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{step}</p>
                  </div>
                ))}
              </div>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultProcess;
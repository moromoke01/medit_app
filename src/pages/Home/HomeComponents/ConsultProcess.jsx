
import chat from '../../../assets/Home/chat-icon.png';
import call from '../../../assets/Home/telephone.png';
import video from '../../../assets/Home/video-icon.png';

const ConsultProcess = () => {
  return (
    <div className="w-full py-8 px-10 bg-gray-100">
      <h2 className="text-center text-2xl font-bold mb-8">
        Your Guide to <span className="text-blue-600">Virtual Consultation</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <img src={chat} alt="chat-icon" className="w-12 h-12 mr-2" />
            <h5 className="text-l font-semibold text-left">Chat Section Guide</h5>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-left text-sm">
            <li>Fill the form, ensure your health queries are in detail.</li>
            <li>Choose a plan that suits you better.</li>
            <li>Pay consultation fee.</li>
            <li>Book an Appointment.</li>
          </ol>
          <button className="bg-[#135480] px-3 py-1 rounded text-white mt-4">Get Started</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <img src={call} alt="call-icon" className="w-10 h-10 mr-2" />
            <h5 className="text-l font-semibold text-left">Call Section Guide</h5>
          </div>
          <ol className="list-decimal  space-y-2 text-left text-sm">
            <li>Fill the form, attach photos/report, if any.</li>
            <li>Pick date and time for your consultation.</li>
            <li>Pay your consultation fee.</li>
            <li>Talk to a Doctor over an end-to-end encrypted phone call.</li>
          </ol>
          <button className="bg-[#135480] px-3 py-1 rounded text-white mt-4">Get Started</button>
        </div>

        <div className="bg-white p-6 rounded rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <img src={video} alt="video-icon" className="w-12 h-12 mr-2" />
            <h5 className="text-l font-semibold text-left">Video Section Guide</h5>
          </div>
          <ol className="list-decimal space-y-2 text-left text-sm">
            <li>Fill the form, attach photos/report, if any.</li>
            <li>Pick date and time for your consultation.</li>
            <li>Pay your consultation fee.</li>
            <li>Talk to a Doctor over an end-to-end encrypted Video call.</li>
          </ol>
          <button className="bg-[#135480] px-3 py-1 rounded text-white mt-4">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default ConsultProcess;
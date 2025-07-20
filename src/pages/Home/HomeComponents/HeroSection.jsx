
import medpic from '../../../assets/Home/show2doc.png';

function HeroSection() {
  return (
    <div className="w-full min-h-[80vh] bg-[#e7e8e9] flex items-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="flex flex-1 flex-col justify-center text-left md:mr-12 p-4 ml-6">
          <h1 className="animate__bounceIn md:text-2xl text-3xl lg:text-4xl font-bold leading-tight">Empowering you to Live a Healthy Life.</h1>
          <h6 className="font-light mt-4 text-sm md:text-base lg:text-lg">Get 24/7 online consultations with the best doctors without breaking a sweat and your bank</h6>

          <div className="flex flex-1">
        <button className=" text-left  mt-6 py-2 px-3 bg-[#135480] text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ">Book an Appointment</button>
        </div>
        </div>
        

        <div className="flex-1 mt-8 md:mt-0">
          <img src={medpic} alt="med-consult" className="w-full mt-6 md:mt-2" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
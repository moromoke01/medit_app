import img1 from '../../assets/amb_virtuale.png'
import Signupform from './Forms/Signupform'

const Signup = () => {
  return (
  <div className="w-full bg-gray-100 min-h-screen flex items-center justify-center">

     <div className="flex flex-col md:flex-row w-full h-[550px] mx-auto lg:w-[900px] lg:h-[550px] shadow-md shadow-gray-400 sm:m-4">

      <div className='w-full h-full bg-white flex flex-1 items-center pl-4'>
         <Signupform />
      </div>

     
        
           <div className="hidden md:flex flex-1 relative h-full w-full bg-white">
             <img src={img1} alt="medic image" className="w-full h-full  " />
           </div>

      {/* <div className=' basis-128 hidden flex-1 relative lg:flex md:flex h-full w-full bg-gray-200 items-center justify-center'> */}
        {/* <div className='w-30 h-30 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce' />
        <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg rounded' /> */}
         {/* <img src={img1} alt="medic image" className='w-full h-full absolute object-cover'/>
      </div> */}
    </div>
    </div>

  );
};


export default Signup;

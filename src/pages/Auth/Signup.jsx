import img1 from '../../assets/medic 1.png'
import Signupform from './Forms/Signupform'

const Signup = () => {
  return (
    <div className='flex flex-row w-full  lg:w-180 h-screen shadow-md shadow-gray-400 mx-auto mt-4'>
      <div className='w-full lg:basis-128 flex flex-1 mt-10 pl-4 lg:w-1/2'>
         <Signupform />
      </div>

   
      <div className=' basis-128 hidden flex-1 relative lg:flex md:flex h-full w-full bg-gray-200 items-center justify-center'>
        {/* <div className='w-30 h-30 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce' />
        <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg rounded' /> */}
         <img src={img1} alt="medic image" className='w-full h-full absolute object-cover'/>
      </div>
    </div>
  )
}

export default Signup

import Loginform from './Forms/LoginForm';
import img1 from '../../assets/Home/consult2.jpg';

const Login = () => {
  return (
    <div className="w-full lg:bg-[#cccccc] min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full h-[400px] mx-auto lg:w-[700px] lg:h-[450px] shadow-md shadow-gray-400 sm:m-4">
        <div className="hidden md:flex flex-1 relative h-full w-full">
          <img src={img1} alt="medic image" className="w-full h-full absolute object-cover" />
        </div>

        <div className="w-full h-full bg-white flex flex-1 items-center pl-4">
          <Loginform />
        </div>
      </div>
    </div>
  );
};

export default Login;
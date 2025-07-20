import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import {logout} from "../features/authSlice"
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout())
    // localStorage.removeItem("user")
    window.location.reload()
  }

  return (
    <>
      <nav className="bg-[#135480] shadow-md">
        <div className="max-w-[950px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-white text-lg font-bold mr-6">Logo</div>
            </div>
            <div className="flex sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-200 hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden sm:block">
              <div className="flex space-x-8">
                <Link to="/" className="text-gray-200 hover:text-white">
                  Home
                </Link>
                <Link to="/ConsultingPage " className="text-gray-200 hover:text-white">
                  Consult a Doctor
                </Link>
                <Link to="/About" className="text-gray-200 hover:text-white">
                  About
                </Link>
                <Link to="/Welcomepage" className="text-gray-200 hover:text-white">
                  Blog
                </Link>
                <Link to="/testimonies" className="text-gray-200 hover:text-white">
                  Testimonies
                </Link>
              </div>
            </div>
            <div className="ml-auto hidden bg-white py-1 px-3 rounded-xl text-[#135480] font-bold sm:block">
              {user ? (
                <div className="relative">
                  <button 
                       onClick={toggleDropdown}
                       className="flex margin-auto items-center text-gray-200 hover:text-white focus:outline-none">
                        {/* <img 
                        src={user.avatar || "https://via.placeholder.com/40"}
                        alt="user avatar"
                        className="w-8 h-8 rounded-full" /> */}
                        {/* <AccountCircleIcon /> */}
                        <span>{user.name || "User"}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                      <Link to="/dashboard" className="block px-4 py-2 text-gray-600 hover:text-gray-400 rounded-t-md">Dashboard</Link>
                      <Link to="/profile" className="block px-4 py-2 text-gray-600 hover:text-gray-400">User Profile</Link>
                      <button onClick={handleLogout} className="block w-full bg-[#135480] text-center px-4 py-2 text-white hover:text-red-700  hover:bg-white rounded-b-md">Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/Login" className="bg-white py-1 px-3 rounded-xl text-[#135480] font-bold hover:text-c">
                Login
              </Link>
              )}
            
            </div>
          </div>
          {isOpen && (
            <div className="sm:hidden">
              <div className="flex flex-col space-y-4 mt-4">
                <Link to="/" className="text-gray-200 hover:text-white">
                  Home
                </Link>
                <Link to="/ConsultParent" className="text-gray-200 hover:text-white">
                  Consult a Doctor
                </Link>
                <Link to="/About" className="text-gray-200 hover:text-white">
                  About us
                </Link>
                <Link to="/Welcomepage" className="text-gray-200 hover:text-white">
                  Our Blog
                </Link>
                <Link to="/testimonies" className="text-gray-200 hover:text-white">
                  Testimonies
                </Link>
                <Link to="/Login" className="text-gray-200 hover:text-white">
                  Sign-In
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
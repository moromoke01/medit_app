import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { BsPersonCircle, BsBell, BsHeart } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/ConsultSpecialist", label: "Consult Doctor" },
  { to: "/DoctorList", label: "Find Specialist" },
  { to: "/About", label: "About Us" },
  { to: "/Welcomepage", label: "Health Blog" },
  { to: "/testimonies", label: "Reviews" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
        : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isScrolled ? 'bg-blue-600' : 'bg-white/20 group-hover:bg-white/30'
              }`}>
                <span className="text-2xl font-bold text-white">M</span>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-blue-600' : 'text-white'
                }`}>
                  MEDIT
                </h1>
                <p className={`text-xs transition-colors duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-blue-100'
                }`}>
                  Healthcare Redefined
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                    isScrolled
                      ? isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      : isActive
                        ? 'text-white bg-white/20'
                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                      isScrolled ? 'bg-blue-600' : 'bg-white'
                    }`} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">

            {/* Notifications (if logged in) */}
            {user && (
              <button className={`p-2 rounded-lg transition-all duration-300 relative ${
                isScrolled
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}>
                <BsBell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  2
                </span>
              </button>
            )}

            {/* User Account */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={toggleDropdown}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                      <BsPersonCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="hidden md:block font-medium">
                      {user.name || "User"}
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.email || "user@example.com"}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span>Profile Settings</span>
                        </Link>
                        <Link
                          to="/appointments"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span>My Appointments</span>
                        </Link>
                        <Link
                          to="/favorites"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <BsHeart className="w-4 h-4" />
                          <span>Favorites</span>
                        </Link>
                      </div>
                      <div className="border-t border-gray-200">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                        >
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/Login"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isScrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/Signup"
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      isScrolled
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                        : 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white rounded-b-lg shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
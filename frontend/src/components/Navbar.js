import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { CgClipboard } from "react-icons/cg";
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Language from './Language';
import Profile from './Profile';

const Navbar = () => {

  const { isAuthenticated, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/home');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex justify-between items-center w-full md:w-auto">

          {/* Botão do menu mobile */}
          <Link to="/" className="flex items-center text-2xl md:text-3xl font-bold text-blue-600 hover:text-blue-700 transition duration-300">
            <img
              src="/images/Rental_Easy_Icon.png"
              alt="RentalEasy Logo"
              className="w-10 h-10 md:w-12 md:h-12  mx-4"
            />
            <span className="hidden md:inline">RentalEasy</span>
          </Link>
        </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mr-4 cursor-pointer text-gray-600 hover:text-blue-600 md:hidden"
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-blue-600 font-base">

          {isAuthenticated ? (
            <>

              <Link to="/managebookings" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <CgClipboard className="w-7 h-7" />
                {t('Manage Bookings')}
              </Link>

              <Language />

              <Profile />
            </>
          ) : (
            <>
              <Language />

              <Profile />
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed md:hidden top-0 right-0 h-full w-full bg-white shadow z-50 transition-transform duration-500 ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div 
            className="flex items-center justify-between p-4 border-b" 
            onClick={() => setIsOpen(false)}
          >
            <Link to="/" className="flex items-center text-2xl font-bold text-blue-600">
              <img
                src="/images/Rental_Easy_Icon.png"
                alt="RentalEasy Logo"
                className="w-10 h-10 md:w-12 md:h-12  mx-2"
              />
              RentalEasy
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-blue-600 mr-2"
              aria-label="Close Menu"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Links do menu mobile */}
          <div className="flex flex-col space-y-6 px-6 mt-6 text-gray-600 text-lg">

            {isAuthenticated ? (
              <>

                <Link to="/managebookings" className="text-gray-600 flex items-center" onClick={() => setIsOpen(false)}>
                  <CgClipboard className="w-6 h-6" />
                  {t('Manage Bookings')}
                </Link>
 
                <Language />

                <Profile closeMobileMenu={() => setIsOpen(false)} />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-800 font-medium text-lg"
                >
                  <FaSignOutAlt className="ml-2" /> {t('Log out')}
                </button>
              </>
            ) : (
              <>

                <Language />

                <Profile closeMobileMenu={() => setIsOpen(false)} />
              </>
            )}

          </div>
        </div>
      </div>

      {/* Overlay para fechar menu mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;

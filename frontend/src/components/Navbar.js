import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import Language from './Language';
import Profile from './Profile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        <div className="hidden md:flex items-center space-x-6 text-blue-600 font-bold text-xl">
          <Language />
          <Profile />
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
          <div className="flex flex-col space-y-6 px-6 mt-6 text-gray-600 font-bold text-2xl">
            <Link to="/items" className="hover:text-gray-700" onClick={() => setIsOpen(false)}>{t("Browse")}</Link>
            <Link to="/checkout" className="hover:text-gray-700" onClick={() => setIsOpen(false)}>{t("Checkout")}</Link>
            <Language />
            <Profile />
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

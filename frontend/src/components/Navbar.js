import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Language from './Language';
import Profile from './Profile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">

          {/* Botão do menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mr-4 cursor-pointer text-gray-600 hover:text-gray-800 md:hidden"
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-3xl md:text-2xl font-bold text-blue-600">
            RentalEasy
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-gray-800 font-bold text-xl">
          <Language />
          <Profile />
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed md:hidden top-0 left-0 h-full w-64 bg-white shadow z-50 transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              RentalEasy
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer text-gray-600 hover:text-gray-800"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-4 px-6 mt-6 text-gray-800 font-bold text-lg">
            <Link to="/items" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>{t("Browse")}</Link>
            <Link to="/checkout" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>{t("Checkout")}</Link>
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

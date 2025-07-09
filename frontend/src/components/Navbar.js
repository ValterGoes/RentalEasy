import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, UserCircle, Globe, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
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
        <div className="flex items-center space-x-4">
          <Globe size={24} className="cursor-pointer text-gray-600 hover:text-gray-800" />
          <UserCircle size={24} className="cursor-pointer text-gray-600 hover:text-gray-800" />
        </div>
        <div
          className={`flex flex-col md:flex-row md:items-center md:space-x-6 text-gray-800 font-bold text-xl fixed md:relative bg-white md:bg-transparent h-full md:h-auto w-full md:w-auto left-0 top-0 transition-transform duration-300 ease-in-out transform shadow md:shadow-none p-4 md:p-0 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between mb-4 md:hidden">
            <Link to="/" className="text-3xl font-bold text-blue-600">
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
          <Link
            to="/items"
            className="py-2 md:py-0 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Browse
          </Link>
          <Link
            to="/checkout"
            className="py-2 md:py-0 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Checkout
          </Link>
          <Link
            to="/login"
            className="py-2 md:py-0 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="py-2 md:py-0 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

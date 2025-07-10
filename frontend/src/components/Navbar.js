import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, UserCircle, Globe, X, LogOut } from 'lucide-react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsOpen(false);
      navigate('/');
    });
  };

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
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-gray-800 font-bold text-xl">
          <Link to="/items" className="hover:text-blue-500">Browse</Link>
          <Link to="/checkout" className="hover:text-blue-500">Checkout</Link>
          <Globe size={24} className="cursor-pointer text-gray-800 ml-3" />
          <div className="flex items-center space-x-1">
            <button
              className="flex items-center cursor-pointer text-gray-800 hover:text-blue-700 focus:outline-none"
              onClick={handleProfileClick}
            >
              <UserCircle size={24} />
              <span className="ml-1 text-base font-normal">
                {user
                  ? (user.displayName ? user.displayName : "My Account")
                  : "Log in | Register"}
              </span>
            </button>
            {user && (
              <button
                onClick={handleLogout}
                className="ml-4 text-red-500 hover:text-red-700 flex items-center"
                title="Log out"
              >
                <LogOut size={22} />
              </button>
            )}
          </div>
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
            <Link to="/items" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Browse</Link>
            <Link to="/checkout" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Checkout</Link>
            <div className="flex items-center space-x-3 mt-8">
              <Globe size={24} className="text-gray-800" />
              <button
                className="flex items-center cursor-pointer text-gray-800 hover:text-blue-700 focus:outline-none"
                onClick={() => { setIsOpen(false); handleProfileClick(); }}
              >
                <UserCircle size={24} />
                <span className="ml-1 text-base font-normal">
                  {user
                    ? (user.displayName ? user.displayName : "My Account")
                    : "Log in | Register"}
                </span>
              </button>
              {user && (
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="ml-2 text-red-500 hover:text-red-700 flex items-center"
                  title="Log out"
                >
                  <LogOut size={22} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Overlay for mobile menu */}
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

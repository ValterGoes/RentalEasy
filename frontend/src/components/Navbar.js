import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, UserCircle, Globe, X, LogOut, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'es', label: 'ES' },
];

const profileMenuItems = [
  { key: 'bookings', label: 'Bookings', to: '/bookings' },
  { key: 'subscriptions', label: 'Subscriptions', to: '/subscriptions' },
  { key: 'personal', label: 'Personal Details', to: '/personal-details' },
  { key: 'profiles', label: 'Profiles', to: '/profiles' },
  { key: 'help', label: 'Help', to: '/help' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const langRef = useRef();
  const profileRef = useRef();

  const { t, i18n } = useTranslation();

  // Detecta autenticação
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Fecha menus ao clicar fora
  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangMenuOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleProfileClick = () => {
    if (user) setProfileMenuOpen((open) => !open);
    else navigate("/login");
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setProfileMenuOpen(false);
      setIsOpen(false);
      navigate('/');
    });
  };
  

  const handleLangChange = (code) => {
    i18n.changeLanguage(code);
    setLangMenuOpen(false);
  };

  // Função para renderizar menu de perfil
  const renderProfileMenu = () => (
    <div className="absolute right-0 mt-2 w-56 rounded shadow bg-white border z-[999]">
      {profileMenuItems.map(item => (
        <Link
          to={item.to}
          key={item.key}
          className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
          onClick={() => setProfileMenuOpen(false)}
        >
          {t(item.label)}
        </Link>
      ))}
      <button
        onMouseDown={handleLogout}
        className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-red-50 font-semibold border-t"
      >
        <LogOut size={20} className="mr-2" />
        {t('Log out')}
      </button>

    </div>
  );

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
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
          {/* Idioma Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              className="flex items-center text-gray-800 hover:text-blue-600 focus:outline-none"
              onClick={() => setLangMenuOpen(v => !v)}
              type="button"
              aria-label="Select language"
            >
              <Globe size={24} />
              <span className="ml-1 text-base font-normal">
                {languages.find(l => l.code === i18n.language)?.label || 'Language'}
              </span>
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="2" d="M7 8l3 3 3-3" /></svg>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded shadow bg-white border z-[999]">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onMouseDown={() => handleLangChange(lang.code)}
                    className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${i18n.language === lang.code ? "bg-blue-100 text-blue-600 font-bold" : ""
                      }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Perfil + Logout Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center cursor-pointer text-gray-800 hover:text-blue-700 focus:outline-none"
              onClick={handleProfileClick}
            >
              <UserCircle size={24} />
              <span className="ml-1 text-base font-normal">
                {user
                  ? (user.displayName ? user.displayName : t("My Account"))
                  : t("Log in | Register")}
              </span>
              {user && <ChevronDown size={20} className="ml-2" />}
            </button>
            {user && profileMenuOpen && renderProfileMenu()}
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
            <Link to="/items" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>{t("Browse")}</Link>
            <Link to="/checkout" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>{t("Checkout")}</Link>
            
            {/* Idioma Dropdown Mobile */}
            <div className="relative" ref={langRef}>
              <button
                className="flex items-center text-gray-800 hover:text-blue-600 focus:outline-none"
                onClick={() => setLangMenuOpen(v => !v)}
                type="button"
                aria-label="Select language"
              >
                <Globe size={24} />
                <span className="ml-1 text-base font-normal">
                  {languages.find(l => l.code === i18n.language)?.label || 'Language'}
                </span>
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeWidth="2" d="M7 8l3 3 3-3" /></svg>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded shadow bg-white border z-50">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onMouseDown={() => handleLangChange(lang.code)}
                      className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${i18n.language === lang.code ? "bg-blue-100 text-blue-600 font-bold" : ""
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Perfil Dropdown Mobile */}
            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center cursor-pointer text-gray-800 hover:text-blue-700 focus:outline-none"
                onClick={handleProfileClick}
              >
                <UserCircle size={24} />
                <span className="ml-1 text-base font-normal">
                  {user
                    ? (user.displayName ? user.displayName : t("My Account"))
                    : t("Log in | Register")}
                </span>
                {user && <ChevronDown size={20} className="ml-2" />}
              </button>
              {user && profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded shadow bg-white border z-[999]">
                  {profileMenuItems.map(item => (
                    <Link
                      to={item.to}
                      key={item.key}
                      className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                      onClick={() => { setProfileMenuOpen(false); setIsOpen(false); }}
                    >
                      {t(item.label)}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-red-50 font-semibold border-t"
                  >
                    <LogOut size={20} className="mr-2" />
                    {t('Log out')}
                  </button>
                </div>
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

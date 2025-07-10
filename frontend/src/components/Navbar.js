import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, UserCircle, Globe, X, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'es', label: 'ES' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const langRef = useRef();

  const { t, i18n } = useTranslation();

  // Detecta autenticação
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Fecha menu de idioma ao clicar fora
  useEffect(() => {
    const handleClick = (e) => {
      // só fecha se não for botão de menu (evita conflito de clique)
      if (
        langRef.current &&
        !langRef.current.contains(e.target)
      ) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  

  const handleProfileClick = () => {
    if (user) navigate("/profile");
    else navigate("/login");
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsOpen(false);
      navigate('/');
    });
  };

  const handleLangChange = (code) => {
    i18n.changeLanguage(code);
    setLangMenuOpen(false);
  };

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
          <Link to="/items" className="hover:text-blue-500">{t("Browse")}</Link>
          <Link to="/checkout" className="hover:text-blue-500">{t("Checkout")}</Link>
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

          {/* Perfil + Logout */}
          <div className="flex items-center space-x-1">
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
            <div className="flex items-center space-x-3 mt-8">
              <button
                className="flex items-center cursor-pointer text-gray-800 hover:text-blue-700 focus:outline-none"
                onClick={() => { setIsOpen(false); handleProfileClick(); }}
              >
                <UserCircle size={24} />
                <span className="ml-1 text-base font-normal">
                  {user
                    ? (user.displayName ? user.displayName : t("My Account"))
                    : t("Log in | Register")}
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

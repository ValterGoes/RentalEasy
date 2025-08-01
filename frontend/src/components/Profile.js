import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaRegUserCircle, FaChevronDown } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const profileMenuItems = [
    { key: 'managebookings', label: 'Manage Bookings', to: '/managebookings' },
    { key: 'subscriptions', label: 'Subscriptions', to: '/subscriptions' },
    { key: 'personal', label: 'Personal Details', to: '/personal-details' },
    { key: 'profiles', label: 'Profiles', to: '/profiles' },
    { key: 'help', label: 'Help', to: '/help' },
];

const Profile = ({ mobile, closeMobileMenu }) => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const profileRef = useRef();
    const { t } = useTranslation();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => setUser(u));
        return () => unsub();
    }, []);

    useEffect(() => {
        const handleClick = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleProfileClick = () => {
        if (user) setProfileMenuOpen((open) => !open);
        else navigate("/login");
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setProfileMenuOpen(false);
            if (mobile && closeMobileMenu) closeMobileMenu();
            navigate('/');
        } catch (err) {
            console.error("Erro ao deslogar:", err);
        }
    };
      
    
    const renderProfileMenu = () => (
        <div className="absolute left-0 w-56 rounded shadow bg-white border z-[999]">
            {profileMenuItems.map(item => (
                <Link
                    to={item.to}
                    key={item.key}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-600"
                    onClick={() => {
                        setProfileMenuOpen(false);
                        if (mobile && closeMobileMenu) closeMobileMenu();
                    }}
                >
                    {t(item.label)}
                </Link>
            ))}
            <button
                onMouseDown={handleLogout}
                className="flex items-center w-full px-4 py-2 text-left text-blue-600 hover:bg-red-50 font-semibold border-t"
            >
                <FaSignOutAlt size={20} className="mr-2" />
                {t('Log out')}
            </button>
        </div>
    );

    return (
        <div className="relative" ref={profileRef}>
            <button
                className="flex items-center cursor-pointer text-gray-600 hover:text-gray-700 md:text-blue-600 md:hover:text-blue-700 focus:outline-none"
                onClick={handleProfileClick}
            >
                <FaRegUserCircle size={24} />
                <span className="ml-1 text-[18px]md:text-lg">
                    {user
                        ? (user.displayName ? user.displayName : t("My Account"))
                        : t("Log in | Register")}
                </span>
                {user && <FaChevronDown size={20} className="ml-2" />}
            </button>
            {user && profileMenuOpen && renderProfileMenu()}
        </div>
    );
};

export default Profile;

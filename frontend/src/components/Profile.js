import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle, ChevronDown, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const profileMenuItems = [
    { key: 'bookings', label: 'Bookings', to: '/bookings' },
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
        <div className="absolute right-0 mt-2 w-56 rounded shadow bg-white border z-[999]">
            {profileMenuItems.map(item => (
                <Link
                    to={item.to}
                    key={item.key}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
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
                className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-red-50 font-semibold border-t"
            >
                <LogOut size={20} className="mr-2" />
                {t('Log out')}
            </button>
        </div>
    );

    return (
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
    );
};

export default Profile;

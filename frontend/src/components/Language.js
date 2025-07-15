// src/components/Language.js
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LuGlobe } from "react-icons/lu";

const languages = [
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'pt', label: 'PT', full: 'Português' },
    { code: 'es', label: 'ES', full: 'Español' },
];

const Language = () => {
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const langRef = useRef();
    const { i18n } = useTranslation();

    // Fecha dropdown ao clicar fora
    useEffect(() => {
        const handleClick = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) {
                setLangMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleLangChange = (code) => {
        i18n.changeLanguage(code);
        setLangMenuOpen(false);
    };

    return (
        <div className="relative" ref={langRef}>
            <button
                className="flex items-center text-gray-800 hover:text-blue-600 focus:outline-none"
                onClick={() => setLangMenuOpen((v) => !v)}
                type="button"
                aria-label="Select language"
            >
                <LuGlobe size={24} />
                <span className="ml-1 text-base font-normal">
                    {languages.find((l) => l.code === i18n.language)?.label || "EN"}
                </span>
                <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M7 8l3 3 3-3"
                    />
                </svg>
            </button>
            {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded shadow bg-white border z-[999]">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onMouseDown={() => handleLangChange(lang.code)}
                            className={`block w-full text-left px-4 py-2 hover:bg-blue-50 ${i18n.language === lang.code
                                    ? "bg-blue-100 text-blue-600 font-bold"
                                    : ""
                                }`}
                        >
                            {lang.full}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Language;

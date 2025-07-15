import { useState, useRef, useEffect } from "react";
import { FaMapPin } from "react-icons/fa";

export default function LocationInput({
    label,
    value,
    onChange,
    placeholder,
    disabled,
    suggestions = [],
}) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef();
    const suggestionsRef = useRef();

    const filtered = value
        ? suggestions.filter(loc => loc.toLowerCase().includes(value.toLowerCase()))
        : suggestions;


    useEffect(() => {
        function handleClickOutside(e) {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(e.target) &&
                inputRef.current &&
                !inputRef.current.contains(e.target)
            ) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col min-w-[220px] w-full relative">
            {label && <label className="text-xs font-semibold mb-1 text-left block">{label}</label>}
            <div className="flex items-center border rounded-xl px-2 bg-gray-50 h-12 flex-1 focus-within:ring-2 focus-within:ring-blue-600">
                <FaMapPin className="text-gray-400 mr-2" size={18} />
                <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full bg-transparent py-2 focus:outline-none"
                    value={value}
                    onChange={e => {
                        onChange(e.target.value);
                        setShowSuggestions(true);
                    }}
                    disabled={disabled}
                    ref={inputRef}
                    autoComplete="off"
                    onFocus={() => setShowSuggestions(true)}
                />
            </div>
            {showSuggestions && filtered.length > 0 && (
                <ul
                    ref={suggestionsRef}
                    className="absolute left-0 right-0 mt-14 bg-white border rounded-xl shadow-lg z-[1000] max-h-60 overflow-auto"
                >
                    {filtered.map((loc, i) => (
                        <li
                            key={i}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                            onMouseDown={() => {
                                onChange(loc);
                                setShowSuggestions(false);
                            }}
                        >
                            {loc}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

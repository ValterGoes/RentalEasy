import { useState, useEffect } from "react";
import {
    MapPin, Bike, Car, Caravan, Wrench,
    Search, Loader2, PlusCircle, ArrowLeft, CalendarDays, Clock
} from "lucide-react";

// Utilitário para datas no formato YYYY-MM-DD
function getDateString(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().slice(0, 10);
}

const categoryOptions = [
    { label: "Bikes", icon: <Bike size={20} /> },
    { label: "Cars", icon: <Car size={20} /> },
    { label: "RVs", icon: <Caravan size={20} /> },
    { label: "Tools", icon: <Wrench size={20} /> },
];

const AdvancedFilter = ({ onSearch }) => {
    const [location, setLocation] = useState("");
    const [diffReturn, setDiffReturn] = useState(false);
    const [returnLocation, setReturnLocation] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [pickupDate, setPickupDate] = useState(getDateString(0));
    const [pickupTime, setPickupTime] = useState('');
    const [returnDate, setReturnDate] = useState(getDateString(1));
    const [returnTime, setReturnTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 100);
    }, []);

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            onSearch({
                location,
                returnLocation: diffReturn ? returnLocation : location,
                categories: selectedCategories,
                pickupDate,
                pickupTime,
                returnDate,
                returnTime,
            });
            setLoading(false);
        }, 1200);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`
        bg-white shadow-lg rounded-xl px-4 py-4 max-w-6xl w-full mx-auto mt-6
        flex flex-col gap-4
        transition-all duration-700
        ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
      `}
            style={{ pointerEvents: loading ? "none" : "auto", opacity: loading ? 0.7 : 1 }}
        >
            {/* Categorias */}
            <div className="flex flex-wrap gap-2 justify-start w-full mb-2">
                {categoryOptions.map(({ label, icon }) => (
                    <button
                        key={label}
                        type="button"
                        className={`flex items-center justify-center px-6 py-2 rounded-3xl font-semibold
              ${selectedCategories.includes(label)
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-800 border border-gray-800 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                            } hover:bg-blue-100 transition`}
                        onClick={() => handleCategoryToggle(label)}
                        disabled={loading}
                    >
                        {icon}
                        <span className="text-sm ml-2">{label}</span>
                    </button>
                ))}
            </div>

            {/* Linha principal */}
            <div className="flex flex-col md:flex-row gap-4 w-full items-end">
                {/* Localização + botão Different return location */}
                {/* Location */}
                <div className="flex-1 min-w-[220px] flex flex-col">
                    <label className="text-xs font-semibold mb-1 text-left block">Pick-up & Return Location</label>
                    <div className="flex items-center gap-2 w-full">
                        <div className="flex items-center border rounded-xl px-2 bg-gray-50 h-12 flex-1 focus-within:ring-2 focus-within:ring-blue-600">
                            <MapPin className="text-gray-400 mr-2" size={18} />
                            <input
                                type="text"
                                placeholder="Enter location"
                                className="w-full bg-transparent py-2 focus:outline-none"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                disabled={loading}
                                autoFocus={!diffReturn}
                            />
                        </div>
                        {!diffReturn ? (
                            <button
                                type="button"
                                className="flex items-center text-blue-600 hover:text-blue-800 transition text-xs font-medium whitespace-nowrap h-12 px-3"
                                onClick={() => setDiffReturn(true)}
                                disabled={loading}
                                style={{ minWidth: 180 }}
                            >
                                <PlusCircle size={18} className="mr-1" />
                                Different return location
                            </button>
                        ) : (
                            <div className="flex items-center h-12 px-3 bg-gray-50 border rounded-xl min-w-[170px] focus-within:ring-2 focus-within:ring-blue-600">
                                <MapPin className="text-gray-400 mr-2" size={20} />
                                <input
                                    type="text"
                                    placeholder="Return location"
                                    className="w-full bg-transparent py-2 focus:outline-none"
                                    value={returnLocation}
                                    onChange={(e) => setReturnLocation(e.target.value)}
                                    disabled={loading}
                                    autoFocus={diffReturn}
                                />
                                <button
                                    type="button"
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                    onClick={() => setDiffReturn(false)}
                                    disabled={loading}
                                    tabIndex={-1}
                                    aria-label="Back"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pick-up */}
                <div className="w-[230px]">
                    <label className="text-xs font-semibold mb-1 text-left block">Pick-up date</label>
                    <div className="flex items-center border rounded-xl bg-gray-50 h-12 px-2 focus-within:ring-2 focus-within:ring-blue-600">
                        <input
                            type="date"
                            className="w-[115px] bg-transparent focus:outline-none text-black"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            disabled={loading}
                        />
                        <span className="mx-2 h-6 border-l border-gray-200" />
                        <input
                            type="time"
                            className="w-[70px] bg-transparent focus:outline-none text-black"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Return */}
                <div className="w-[230px]">
                    <label className="text-xs font-semibold mb-1 text-left block">Return date</label>
                    <div className="flex items-center border rounded-xl bg-gray-50 h-12 px-2 focus-within:ring-2 focus-within:ring-blue-600">
                        <input
                            type="date"
                            className="w-[115px] bg-transparent focus:outline-none text-black"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            disabled={loading}
                        />
                        <span className="mx-2 h-6 border-l border-gray-200" />
                        <input
                            type="time"
                            className="w-[70px] bg-transparent focus:outline-none text-black"
                            value={returnTime}
                            onChange={(e) => setReturnTime(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </div>


                {/* Botão Search */}
                <div className="flex items-end">
                    <button
                        type="submit"
                        className="flex items-center justify-end h-12 px-7 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 transition disabled:opacity-60 w-auto"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin mr-2" size={22} />
                                Searching...
                            </>
                        ) : (
                            <>
                                <Search className="mr-2" size={22} />
                                Show cars
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AdvancedFilter;

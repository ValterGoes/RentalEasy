// src/components/AdvancedFilter.js
import { useState } from "react";
import CategorySelector from './CategorySelector';
import LocationInput from './LocationInput';
import DateTimeRange from './DateTimeRange';
import { Bike, Car, Caravan, Wrench, PlusCircle, ArrowLeft } from "lucide-react";

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

const AdvancedFilter = ({ onSearch, availableLocations }) => {
    const [location, setLocation] = useState("");
    const [diffReturn, setDiffReturn] = useState(false);
    const [returnLocation, setReturnLocation] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [pickupDate, setPickupDate] = useState(getDateString(0));
    const [pickupTime, setPickupTime] = useState('');
    const [returnDate, setReturnDate] = useState(getDateString(1));
    const [returnTime, setReturnTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

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
            setShowModal(false);
        }, 1200);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl px-4 py-4 max-w-6xl w-full mx-auto flex flex-col gap-2"
        >
            <CategorySelector
                options={categoryOptions}
                selected={selectedCategories}
                onToggle={handleCategoryToggle}
                disabled={loading}
            />

            <LocationInput
                label="Pick-up & Return Location"
                value={location}
                onChange={setLocation}
                placeholder="Enter location"
                disabled={loading}
                suggestions={availableLocations}
            />

            {/* Different return location */}
            <div className="flex flex-col w-full">
                {!diffReturn ? (
                    <button
                        type="button"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition text-xs font-medium whitespace-nowrap h-10 px-3 mt-2 self-end"
                        onClick={() => setDiffReturn(true)}
                        disabled={loading}
                        style={{ minWidth: 180 }}
                    >
                        <PlusCircle size={18} className="mr-1" />
                        Different return location
                    </button>
                ) : (
                    <div className="flex items-center h-12 px-3 bg-gray-50 border rounded-xl min-w-[170px] focus-within:ring-2 focus-within:ring-blue-600 mt-2 relative w-full">
                        <LocationInput
                            label="Pick-up & Return Location"
                            value={location}
                            onChange={setLocation}
                            placeholder="Enter location"
                            disabled={loading}
                            suggestions={availableLocations}
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

            {/* Mobile: Botão para abrir datas/horas no modal */}
            <div className="block md:hidden mt-3">
                <button
                    type="button"
                    className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold text-lg hover:bg-blue-800 transition"
                    onClick={() => setShowModal(true)}
                >
                    Select pick-up & return
                </button>
            </div>

            {/* Desktop: Campos de datas/horas e Search sempre visíveis */}
            <div className="hidden md:flex">
                <DateTimeRange
                    pickupDate={pickupDate}
                    setPickupDate={setPickupDate}
                    pickupTime={pickupTime}
                    setPickupTime={setPickupTime}
                    returnDate={returnDate}
                    setReturnDate={setReturnDate}
                    returnTime={returnTime}
                    setReturnTime={setReturnTime}
                    loading={loading}
                    onSubmit={handleSubmit}
                />
            </div>

            {/* Modal para datas/horas no mobile */}
            {showModal && (
                <DateTimeRange
                    pickupDate={pickupDate}
                    setPickupDate={setPickupDate}
                    pickupTime={pickupTime}
                    setPickupTime={setPickupTime}
                    returnDate={returnDate}
                    setReturnDate={setReturnDate}
                    returnTime={returnTime}
                    setReturnTime={setReturnTime}
                    loading={loading}
                    onSubmit={handleSubmit}
                    modal={showModal}
                    setModal={setShowModal}
                />
            )}
        </form>
    );
};

export default AdvancedFilter;

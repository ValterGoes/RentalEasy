import { useState } from "react";
import CategorySelector from './CategorySelector';
import LocationInput from './LocationInput';
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

    // Controle do modal mobile e passo
    const [showMobileModal, setShowMobileModal] = useState(false);
    const [mobileStep, setMobileStep] = useState(1); // 1 = categorias + botão, 2 = filtro completo

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
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
            setShowMobileModal(false);
            setMobileStep(1);
        }, 800);
    };

    return (
        <>
            {/* DESKTOP */}
            <div className="hidden md:block">
                <div className="bg-white shadow-lg rounded-xl px-4 py-4 max-w-6xl w-full mx-auto">
                    <CategorySelector
                        options={categoryOptions}
                        selected={selectedCategories}
                        onToggle={handleCategoryToggle}
                        disabled={loading}
                        className="justify-start"
                    />
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row gap-4 w-full items-end">
                            <div className="flex-[2] flex items-end gap-2">
                                {!diffReturn ? (
                                    <>
                                        <div className="flex-1">
                                            <LocationInput
                                                label="Pick-up & Return Location"
                                                value={location}
                                                onChange={setLocation}
                                                placeholder="Enter location"
                                                disabled={loading}
                                                suggestions={availableLocations}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="flex items-center text-blue-600 hover:text-blue-800 text-xs ml-2 whitespace-nowrap"
                                            onClick={() => setDiffReturn(true)}
                                            disabled={loading}
                                            style={{ height: 48 }}
                                        >
                                            <PlusCircle size={18} className="mr-1" />
                                            Different return location
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex-1">
                                            <LocationInput
                                                label="Return Location"
                                                value={returnLocation}
                                                onChange={setReturnLocation}
                                                placeholder="Enter return location"
                                                disabled={loading}
                                                suggestions={availableLocations}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="text-blue-600 hover:text-blue-800 ml-2"
                                            onClick={() => setDiffReturn(false)}
                                            disabled={loading}
                                            style={{ height: 48 }}
                                            aria-label="Back"
                                        >
                                            <ArrowLeft size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                            {/* Pick-up */}
                            <div className="flex flex-col items-center min-w-[145px]">
                                <label className="text-xs font-semibold mb-1 block text-center">Pick-up</label>
                                <div className="flex gap-2 w-full">
                                    <input
                                        type="date"
                                        className="bg-gray-50 border rounded py-2 px-2 w-[115px] text-center"
                                        value={pickupDate}
                                        onChange={e => setPickupDate(e.target.value)}
                                        disabled={loading}
                                    />
                                    <input
                                        type="time"
                                        className="bg-gray-50 border rounded py-2 px-2 w-[90px] text-center"
                                        value={pickupTime}
                                        onChange={e => setPickupTime(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            {/* Return */}
                            <div className="flex flex-col items-center min-w-[145px]">
                                <label className="text-xs font-semibold mb-1 block text-center">Return</label>
                                <div className="flex gap-2 w-full">
                                    <input
                                        type="date"
                                        className="bg-gray-50 border rounded py-2 px-2 w-[115px] text-center"
                                        value={returnDate}
                                        onChange={e => setReturnDate(e.target.value)}
                                        disabled={loading}
                                    />
                                    <input
                                        type="time"
                                        className="bg-gray-50 border rounded py-2 px-2 w-[90px] text-center"
                                        value={returnTime}
                                        onChange={e => setReturnTime(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            {/* Search */}
                            <div>
                                <button
                                    type="submit"
                                    className="h-12 px-10 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 transition disabled:opacity-60 mt-5 md:mt-7"
                                    disabled={loading}
                                    style={{ minWidth: 130 }}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* MOBILE */}
            <div className="md:hidden">
                {/* Passo 1: categorias + botão */}
                {!showMobileModal && mobileStep === 1 && (
                    <div className="bg-white shadow-lg rounded-xl px-6 py-4 max-w-md w-full mx-auto mb-4">
                        <CategorySelector
                            options={categoryOptions}
                            selected={selectedCategories}
                            onToggle={handleCategoryToggle}
                            disabled={loading}
                        />
                        <button
                            className="w-full bg-blue-600 text-white rounded-xl py-3 px-12 font-bold"
                            onClick={() => { setShowMobileModal(true); setMobileStep(2); }}
                        >
                            Select pickup
                        </button>
                    </div>
                )}

                {/* Passo 2: modal tela cheia */}
                {showMobileModal && mobileStep === 2 && (
                    <div className="fixed left-0 right-0 top-0 bottom-0 bg-white z-[10000] min-h-[100vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b">
                            <span className="font-bold text-xl">Rental filter</span>
                            <button className="text-3xl" onClick={() => { setShowMobileModal(false); setMobileStep(1); }}>&times;</button>
                        </div>
                        <div className="p-4 flex-1">
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
                            {!diffReturn ? (
                                <button
                                    type="button"
                                    className="flex items-center text-blue-600 hover:text-blue-800 text-xs mt-2 mb-4"
                                    onClick={() => setDiffReturn(true)}
                                    disabled={loading}
                                >
                                    <PlusCircle size={18} className="mr-1" />
                                    Different return location
                                </button>
                            ) : (
                                <div className="flex items-center gap-2 mb-4">
                                    <LocationInput
                                        label="Return Location"
                                        value={returnLocation}
                                        onChange={setReturnLocation}
                                        placeholder="Enter return location"
                                        disabled={loading}
                                        suggestions={availableLocations}
                                    />
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => setDiffReturn(false)}
                                        disabled={loading}
                                        aria-label="Back"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                </div>
                            )}
                            <div className="flex flex-row gap-4 mb-8">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2 text-center">Pick-up</label>
                                    <input
                                        type="date"
                                        className="bg-gray-50 border rounded py-2 px-2 w-full mb-2"
                                        value={pickupDate}
                                        onChange={e => setPickupDate(e.target.value)}
                                        disabled={loading}
                                    />
                                    <input
                                        type="time"
                                        className="bg-gray-50 border rounded py-2 px-2 w-full text-center"
                                        value={pickupTime}
                                        onChange={e => setPickupTime(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-bold mb-2 text-center">Return</label>
                                    <input
                                        type="date"
                                        className="bg-gray-50 border rounded py-2 px-2 w-full mb-2"
                                        value={returnDate}
                                        onChange={e => setReturnDate(e.target.value)}
                                        disabled={loading}
                                    />
                                    <input
                                        type="time"
                                        className="bg-gray-50 border rounded py-2 px-2 w-full text-center"
                                        value={returnTime}
                                        onChange={e => setReturnTime(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="w-full bg-blue-600 text-white rounded-xl py-3 px-12 font-bold transition mb-3 tracking-wide"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                Show
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdvancedFilter;

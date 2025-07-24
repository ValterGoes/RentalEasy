import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import CategorySelector from './CategorySelector';
import LocationInput from './LocationInput';
import { FaPlusCircle, FaArrowLeft } from "react-icons/fa";


const AdvancedFilterDesktop = ({
    categoryOptions,
    selectedCategories,
    handleCategoryToggle,
    loading,
    location,
    setLocation,
    availableLocations,
    diffReturn,
    setDiffReturn,
    returnLocation,
    setReturnLocation,
    pickupDate,
    setPickupDate,
    pickupTime,
    setPickupTime,
    returnDate,
    setReturnDate,
    returnTime,
    setReturnTime
}) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleShowItems = () => {
        
        let finalReturnLocation = returnLocation;
        if (!diffReturn || !returnLocation) { 
            finalReturnLocation = location;
        }

        const params = new URLSearchParams();
        if (location) params.append("location", location); 
        if (selectedCategories.length > 0) params.append("categories", selectedCategories.join(","));
        if (pickupDate) params.append("pickupDate", pickupDate);
        if (pickupTime) params.append("pickupTime", pickupTime);
        if (returnDate) params.append("returnDate", returnDate);
        if (returnTime) params.append("returnTime", returnTime);
        if (finalReturnLocation) params.append("returnLocation", finalReturnLocation); 

        console.log("AdvancedFilterDesktop - Parâmetros enviados para /items:", params.toString());

        if (user) {
            navigate(`/items?${params.toString()}`);
        } else {
            navigate(`/items?${params.toString()}`);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl px-4 py-4 max-w-7xl w-full mx-auto">
            <CategorySelector
                options={categoryOptions}
                selected={selectedCategories}
                onToggle={handleCategoryToggle}
                disabled={loading}
                className="justify-start"
            />

            <form onSubmit={(e) => e.preventDefault()}> 
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
                                    <FaPlusCircle size={18} className="mr-1" />
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
                                    <FaArrowLeft size={20} />
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col items-center min-w-[145px]">
                        <label className="text-xs font-semibold mb-1 block text-center">Pick-up</label>
                        <div className="flex gap-2 w-full">
                            <input
                                type="date"
                                className="bg-gray-50 border rounded py-2 px-2 w-[115px] text-center text-[14px]"
                                value={pickupDate}
                                onChange={e => setPickupDate(e.target.value)}
                                disabled={loading}
                            />
                            <input
                                type="time"
                                className="bg-gray-50 border rounded py-2 px-2 text-center"
                                value={pickupTime}
                                onChange={e => setPickupTime(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center min-w-[145px]">
                        <label className="text-xs font-semibold mb-1 block text-center">Return</label>
                        <div className="flex gap-2 w-full">
                            <input
                                type="date"
                                className="bg-gray-50 border rounded py-2 px-2 w-[115px] text-center text-[14px]"
                                value={returnDate}
                                onChange={e => setReturnDate(e.target.value)}
                                disabled={loading}
                            />
                            <input
                                type="time"
                                className="bg-gray-50 border rounded py-2 px-2 text-center"
                                value={returnTime}
                                onChange={e => setReturnTime(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="h-12 px-10 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 transition disabled:opacity-60 mt-5 md:mt-7"
                            disabled={loading}
                            style={{ minWidth: 130 }}
                            onClick={handleShowItems}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdvancedFilterDesktop;
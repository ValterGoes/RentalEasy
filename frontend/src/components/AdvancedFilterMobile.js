import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import CategorySelector from './CategorySelector';
import LocationInput from './LocationInput';
import { FaPlusCircle, FaArrowLeft } from "react-icons/fa";


const MobileStepOne = ({
    categoryOptions,
    selectedCategories,
    handleCategoryToggle,
    loading,
    onNext
}) => (
    <div className="bg-white shadow-lg rounded-xl px-6 py-6 max-w-md w-full mx-auto">
        <CategorySelector
            options={categoryOptions}
            selected={selectedCategories}
            onToggle={handleCategoryToggle}
            disabled={loading}
        />
        <button
            className="w-full bg-blue-600 text-white rounded-xl py-3 px-12 font-bold"
            onClick={onNext}
        >
            Select pickup
        </button>
    </div>
);

const MobileStepTwo = ({
    categoryOptions, selectedCategories, handleCategoryToggle, loading,
    location, setLocation, availableLocations,
    diffReturn, setDiffReturn,
    returnLocation, setReturnLocation,
    pickupDate, setPickupDate,
    pickupTime, setPickupTime,
    returnDate, setReturnDate,
    returnTime, setReturnTime,
    onClose, onShow
}) => (
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-white z-[10000] min-h-[100vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
            <span className="font-bold text-xl">Rental filter</span>
            <button className="text-3xl" onClick={onClose}>&times;</button>
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
                    <FaPlusCircle size={18} className="mr-1" />
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
                        <FaArrowLeft size={20} />
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
                className="w-full bg-blue-600 text-white rounded-xl py-3 px-12 font-bold"
                onClick={onShow}
                disabled={loading}
            >
                Show
            </button>
        </div>
    </div>
);

const AdvancedFilterMobile = (props) => {
    const [showMobileModal, setShowMobileModal] = useState(false);
    const [mobileStep, setMobileStep] = useState(1);

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleShowItems = () => {

        let { location, selectedCategories, pickupDate, pickupTime, returnDate, returnTime, returnLocation, diffReturn } = props;

        if (!diffReturn || !returnLocation) {
            returnLocation = location;
        }

        console.log("AdvancedFilterMobile - Valores antes de adicionar aos params:");
        console.log("  location:", location);
        console.log("  returnLocation (final):", returnLocation);
        console.log("  pickupDate:", pickupDate);
        console.log("  pickupTime:", pickupTime);
        console.log("  returnDate:", returnDate);
        console.log("  returnTime:", returnTime);
        console.log("  diffReturn (original):", diffReturn);

        const params = new URLSearchParams();

        if (location) params.append("location", location);
        if (selectedCategories.length > 0) params.append("categories", selectedCategories.join(","));
        if (pickupDate) params.append("pickupDate", pickupDate);
        if (pickupTime) params.append("pickupTime", pickupTime);
        if (returnDate) params.append("returnDate", returnDate);
        if (returnTime) params.append("returnTime", returnTime);
        if (returnLocation) params.append("returnLocation", returnLocation);

        console.log("AdvancedFilterMobile - Parâmetros enviados para /items:", params.toString());

        setShowMobileModal(false);
        setMobileStep(1);

        if (user) {
            navigate(`/items?${params.toString()}`);
        } else {
            // navigate(`/login?redirect=/items?${params.toString()}`);
            navigate(`/items?${params.toString()}`);
        }
    };

    return (
        <>
            {!showMobileModal && mobileStep === 1 && (
                <MobileStepOne
                    {...props}
                    onNext={() => { setShowMobileModal(true); setMobileStep(2); }}
                />
            )}

            {showMobileModal && mobileStep === 2 && (
                <MobileStepTwo
                    {...props}
                    onClose={() => { setShowMobileModal(false); setMobileStep(1); }}
                    onShow={handleShowItems}
                />
            )}
        </>
    );
};

export default AdvancedFilterMobile;
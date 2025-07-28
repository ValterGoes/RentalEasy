import React from 'react';
import LocationInput from './LocationInput'; 
import { FaPlusCircle, FaArrowLeft } from 'react-icons/fa'; 

const ReservationLocations = ({
    pickupLocation, 
    returnLocation,
    isReturnLocationDifferent,
    setIsReturnLocationDifferent,
    updateFields,
    availableLocations
}) => {
    return (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg border gap-4 flex flex-col">
            {!isReturnLocationDifferent ? (
                <>
                    <LocationInput
                        label="Pickup / Return Location"
                        value={pickupLocation}
                        onChange={val => updateFields({ pickupLocation: val, returnLocation: val })}
                        placeholder="Enter pickup/return location"
                        suggestions={availableLocations}
                        required
                    />
                    <button
                        type="button"
                        className="flex items-center text-blue-600 hover:text-blue-800 text-xs mt-0 mb-2"
                        onClick={() => setIsReturnLocationDifferent(true)}
                    >
                        <FaPlusCircle size={18} className="mr-1" />
                        Different return location
                    </button>
                </>
            ) : (
                <div className="flex flex-col gap-2">
                    <LocationInput
                        label="Pickup Location"
                        value={pickupLocation}
                        onChange={val => updateFields({ pickupLocation: val })}
                        placeholder="Enter pickup location"
                        suggestions={availableLocations}
                        required
                    />
                    <div className="flex items-center gap-2">
                        <LocationInput
                            label="Return Location"
                            value={returnLocation}
                            onChange={val => updateFields({ returnLocation: val })}
                            placeholder="Enter return location"
                            suggestions={availableLocations}
                            required
                        />
                        <button
                            type="button"
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => {
                                setIsReturnLocationDifferent(false);
                                updateFields({ returnLocation: pickupLocation });
                            }}
                            aria-label="Use same return location"
                        >
                            <FaArrowLeft size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservationLocations;
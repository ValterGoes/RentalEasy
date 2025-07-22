import { useState } from "react";

const AddressFields = ({ formData, updateFields}) => {


    return (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
            <div className="font-bold text-blue-600 mb-2">Address</div>
            <input
                type="text"
                className="border rounded px-2 py-2 mb-2 w-full"
                placeholder="Street Address"
                value={formData.address}
                onChange={e => updateFields({ address: e.target.value})}
                required
            />

            <div className="flex flex-wrap gap-2 mb-2">
                <input
                    type="text"
                    className="border rounded px-2 py-2 flex-1 min-w-[100px]"
                    placeholder="City"
                    value={formData.city}
                    onChange={e => updateFields({ city: e.target.value })}
                    required
                />
                <input
                    type="text"
                    className="border rounded px-2 py-2 w-full sm:w-auto flex-none basis-24"
                    placeholder="State"
                    value={formData.state}
                    onChange={e => updateFields({ state: e.target.value })}
                    required
                />
            </div>

            <div className="flex flex-wrap gap-2">
                <input
                    type="text"
                    className="border rounded px-2 py-2 flex-none basis-32"
                    placeholder="ZIP"
                    value={formData.zip}
                    onChange={e => updateFields({ zip: e.target.value })}
                    required
                />
                <input
                    type="text"
                    className="border rounded px-2 py-2 flex-1 min-w-[100px]"
                    placeholder="Country"
                    value={formData.countryAddress}
                    onChange={e => updateFields({ countryAddress: e.target.value })}
                    required
                />
            </div>
        </div>
    );
};

export default AddressFields;
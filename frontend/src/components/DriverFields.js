
const DriverFields = ({ formData, updateFields}) => {

    return (

        <>
            <label className="font-bold text-blue-600">Driver Information</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input 
                type="text" 
                className="border rounded-lg px-2 py-2" 
                placeholder="First Name" 
                value={formData.firstName} 
                onChange={e => updateFields({ firstName: e.target.value })} 
                required />

                <input 
                type="text" 
                className="border rounded-lg px-2 py-2" 
                placeholder="Last Name" 
                value={formData.lastName} 
                    onChange={e => updateFields({ lastName: e.target.value })} 
                required />
            </div>

            <input 
                type="email" 
                className="border rounded-lg px-2 py-2" 
                placeholder="Email" 
                value={formData.email} 
                onChange={e => updateFields({ email: e.target.value })} 
                required 
            />

            <input 
                type="tel" 
                className="border rounded-lg px-2 py-2" 
                placeholder="Phone Number" 
                value={formData.phone} 
                onChange={e => updateFields({ phone: e.target.value })} 
                required 
            />

            {/* Preferência de notificação */}
            <div className="flex gap-3 items-center">
                <label className="font-semibold">Reservation info by email?</label>
                <label className="flex items-center gap-1">
                    <input 
                        type="radio" 
                        value="yes"
                        checked={formData.notify === "yes"}
                        onChange={() => updateFields({ notify: "yes"})} 
                    />
                    Yes
                </label>
                <label className="flex items-center gap-1">
                    <input 
                        type="radio" 
                        value="no" 
                        checked={formData.notify === "no"}
                        onChange={() => updateFields({ notify: "no" })}
                    />
                    No
                </label>
            </div>

            {/* Confirmação maior de idade */}
            <div className="flex items-center gap-3">
                <label className="flex items-center gap-1">
                    <input 
                        type="checkbox" 
                        checked={formData.isAdult}
                        onChange={e => updateFields({ isAdult: e.target.checked })} 
                        required 
                    />
                    I confirm I am over 18 years old
                </label>
            </div>

            {/* Address Fields */}
            <div className="font-semibold my-2">Address</div>
            <input
                type="text"
                className="border rounded-lg px-2 py-2 mb-2 w-full"
                placeholder="Street Address"
                value={formData.address}
                onChange={e => updateFields({ address: e.target.value })}
                required
            />

            <div className="flex flex-wrap gap-2 mb-2">
                <input
                    type="text"
                    className="border rounded-lg px-2 py-2 flex-1 min-w-[100px]"
                    placeholder="City"
                    value={formData.city}
                    onChange={e => updateFields({ city: e.target.value })}
                    required
                />
                <input
                    type="text"
                    className="border rounded-lg px-2 py-2 w-full sm:w-auto flex-none basis-24"
                    placeholder="State"
                    value={formData.state}
                    onChange={e => updateFields({ state: e.target.value })}
                    required
                />
            </div>

            <div className="flex flex-wrap gap-2">
                <input
                    type="text"
                    className="border rounded-lg px-2 py-2 flex-none basis-32"
                    placeholder="ZIP"
                    value={formData.zip}
                    onChange={e => updateFields({ zip: e.target.value })}
                    required
                />
                <input
                    type="text"
                    className="border rounded-lg px-2 py-2 flex-1 min-w-[100px]"
                    placeholder="Country"
                    value={formData.countryAddress}
                    onChange={e => updateFields({ countryAddress: e.target.value })}
                    required
                />
            </div>
        </>
    );
};

export default DriverFields;
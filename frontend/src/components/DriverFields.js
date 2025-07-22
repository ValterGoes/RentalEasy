
const DriverFields = ({ formData, updateFields}) => {

    return (

        <>
            <label className="font-semibold">Driver Information</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input 
                type="text" 
                className="border rounded px-2 py-2" 
                placeholder="First Name" 
                value={formData.firstName} 
                onChange={e => updateFields({ firstName: e.target.value })} 
                required />

                <input 
                type="text" 
                className="border rounded px-2 py-2" 
                placeholder="Last Name" 
                value={formData.lastName} 
                    onChange={e => updateFields({ lastName: e.target.value })} 
                required />
            </div>

            <input 
                type="email" 
                className="border rounded px-2 py-2" 
                placeholder="Email" 
                value={formData.email} 
                onChange={e => updateFields({ email: e.target.value })} 
                required 
            />

            <input 
                type="tel" 
                className="border rounded px-2 py-2" 
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
        </>

    );



};

export default DriverFields;
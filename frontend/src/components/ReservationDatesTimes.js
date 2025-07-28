import React from 'react';

const ReservationDatesTimes = ({
    pickupDate,
    pickupTime,
    returnDate,
    returnTime,
    updateFields
}) => {
    return (
        <div>
            {/* Grupo para Data e Hora de Retirada */}
            <div>
                <label htmlFor="pickupDate" className="block text-sm font-semibold text-gray-700 mb-1">Pickup Date & Time</label>
                <div className="flex gap-2">
                    <input
                        type="date"
                        id="pickupDate"
                        value={pickupDate}
                        onChange={e => updateFields({ pickupDate: e.target.value })}
                        className="border rounded-lg px-2 py-2 flex-1"
                        required
                    />
                    <input
                        type="time"
                        id="pickupTime"
                        value={pickupTime}
                        onChange={e => updateFields({ pickupTime: e.target.value })}
                        className="border rounded-lg px-2 py-2 flex-1"
                        required
                    />
                </div>
            </div>
            {/* Grupo para Data e Hora de Devolução */}
            <div>
                <label htmlFor="returnDate" className="block text-sm font-semibold text-gray-700 mb-1">Return Date & Time</label>
                <div className="flex gap-2">
                    <input
                        type="date"
                        id="returnDate"
                        value={returnDate}
                        onChange={e => updateFields({ returnDate: e.target.value })}
                        className="border rounded-lg px-2 py-2 flex-1"
                        required
                    />
                    <input
                        type="time"
                        id="returnTime"
                        value={returnTime}
                        onChange={e => updateFields({ returnTime: e.target.value })}
                        className="border rounded-lg px-2 py-2 flex-1"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default ReservationDatesTimes;
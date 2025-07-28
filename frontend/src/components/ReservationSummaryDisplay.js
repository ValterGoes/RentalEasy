import React from 'react';

const ReservationSummaryDisplay = ({ datesAndTimesValid, totalDays, totalPrice, itemPrice }) => {
    return (
        <div className="mb-1 text-gray-600">
            {datesAndTimesValid() ? (
                <>
                    <span className="font-bold">{totalDays}</span> day{totalDays !== 1 ? "s" : ""} × ${itemPrice}/day <br />
                    <span className="text-blue-600 font-bold text-lg">Total: ${totalPrice}</span>
                </>
            ) : (
                <span className="text-xs text-red-500">Select valid dates and times</span>
            )}
        </div>
    );
};

export default ReservationSummaryDisplay;
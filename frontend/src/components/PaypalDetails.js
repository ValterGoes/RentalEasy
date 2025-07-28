import React from 'react';
import { FaPaypal } from 'react-icons/fa'; // Ícone para PayPal

const PaypalDetails = ({ paypalEmail, readOnly, onChange }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-4 text-xl font-bold text-blue-700">
                <FaPaypal size={22} /> PayPal (Demo)
            </div>
            <label
                htmlFor="paypalEmail"
                className="block mb-2 text-sm font-semibold text-gray-700"
            >
                PayPal Email
            </label>
            <input
                type="email"
                id="paypalEmail"
                className="border rounded-lg px-4 py-2.5 w-full text-lg"
                placeholder="your.email@example.com"
                value={paypalEmail}
                readOnly={readOnly} // Adiciona a propriedade readOnly
                onChange={onChange} // Adiciona o onChange
                required
            />
            <div className="text-sm text-yellow-800 mt-4 bg-yellow-100 p-3 rounded-lg border border-yellow-200">
                The payment method must be under the renter's name and
                physically presented at pickup. Debit cards are accepted for
                select vehicle classes, and{" "}
                <span className="underline font-medium">
                    additional documentation
                </span>{" "}
                may be required in some cases.
            </div>
        </div>
    );
};

export default PaypalDetails;
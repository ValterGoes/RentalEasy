import React from 'react';
import { MdPix } from 'react-icons/md'; // Ícone para PIX

const PixDetails = ({ pixKey }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-3 flex justify-center items-center gap-3">
                <MdPix size={30} /> PIX
            </div>
            <div className="mb-4 text-lg text-gray-700">
                <span className="font-semibold">PIX key:</span>
                <span className="ml-2 bg-blue-100 px-3 py-1.5 rounded-md font-mono text-blue-800 select-all">
                    {pixKey}
                </span>
            </div>
            <div className="text-gray-500 text-sm mb-4">
                Simulated: Copy the key and confirm
            </div>
            <div className="text-sm text-yellow-800 bg-yellow-100 p-3 rounded-lg border border-yellow-200">
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

export default PixDetails;
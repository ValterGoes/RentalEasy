import React from 'react';
import { FaCreditCard, FaPaypal } from 'react-icons/fa'; // Ícones para os métodos de pagamento
import { MdPix } from 'react-icons/md'; // Ícone para PIX

const paymentOptions = [
    { id: "card", label: "Credit Card", icon: <FaCreditCard size={20} /> },
    { id: "pix", label: "PIX", icon: <MdPix size={20} /> },
    { id: "paypal", label: "PayPal", icon: <FaPaypal size={20} /> }
];

const PaymentMethodSelection = ({
    formData,
    updateFields
}) => {
    const { paymentMethod } = formData;

    return (
        <div className="flex flex-col gap-4">
            <div className="font-bold text-blue-600 mb-2 text-lg">Payment Method</div>
            <div className="flex justify-center w-full gap-2 flex-wrap">
                {paymentOptions.map((opt) => (
                    <button
                        key={opt.id}
                        type="button"
                        className={`flex items-center gap-2 border rounded-md px-2 py-2 text-nowrap transition
                            ${paymentMethod === opt.id
                                ? "bg-blue-600 text-white border-blue-600 shadow"
                                : "text-gray-800"
                            }`}
                        onClick={() => updateFields({ paymentMethod: opt.id })}
                    >
                        {opt.icon}
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PaymentMethodSelection;
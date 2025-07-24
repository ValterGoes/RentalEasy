import React from 'react';
import {
    PaymentIcon,
    detectCardType,
    formatCardNumber
} from 'react-svg-credit-card-payment-icons';

const CardPaymentForm = ({ formData, updateFields, readOnly = false }) => {
    const cardType = detectCardType(formData.cardNumber);

    const handleExpiryChange = (e) => {
        if (readOnly) return; 

        let value = e.target.value.replace(/\D/g, ''); 

        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4); 
        }
        if (value.length > 5) { 
            value = value.substring(0, 7); 
        }

        updateFields({ expiry: value });
    };

    return (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
            <div className="font-bold text-blue-600 mb-2 text-lg">Payment details</div>

            <div className="mb-3">
                <label className="block mb-2 text-[16px]">Card Number</label>
                <div className="flex gap-2 justify-start items-center w-full">
                    <PaymentIcon type={cardType} format="flatRounded" width={32} />
                    <input
                        type="text"
                        className={`border rounded px-3 py-2 max-w-[380px] w-full ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        aria-labelledby="card-number"
                        value={formatCardNumber(formData.cardNumber)}
                        onChange={e => !readOnly && updateFields({ cardNumber: e.target.value })}
                        readOnly={readOnly}
                        required
                    />
                </div>
            </div>

            <div className="mb-3">
                <label className="block mb-2 text-[16px]">Cardholder Name</label>
                <input
                    type="text"
                    className={`border rounded px-3 py-2 max-w-[420px] w-full ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    placeholder="Cardholder Name"
                    aria-labelledby="cardholder-name"
                    value={formData.holderName}
                    onChange={e => !readOnly && updateFields({ holderName: e.target.value })}
                    readOnly={readOnly}
                    required
                />
            </div>

            <div className="flex gap-6 mb-5 justify-start items-center">
                <div>
                    <label className="block mb-2 text-[16px]">Expiry Date</label>
                    <input
                        type="text"
                        id="expiryDate" 
                        className={`border rounded px-3 py-2 max-w-[80px] ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        placeholder="MM/YY"
                        aria-labelledby="expiry-date"
                        value={formData.expiry}
                        onChange={handleExpiryChange}
                        readOnly={readOnly}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-[16px]">CVC</label>
                    <input
                        type="text"
                        id="cvc" 
                        className={`border rounded px-3 py-2 max-w-[80px] ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                        placeholder="CVC"
                        aria-labelledby="cvc"
                        value={formData.cvc}
                        onChange={e => !readOnly && updateFields({ cvc: e.target.value })}
                        readOnly={readOnly}
                        required
                    />
                </div>

                <PaymentIcon type="code" format="flatRounded" width={32} className="mt-7" />
            </div>

            <div className="flex items-center gap-3 mt-2">
                <PaymentIcon type="visa" format="logo" width={36} />
                <PaymentIcon type="mastercard" format="logo" width={34} />
                <PaymentIcon type="amex" format="flatRounded" width={34} />
                <PaymentIcon type="discover" format="flatRounded" width={34} />
                <PaymentIcon type="jcb" format="logo" width={38} />
                <PaymentIcon type="diners" format="logo" width={38} />
            </div>

            <div className="text-xs text-yellow-700 mt-2 bg-yellow-50 p-2 rounded">
                The payment method must be under the renter's name and physically presented at pickup. Debit cards are accepted for select vehicle classes, and <span className="underline font-medium">additional documentation</span> may be required in some cases.
            </div>
        </div>
    );
};

export default CardPaymentForm;
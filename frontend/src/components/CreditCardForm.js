import React from 'react';
import {
    PaymentIcon,
    detectCardType,
    formatCardNumber
} from 'react-svg-credit-card-payment-icons';

const CreditCardForm = ({ cardNumber, holderName, expiry, cvc }) => {

    const cardType = detectCardType(cardNumber);

    return (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
            <div className="mb-4">
                <label htmlFor="cardNumber" className="block font-semibold text-sm mb-2 text-gray-700">Card Number</label>
                <div className="flex gap-3 items-center w-full">

                    <PaymentIcon type={cardType} format="flatRounded" width={36} />
                    <input
                        type="text"
                        id="cardNumber"
                        className="border rounded-lg px-4 py-2 flex-1 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 cursor-not-allowed"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={formatCardNumber(cardNumber)}
                        readOnly
                        required
                    />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="holderName" className="block mb-2 font-semibold text-sm text-gray-700">Cardholder Name</label>
                <input
                    type="text"
                    id="holderName"
                    className="border rounded-lg px-4 py-2 w-full text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 cursor-not-allowed"
                    placeholder="Full Name on Card"
                    value={holderName}
                    readOnly
                    required
                />
            </div>

            <div className="flex gap-6 justify-start items-center">
                <div className="flex-1">
                    <label htmlFor="expiryDate" className="block mb-2 text-sm font-semibold text-gray-700">Expiry Date</label>
                    <input
                        type="text"
                        id="expiryDate"
                        className="border rounded-lg px-4 py-2 w-full text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 cursor-not-allowed"
                        placeholder="MM/YY"
                        value={expiry}
                        readOnly
                        required
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="cvc" className="block mb-2 text-sm font-semibold text-gray-700">CVC</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            id="cvc"
                            className="border rounded-lg px-4 py-2 w-full text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100 cursor-not-allowed"
                            placeholder="XXX"
                            value={cvc}
                            readOnly
                            required
                        />
                        <PaymentIcon type="code" format="flatRounded" width={36} />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
                <PaymentIcon type="visa" format="logo" width={36} />
                <PaymentIcon type="mastercard" format="logo" width={34} />
                <PaymentIcon type="amex" format="flatRounded" width={34} />
                <PaymentIcon type="discover" format="flatRounded" width={34} />
                <PaymentIcon type="jcb" format="logo" width={38} />
                <PaymentIcon type="diners" format="logo" width={38} />
            </div>

            <div className="text-sm text-yellow-800 mt-3 bg-yellow-100 p-3 rounded-lg border border-yellow-200">
                The payment method must be under the renter's name and physically presented at pickup. Debit cards are accepted for select vehicle classes, and <span className="underline font-medium">additional documentation</span> may be required in some cases.
            </div>
        </div>
    );
};

export default CreditCardForm;

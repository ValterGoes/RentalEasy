import { PaymentIcon } from 'react-svg-credit-card-payment-icons';


const CardPaymentForm = ({ formData, updateFields}) => {

    return (

        <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
            <div className="font-bold text-blue-600 mb-2 text-lg">Payment details</div>

            <div className="mb-3">
                <label className="block mb-2 text-[16px]">CardNumber</label>
                <div className="flex gap-2 justify-start items-center w-full">
                    <PaymentIcon type="generic" format="flatRounded" width={32} />
                    <input 
                        type="text" 
                        className="border rounded px-3 py-2 max-w-[380px] w-full" 
                        placeholder="XXXX-XXXX-XXXX-XXXX" 
                        aria-labelledby="card-number" 
                        value={formData.cardNumber} 
                        onChange={e => updateFields({ cardNumber: e.target.value })} 
                        required 
                    />
                </div>
            </div>

            <div className="mb-3">
                <label className="block mb-2 text-[16px]">Cardholder Name</label>
                <input 
                    type="text" 
                    className="border rounded px-3 py-2 max-w-[420px] w-full" 
                    placeholder="Cardholder Name" 
                    aria-labelledby="cardholder-name" 
                    value={formData.holderName} 
                    onChange={e => updateFields({ holderName: e.target.value })} 
                />
            </div>

            <div className="flex gap-6 mb-5 justify-start items-center">

                <div>
                    <label className="block mb-2 text-[16px]">Expiry Date</label>
                    <input 
                        type="text" 
                        className="border rounded px-3 py-2 max-w-[80px]" 
                        placeholder="MM/YY" 
                        aria-labelledby="expiry-date" 
                        value={formData.expiry} 
                        onChange={e => updateFields({ expiry: e.target.value })} 
                        required 
                    />
                </div>

                <div>
                    <label className="block mb-2 text-[16px]">CVC</label>
                    <input 
                        type="text" 
                        className="border rounded px-3 py-2 max-w-[80px]" 
                        placeholder="CVC" 
                        aria-labelledby="cvc" 
                        value={formData.cvc} 
                        onChange={e => updateFields({ cvc: e.target.value })} 
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
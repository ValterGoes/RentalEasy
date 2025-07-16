import { useState } from "react";
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';

function ReserveModal({
    item,
    pickupDateDefault,
    returnDateDefault,
    onClose,
    onConfirm
}) {
    const [pickupDate, setPickupDate] = useState(pickupDateDefault || "");
    const [returnDate, setReturnDate] = useState(returnDateDefault || "");

    // Dados do condutor
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [notify, setNotify] = useState("yes"); 
    const [isAdult, setIsAdult] = useState(false);

    // Endereço
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [countryAddress, setCountryAddress] = useState("");

    // Pagamento
    const [cardNumber, setCardNumber] = useState("");
    const [holderName, setHolderName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    // Calcular total de dias e preço
    function getDaysDiff(start, end) {
        try {
            const s = new Date(start);
            const e = new Date(end);
            if (isNaN(s) || isNaN(e)) return 0;
            const ms = e.getTime() - s.getTime();
            return ms > 0 ? Math.ceil(ms / (1000 * 60 * 60 * 24)) : 0;
        } catch {
            return 0;
        }
    }
    const totalDays = getDaysDiff(pickupDate, returnDate);
    const totalPrice = totalDays > 0 ? totalDays * item.price : item.price;

    const datesValid = pickupDate && returnDate && (new Date(returnDate) > new Date(pickupDate));

    function handleSubmit(e) {
        e.preventDefault();
        if (!datesValid || !firstName || !lastName || !email || !country || !phone || !isAdult
            || !cardNumber || !holderName || !expiry || !cvc || !address || !city || !state || !zip || !countryAddress) {
            alert("Please fill in all required fields, confirm you are an adult and provide valid dates.");
            return;
        }

        onConfirm({
            pickupDate, returnDate, firstName, lastName, email, country, phone, notify, isAdult,
            address, city, state, zip, countryAddress,
            cardNumber, holderName, expiry, cvc,
            totalDays, totalPrice
        });
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-slate-50 rounded-2xl p-8 max-w-lg w-full shadow-xl relative z-10 overflow-y-auto max-h-[90vh]">
                <button className="absolute top-4 right-4 text-xl" onClick={onClose}>&times;</button>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Reserve: {item.name}</h2>
                <img src={item.image || "/images/placeholder.png"} alt={item.name} className="w-full h-44 object-cover rounded-lg mb-4" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <input
                            type="date"
                            value={pickupDate}
                            onChange={e => setPickupDate(e.target.value)}
                            className="border rounded px-2 py-2 flex-1"
                            required
                        />
                        <input
                            type="date"
                            value={returnDate}
                            onChange={e => setReturnDate(e.target.value)}
                            className="border rounded px-2 py-2 flex-1"
                            required
                        />
                    </div>
                    <div className="mb-1 text-gray-600">
                        {datesValid ? (
                            <>
                                <span className="font-bold">{totalDays}</span> day{totalDays !== 1 ? "s" : ""} × ${item.price}/day <br />
                                <span className="text-blue-600 font-bold text-lg">Total: ${totalPrice}</span>
                            </>
                        ) : (
                            <span className="text-xs text-red-500">Select valid dates</span>
                        )}
                    </div>

                     {/* Condutor */}
                    <label className="font-semibold">Driver Information</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input type="text" className="border rounded px-2 py-2" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                        <input type="text" className="border rounded px-2 py-2" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                    <input type="email" className="border rounded px-2 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="text" className="border rounded px-2 py-2" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} required />
                    <input type="tel" className="border rounded px-2 py-2" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />

                    {/* Preferência de notificação */}
                    <div className="flex gap-3 items-center">
                        <label className="font-semibold">Reservation info by email?</label>
                        <label className="flex items-center gap-1">
                            <input type="radio" name="notify" value="yes" checked={notify === "yes"} onChange={() => setNotify("yes")} />
                            Yes
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" name="notify" value="no" checked={notify === "no"} onChange={() => setNotify("no")} />
                            No
                        </label>
                    </div>

                    {/* Confirmação maior de idade */}
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1">
                            <input type="checkbox" checked={isAdult} onChange={e => setIsAdult(e.target.checked)} required />
                            I confirm I am over 18 years old
                        </label>
                    </div>

                    {/* Pagamento */}
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                        <div className="font-bold text-blue-600 mb-2">Payment details</div>

                        <div className="mb-2">
                            <label className="block font-semibold text-xs mb-2">CardNumber</label>
                            <div className="flex gap-2 justify-start items-center w-full">
                                <PaymentIcon type="generic" format="flatRounded" width={32} />
                                <input type="text" className="border rounded px-3 py-2 max-w-[380px] w-full" placeholder="Card Number" aria-labelledby="card-number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label className="block mb-2 font-semibold text-xs">Cardholder Name</label>
                            <input type="text" className="border rounded px-3 py-2 max-w-[420px] w-full" placeholder="Cardholder Name" aria-labelledby="cardholder-name"  value={holderName} onChange={e => setHolderName(e.target.value)}/>
                        </div>

                        <div className="flex gap-6 mb-2 justify-start items-center">

                            <div>
                                <label className="block mb-2 font-semibold text-xs">Expiry Date</label>
                                <input type="text" className="border rounded px-3 py-2 max-w-[80px]" placeholder="MM/YY" aria-labelledby="expiry-date" value={expiry} onChange={e => setExpiry(e.target.value)} required />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-xs">CVC</label>
                                <input type="text" className="border rounded px-3 py-2 max-w-[80px]" placeholder="CVC" aria-labelledby="cvc" value={cvc} onChange={e => setCvc(e.target.value)} required />
                            </div>

                            <PaymentIcon type="code" format="flatRounded" width={32} className="mt-7" />

                        </div>

                        <div className="flex items-center gap-3 mt-2">
                            <PaymentIcon type="visa" format="logo" width={32} />
                            <PaymentIcon type="mastercard" format="logo" width={32} />
                            <PaymentIcon type="amex" format="flatRounded" width={32} />
                            <PaymentIcon type="discover" format="flatRounded" width={32} />
                            <PaymentIcon type="jcb" format="logo" width={36} />
                            <PaymentIcon type="diners" format="logo" width={36} />
                        </div>

                        <div className="text-xs text-yellow-700 mt-2 bg-yellow-50 p-2 rounded">
                            The payment method must be under the renter's name and physically presented at pickup. Debit cards are accepted for select vehicle classes, and <span className="underline font-medium">additional documentation</span> may be required in some cases.
                        </div>
                    </div>

                    {/* Endereço */}
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                        <div className="font-bold text-blue-600 mb-2">Address</div>
                        <input type="text" className="border rounded px-2 py-2 mb-2 w-full" placeholder="Street Address" value={address} onChange={e => setAddress(e.target.value)} required />
                        <div className="flex gap-2 mb-2">
                            <input type="text" className="border rounded px-2 py-2 max-w-[220px]" placeholder="City" value={city} onChange={e => setCity(e.target.value)} required />
                            <input type="text" className="border rounded px-2 py-2 max-w-[125px]" placeholder="State" value={state} onChange={e => setState(e.target.value)} required />
                        </div>
                        <div className="flex gap-2">
                            <input type="text" className="border rounded px-2 py-2 max-w-[175px]" placeholder="ZIP" value={zip} onChange={e => setZip(e.target.value)} required />
                            <input type="text" className="border rounded px-2 py-2 max-w-[145px]" placeholder="Country" value={countryAddress} onChange={e => setCountryAddress(e.target.value)} required />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition mt-2"
                    >
                        Confirm Reservation
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ReserveModal;

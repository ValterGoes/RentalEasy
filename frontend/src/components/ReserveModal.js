import { useState, useEffect } from "react";
import DriverFields from "./DriverFields";
import CardPaymentForm from "./CardPaymentForm";
import LocationInput from "./LocationInput";
import { FaCreditCard, FaPaypal, FaEdit, FaSpinner, FaPlusCircle, FaArrowLeft } from "react-icons/fa";
import { MdPix } from "react-icons/md";


const paymentOptions = [
  { id: "card", label: "Credit Card", icon: <FaCreditCard size={20} /> },
  { id: "pix", label: "PIX", icon: <MdPix size={20} /> },
  { id: "paypal", label: "PayPal", icon: <FaPaypal size={20} /> },
];


function ReserveModal({
    item,
    initialData,
    onClose,
    onConfirm,
    availableLocations
}) {

    const [formData, setFormData] = useState({
        pickupDate: initialData?.pickupDate || "",
        pickupTime: initialData?.pickupTime || "09:00",
        returnDate: initialData?.returnDate || "",
        returnTime: initialData?.returnTime || "09:00",
        // Adicionando as localizações aos dados do formulário
        pickupLocation: initialData?.pickupLocation || "",
        returnLocation: initialData?.returnLocation || "",
        // Dados do condutor 
        firstName: initialData?.firstName || "",
        lastName: initialData?.lastName || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        notify: initialData?.notify || "yes",
        isAdult: initialData?.isAdult === true, 
        // Pagamento
        cardNumber: initialData?.cardNumber || "",
        holderName: initialData?.holderName || "",
        expiry: initialData?.expiry || "",
        cvc: initialData?.cvc || "",
        // Endereço
        address: initialData?.address || "",
        city: initialData?.city || "",
        state: initialData?.state || "",
        zip: initialData?.zip || "",
        countryAddress: initialData?.countryAddress || "",

        paymentMethod: initialData?.paymentMethod || "card",
        paypalEmail: initialData?.paypalEmail || "",
    });

    const pixKey = "pix-demo@rentaleasy.com";
    const [paymentMethod, setPaymentMethod] = useState("card");

    const [isReturnLocationDifferent, setIsReturnLocationDifferent] = useState(
        !!formData.returnLocation && formData.returnLocation !== formData.pickupLocation
    );

    useEffect(() => {
        console.log("ReserveModal - initialData recebido:", initialData);
        console.log("ReserveModal - formData inicializado:", formData);
    }, [initialData]);

    const updateFields = (fields) => {
        setFormData(prev => {
            const updated = { ...prev, ...fields };
            
            if (!isReturnLocationDifferent && fields.pickupLocation !== undefined) {
                updated.returnLocation = fields.pickupLocation;
            }
            return updated;
        });
    };

    const {
        pickupDate, pickupTime, returnDate, returnTime,
        pickupLocation, returnLocation,
        firstName, lastName, email, phone, notify, isAdult,
        cardNumber, holderName, expiry, cvc,
        address, city, state, zip, countryAddress
    } = formData;

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

    const datesAndTimesValid = () => {
        if (!pickupDate || !returnDate || !pickupTime || !returnTime) return false;

        const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
        const returnDateTime = new Date(`${returnDate}T${returnTime}`);

        return pickupDateTime < returnDateTime;
    };

    function validatePaymentFields() {
        if (paymentMethod === "card") {
            
            if (!cardNumber || !holderName || !expiry || !cvc) {
                return "Please fill in all credit card fields.";
            }
           
            if (!/^[0-9]{2}\/[0-9]{2,4}$/.test(expiry))
                return "Expiry must be MM/YY or MM/YYYY.";
            if (!/^[0-9]{3,4}$/.test(cvc)) return "CVC seems invalid.";

        } else if (paymentMethod === "paypal") {
            if (!paypalEmail || !/^[^@]+@[^@]+\.[^@]+$/.test(paypalEmail)) {
                return "Please enter a valid PayPal email.";
            }
        }
       
        return null;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!datesAndTimesValid() || !firstName || !lastName || !email || !phone || !isAdult
            || !cardNumber || !holderName || !expiry || !cvc || !address || !city || !state || !zip || !countryAddress
            || !pickupLocation || (isReturnLocationDifferent && !returnLocation)) {

            const customAlert = document.createElement('div');
            customAlert.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
            customAlert.innerHTML = `
                <div class="bg-white p-6 rounded-lg shadow-xl text-center">
                    <p class="text-lg font-semibold mb-4">Por favor, preencha todos os campos obrigatórios, confirme que é adulto e forneça datas e horários válidos.</p>
                    <button id="close-custom-alert" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">OK</button>
                </div>
            `;
            document.body.appendChild(customAlert);
            document.getElementById('close-custom-alert').onclick = () => {
                document.body.removeChild(customAlert);
            };
            return;
        }

        const paymentError = validatePaymentFields();
        if (paymentError) {
            const customAlert = document.createElement('div');
            customAlert.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
            customAlert.innerHTML = `
                <div class="bg-white p-6 rounded-lg shadow-xl text-center">
                    <p class="text-lg font-semibold mb-4">${paymentError}</p>
                    <button id="close-custom-alert" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">OK</button>
                </div>
            `;
            document.body.appendChild(customAlert);
            document.getElementById('close-custom-alert').onclick = () => {
                document.body.removeChild(customAlert);
            };
            return;
        }

        let finalReturnLocation = returnLocation;
        if (!finalReturnLocation) {
            finalReturnLocation = pickupLocation;
        }

        onConfirm({
            ...formData,
            returnLocation: finalReturnLocation,
            isAdult: String(formData.isAdult),
            totalDays,
            totalPrice
        });
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-slate-50 rounded-2xl p-4 max-w-lg w-full shadow-xl relative z-10 overflow-y-auto max-h-[90vh]">
                <button className="absolute top-4 right-4 text-xl" onClick={onClose}>&times;</button>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Reserve: {item.name}</h2>
                <img src={item.image || "https://placehold.co/400x200/cccccc/333333?text=Placeholder"} alt={item.name} className="w-full h-44 object-cover rounded-lg mb-4" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                    {/* Campo de Localização */}
                    {!isReturnLocationDifferent ? (
                        <>
                            <LocationInput
                                label="Pickup / Return Location"
                                value={pickupLocation}
                                onChange={val => updateFields({ pickupLocation: val, returnLocation: val })} // Atualiza ambos
                                placeholder="Enter pickup/return location"
                                suggestions={availableLocations}
                                required
                            />
                            <button
                                type="button"
                                className="flex items-center text-blue-600 hover:text-blue-800 text-xs mt-0 mb-2"
                                onClick={() => setIsReturnLocationDifferent(true)}
                            >
                                <FaPlusCircle size={18} className="mr-1" />
                                Different return location
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <LocationInput
                                label="Pickup Location"
                                value={pickupLocation}
                                onChange={val => updateFields({ pickupLocation: val })}
                                placeholder="Enter pickup location"
                                suggestions={availableLocations}
                                required
                            />
                            <div className="flex items-center gap-2">
                                <LocationInput
                                    label="Return Location"
                                    value={returnLocation}
                                    onChange={val => updateFields({ returnLocation: val })}
                                    placeholder="Enter return location"
                                    suggestions={availableLocations}
                                    required
                                />
                                <button
                                    type="button"
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => {
                                        setIsReturnLocationDifferent(false);
                                        updateFields({ returnLocation: pickupLocation }); 
                                    }}
                                    aria-label="Use same return location"
                                >
                                    <FaArrowLeft size={20} />
                                </button>
                            </div>
                        </div>
                    )}


                    {/* Exibição do total de dias e preço */}
                    <div className="mb-1 text-gray-600">
                        {datesAndTimesValid() ? (
                            <>
                                <span className="font-bold">{totalDays}</span> day{totalDays !== 1 ? "s" : ""} × ${item.price}/day <br />
                                <span className="text-blue-600 font-bold text-lg">Total: ${totalPrice}</span>
                            </>
                        ) : (
                            <span className="text-xs text-red-500">Select valid dates and times</span>
                        )}
                    </div>

                    {/* Campos do condutor */}
                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border gap-4 flex flex-col">
                        <DriverFields
                            formData={{ firstName, lastName, email, phone, address, city, state, zip, countryAddress, notify, isAdult }}
                            updateFields={updateFields}
                        />
                    </div>

                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border gap-4 flex flex-col">
                        <div className="font-bold text-blue-600 mb-2 text-lg">Payment Method</div>
                        <div className="flex justify-center w-full gap-2 flex-nowrap">
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

                        {/* Renderiza o formulário de pagamento com base no método selecionado */}
                        {paymentMethod === "card" && (
                            <CardPaymentForm
                                formData={{ cardNumber, holderName, expiry, cvc }}
                                updateFields={updateFields}
                                readOnly={false} // Editável no ReserveModal
                            />
                        )}
                        {paymentMethod === "pix" && (
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
                        )}
                        {paymentMethod === "paypal" && (
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
                                    onChange={e => updateFields({ paypalEmail: e.target.value })}
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
                        )}
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
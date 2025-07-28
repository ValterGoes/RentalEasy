import React from "react";
// Importa o novo hook personalizado
import useReservationForm from "../hooks/UseReservationForm";

import DriverFields from "./DriverFields";
import CardPaymentForm from "./CardPaymentForm";
import ReservationDatesTimes from "./ReservationDatesTimes";
import ReservationLocations from "./ReservationLocations";
import PaymentMethodSelection from "./PaymentMethodSelections";
import PixDetails from "./PixDetails";
import PaypalDetails from "./PaypalDetails";
import ReservationSummaryDisplay from "./ReservationSummaryDisplay";


import { MdPix } from "react-icons/md";
import { FaCreditCard, FaPaypal } from "react-icons/fa"; 


function ReserveModal({
    item,
    initialData,
    onClose,
    onConfirm,
    availableLocations
}) {
    // Usa o hook personalizado para gerenciar toda a lógica do formulário
    const {
        formData,
        updateFields,
        totalDays,
        totalPrice,
        datesAndTimesValid,
        isReturnLocationDifferent,
        setIsReturnLocationDifferent,
        handleSubmit: hookHandleSubmit
    } = useReservationForm(initialData, item);

    const pixKey = "pix-demo@rentaleasy.com";

    // Desestrutura os campos do formData para facilitar o acesso no JSX
    const {
        pickupDate, pickupTime, returnDate, returnTime,
        pickupLocation, returnLocation,
        firstName, lastName, email, phone, notify, isAdult,
        cardNumber, holderName, expiry, cvc,
        address, city, state, zip, countryAddress,
        paymentMethod, paypalEmail
    } = formData;

    // Função de submissão do formulário do React que chama o handleSubmit do hook
    const handleFormSubmit = async (e) => {
        const errorMessage = hookHandleSubmit(onConfirm)(e); // Chama o handleSubmit do hook
        if (errorMessage) {
            
            const customAlert = document.createElement('div');
            customAlert.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
            customAlert.innerHTML = `
                <div class="bg-white p-6 rounded-lg shadow-xl text-center">
                    <p class="text-lg font-semibold mb-4">${errorMessage}</p>
                    <button id="close-custom-alert" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">OK</button>
                </div>
            `;
            document.body.appendChild(customAlert);
            document.getElementById('close-custom-alert').onclick = () => {
                document.body.removeChild(customAlert);
            };
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-slate-50 rounded-2xl p-4 max-w-lg w-full shadow-xl relative z-10 overflow-y-auto max-h-[90vh]">
                <button className="absolute top-4 right-4 text-xl" onClick={onClose}>&times;</button>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">Reserve: {item.name}</h2>
                <img src={item.image || "https://placehold.co/400x200/cccccc/333333?text=Placeholder"} alt={item.name} className="w-full h-44 object-cover rounded-lg mb-4" />

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                    <ReservationDatesTimes
                        pickupDate={pickupDate}
                        pickupTime={pickupTime}
                        returnDate={returnDate}
                        returnTime={returnTime}
                        updateFields={updateFields}
                    />

                    <ReservationLocations
                        pickupLocation={pickupLocation}
                        returnLocation={returnLocation}
                        isReturnLocationDifferent={isReturnLocationDifferent}
                        setIsReturnLocationDifferent={setIsReturnLocationDifferent}
                        updateFields={updateFields}
                        availableLocations={availableLocations}
                    />

                    <ReservationSummaryDisplay
                        datesAndTimesValid={datesAndTimesValid}
                        totalDays={totalDays}
                        totalPrice={totalPrice}
                        itemPrice={item.price}
                    />

                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border gap-4 flex flex-col">
                        <DriverFields
                            formData={{ firstName, lastName, email, phone, address, city, state, zip, countryAddress, notify, isAdult }}
                            updateFields={updateFields}
                        />
                    </div>

                    <div className="mt-3 p-4 bg-gray-50 rounded-lg border gap-4 flex flex-col">
                        <PaymentMethodSelection
                            formData={formData} 
                            updateFields={updateFields}
                        />

                        {paymentMethod === "card" && (
                            <CardPaymentForm
                                formData={{ cardNumber, holderName, expiry, cvc }}
                                updateFields={updateFields}
                                readOnly={false} 
                            />
                        )}
                        {paymentMethod === "pix" && (
                            <PixDetails
                                pixKey={pixKey}
                            />
                        )}
                        {paymentMethod === "paypal" && (
                            <PaypalDetails
                                paypalEmail={paypalEmail}
                                onChange={e => updateFields({ paypalEmail: e.target.value })}
                                readOnly={false} 
                            />
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
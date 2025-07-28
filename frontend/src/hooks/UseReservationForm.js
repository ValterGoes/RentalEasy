import { useState, useEffect } from 'react';
import { detectCardType, validateCardNumber } from 'react-svg-credit-card-payment-icons'; // Importar apenas as necessárias

const useReservationForm = (initialData, item) => {
    const [isReturnLocationDifferent, setIsReturnLocationDifferent] = useState(
        !!initialData?.returnLocation && initialData.returnLocation !== initialData.pickupLocation
    );

    const [formData, setFormData] = useState({
        pickupDate: initialData?.pickupDate || "",
        pickupTime: initialData?.pickupTime || "09:00",
        returnDate: initialData?.returnDate || "",
        returnTime: initialData?.returnTime || "09:00",
        pickupLocation: initialData?.pickupLocation || "",
        returnLocation: initialData?.returnLocation || "",
        firstName: initialData?.firstName || "",
        lastName: initialData?.lastName || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        notify: initialData?.notify || "yes",
        isAdult: initialData?.isAdult === true,
        cardNumber: initialData?.cardNumber || "",
        holderName: initialData?.holderName || "",
        expiry: initialData?.expiry || "",
        cvc: initialData?.cvc || "",
        address: initialData?.address || "",
        city: initialData?.city || "",
        state: initialData?.state || "",
        zip: initialData?.zip || "",
        countryAddress: initialData?.countryAddress || "",
        paymentMethod: initialData?.paymentMethod || "card",
        paypalEmail: initialData?.paypalEmail || "",
    });

    // Sincroniza formData com initialData quando initialData muda
    useEffect(() => {
        const newFormData = {
            pickupDate: initialData?.pickupDate || "",
            pickupTime: initialData?.pickupTime || "09:00",
            returnDate: initialData?.returnDate || "",
            returnTime: initialData?.returnTime || "09:00",
            pickupLocation: initialData?.pickupLocation || "",
            returnLocation: initialData?.returnLocation || "",
            firstName: initialData?.firstName || "",
            lastName: initialData?.lastName || "",
            email: initialData?.email || "",
            phone: initialData?.phone || "",
            notify: initialData?.notify || "yes",
            isAdult: initialData?.isAdult === true,
            cardNumber: initialData?.cardNumber || "",
            holderName: initialData?.holderName || "",
            expiry: initialData?.expiry || "",
            cvc: initialData?.cvc || "",
            address: initialData?.address || "",
            city: initialData?.city || "",
            state: initialData?.state || "",
            zip: initialData?.zip || "",
            countryAddress: initialData?.countryAddress || "",
            paymentMethod: initialData?.paymentMethod || "card",
            paypalEmail: initialData?.paypalEmail || "",
        };
        setFormData(newFormData);

        setIsReturnLocationDifferent(
            !!newFormData.returnLocation && newFormData.returnLocation !== newFormData.pickupLocation
        );

        console.log("useReservationForm - initialData recebido:", initialData);
        console.log("useReservationForm - formData inicializado:", newFormData);
    }, [initialData]);

    // Função para atualizar campos do formulário
    const updateFields = (fields) => {
        setFormData(prev => {
            const updated = { ...prev, ...fields };
            if (!isReturnLocationDifferent && fields.pickupLocation !== undefined) {
                updated.returnLocation = fields.pickupLocation;
            }
            return updated;
        });
    };

    // Cálculos derivados do estado
    const getDaysDiff = (start, end) => {
        try {
            const s = new Date(start);
            const e = new Date(end);
            if (isNaN(s) || isNaN(e)) return 0;
            const ms = e.getTime() - s.getTime();
            return ms > 0 ? Math.ceil(ms / (1000 * 60 * 60 * 24)) : 0;
        } catch {
            return 0;
        }
    };

    const totalDays = getDaysDiff(formData.pickupDate, formData.returnDate);
    const totalPrice = totalDays > 0 ? totalDays * item?.price : item?.price;

    // Validação de datas e horários
    const datesAndTimesValid = () => {
        const { pickupDate, pickupTime, returnDate, returnTime } = formData;
        if (!pickupDate || !returnDate || !pickupTime || !returnTime) return false;

        const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
        const returnDateTime = new Date(`${returnDate}T${returnTime}`);

        return pickupDateTime < returnDateTime;
    };

    // Validação dos campos de pagamento
    const validatePaymentFields = () => {
        const { paymentMethod, cardNumber, holderName, expiry, cvc, paypalEmail } = formData;

        if (paymentMethod === "card") {
            const cardType = detectCardType(cardNumber); // Use detectCardType aqui
            const isCardNumberValid = validateCardNumber(cardNumber); // Use validateCardNumber aqui

            if (!cardNumber || !holderName || !expiry || !cvc) {
                return "Please fill in all credit card fields.";
            }
            if (!isCardNumberValid) { // Use a validação do componente filho
                return "Card number seems invalid.";
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
    };

    // Função de submissão principal
    const handleSubmit = (onConfirm) => (e) => {
        e.preventDefault();

        // Validação de campos gerais
        if (!datesAndTimesValid() || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.isAdult
            || !formData.address || !formData.city || !formData.state || !formData.zip || !formData.countryAddress
            || !formData.pickupLocation || (isReturnLocationDifferent && !formData.returnLocation)) {

            return "Please fill in all required fields, confirm you are an adult and provide valid dates, times, and locations.";
        }

        // Validação de campos de pagamento específicos
        const paymentError = validatePaymentFields();
        if (paymentError) {
            return paymentError;
        }

        let finalReturnLocation = formData.returnLocation;
        if (!finalReturnLocation) {
            finalReturnLocation = formData.pickupLocation;
        }

        // Retorna os dados para onConfirm
        onConfirm({
            ...formData,
            returnLocation: finalReturnLocation,
            isAdult: String(formData.isAdult),
            totalDays,
            totalPrice
        });

        return null; // Retorna null se não houver erro
    };


    return {
        formData,
        updateFields,
        totalDays,
        totalPrice,
        datesAndTimesValid,
        isReturnLocationDifferent,
        setIsReturnLocationDifferent,
        handleSubmit: handleSubmit // O handleSubmit retornado é uma função que espera `onConfirm`
    };
};

export default useReservationForm;
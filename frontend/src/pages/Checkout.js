import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { FaCreditCard, FaPaypal, FaEdit, FaSpinner } from "react-icons/fa";
import { MdPix } from "react-icons/md";
import {
  PaymentIcon, // Mantém a importação para exibir ícones, mas não para o formulário de input
  detectCardType,
  validateCardNumber,
  formatCardNumber,
} from "react-svg-credit-card-payment-icons";

// CreditCardForm não é mais importado aqui, pois seus campos serão exibidos diretamente
// import CreditCardForm from "../components/CreditCardForm"; 

function getQS(query, key) {
  return query.get(key) || "";
}

const Checkout = () => {
  const query = new URLSearchParams(useLocation().search);

  const itemId = getQS(query, "itemId");
  const pickupDate = getQS(query, "pickupDate");
  const pickupTime = getQS(query, "pickupTime");
  const returnDate = getQS(query, "returnDate");
  const returnTime = getQS(query, "returnTime");
  const total = query.get("total");

  const firstName = getQS(query, "firstName");
  const lastName = getQS(query, "lastName");
  const email = getQS(query, "email");
  const phone = getQS(query, "phone");
  const address = getQS(query, "address") || "";
  const city = getQS(query, "city") || "";
  const state = getQS(query, "state") || "";
  const zip = getQS(query, "zip") || "";
  const countryAddress = getQS(query, "countryAddress") || "";
  const notify = getQS(query, "notify") || "yes";
  const isAdult = getQS(query, "isAdult") === "true";

  const pickupLocation = getQS(query, "pickupLocation");
  const returnLocation = getQS(query, "returnLocation");

  const cardNumber = getQS(query, "cardNumber") || "";
  const holderName = getQS(query, "holderName") || "";
  const expiry = getQS(query, "expiry") || "";
  const cvc = getQS(query, "cvc") || "";
  const paypalEmail = getQS(query, "paypalEmail") || "";
  const paymentMethod = getQS(query, "paymentMethod") || "card"; // Extraindo paymentMethod da URL

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const pixKey = "pix-demo@rentaleasy.com"; // Chave PIX simulada

  const navigate = useNavigate();

  useEffect(() => {
    if (itemId) {
      axios
        .get(`${API_BASE_URL}/api/items/${itemId}`)
        .then((res) => setItem(res.data))
        .catch(() => setItem(null));
    }
  }, [itemId]);

  const cardType = detectCardType(cardNumber);
  // isCardNumberValid não é estritamente necessário aqui, pois a validação já ocorreu no ReserveModal
  // const isCardNumberValid = validateCardNumber(cardNumber); 

  // A validação de pagamento agora é mais simples ou pode ser removida se toda a validação ocorrer no ReserveModal
  function validatePayment() {
    // No Checkout, a validação principal já ocorreu no ReserveModal.
    // Aqui, podemos adicionar validações finais ou simplesmente prosseguir.
    // Por exemplo, você pode querer validar se todos os campos essenciais estão preenchidos,
    // mas a validação de formato já foi feita.
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validatePayment(); // Validação simplificada
    if (err) {
      const customAlert = document.createElement("div");
      customAlert.className =
        "fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50";
      customAlert.innerHTML = `
          <div class="bg-white p-6 rounded-lg shadow-xl text-center">
              <p class="text-lg font-semibold mb-4">${err}</p>
              <button id="close-custom-alert" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">OK</button>
          </div>
      `;
      document.body.appendChild(customAlert);
      document.getElementById("close-custom-alert").onclick = () => {
        document.body.removeChild(customAlert);
      };
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      console.log("Pagamento confirmado com os seguintes dados:", {
        itemId,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        pickupLocation,
        returnLocation,
        total,
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zip,
        countryAddress,
        notify,
        isAdult,
        cardNumber,
        holderName,
        expiry,
        cvc,
        paymentMethod,
        paypalEmail,
      });
    }, 1500);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="text-3xl text-green-600 font-bold mb-3">
          Payment Successful!
        </div>
        <div className="text-lg text-gray-700">
          Your reservation is confirmed.
          <br />
          Check your email for details.
        </div>
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-bold"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!item) {
    return <div className="p-8 text-center">Loading item for payment...</div>;
  }

  function handleEdit() {
    const params = new URLSearchParams({
      itemId,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      pickupLocation,
      returnLocation,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      countryAddress,
      notify,
      isAdult: String(isAdult),
      total,
      cardNumber,
      holderName,
      expiry,
      cvc,
      paypalEmail,
      paymentMethod, // Incluindo paymentMethod para a edição
    });
    params.append('editMode', 'true');
    navigate(`/items/${itemId}?${params.toString()}`);
  }

  // Incluindo countryAddress na exibição do endereço
  const addressDisplay = [address, city, state, zip, countryAddress].filter(Boolean).join(", ");

  return (
    <div className="max-w-2xl mx-auto bg-slate-50 rounded-xl p-6 shadow my-10 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Checkout</h2>
      <div className="flex flex-col sm:flex-row gap-6 items-center mb-6 border-b pb-6 border-gray-200">
        <img
          src={item.image || "/images/placeholder.png"}
          alt={item.name}
          className="w-36 h-36 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1 text-left">
          <div className="text-2xl font-semibold text-gray-800">{item.name}</div>
          <div className="text-gray-600 text-lg">
            {pickupLocation} {returnLocation && pickupLocation !== returnLocation ? ` → ${returnLocation}` : ''}
          </div>
          <div className="text-gray-500 text-base mb-2">
            {pickupDate} {pickupTime} &rarr; {returnDate} {returnTime}
          </div>
          <div className="text-blue-600 font-bold text-xl">Total: ${total}</div>
        </div>
      </div>

      <div className="mb-8 bg-blue-50 p-5 rounded-xl border border-blue-100 text-blue-900 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-xl">Reservation Details</span>
          <button
            className="flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold text-sm transition duration-200"
            type="button"
            onClick={handleEdit}
          >
            <FaEdit className="inline" /> Edit Reservation
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base">
          <div><b>Name:</b> {firstName} {lastName}</div>
          <div><b>Email:</b> {email}</div>
          <div><b>Country:</b> {countryAddress}</div>
          <div><b>Phone:</b> {phone}</div>
          <div><b>Address:</b> {addressDisplay || "-"}</div>
          <div><b>Info by email?</b> {notify === "yes" ? "Yes" : "No"}</div>
          <div><b>18+?</b> {isAdult ? "Yes" : "No"}</div>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Seção de detalhes do método de pagamento */}
          <div className="mt-3 p-4 bg-gray-50 rounded-lg border gap-4 flex flex-col">
            <div className="font-bold text-blue-600 mb-2 text-lg">Payment Method</div>

            <p>
              AJUSTAR a exibição do método de pagamento selecionado, incluindo ícones e detalhes específicos.


            </p>



            <div className="text-gray-700 text-lg font-semibold capitalize mb-2 flex items-center">
              {paymentMethod === "card" && <FaCreditCard className="inline mr-2" />}
              {paymentMethod === "pix" && <MdPix className="inline mr-2" />}
              {paymentMethod === "paypal" && <FaPaypal className="inline mr-2" />}
              {paymentMethod === "card" ? "Credit Card" : paymentMethod} {/* Exibe "Credit Card" ou o nome do método */}
            </div>

            {/* Detalhes do pagamento em formato de grade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base">
              {paymentMethod === "card" && (
                <>
                  <div><b>Card Number:</b> <span className="font-mono">{formatCardNumber(cardNumber)}</span></div>
                  <div><b>Holder Name:</b> {holderName}</div>
                  <div><b>Expiry:</b> {expiry}</div>
                  <div><b>CVC:</b> {cvc}</div>
                </>
              )}
              {paymentMethod === "pix" && (
                <div><b>PIX Key:</b> <span className="font-mono bg-blue-100 px-2 py-1 rounded text-blue-800 select-all">{pixKey}</span></div>
              )}
              {paymentMethod === "paypal" && (
                <div><b>PayPal Email:</b> {paypalEmail}</div>
              )}
            </div>

            <div className="text-sm text-yellow-800 mt-3 bg-yellow-100 p-3 rounded-lg border border-yellow-200">
              The payment method must be under the renter's name and
              physically presented at pickup. Debit cards are accepted for
              select vehicle classes, and{" "}
              <span className="underline font-medium">
                additional documentation
              </span>{" "}
              may be required in some cases.
            </div>
          </div>

          <button
            type="submit"
            className="flex mt-4 w-full justify-center items-center bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              "Confirm Payment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

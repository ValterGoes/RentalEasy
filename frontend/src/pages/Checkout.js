import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { FaCreditCard, FaPaypal, FaEdit, FaSpinner } from "react-icons/fa";
import { MdPix } from "react-icons/md";
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';

function getQS(query, key) {
  return query.get(key) || "";
}

const paymentOptions = [
  { id: "card", label: "Credit Card", icon: <FaCreditCard size={20} /> },
  { id: "pix", label: "PIX", icon: <MdPix size={20} /> },
  { id: "paypal", label: "PayPal", icon: <FaPaypal size={20} /> }
];

const Checkout = () => {
  const query = new URLSearchParams(useLocation().search);
  const itemId = getQS(query, "itemId");
  const pickupDate = getQS(query, "pickupDate");
  const returnDate = getQS(query, "returnDate");
  const total = query.get("total");

  const firstName = query.get("firstName");
  const lastName = query.get("lastName");
  const email = query.get("email");
  const phone = query.get("phone");
  const country = query.get("country");
  const address = query.get("address") || "";
  const city = query.get("city") || "";
  const state = query.get("state") || "";
  const zip = query.get("zip") || "";
  const countryAddress = query.get("countryAddress") || "";
  const notify = query.get("notify") || "yes";
  const isAdult = query.get("isAdult") === "true";

  const [cardNumber, setCardNumber] = useState(query.get("cardNumber") || "");
  const [holderName, setHolderName] = useState(query.get("holderName") || "");
  const [expiry, setExpiry] = useState(query.get("expiry") || "");
  const [cvc, setCvc] = useState(query.get("cvc") || "");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const pixKey = "pix-demo@rentaleasy.com";
  const [paypalEmail, setPaypalEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (itemId) {
      axios.get(`${API_BASE_URL}/api/items/${itemId}`)
        .then(res => setItem(res.data))
        .catch(() => setItem(null));
    }
  }, [itemId]);

  function validatePayment() {
    if (paymentMethod === "card") {
      if (!cardNumber || !holderName || !expiry || !cvc) return "Fill in all credit card fields.";
      if (cardNumber.replace(/\s/g, "").length < 13) return "Card number seems invalid.";
      if (!/^[0-9]{2}\/[0-9]{2,4}$/.test(expiry)) return "Expiry must be MM/YY.";
      if (!/^[0-9]{3,4}$/.test(cvc)) return "CVC seems invalid.";
    }
    if (paymentMethod === "paypal") {
      if (!paypalEmail || !/^[^@]+@[^@]+\.[^@]+$/.test(paypalEmail)) return "Please enter a valid PayPal email.";
    }
    // Pix: pode apenas confirmar!
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validatePayment();
    if (err) {
      alert(err);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="text-3xl text-green-600 font-bold mb-3">Payment Successful!</div>
        <div className="text-lg text-gray-700">Your reservation is confirmed.<br />Check your email for details.</div>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-bold" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  if (!item) {
    return <div className="p-8 text-center">Loading item for payment...</div>;
  }

  function handleEdit() {
    const params = new URLSearchParams({
      pickupDate,
      returnDate,
      firstName,
      lastName,
      email,
      country,
      phone,
      address,
      city,
      state,
      zip,
      countryAddress,
      notify,
      isAdult,
      total,
    });
    navigate(`/items/${itemId}?${params.toString()}`);
  }

  // Montagem amigável do endereço
  const addressDisplay = [address, city, state, zip, countryAddress].filter(Boolean).join(", ");

  return (
    <div className="max-w-2xl mx-auto bg-slate-50 rounded-xl p-6 shadow my-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Checkout</h2>
      <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
        <img
          src={item.image || "/images/placeholder.png"}
          alt={item.name}
          className="w-36 h-36 object-cover rounded-lg shadow"
        />
        <div className="flex-1 text-left">
          <div className="text-xl font-semibold">{item.name}</div>
          <div className="text-gray-600">{item.location}</div>
          <div className="text-gray-500 text-sm mb-2">
            {pickupDate} → {returnDate}
          </div>
          <div className="text-blue-600 font-bold text-lg">Total: ${total}</div>
        </div>
      </div>

      {/* RESUMO DOS DADOS DO CONDUTOR */}
      <div className="mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-900">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-lg">Reservation details</span>
          <button
            className="flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold text-sm"
            type="button"
            onClick={handleEdit}
          >
            <FaEdit className="inline" /> Edit Reservation
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div><b>Name:</b> {firstName} {lastName}</div>
          <div><b>Email:</b> {email}</div>
          <div><b>Country:</b> {country}</div>
          <div><b>Phone:</b> {phone}</div>
          <div><b>Address:</b> {addressDisplay || "-"}</div>
          <div><b>Info by email?</b> {notify === "yes" ? "Yes" : "No"}</div>
          <div><b>18+?</b> {isAdult === "true" ? "Yes" : "No"}</div>
        </div>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="font-semibold mb-2">Payment method</div>
          <div className="flex gap-3">
            {paymentOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`flex items-center gap-2 border rounded-md px-4 py-2 text-base text-nowrap font-medium transition
                  ${paymentMethod === opt.id ? "bg-blue-600 text-white border-blue-600 shadow" : "text-gray-800"}`}
                onClick={() => setPaymentMethod(opt.id)}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Condicional */}
        {paymentMethod === "card" && (
          <>
            <div className="flex gap-2 justify-start items-center mt-4 w-full">
              <PaymentIcon type="generic" format="flatRounded" width={32} />
              <input
                type="text"
                className="border rounded px-3 py-2 max-w-[380px] w-full"
                placeholder="Card Number"
                aria-labelledby="card-number"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Cardholder Name</label>
              <input
                type="text"
                className="border rounded px-3 py-2 max-w-[420px] w-full"
                placeholder="Cardholder Name"
                aria-labelledby="cardholder-name"
                value={holderName}
                onChange={e => setHolderName(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-6 justify-start items-center">
              <div>
                <label className="block mb-2 text-sm font-semibold">Expiry Date</label>
                <input
                  type="text"
                  className="border rounded px-3 py-2 max-w-[80px]"
                  placeholder="MM/YY"
                  aria-labelledby="expiry-date"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold">CVC</label>
                <input
                  type="text"
                  className="border rounded px-3 py-2 max-w-[80px]"
                  placeholder="CVC"
                  aria-labelledby="cvc"
                  value={cvc}
                  onChange={e => setCvc(e.target.value)}
                  required
                />
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

            <div className="text-sm text-gray-400">Fake card for demo: 4242 4242 4242 4242</div>
            <div className="text-xs text-yellow-700 mt-2 bg-yellow-50 p-2 rounded">
              The payment method must be under the renter's name and physically presented at pickup. Debit cards are accepted for select vehicle classes, and <span className="underline font-medium">additional documentation</span> may be required in some cases.
            </div>
          </>
        )}
        {paymentMethod === "pix" && (
          <div className="w-full text-center px-5 py-7">
            <div className="text-2xl font-bold text-blue-600 mb-2 flex justify-center items-center gap-2">
              <MdPix /> PIX
            </div>
            <div className="mb-3">
              <span className="font-semibold">PIX key:</span>
              <span className="ml-2 bg-blue-50 px-2 py-1 rounded">{pixKey}</span>
            </div>
            <div className="text-gray-500 text-sm">Simulated: Copy the key and confirm</div>
            <div className="text-xs text-yellow-700 mt-2 bg-yellow-50 p-2 rounded">
              The payment method must be under the renter's name and physically presented at pickup. Debit cards are accepted for select vehicle classes, and <span className="underline font-medium">additional documentation</span> may be required in some cases.
            </div>
          </div>
        )}
        {paymentMethod === "paypal" && (
          <>
            <div className="flex items-center gap-2 mb-2 text-lg font-bold text-blue-500">
              <FaPaypal /> PayPal (demo)
            </div>
            <input
              type="email"
              className="border rounded px-3 py-2"
              placeholder="PayPal Email"
              value={paypalEmail}
              onChange={e => setPaypalEmail(e.target.value)}
              required
            />
            <div className="text-xs text-yellow-700 mt-2 bg-yellow-50 p-2 rounded">
              The payment method must be under the renter's name and physically presented at pickup. Debit cards are accepted for select vehicle classes, and <span className="underline font-medium">additional documentation</span> may be required in some cases.
            </div>
          </>
        )}

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mr-2" /> : "Confirm Payment"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
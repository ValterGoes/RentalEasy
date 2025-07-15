import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { FaCreditCard, FaQrcode, FaPaypal } from "react-icons/fa";


const paymentOptions = [
  { id: "card", label: "Credit Card", icon: <FaCreditCard size={20} /> },
  { id: "pix", label: "PIX", icon: <FaQrcode size={20} /> },
  { id: "paypal", label: "PayPal", icon: <FaPaypal size={20} /> }
];

const Checkout = () => {
  const query = new URLSearchParams(useLocation().search);
  const itemId = query.get("itemId");
  const pickupDate = query.get("pickupDate");
  const returnDate = query.get("returnDate");
  const name = query.get("name") || "";
  const email = query.get("email") || "";
  const total = query.get("total");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  // Pix field (fake)
  const pixKey = "pix-demo@rentaleasy.com";
  // Paypal (fake)
  const [paypalEmail, setPaypalEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (itemId) {
      axios.get(`${API_BASE_URL}/api/items/${itemId}`)
        .then(res => setItem(res.data))
        .catch(() => setItem(null));
    }
  }, [itemId]);

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

  // Handler do submit
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500); // Simula pagamento
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 shadow my-10">
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

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="font-semibold mb-2">Payment method</div>
          <div className="flex gap-3">
            {paymentOptions.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`flex items-center gap-2 border rounded-full px-5 py-2 text-base font-medium transition
                  ${paymentMethod === opt.id ? "bg-blue-600 text-white border-blue-600 shadow" : "bg-gray-100 text-gray-800 border-gray-200"}
                  hover:bg-blue-50 hover:border-blue-300`}
                onClick={() => setPaymentMethod(opt.id)}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Campos condicionalmente renderizados */}
        {paymentMethod === "card" && (
          <>
            <input type="text" className="border rounded px-3 py-2" placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required />
            <div className="flex gap-2">
              <input type="text" className="border rounded px-3 py-2 flex-1" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} required />
              <input type="text" className="border rounded px-3 py-2 flex-1" placeholder="CVC" value={cvc} onChange={e => setCvc(e.target.value)} required />
            </div>
            <div className="text-sm text-gray-400">Fake card for demo: 4242 4242 4242 4242</div>
          </>
        )}

        {paymentMethod === "pix" && (
          <div className="w-full text-center bg-gray-50 border rounded-xl px-5 py-7">
            <div className="text-2xl font-bold text-blue-600 mb-2 flex justify-center items-center gap-2">
              <FaQrcode /> PIX
            </div>
            <div className="mb-3">
              <span className="font-semibold">PIX key:</span>
              <span className="ml-2 bg-blue-50 px-2 py-1 rounded">{pixKey}</span>
            </div>
            <div className="text-gray-500 text-sm">Simulated: Copy the key and confirm</div>
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
          </>
        )}

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay $${total}`}
        </button>
      </form>
    </div>
  );
};

export default Checkout;

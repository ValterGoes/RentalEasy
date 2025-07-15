import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const Checkout = () => {
  const query = new URLSearchParams(useLocation().search);
  const itemId = query.get("itemId");

  const [item, setItem] = useState(null);

  useEffect(() => {
    if (itemId) {
      axios.get(`${API_BASE_URL}/api/items/${itemId}`)
        .then(res => setItem(res.data))
        .catch(() => setItem(null));
    }
  }, [itemId]);

  if (!item) return <div className="p-8 text-center">Loading reservation...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 shadow my-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Complete Your Reservation</h2>
      <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
        <img
          src={item.image || "/images/placeholder.png"}
          alt={item.name}
          className="w-36 h-36 object-cover rounded-lg shadow"
        />
        <div className="flex-1 text-left">
          <div className="text-xl font-semibold">{item.name}</div>
          <div className="text-gray-600">{item.location}</div>
          <div className="text-blue-600 font-bold text-lg">${item.price}/day</div>
        </div>
      </div>

      {/* Aqui pode adicionar os inputs de datas, horários, informações de contato/pagamento etc */}
      <form className="flex flex-col gap-4">
        <input type="date" className="border rounded px-3 py-2" required placeholder="Pick-up date" />
        <input type="date" className="border rounded px-3 py-2" required placeholder="Return date" />
        <input type="text" className="border rounded px-3 py-2" required placeholder="Full Name" />
        <input type="email" className="border rounded px-3 py-2" required placeholder="Email" />
        {/* ...mais campos conforme precisar */}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );
};

export default Checkout;

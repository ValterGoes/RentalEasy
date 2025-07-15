import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { ArrowLeft } from "lucide-react";

// --- COMPONENTE DE DETALHES DO ITEM ---
const ItemDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pickupDateFromQuery = query.get("pickupDate") || "";
  const returnDateFromQuery = query.get("returnDate") || "";
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/items/${id}`)
      .then(res => setItem(res.data))
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (item) {
      const images = item.images && item.images.length > 0
        ? item.images
        : [item.image || "/images/placeholder.png"];
      setMainImage(images[0]);
    }
  }, [item]);

  if (loading) {
    return <div className="flex justify-center items-center h-40 text-blue-600 font-bold">Loading...</div>;
  }

  if (!item) {
    return <div className="text-center text-gray-500 mt-10">Item not found.</div>;
  }

  const images = item.images && item.images.length > 0
    ? item.images
    : [item.image || "/images/placeholder.png"];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      {/* Botão Voltar */}
      <button
        className="flex items-center mb-4 text-blue-600 hover:text-blue-800 font-semibold transition"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2" /> Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Galeria */}
        <div className="flex-1">
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-gray-100 shadow mb-4">
            <img
              src={mainImage}
              alt={item.name}
              className="w-full h-full object-cover rounded-2xl transition-all duration-500"
            />
          </div>
          <div className="grid grid-cols-6 gap-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                className={`rounded-lg h-16 w-full object-cover border cursor-pointer transition 
                  ${mainImage === img ? "ring-2 ring-blue-600" : "opacity-80 hover:opacity-100"}`}
                onClick={() => setMainImage(img)}
                onError={e => { e.target.src = "/images/placeholder.png"; }}
              />
            ))}
          </div>
        </div>
        {/* Detalhes e Reserva */}
        <div className="flex-1 flex flex-col justify-between min-w-[270px]">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-2">{item.name}</h2>
            <div className="mb-2 text-gray-500">{item.category} • {item.location}</div>
            <div className="mb-3 text-2xl font-bold text-gray-800">${item.price}/day</div>
            <span className={`inline-block text-xs px-3 py-1 rounded mb-4 
                ${item.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {item.isAvailable ? "Available" : "Unavailable"}
            </span>
            <p className="mb-4 text-gray-700">{item.description || "No description available."}</p>
            {item.features && item.features.length > 0 && (
              <ul className="mb-4 text-sm text-gray-600 list-disc list-inside">
                {item.features.map((f, idx) => <li key={idx}>{f}</li>)}
              </ul>
            )}
          </div>
          <button
            className={`mt-2 w-full md:w-48 py-3 rounded-full font-semibold text-lg transition
              ${item.isAvailable
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"}
            `}
            disabled={!item.isAvailable}
            onClick={() => setShowModal(true)}
          >
            {item.isAvailable ? "Reserve Now" : "Unavailable"}
          </button>
        </div>
      </div>

      {/* MODAL DE RESERVA */}
      {showModal && (
        <ReserveModal
          item={item}
          pickupDateDefault={pickupDateFromQuery}
          returnDateDefault={returnDateFromQuery}
          onClose={() => setShowModal(false)}
          onConfirm={(data) => {
            setShowModal(false);
            // Aqui você enviaria para o backend
            alert(`Reserva feita de ${data.pickupDate} até ${data.returnDate}\nNome: ${data.name}\nTotal: $${data.totalPrice}`);
            navigate("/"); // Redireciona após reserva (ou pode exibir confirmação)
          }}
        />
      )}
    </div>
  );
};

// --- COMPONENTE MODAL DE RESERVA ---
function ReserveModal({ item, pickupDateDefault, returnDateDefault, onClose, onConfirm }) {
  const [pickupDate, setPickupDate] = useState(pickupDateDefault || "");
  const [returnDate, setReturnDate] = useState(returnDateDefault || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Calcula total de dias
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

  // Validação de datas
  const datesValid = pickupDate && returnDate && (new Date(returnDate) > new Date(pickupDate));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl relative z-10">
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Reserve: {item.name}</h2>
        <img src={item.image || "/images/placeholder.png"} alt={item.name} className="w-full h-44 object-cover rounded-lg mb-4" />
        <div className="mb-3 flex gap-2">
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
        <div className="mb-2 text-gray-600">
          {datesValid ? (
            <>
              <span className="font-bold">{totalDays}</span> day{totalDays !== 1 ? "s" : ""} × ${item.price}/day
              <br />
              <span className="text-blue-600 font-bold text-lg">Total: ${totalPrice}</span>
            </>
          ) : (
            <span className="text-xs text-red-500">Select valid dates</span>
          )}
        </div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded px-2 py-2 mb-2 w-full"
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded px-2 py-2 mb-2 w-full"
          placeholder="Email"
          required
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition mt-2"
          onClick={() => {
            if (!pickupDate || !returnDate || !name || !email) {
              alert("Please fill in all fields!");
              return;
            }
            if (!datesValid) {
              alert("Please select valid pickup and return dates.");
              return;
            }
            onConfirm({ pickupDate, returnDate, name, email, totalDays, totalPrice });
          }}
        >
          Confirm Reservation
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;

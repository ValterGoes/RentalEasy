import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { FaArrowLeft } from "react-icons/fa";
import ReserveModal from "./ReserveModal";

const ItemDetail = ({ availableLocations }) => {
  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const pickupDateFromQuery = query.get("pickupDate") || "";
  const pickupTimeFromQuery = query.get("pickupTime") || "09:00";
  const returnDateFromQuery = query.get("returnDate") || "";
  const returnTimeFromQuery = query.get("returnTime") || "09:00";
  const pickupLocationFromQuery = query.get("pickupLocation") || query.get("location") || "";
  const returnLocationFromQuery = query.get("returnLocation") || "";
  const firstNameFromQuery = query.get("firstName") || "";
  const lastNameFromQuery = query.get("lastName") || "";
  const emailFromQuery = query.get("email") || "";
  const phoneFromQuery = query.get("phone") || "";
  const countryFromQuery = query.get("country") || "";
  const addressFromQuery = query.get("address") || "";
  const cityFromQuery = query.get("city") || "";
  const stateFromQuery = query.get("state") || "";
  const zipFromQuery = query.get("zip") || "";
  const countryAddressFromQuery = query.get("countryAddress") || "";
  const notifyFromQuery = query.get("notify") || "yes";
  const isAdultFromQuery = query.get("isAdult") === "true";
  const cardNumberFromQuery = query.get("cardNumber") || "";
  const holderNameFromQuery = query.get("holderName") || "";
  const expiryFromQuery = query.get("expiry") || "";
  const cvcFromQuery = query.get("cvc") || "";
  const paypalEmailFromQuery = query.get("paypalEmail") || "";
  const categoriesFromQuery = query.get("categories") || "";

  const editMode = query.get("editMode") === "true"; 

  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // --- NOVO LOG DE DEPURACÃO ---
  useEffect(() => {
    console.log("ItemDetail - Parâmetros da URL recebidos:");
    console.log("  pickupDateFromQuery:", pickupDateFromQuery);
    console.log("  pickupTimeFromQuery:", pickupTimeFromQuery);
    console.log("  returnDateFromQuery:", returnDateFromQuery);
    console.log("  returnTimeFromQuery:", returnTimeFromQuery);
    console.log("  pickupLocationFromQuery:", pickupLocationFromQuery);
    console.log("  returnLocationFromQuery:", returnLocationFromQuery); 
      if (editMode) {
        setShowModal(true);
      }
  }, [location.search, editMode]);
  // --- FIM DO NOVO LOG ---

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
      <button
        className="flex items-center mb-4 text-blue-600 hover:text-blue-800 font-semibold transition"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <div className="relative w-full h-62 md:h-96 rounded-2xl overflow-hidden bg-gray-100 shadow mb-4">
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

      {/* Renderiza o modal de reserva */}
      {showModal && (
        <ReserveModal
          item={item}
          initialData={{
            pickupDate: pickupDateFromQuery,
            pickupTime: pickupTimeFromQuery,
            returnDate: returnDateFromQuery,
            returnTime: returnTimeFromQuery,
            pickupLocation: pickupLocationFromQuery,
            returnLocation: returnLocationFromQuery,
            firstName: firstNameFromQuery,
            lastName: lastNameFromQuery,
            email: emailFromQuery,
            phone: phoneFromQuery,
            country: countryFromQuery, 
            address: addressFromQuery,
            city: cityFromQuery,
            state: stateFromQuery,
            zip: zipFromQuery,
            countryAddress: countryAddressFromQuery, 
            notify: notifyFromQuery,
            isAdult: isAdultFromQuery,
            cardNumber: cardNumberFromQuery,
            holderName: holderNameFromQuery,
            expiry: expiryFromQuery,
            cvc: cvcFromQuery,
            paypalEmail: paypalEmailFromQuery,
            categories: categoriesFromQuery,
          }}
          onClose={() => setShowModal(false)}
          onConfirm={(reservationData) => {
            setShowModal(false);

            const params = new URLSearchParams({
              itemId: item.id,
              pickupDate: reservationData.pickupDate,
              pickupTime: reservationData.pickupTime,
              returnDate: reservationData.returnDate,
              returnTime: reservationData.returnTime,
              pickupLocation: reservationData.pickupLocation,
              returnLocation: reservationData.returnLocation,
              firstName: reservationData.firstName,
              lastName: reservationData.lastName,
              email: reservationData.email,
              phone: reservationData.phone,
              country: reservationData.country, // Incluído country
              address: reservationData.address,
              city: reservationData.city,
              state: reservationData.state,
              zip: reservationData.zip,
              countryAddress: reservationData.countryAddress,
              notify: reservationData.notify,
              total: reservationData.totalPrice.toString(),
              cardNumber: reservationData.cardNumber,
              holderName: reservationData.holderName,
              expiry: reservationData.expiry,
              cvc: reservationData.cvc,
              isAdult: String(reservationData.isAdult),
              paypalEmail: reservationData.paypalEmail,
              categories: categoriesFromQuery,
            });

            navigate(`/checkout?${params.toString()}`);

          }}
          availableLocations={availableLocations}
        />
      )}
    </div>
  );
};

export default ItemDetail;
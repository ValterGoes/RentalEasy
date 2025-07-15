import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import API_BASE_URL from '../config';

const Items = () => {
  const locationHook = useLocation();
  const query = new URLSearchParams(locationHook.search);

  const locationFilter = query.get("location") || "";
  const categoriesFilterRaw = query.get("categories") || "";
  const categoriesFilter = categoriesFilterRaw
    ? categoriesFilterRaw.split(",").map(c => c.trim())
    : [];
  const pickupDate = query.get("pickupDate");
  const returnDate = query.get("returnDate");

  const filtrosSelecionados =
    (categoriesFilter && categoriesFilter.length > 0) &&
    pickupDate && returnDate;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!filtrosSelecionados) return;

    setLoading(true);
    axios.get(`${API_BASE_URL}/api/items`)
      .then(response => {
        let filtered = response.data;

        filtered = filtered.filter(item => item.isAvailable && item.location);

        if (locationFilter) {
          filtered = filtered.filter(item =>
            item.location.toLowerCase() === locationFilter.toLowerCase()
          );
        }

        if (categoriesFilter.length > 0) {
          filtered = filtered.filter(item =>
            categoriesFilter.some(cat => item.category.toLowerCase() === cat.toLowerCase())
          );
        }

        setItems(filtered);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));

  }, [
    locationFilter,
    categoriesFilterRaw,
    pickupDate,
    returnDate,
    filtrosSelecionados,
  ]);

  if (!filtrosSelecionados) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-200 text-gray-700 text-lg">
        <span>Please select category, pickup and return dates to see available items.</span>
      </div>
    );
  }

  if (loading) {
    return <div className="flex justify-center items-center h-48 text-blue-600 font-bold text-xl">Loading items...</div>
  }

  if (!items.length) {
    return <div className="flex justify-center items-center h-48 text-gray-400 font-bold text-xl">No items found.</div>
  }

  return (
    <div className="relative min-h-screen">
      {/* Camada do background */}
      <div
        className="absolute inset-0 bg-slate-100"
        // style={{
        //   backgroundImage: 'url(/images/Backgrounds/RentalEasy2.png)',
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   opacity: 0.22,
        //   zIndex: 0,
        // }}
      />
      {/* Conteúdo */}
      <div className="relative z-10 p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Available for Rent</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(item => (
            <Link
              key={item.id}
              to={`/items/${item.id}?pickupDate=${pickupDate}&returnDate=${returnDate}`}
              className="group border rounded-2xl shadow bg-white overflow-hidden block focus:outline-none focus:ring-2 focus:ring-blue-400
                transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              tabIndex={0}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/images/placeholder.png"}
                  alt={item.name}
                  className="w-full h-48 object-cover bg-gray-100 transition-opacity duration-700 opacity-0 group-hover:opacity-90"
                  onLoad={e => { e.target.style.opacity = 1; }}
                  onError={e => { e.target.src = "/images/placeholder.png"; e.target.style.opacity = 1; }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition">{item.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded transition
                    ${item.isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"}
                  `}>
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-1">{item.location}</div>
                <div className="text-gray-600 mb-2 font-semibold">${item.price}/day</div>
                <button
                  className={`mt-2 w-full py-2 rounded-full font-semibold transition
                    ${item.isAvailable
                      ? "bg-blue-600 text-white group-hover:bg-blue-700"
                      : "bg-gray-300 text-gray-400 cursor-not-allowed"}
                  `}
                  tabIndex={-1}
                  disabled={!item.isAvailable}
                >
                  Rent Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Items;

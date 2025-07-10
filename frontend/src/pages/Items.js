import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import API_BASE_URL from '../config';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/items`)
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-48 text-blue-600 font-bold text-xl">Loading items...</div>
  }

  if (!items.length) {
    return <div className="flex justify-center items-center h-48 text-gray-400 font-bold text-xl">No items found.</div>
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Available for Rent</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(item => (
          <Link
            key={item.id}
            to={`/items/${item.id}`}
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
                disabled
              >
                Rent Now
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Items;

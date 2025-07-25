import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';


const FeaturedItems = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/items`)
            .then(res => setItems(res.data))
            .catch(() => setItems([]));
    }, []);



  return (
      <div className='mb-52 mt-20'>
          <h2 className="text-3xl font-bold mb-6 text-blue-600">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.filter(item => item.isAvailable).slice(0, 2).map(item => (
                  <div
                      key={item.id}
                      className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2
                            transition duration-300 group cursor-pointer"
                      style={{ minHeight: 350 }}
                  >
                      <div className="overflow-hidden rounded-xl">
                          <img
                              src={
                                  item.image ||
                                  (item.images && item.images.length > 0 ? item.images[0] : "/images/placeholder.png")
                              }
                              alt={item.name}
                              className="w-full h-48 object-cover rounded-xl transform transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                          />
                      </div>
                      <h3 className="text-xl font-semibold mt-3 mb-1 group-hover:text-blue-600 transition">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-blue-600 font-bold text-lg mt-3 mb-1">${item.price}/day</p>
                      <div className="flex justify-between items-center mt-2">
                          <span className="inline-block bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-xs">
                              {item.location}
                          </span>
                          {item.isAvailable && (
                              <span className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs animate-pulse">
                                  Available
                              </span>
                          )}
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default FeaturedItems;
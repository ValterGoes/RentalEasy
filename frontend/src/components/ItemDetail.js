import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { ArrowLeft } from "lucide-react";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/items/${id}`)
      .then(response => setItem(response.data))
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-40 text-blue-600 font-bold">Loading...</div>;
  }

  if (!item) {
    return <div className="text-center text-gray-500 mt-10">Item not found.</div>;
  }

  // Criando 6 imagens para galeria (usando a mesma por enquanto)
  const images = Array(6).fill(item.image || "/images/placeholder.png");

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Botão Voltar */}
      <button
        className="flex items-center mb-4 text-blue-600 hover:text-blue-800 font-semibold transition"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2" /> Back
      </button>
      {/* Galeria */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Imagem principal */}
          <div className="flex-1">
            <img
              src={images[0]}
              alt={item.name}
              className="rounded-2xl shadow w-full h-64 object-cover bg-gray-100 mb-2 transition-opacity duration-700"
              onError={e => { e.target.src = "/images/placeholder.png"; }}
            />
            {/* Thumbnails */}
            <div className="grid grid-cols-6 gap-2 mt-2">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="rounded-lg h-16 w-full object-cover border"
                  onError={e => { e.target.src = "/images/placeholder.png"; }}
                />
              ))}
            </div>
          </div>
          {/* Detalhes */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-blue-600 mb-2">{item.name}</h2>
              <div className="mb-2 text-gray-500">{item.category} • {item.location}</div>
              <div className="mb-3 text-lg font-bold text-gray-800">${item.price}/day</div>
              <span className={`inline-block text-xs px-3 py-1 rounded mb-4 ${item.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {item.isAvailable ? "Available" : "Unavailable"}
              </span>
              <p className="mb-4 text-gray-700">{item.description || "No description available."}</p>
              {item.features && item.features.length > 0 && (
                <ul className="mb-4 text-sm text-gray-600 list-disc list-inside">
                  {item.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              )}
            </div>
            <button
              className={`mt-2 w-full md:w-40 py-2 rounded-full font-semibold transition
                ${item.isAvailable
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-400 cursor-not-allowed"}
              `}
              disabled={!item.isAvailable}
            >
              Rent Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

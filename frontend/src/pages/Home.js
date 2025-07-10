import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdvancedFilter from '../components/AdvancedFilter';
import API_BASE_URL from '../config';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/items`)
      .then(res => setItems(res.data))
      .catch(() => setItems([]));
  }, []);

  // Extrai locais únicos dos itens disponíveis
  const availableLocations = [
    ...new Set(items.filter(i => i.isAvailable).map(i => i.location))
  ];

  // Função chamada ao buscar
  const handleSearch = ({ location, categories }) => {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (categories && categories.length > 0) params.append('categories', categories.join(','));
    navigate(`/items?${params.toString()}`);
  };

  return (
    <div
      className="bg-contain bg-slate-200 bg-top bg-no-repeat min-h-screen flex flex-col items-center justify-start text-center px-6 pt-10 relative"
    // style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <AdvancedFilter onSearch={handleSearch} availableLocations={availableLocations} />

      {/* Conteúdo principal da Home */}
      <div className="mt-12 mb-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to RentalEasy</h1>
        <p className="text-lg text-gray-700">Rent bikes, tools, RVs, and more — quickly and effortlessly.</p>
      </div>
    </div>
  );
};

export default Home;

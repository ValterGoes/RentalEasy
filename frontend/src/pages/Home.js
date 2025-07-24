import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdvancedFilter from '../components/AdvancedFilter';
import API_BASE_URL from '../config';
import axios from 'axios';
import Onboarding from '../components/Onboarding';
import FeaturedItems from '../components/FeaturedItems';


const Home = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/items`)
            .then(res => setItems(res.data))
            .catch(() => setItems([]));
    }, []);

    const availableLocations = [
        ...new Set(items.filter(i => i.isAvailable).map(i => i.location))
    ];

    const handleSearch = ({ location, categories }) => {
        const params = new URLSearchParams();
        if (location) params.append('location', location);
        if (categories && categories.length > 0) params.append('categories', categories.join(','));
        navigate(`/items?${params.toString()}`);
    };

    return (
        <div
            className="bg-contain bg-slate-100 bg-top bg-no-repeat min-h-screen flex flex-col items-center justify-start text-center px-6 pt-10 gap-7 relative"
        >

            <AdvancedFilter onSearch={handleSearch} availableLocations={availableLocations} />

            {/* Conteúdo principal da Home */}
            <div className="relative w-full h-[500px] flex flex-col items-center justify-center py-20 md:py-32 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: 'url(/images/Backgrounds/RentalEasy3.png)' }}
                ></div>

                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-cyan-900 mb-2">
                        Welcome to <strong>RentalEasy</strong>
                    </h1>
                    <p className="text-lg font-medium text-gray-800">
                        Rent bikes, tools, RVs, and more — quickly and effortlessly.
                    </p>
                </div>
            </div>

            {/* Onboarding Component */}
            <Onboarding />


            {/* Featured Items */}
            <FeaturedItems />

        </div>
    );
};

export default Home;
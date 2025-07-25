import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Assumindo uso de i18n para tradução
import { FaRegCalendarCheck, FaHistory, FaTimesCircle } from 'react-icons/fa'; // Ícones para as abas
import axios from 'axios'; // Importa axios
import API_BASE_URL from '../config'; // Importa a base da URL da sua API

const manageBookingsMenuItems = [

    { key: 'active reservations', label: 'Active Reservations', to: '/managebooking' },

    { key: 'reservations completed', label: 'Reservations Completed', to: '/managebooking' },

    { key: 'canceled reservations', label: 'Canceled Reservations', to: '/managebooking' },

];

const ManageBookings = () => {
    const [activeTab, setActiveTab] = useState('active'); // Estado para controlar a aba ativa
    const [reservations, setReservations] = useState({ // Estado para as reservas
        active: [],
        completed: [],
        canceled: [],
    });
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const { t } = useTranslation(); // Hook de tradução

    // Efeito para carregar as reservas do backend
    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            setError(null);
            try {
                // Em um app real, você enviaria um token de autenticação aqui
                const response = await axios.get(`${API_BASE_URL}/api/reservations`);
                setReservations(response.data);
            } catch (err) {
                console.error("Error fetching reservations:", err);
                setError(t('Failed to load reservations. Please try again later.'));
                setReservations({ active: [], completed: [], canceled: [] }); // Limpa reservas em caso de erro
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [t]); // Dependência: t (para re-executar se o idioma mudar)

    const currentReservations = reservations[activeTab];

    if (loading) {
        return (
            <div className="container mx-auto p-4 sm:p-8 text-center text-blue-600 text-xl font-bold">
                {t('Loading reservations...')}
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 sm:p-8 text-center text-red-600 text-xl font-bold">
                {error}
            </div>
        );
    }

    const renderManagerBookings = () => (
            <div className="absolute right-0 mt-2 w-56 rounded shadow bg-white border z-[999]">
                {manageBookingsMenuItems.map(item => (
                    <Link

                        to={item.to}
                        key={item.key}
                        className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-600"
                        onClick={() => {
                            setProfileMenuOpen(false);
                            if (mobile && closeMobileMenu) closeMobileMenu();
                        }}
                    >
                        {t(item.label)}
                    </Link>
                ))} 
            </div>
        );

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                {t('Manage Bookings')}
            </h1>

            {/* Navegação por abas */}
            <div className="flex justify-center mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`flex items-center gap-2 px-2 md:px-6 py-3 font-semibold text-md md:text-lg transition-colors duration-200
                        ${activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                >
                    <FaRegCalendarCheck /> {t('Active Reservations')}
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`flex items-center gap-2 px-2 md:px-6 py-3 font-semibold text-md md:text-lg transition-colors duration-200
                        ${activeTab === 'completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                >
                    <FaHistory /> {t('Completed Reservations')}
                </button>
                <button
                    onClick={() => setActiveTab('canceled')}
                    className={`flex items-center gap-2 px-2 md:px-6 py-3 font-semibold text-md md:text-lg transition-colors duration-200
                        ${activeTab === 'canceled' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                >
                    <FaTimesCircle /> {t('Canceled Reservations')}
                </button>
            </div>

            {/* Conteúdo das reservas */}
            <div className="bg-white p-6 rounded-lg shadow-xl">
                {currentReservations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentReservations.map(reservation => (
                            <div key={reservation.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                {/* Exibição da imagem da reserva */}
                                <img
                                    src={reservation.image || "/images/placeholder.png"}
                                    alt={reservation.item}
                                    className="w-full h-32 object-cover rounded-md mb-3"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{reservation.item}</h3>
                                <p className="text-sm text-gray-600"><strong>{t('Booking ID')}:</strong> {reservation.id}</p>
                                <p className="text-sm text-gray-600"><strong>{t('Pickup')}:</strong> {reservation.pickup}</p>
                                <p className="text-sm text-gray-600"><strong>{t('Return')}:</strong> {reservation.return}</p>
                                <p className="text-sm text-gray-600"><strong>{t('Location')}:</strong> {reservation.location}</p>
                                <span className={`inline-block px-2 py-1 mt-2 rounded-full text-xs font-medium 
                                    ${reservation.status === 'Active' ? 'bg-green-100 text-green-800' :
                                        reservation.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                            'bg-red-100 text-red-800'}`}>
                                    {t(reservation.status)}
                                </span>
                                {/* Botões de ação como "View Details", "Cancel" (apenas para ativos) */}
                                {activeTab === 'active' && (
                                    <div className="mt-3">
                                        <button className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600">
                                            {t('Cancel')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 text-lg">
                        <p>{t('No reservations found for this category.')}</p>
                        {activeTab === 'active' && (
                            <p className="mt-4">
                                <Link to="/home" className="text-blue-600 hover:underline">
                                    {t('Start a new reservation')}
                                </Link>
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-100 text-blue-900">
                <h2 className="text-xl font-semibold mb-3">{t('Need Help with your booking?')}</h2>
                <p className="text-base mb-2">
                    {t('If you have any questions about your active, completed or canceled reservations, please contact our support team.')}
                </p>
                <Link to="/contact" className="text-blue-600 hover:underline font-semibold">
                    {t('Contact Support')}
                </Link>
            </div>
        </div>
    );
};

export default ManageBookings;
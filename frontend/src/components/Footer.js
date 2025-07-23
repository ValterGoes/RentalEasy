import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importa ícones de redes sociais

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
                    {/* Seção 1: Marca e Descrição Curta */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link to="/" className="text-2xl font-bold text-blue-400 mb-2">RentalEasy</Link>
                        <p className="text-gray-400 text-sm">
                            Sua plataforma completa para aluguel de veículos e equipamentos.
                        </p>
                    </div>

                    {/* Seção 2: Links Rápidos */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Navegação</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition duration-200 text-sm">Home</Link></li>
                            <li><Link to="/items" className="text-gray-400 hover:text-blue-400 transition duration-200 text-sm">Explorar Itens</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition duration-200 text-sm">Sobre Nós</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 transition duration-200 text-sm">Contato</Link></li>
                        </ul>
                    </div>

                    {/* Seção 3: Legal e Suporte */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Legal & Ajuda</h3>
                        <ul className="space-y-2">
                            <li><Link to="/terms" className="text-gray-400 hover:text-blue-400 transition duration-200 text-sm">Termos de Serviço</Link></li>
                            <li><Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition duration-200 text-sm">Política de Privacidade</Link></li>
                            <li><Link to="/faq" className="text-gray-400 hover:text-blue-400 transition duration-200 text-sm">FAQ</Link></li>
                            <li><Link to="/support" className="text-gray-400 hover:text-blue-400 transition duration-200 text-sm">Suporte</Link></li>
                        </ul>
                    </div>

                    {/* Seção 4: Redes Sociais e Downloads do App */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold text-white mb-4">Conecte-se</h3>
                        <div className="flex space-x-4 mb-6">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition duration-200">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition duration-200">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition duration-200">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition duration-200">
                                <FaLinkedin size={24} />
                            </a>
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-3">Baixe o App</h3>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/images/app-store-dark.png"
                                    alt="Download on the App Store"
                                    className="h-10 transition transform hover:scale-105"
                                />
                            </a>
                            {/* <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/images/google-play-dark.png" // Você precisará desta imagem
                                    alt="Get it on Google Play"
                                    className="h-10 transition transform hover:scale-105"
                                />
                            </a> */}
                        </div>
                    </div>
                </div>

                {/* Direitos Autorais na parte inferior */}
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} RentalEasy. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
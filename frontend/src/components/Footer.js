import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-4 justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className="text-sm">&copy; {new Date().getFullYear()} RentalEasy. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <Link to="/terms" className="text-sm hover:text-blue-400">Terms & Conditions</Link>
                        <Link to="/privacy" className="text-sm hover:text-blue-400">Privacy Policy</Link>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="/images/app-store-dark.png"
                                alt="Download on the App Store"
                                className="h-10"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

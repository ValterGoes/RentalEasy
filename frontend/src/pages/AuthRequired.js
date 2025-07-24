import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Import icons for login/register

const AuthRequired = () => {
    return (
        <>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8 text-center">
                <img
                    src="images/Rental-Easy-logo.png"
                    alt="App Logo"
                    className="w-40 h-40 md:w-80 md:h-80 object-contain animate-logo-grow-fade"
                    style={{ animationDuration: '1s' }}
                />

                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                    <h2 className="text-3xl font-bold text-blue-700 mb-4">Access Required</h2>
                    <p className="text-gray-700 text-lg mb-8">
                        To continue with your reservation or access this page, please log in or create your account.
                    </p>

                    <div className="flex flex-col gap-4">
                        <Link
                            to="/login"
                            className="w-full bg-blue-600 text-white py-3 rounded-full font-bold text-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center gap-2"
                        >
                            <FaSignInAlt /> Log In
                        </Link>
                        <Link
                            to="/register"
                            className="w-full bg-transparent text-blue-600 border-2 border-blue-600 py-3 rounded-full font-bold text-lg shadow-md hover:bg-blue-50 transition duration-300 ease-in-out flex items-center justify-center gap-2"
                        >
                            <FaUserPlus /> Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthRequired;
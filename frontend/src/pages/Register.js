import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import { X } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password })
            .then(res => {
                alert('Registration successful!');
                navigate('/login');
            })
            .catch(err => alert('Error registering user!'));
    };

    return (
        <div className="flex flex-col justify-between min-h-screen bg-gray-100 px-4 py-6">
            <button onClick={() => navigate('/')} className="self-end mb-2 text-gray-500 hover:text-gray-800">
                <X size={24} />
            </button>
            <header className="text-center mb-4 mt-10">
                <h1 className="text-3xl font-bold text-blue-600">Complete Your Account</h1>
                <p className="text-sm text-gray-500">Having an account provides more agility for all your bookings.</p>
            </header>
            <div className="flex-grow flex items-center justify-center">
                <form className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg" onSubmit={handleRegister}>
                    <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-blue-600">Sign Up</h2>
                    <input
                        type="text" required
                        className="w-full mb-3 md:mb-4 p-2 md:p-3 border rounded"
                        placeholder="Full Name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                    <input
                        type="email" required
                        className="w-full mb-3 md:mb-4 p-2 md:p-3 border rounded"
                        placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type="password" required
                        className="w-full mb-3 md:mb-4 p-2 md:p-3 border rounded"
                        placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 md:py-3 rounded hover:bg-blue-700">
                        Create Account
                    </button>
                    <p className="mt-3 md:mt-4 text-center text-xs md:text-sm">
                        Already have an account? <Link to="/login" className="text-blue-600">Log in</Link>
                    </p>
                </form>
            </div>
            <footer className="text-center text-xs md:text-sm text-gray-400">
                <Link to="/terms" className="mx-2 hover:text-gray-600">Terms & Conditions</Link>
                |
                <Link to="/privacy" className="mx-2 hover:text-gray-600">Privacy Policy</Link>
            </footer>
        </div>
    );
};

export default Register;

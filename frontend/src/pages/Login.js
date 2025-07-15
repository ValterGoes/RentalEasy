import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/');
            })
            .catch(err => setError(err.message));
    };

    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => navigate('/'))
            .catch(err => setError(err.message));
    };

    const handleAppleLogin = () => {
        const provider = new OAuthProvider('apple.com');
        signInWithPopup(auth, provider)
            .then(() => navigate('/'))
            .catch(err => setError(err.message));
    };

    return (
        <div className="flex flex-col justify-between min-h-screen bg-gray-100 px-4 py-6">
            <button onClick={() => navigate('/')} className="self-end mb-2 text-gray-500 hover:text-gray-800">
                <FaTimes size={24} />
            </button>
            <header className="text-center mb-4 mt-10">
                <h1 className="text-3xl font-bold text-blue-600">Log in or Register</h1>
                <p className="text-sm text-gray-500">Start your journey with RentalEasy today!</p>
            </header>
            <div className="flex-grow flex items-center justify-center">
                <form className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg" onSubmit={handleLogin}>
                    <h2 className="text-2xl md:text-4xl font-bold  text-center mb-4 md:mb-6 text-blue-600">Login</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <input
                        type="email"
                        required
                        className="w-full mb-3 md:mb-4 p-2 md:p-3 border rounded"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input
                        type="password"
                        required
                        className="w-full mb-3 md:mb-4 p-2 md:p-3 border rounded"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 md:py-3 rounded hover:bg-blue-700">
                        Login
                    </button>
                    <div className="my-3 md:my-4 flex items-center">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-400">or</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>
                    <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center border border-gray-300 py-2 md:py-3 rounded mb-2 hover:bg-gray-100">
                        <img src="/images/google-logo.png" alt="Google" className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                        Continue with Google
                    </button>
                    <button type="button" onClick={handleAppleLogin} className="w-full flex items-center justify-center border border-gray-300 py-2 md:py-3 rounded hover:bg-gray-100">
                        <img src="/images/apple-logo.png" alt="Apple" className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                        Continue with Apple
                    </button>
                    <p className="mt-3 md:mt-4 text-center text-xs md:text-sm">
                        Don't have an account? <Link to="/register" className="text-blue-600">Sign Up</Link>
                    </p>
                </form>
            </div>
            <footer className="text-center text-xs md:text-sm text-gray-400">
                <Link to="#" className="mx-2 hover:text-gray-600">Terms & Conditions</Link>
                |
                <Link to="#" className="mx-2 hover:text-gray-600">Privacy Policy</Link>
            </footer>
        </div>
    );
};

export default Login;

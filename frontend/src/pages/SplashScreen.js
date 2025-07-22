
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            const isAuthenticated = localStorage.getItem("user"); // ou outro método de verificação
            if (isAuthenticated) {
                navigate("/home");
            } 
            else {
                navigate("/home");
            }
        }, 2000); // espera 2 segundos

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <img
                src="images/Rental-Easy-logo.png"
                alt="App Logo"
                className="w-40 h-40 object-contain animate-fade-in"
            />
        </div>
    );
}

export default SplashScreen;

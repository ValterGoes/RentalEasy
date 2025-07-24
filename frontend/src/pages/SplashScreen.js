
function SplashScreen() {

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <img
                src="images/Rental-Easy-logo.png"
                alt="App Logo"
                className="w-40 h-40 md:w-80 md:h-80 object-contain animate-logo-grow-fade"
                style={{ animationDuration: '1s' }}
            />
        </div>
    );
}

export default SplashScreen;
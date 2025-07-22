

function SplashScreen() {

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <img
                src="images/Rental-Easy-logo.png"
                alt="App Logo"
                className="w-60 h-60 object-contain animate-ping"
                style={{ animationDuration: '2.5s' }}
            />
        </div>
    );
}

export default SplashScreen;

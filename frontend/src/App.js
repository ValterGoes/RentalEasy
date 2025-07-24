import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeLogged from './pages/HomeLogged';
import Items from './pages/Items';
import ItemDetail from './components/ItemDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import AuthRequired from './pages/AuthRequired';

import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? children : <Navigate to={`/auth-required?redirect=${encodeURIComponent(location.pathname + location.search)}`} />;
};


function InitialSplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/homelogged", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      });
      return () => unsubscribe();
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <SplashScreen />
  );
}


function Layout() {
  const location = useLocation();


  const hideLayoutPaths = ['/login', '/register', '/', '/auth-required'];
  const shouldShowLayout = !hideLayoutPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowLayout && <Navbar />}
      <main className="flex-1">
        <Routes>

          <Route path="/" element={<InitialSplashScreen />} />

          {/* Rotas públicas - Acessíveis a todos */}
          <Route path="/home" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth-required" element={<AuthRequired />} />

          <Route path="/homelogged" element={<PrivateRoute><HomeLogged /></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />

        </Routes>
      </main>
      {shouldShowLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;

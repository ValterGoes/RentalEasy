import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Items from './pages/Items';
import ItemDetail from './components/ItemDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';

function Layout() {
  const location = useLocation();

  // Não exibir Navbar e Footer nas páginas de login e registro
  const hideLayoutPaths = ['/login', '/register', /^\/items\/[^\/]+$/];

  const shouldShowLayout = !hideLayoutPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowLayout && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      {shouldShowLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

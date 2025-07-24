require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Lista de itens simulados (adicione mais campos se desejar)
const items = [
  {
    id: 1,
    name: "Electric Bike",
    price: 25,
    images: [
      "/images/Electric-bike/electric-bike-01.jpg",
      "/images/Electric-bike/electric-bike-02.jpg",
      "/images/Electric-bike/electric-bike-03.jpg",
      "/images/Electric-bike/electric-bike-04.jpg",
      "/images/Electric-bike/electric-bike-05.jpg",
      "/images/Electric-bike/electric-bike-06.jpg"
    ],
    image: "/images/electric-bike/electric-bike-01.jpg", 
    category: "Bike",
    location: "San José, CA",
    isAvailable: true,
    description: "Electric bike, comfortable and efficient.",
    features: ["Battery 60km", "Helmet included", "Insurance"]
  },
  {
    id: 2,
    name: "RV Camper",
    price: 130,
    images: [
      "/images/RV-Camper/RV-Camper-01.jpg",
      "/images/RV-Camper/RV-Camper-02.jpg",
      "/images/RV-Camper/RV-Camper-03.jpg",
      "/images/RV-Camper/RV-Camper-04.jpg",
      "/images/RV-Camper/RV-Camper-05.jpg",
      "/images/RV-Camper/RV-Camper-06.jpg"
    ],
    image: "/images/RV-Camper/RV-Camper-01.jpg",
    category: "RV",
    location: "San José, CA",
    isAvailable: true,
    description: "Spacious RV for a family vacation.",
    features: ["AC", "Shower", "Kitchen"]
  },
  {
    id: 3,
    name: "Hand Power Tools",
    price: 10,
    images: [
      "/images/Hand-Power-Tools/Hand-Power-Tools-01.jpg",
      "/images/Hand-Power-Tools/Hand-Power-Tools-02.jpg",
      "/images/Hand-Power-Tools/Hand-Power-Tools-03.jpg",
      "/images/Hand-Power-Tools/Hand-Power-Tools-04.jpg",
      "/images/Hand-Power-Tools/Hand-Power-Tools-05.jpg",
      "/images/Hand-Power-Tools/Hand-Power-Tools-06.jpg"
    ],
    image: "/images/Hand-Power-Tools/Hand-Power-Tools-06.jpg",
    category: "Tools",
    location: "Los Altos, CA",
    isAvailable: true,
    description: "Powerful drill, perfect for home projects.",
    features: ["2 batteries", "Charger included"]
  },
  {
    id: 4,
    name: "Electric Scooter",
    price: 20,
    images: [
      "/images/Electric-Scooter/Electric-Scooter.jpg",
      "/images/Electric-Scooter/Electric-Scooter-01.jpg",
    ],
    image: "/images/Electric-Scooter/Electric-scooter.jpg",
    category: "Bike",
    location: "Los Altos, CA",
    isAvailable: true,
    description: "Lightweight scooter, easy to handle.",
    features: ["Fast charging", "Helmet included"]
  },
  {
    id: 5,
    name: "Compact Car",
    price: 35,
    images: [

    ],
    image: "/images/compact-car.jpg",
    category: "Car",
    location: "San José, CA",
    isAvailable: true,
    description: "Fuel efficient compact car.",
    features: ["Automatic", "AC"]
  },
  {
    id: 6,
    name: "Off-Roads Machines",
    price: 15,
    images: [
      "/images/Excavator/excavator-01.jpg",
      "/images/Excavator/excavator-02.jpg",
      "/images/Excavator/excavator-03.jpg",
      "/images/Excavator/excavator-04.jpg",
      "/images/Excavator/excavator-05.jpg",
      "/images/Excavator/excavator-06.jpg",
      "/images/Excavator/excavator-07.jpg"

    ],
    image: "/images/Excavator/excavator-01.jpg",
    category: "Tools",
    location: "San José, CA",
    isAvailable: true,
    description: "Heavy-duty excavator for construction work.",
    features: ["Powerful engine", "Operator manual included", "Safety gear"]
  }
];

// Endpoint para todos os itens
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Endpoint para detalhe de um item
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// Endpoint para locations
app.get('/api/locations', (req, res) => {
  const uniqueLocations = [...new Set(items.map(item => item.location))];
  res.json(uniqueLocations);
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// login - sign up
const users = []; // Para demonstração; use banco de dados em produção!

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).send('Usuário já existe.');
  users.push({ id: Date.now(), name, email, password });
  res.status(201).send('Usuário cadastrado com sucesso.');
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).send('Email ou senha incorretos.');
  res.status(200).send('Login bem-sucedido.');
});


// payment

app.post('/api/payment', (req, res) => {
  const { name, cardNumber, expiry, cvc } = req.body;
  console.log('Dados recebidos:', { name, cardNumber, expiry, cvc });
  res.status(200).send('Pagamento simulado com sucesso.');
});

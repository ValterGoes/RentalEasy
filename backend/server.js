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
    image: "/images/electric-bike.jpg",
    category: "Bike",
    location: "São Paulo",
    isAvailable: true,
    description: "Electric bike, comfortable and efficient.",
    features: ["Battery 60km", "Helmet included", "Insurance"]
  },
  {
    id: 2,
    name: "RV Camper",
    price: 130,
    image: "/images/rv.jpg",
    category: "RV",
    location: "Campinas",
    isAvailable: true,
    description: "Spacious RV for a family vacation.",
    features: ["AC", "Shower", "Kitchen"]
  },
  {
    id: 3,
    name: "Cordless Drill",
    price: 10,
    image: "/images/drill.jpg",
    category: "Tools",
    location: "Belo Horizonte",
    isAvailable: false,
    description: "Powerful drill, perfect for home projects.",
    features: ["2 batteries", "Charger included"]
  },
  {
    id: 4,
    name: "Electric Scooter",
    price: 20,
    image: "/images/scooter.jpg",
    category: "Scooter",
    location: "Rio de Janeiro",
    isAvailable: true,
    description: "Lightweight scooter, easy to handle.",
    features: ["Fast charging", "Helmet included"]
  },
  {
    id: 5,
    name: "Compact Car",
    price: 35,
    image: "/images/compact-car.jpg",
    category: "Car",
    location: "Curitiba",
    isAvailable: false,
    description: "Fuel efficient compact car.",
    features: ["Automatic", "AC"]
  },
  {
    id: 6,
    name: "Hammer Drill",
    price: 15,
    image: "/images/hammer-drill.jpg",
    category: "Tools",
    location: "Brasília",
    isAvailable: true,
    description: "Hammer drill for heavy duty tasks.",
    features: ["Case included", "3 drill bits"]
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

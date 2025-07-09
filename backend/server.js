
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/items', (req, res) => {
  res.json([
  {
    "id": 1,
    "name": "Electric Bike",
    "price": 25,
    "image": "/images/electric-bike.jpg",
    "category": "Bike"
  },
  {
    "id": 2,
    "name": "RV Camper",
    "price": 130,
    "image": "/images/rv.jpg",
    "category": "RV"
  },
  {
    "id": 3,
    "name": "Cordless Drill",
    "price": 10,
    "image": "/images/drill.jpg",
    "category": "Tools"
  },
  {
    "id": 4,
    "name": "Electric Scooter",
    "price": 20,
    "image": "/images/scooter.jpg",
    "category": "Scooter"
  },
  {
    "id": 5,
    "name": "Compact Car",
    "price": 35,
    "image": "/images/compact-car.jpg",
    "category": "Car"
  },
  {
    "id": 6,
    "name": "Hammer Drill",
    "price": 15,
    "image": "/images/hammer-drill.jpg",
    "category": "Tools"
  }
]);
});

app.get('/api/items/:id', (req, res) => {
  const id = req.params.id;
  res.json({ id, name: 'Electric Bike', price: 20, description: 'Comfortable electric bike.' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// dego
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

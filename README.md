# RentalEasy

> **Status:** Este projeto está em desenvolvimento ativo. Funcionalidades podem estar incompletas ou sujeitas a alterações.

RentalEasy é uma plataforma web e mobile moderna para aluguel de veículos, bicicletas, ferramentas e muito mais.

## Como executar

### 1. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `frontend/` com suas credenciais do Firebase:

```env
REACT_APP_FIREBASE_API_KEY=sua_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=seu_projeto_id
REACT_APP_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
REACT_APP_FIREBASE_APP_ID=seu_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

Você pode encontrar essas credenciais no [Firebase Console](https://console.firebase.google.com/) > Configurações do Projeto.

### 2. Instalar dependências

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Executar a aplicação

```bash
# Executar frontend (React) — roda em http://localhost:3000
cd frontend
npm start

# Executar backend (Node/Express) — roda em http://localhost:5002
cd backend
npm start
```

## Tecnologias

- **Frontend:** React, Tailwind CSS, React Router, i18next
- **Backend:** Node.js, Express
- **Autenticação:** Firebase Authentication
- **Cliente HTTP:** Axios

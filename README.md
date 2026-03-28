# RentalEasy

> **Status:** Este projeto está em desenvolvimento ativo. Os recursos podem estar incompletos ou sujeitos a alterações.

RentalEasy é uma plataforma moderna para web e dispositivos móveis para alugar veículos, bicicletas, ferramentas e muito mais.

## How to run

### 1. Configure environment variables

Create a `.env` file inside the `frontend/` folder with your Firebase credentials:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

You can find these credentials in the [Firebase Console](https://console.firebase.google.com/) > Project Settings.

### 2. Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Run the application

```bash
# Run frontend (React) — runs on http://localhost:3000
cd frontend
npm start

# Run backend (Node/Express) — runs on http://localhost:5002
cd backend
npm start
```

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router, i18next
- **Backend:** Node.js, Express
- **Auth:** Firebase Authentication
- **HTTP Client:** Axios

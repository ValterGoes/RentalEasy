import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traduções de exemplo
const resources = {
    en: {
        translation: {
            "Browse": "Browse",
            "Checkout": "Checkout",
            "Log in | Register": "Log in | Register",
            "My Account": "My Account",
            "Show": "",
            // ...adicione todas as strings usadas no app
        }
    },
    pt: {
        translation: {
            "Browse": "Explorar",
            "Checkout": "Finalizar",
            "Log in | Register": "Entrar | Registrar",
            "My Account": "Minha Conta",
            "Show": "Ver",
            // ...adicione outras traduções
        }
    },
    es: {
        translation: {
            "Browse": "Explorar",
            "Checkout": "Finalizar",
            "Log in | Register": "Iniciar sesión | Registrar",
            "My Account": "Mi Cuenta",
            "Show": "Ver",
            // ...adicione outras traduções
        }
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false }
    });

export default i18n;

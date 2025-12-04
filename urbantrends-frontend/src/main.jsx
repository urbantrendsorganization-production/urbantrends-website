import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext';
import { Auth0Provider } from '@auth0/auth0-react';

function Auth0Wrapper() {
  const navigate = useNavigate();

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={(appState) => {
        navigate(appState?.returnTo || '/client');
      }}
    >
      <App />
    </Auth0Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Auth0Wrapper />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

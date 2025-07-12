// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { WalletContextProvider } from './context/WalletContextProvider.jsx';
import { registerSW } from 'virtual:pwa-register';

registerSW();

ReactDOM.createRoot(document.getElementById('root')).render(
  <WalletContextProvider>
    <App />
  </WalletContextProvider>
);

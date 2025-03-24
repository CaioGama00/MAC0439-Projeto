import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 usa createRoot
import App from './app';
import './styles/global.css'; // Importa os estilos globais

// Cria uma raiz para a aplicação usando React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App dentro da div #root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
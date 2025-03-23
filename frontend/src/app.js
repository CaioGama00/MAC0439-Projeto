// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Login from './pages/login';
import Lobby from './pages/lobby';
import PartidaPage from './pages/partidaPage';
import Perfil from './pages/perfil';
import Cadastro from './pages/cadastro'; 
import './styles/global.css'; // Importa os estilos globais

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Cabeçalho da aplicação */}
        <Header />

        {/* Rotas da aplicação */}
        <Routes>
          {/* Página de Login */}
          <Route path="/" element={<Login />} />

          {/* Página de Lobby (listagem de partidas) */}
          <Route path="/lobby" element={<Lobby />} />

          {/* Página da Partida */}
          <Route path="/partida/:partidaId" element={<PartidaPage />} />

          {/* Página de Perfil do Jogador */}
          <Route path="/perfil" element={<Perfil />} />

          {/* Página de Cadastro do Jogador */}
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rota padrão para páginas não encontradas (opcional) */}
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
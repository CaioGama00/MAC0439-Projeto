// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Login from './pages/login';
import Lobby from './pages/lobby';
import PartidaPage from './pages/partidaPage';
import Perfil from './pages/perfil';
import Cadastro from './pages/cadastro'; 
import AdminDBPage from './pages/AdminDBPage';
import HistoricoPartidasPage from './pages/historicoPartidas'; // Importar página de histórico
import Navbar from './components/navbar';
import './styles/global.css'; // Importa os estilos globais

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Cabeçalho da aplicação */}
        <Header />
        {/* Navbar da aplicação - ele substituirá ou complementará o Header dependendo da sua preferência */}
        <Navbar />
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

          {/* Página de Administração do Banco de Dados */}
          <Route path="/admin/db" element={<AdminDBPage />} />

          {/* Página de Administração do Banco de Dados */}
          <Route path="/historico" element={<HistoricoPartidasPage />} /> 

          {/* Página de Lobby (listagem de partidas) */}
          <Route path="/lobby/criarpartida" element={<CriarPartida />} />

          {/* Página da Partida */}
          <Route path="/partida/:partidaId" element={<PartidaPage />} />

          <Route path="/partida/iniciar/:partidaId" element={<IniciarRodadaPage />} />

          {/* Rota padrão para páginas não encontradas (opcional) */}
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

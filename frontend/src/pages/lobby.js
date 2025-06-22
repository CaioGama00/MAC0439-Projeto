// src/pages/Lobby.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { criarPartida, buscarPartidasAtivas } from '../services/api';
import { obterJogadorId } from '../utils/auth';
import TemaSelector from '../components/temaSelector';
import './lobby.css';

const Lobby = () => {
  const [partidas, setPartidas] = useState([]);
  const [mostrarTemaSelector, setMostrarTemaSelector] = useState(false);
  const [erro, setErro] = useState('');

  // Busca partidas ativas ao carregar a página
  useEffect(() => {
    const fetchPartidas = async () => {
      try {
        const response = await buscarPartidasAtivas();
        if (response && response.success && Array.isArray(response.data)) {
          setPartidas(response.data);
        } else {
          setErro('Erro ao carregar partidas: formato de dados inesperado.');
        }
      } catch (error) {
        setErro('Erro ao carregar partidas ativas.');
      }
    };

    fetchPartidas();
  }, []);

  // Função para criar uma nova partida
  const handleCriarPartida = async (temas) => {
    console.log("temas: ", temas)
    try {
      const response = await criarPartida(obterJogadorId(), temas);
      if (response && response.success && response.data) {
        setPartidas(prevPartidas => [...prevPartidas, response.data]);
      } else {
        setErro('Erro ao criar partida: resposta inesperada.');
      }
      setMostrarTemaSelector(false);
    } catch (error) {
      setErro('Erro ao criar partida.');
    }
  };

  return (
    <div className="app">
      {erro && <p className="erro">{erro}</p>}

      <main className="main">
        <div className="container">
          <div className="create-section">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title"></h2>
                <button className="create-button" onClick={() => setMostrarTemaSelector(true)}>Criar Partida</button>
              </div>
              <div className="card-content">
                {mostrarTemaSelector && (
                  <TemaSelector onSelecionarTemas={handleCriarPartida} />
                )}
              </div>
            </div>
          </div>
      
          <div className="matches-section">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="title-icon">👥</span>
                  Partidas Ativas
                </h2>
              </div>
              <div className="card-content">
                <div className="matches-list">
                  {partidas.map((partida, index) => (
                    <div key={index} className="match-card">
                      <div className="match-content">
                        <div className="match-info">
                          <div className="host-info">
                              <div className="host-name">
                                  <span className="crown-icon">👑</span>
                                  <span className="host-text">Host: {partida.host}</span>
                                </div>
                            </div>
                          <div className="themes-info">
                            <div className="themes-label">Temas:</div>
                            <div className="themes-badges">
                              {partida.temas.map((theme, index) => (
                                <span key={index} className="theme-badge">
                                  {theme}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="match-actions">
                            <Link to={`/partida/iniciar/${partida.id}`}>
                                <div className="join-button">
                                  <span className="button-icon">▶️</span>
                                  Entrar
                                </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lobby;

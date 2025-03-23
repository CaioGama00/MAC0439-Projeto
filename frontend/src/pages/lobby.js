// src/pages/Lobby.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { criarPartida, buscarPartidasAtivas } from '../services/api';
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
        const partidasAtivas = await buscarPartidasAtivas();
        setPartidas(partidasAtivas);
      } catch (error) {
        setErro('Erro ao carregar partidas ativas.');
      }
    };

    fetchPartidas();
  }, []);

  // Função para criar uma nova partida
  const handleCriarPartida = async (temas) => {
    try {
      const novaPartida = await criarPartida(1, temas); // Substitua 1 pelo ID do jogador logado
      setPartidas([...partidas, novaPartida]);
      setMostrarTemaSelector(false);
    } catch (error) {
      setErro('Erro ao criar partida.');
    }
  };

  return (
    <div className="lobby-container">
      <h1>Lobby</h1>
      {erro && <p className="erro">{erro}</p>}

      <button onClick={() => setMostrarTemaSelector(true)}>Criar Partida</button>

      {mostrarTemaSelector && (
        <TemaSelector onSelecionarTemas={handleCriarPartida} />
      )}

      <h2>Partidas Ativas</h2>
      <ul className="partidas-lista">
        {partidas.map((partida) => (
          <li key={partida.id} className="partida-item">
            <Link to={`/partida/${partida.id}`}>
              Partida {partida.id} - Host: {partida.host}
            </Link>
            <p>Temas: {partida.temas.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
// src/pages/Perfil.js
import React, { useState, useEffect } from 'react';
import { buscarPerfil, atualizarPerfil } from '../services/api';
import './perfil.css';

const Perfil = () => {
  const [jogador, setJogador] = useState({
    username: '',
    nome: '',
    email: '',
    dataCriacao: '',
  });
  const [erro, setErro] = useState('');

  // Busca o perfil do jogador ao carregar a página
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const perfil = await buscarPerfil(1); // Substitua 1 pelo ID do jogador logado
        setJogador(perfil);
      } catch (error) {
        setErro('Erro ao carregar perfil.');
      }
    };

    fetchPerfil();
  }, []);

  // Função para salvar as alterações do perfil
  const handleSalvar = async () => {
    try {
      await atualizarPerfil(jogador.id, jogador);
      console.log('Perfil salvo:', jogador);
    } catch (error) {
      setErro('Erro ao salvar perfil.');
    }
  };

  return (
    <div className="perfil-container">
      <h1>Perfil</h1>
      {erro && <p className="erro">{erro}</p>}

      <div className="perfil-form">
        <label>
          Username:
          <input
            type="text"
            value={jogador.username}
            onChange={(e) => setJogador({ ...jogador, username: e.target.value })}
          />
        </label>
        <label>
          Nome:
          <input
            type="text"
            value={jogador.nome}
            onChange={(e) => setJogador({ ...jogador, nome: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={jogador.email}
            onChange={(e) => setJogador({ ...jogador, email: e.target.value })}
          />
        </label>
        <button onClick={handleSalvar}>Salvar</button>
      </div>
    </div>
  );
};

export default Perfil;
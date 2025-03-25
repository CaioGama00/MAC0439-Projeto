// src/pages/Perfil.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarPerfil, atualizarPerfil } from '../services/api';
import { obterJogadorId, estaAutenticado, removerDadosAutenticacao } from '../utils/auth';
import './perfil.css';

const Perfil = () => {
  const navigate = useNavigate();
  const [jogador, setJogador] = useState({
    username: '',
    nome: '',
    email: '',
    dataCriacao: '',
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [naoAutenticado, setNaoAutenticado] = useState(false);

  useEffect(() => {
    // Verifica autenticação antes de fazer qualquer coisa
    if (!estaAutenticado()) {
      removerDadosAutenticacao();
      setNaoAutenticado(true);
      return;
    }

    const fetchPerfil = async () => {
      try {
        setCarregando(true);
        const jogadorId = obterJogadorId();
        
        if (!jogadorId) {
          throw new Error('ID do jogador não disponível');
        }
        
        const perfil = await buscarPerfil(jogadorId);
        setJogador(perfil);
        setErro('');
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setErro(error.message);
        
        if (error.response?.status === 401) {
          removerDadosAutenticacao();
          setNaoAutenticado(true);
        }
      } finally {
        setCarregando(false);
      }
    };

    fetchPerfil();
  }, [navigate]);

  const handleSalvar = async () => {
    try {
      setCarregando(true);
      await atualizarPerfil(obterJogadorId(), jogador);
      setSucesso(true);
      setErro('');
      setTimeout(() => setSucesso(false), 3000);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setErro(error.message || 'Erro ao salvar perfil.');
      
      if (error.response?.status === 401) {
        removerDadosAutenticacao();
        setNaoAutenticado(true);
      }
    } finally {
      setCarregando(false);
    }
  };

  if (naoAutenticado) {
    return (
      <div className="perfil-container">
        <div className="aviso-nao-autenticado">
          <p>Você precisa estar logado para acessar esta página</p>
          <button onClick={() => navigate('/')}>Ir para a página de login</button>
        </div>
      </div>
    );
  }

  if (carregando && !jogador.id) {
    return <div className="perfil-container">Carregando...</div>;
  }

  return (
    <div className="perfil-container">
      <h1>Perfil</h1>
      {erro && <p className="erro">{erro}</p>}
      {sucesso && <p className="sucesso">Perfil atualizado com sucesso!</p>}

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
        {jogador.dataCriacao && (
          <p>Membro desde: {new Date(jogador.dataCriacao).toLocaleDateString()}</p>
        )}
        <button onClick={handleSalvar} disabled={carregando}>
          {carregando ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  );
};

export default Perfil;
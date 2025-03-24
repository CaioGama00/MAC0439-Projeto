// src/pages/Perfil.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarPerfil, atualizarPerfil } from '../services/api';
import { obterJogadorId, estaAutenticado } from '../utils/auth';
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

  useEffect(() => {
    const fetchPerfil = async () => {
      // Verifica autenticação primeiro
      if (!estaAutenticado()) {
        navigate('/login');
        return;
      }

      try {
        setCarregando(true);
        
        // Obtém o ID usando a função do auth.js
        const jogadorId = obterJogadorId();
        
        if (!jogadorId) {
          throw new Error('Usuário não autenticado');
        }
        
        const perfil = await buscarPerfil(jogadorId);
        setJogador(perfil);
        setErro('');
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        setErro(error.message);
        
        // Se o erro for de autenticação, redireciona
        if (error.message.includes('autenticado')) {
          navigate('/login');
        }
      } finally {
        setCarregando(false);
      }
    };

    fetchPerfil();
  }, [navigate]);

  // Função para salvar as alterações do perfil
  const handleSalvar = async () => {
    try {
      setCarregando(true);
      console.log(obterJogadorId(), jogador);
      await atualizarPerfil(obterJogadorId(), jogador);
      setSucesso(true); // Define sucesso como true
      setErro('');
      setTimeout(() => setSucesso(false), 3000); // Remove mensagem após 3 segundos
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setErro(error.message || 'Erro ao salvar perfil.');
      setSucesso(false);
    } finally {
      setCarregando(false);
    }
  };

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
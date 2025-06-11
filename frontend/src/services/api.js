// src/services/api.js
import axios from 'axios';

// Configura a base URL da API (substitua pela URL do seu backend)
const API_BASE_URL = 'http://localhost:8000/api';

// Função para cadastrar um novo usuário
export const cadastrar = async (username, nome, senha, email) => { // Adicionar nome
  try {
    const response = await axios.post(`${API_BASE_URL}/jogador/cadastro`, {
      username,
      senha,
      email,
      nome, // Incluir nome no corpo da requisição
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    throw error;
  }
};

// Função para fazer login
export const login = async (username, senha) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/jogador/login`, { 
      username, 
      senha 
    });
  
    return response.data;
  } catch (error) {
    console.error('Erro detalhado no login:', {
      url: `${API_BASE_URL}/jogador/login`,
      error: error.response?.data || error.message
    });
    throw error;
  }
};

// Função para criar uma nova partida
export const criarPartida = async (idHost, temas) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/partida/criar`, { idHost, temas });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar partida:', error.response?.data || error.message);
    throw error;
  }
};

// Função para buscar partidas ativas
export const buscarPartidasAtivas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/partida/ativas`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar partidas ativas:', error.response?.data || error.message);
    throw error;
  }
};

// Função para enviar uma resposta
export const enviarResposta = async (partidaId, rodadaId, idJogador, idTema, resposta) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/partida/${partidaId}/rodada/${rodadaId}/enviar-resposta`, {
      idTema,
      resposta,
      idJogador
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar resposta:', error.response?.data || error.message);
    throw error;
  }
};

// Função para buscar o perfil do jogador
export const buscarPerfil = async (idJogador) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jogador/perfil/${idJogador}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
};

// Função para atualizar o perfil do jogador
export const atualizarPerfil = async (idJogador, dados) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/jogador/atualizar/${idJogador}`, dados);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  };
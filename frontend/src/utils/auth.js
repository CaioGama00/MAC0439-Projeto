// src/utils/auth.js

// Função para salvar os dados de autenticação
export const salvarDadosAutenticacao = (token, jogadorId) => {
  localStorage.setItem('token', token);
  localStorage.setItem('jogadorId', jogadorId);
};

// Função para obter o token JWT
export const obterToken = () => {
  return localStorage.getItem('token');
};

// Função para obter o ID do jogador
export const obterJogadorId = () => {
  return localStorage.getItem('jogadorId');
};

// Função para remover todos os dados de autenticação
export const removerDadosAutenticacao = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('jogadorId');
};

// Função para verificar autenticação
export const estaAutenticado = () => {
  return !!obterToken() && !!obterJogadorId();
};

// Função para decodificar o token JWT
export const decodificarToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};
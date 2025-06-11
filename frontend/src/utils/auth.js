// src/utils/auth.js

// Função para salvar os dados de autenticação
export const salvarDadosAutenticacao = (token, idJogador, tipoUsuario) => {
  localStorage.setItem('token', token);
  localStorage.setItem('id_jogador', idJogador);
  if (tipoUsuario) {
    localStorage.setItem('tipoUsuario', tipoUsuario);
  }
};

export const obterToken = () => {
  return localStorage.getItem('token');
};

export const obterJogadorId = () => {
  return localStorage.getItem('id_jogador');
};

export const obterTipoUsuario = () => {
  return localStorage.getItem('tipoUsuario');
};

export const removerDadosAutenticacao = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id_jogador');
  localStorage.removeItem('tipoUsuario');
};

// Função para verificar autenticação
export const estaAutenticado = () => {
  return obterToken();
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
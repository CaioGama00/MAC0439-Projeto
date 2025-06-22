// src/utils/auth.js

// Função para salvar os dados de autenticação
export const salvarDadosAutenticacao = (token, idJogador, tipoUsuario) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('id_jogador', idJogador);
  if (tipoUsuario) {
    sessionStorage.setItem('tipoUsuario', tipoUsuario);
  }
};

export const obterToken = () => {
  return sessionStorage.getItem('token');
};

export const obterJogadorId = () => {
  return sessionStorage.getItem('id_jogador');
};

export const obterTipoUsuario = () => {
  return sessionStorage.getItem('tipoUsuario');
};

export const removerDadosAutenticacao = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('id_jogador');
  sessionStorage.removeItem('tipoUsuario');
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
// src/utils/auth.js

// Função para salvar o token JWT no localStorage
export const salvarToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Função para obter o token JWT do localStorage
  export const obterToken = () => {
    return localStorage.getItem('token');
  };
  
  // Função para remover o token JWT do localStorage (logout)
  export const removerToken = () => {
    localStorage.removeItem('token');
  };
  
  // Função para verificar se o usuário está autenticado
  export const estaAutenticado = () => {
    const token = obterToken();
    return !!token; // Retorna true se o token existir, caso contrário, false
  };
  
  // Função para decodificar o token JWT (opcional)
  export const decodificarToken = (token) => {
    try {
      const payload = token.split('.')[1]; // Pega a parte do payload do token
      const decoded = atob(payload); // Decodifica o payload de base64
      return JSON.parse(decoded); // Converte o payload em um objeto JSON
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  };
  
  // Função para obter o ID do usuário a partir do token (opcional)
  export const obterIdUsuario = () => {
    const token = obterToken();
    if (token) {
      const decoded = decodificarToken(token);
      return decoded?.id; // Retorna o ID do usuário se existir
    }
    return null;
  };
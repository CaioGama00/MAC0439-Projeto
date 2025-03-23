// src/utils/helpers.js

// Função para formatar a data no formato DD/MM/YYYY
export const formatarData = (data) => {
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };
  
  // Função para validar um e-mail
  export const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  // Função para capitalizar a primeira letra de uma string
  export const capitalizar = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Função para gerar uma cor aleatória em formato hexadecimal
  export const gerarCorAleatoria = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
  
  // Função para limitar o número de caracteres de uma string
  export const limitarTexto = (texto, limite) => {
    if (texto.length > limite) {
      return texto.slice(0, limite) + '...';
    }
    return texto;
  };
  
  // Função para ordenar uma lista de objetos por uma propriedade
  export const ordenarPorPropriedade = (lista, propriedade, ordem = 'asc') => {
    return lista.sort((a, b) => {
      if (a[propriedade] < b[propriedade]) return ordem === 'asc' ? -1 : 1;
      if (a[propriedade] > b[propriedade]) return ordem === 'asc' ? 1 : -1;
      return 0;
    });
  };
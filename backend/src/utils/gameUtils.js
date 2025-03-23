// src/utils/gameUtils.js
// Função para sortear uma letra aleatória (A-Z)
const sortearLetra = () => {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const indice = Math.floor(Math.random() * letras.length);
    return letras[indice];
  };
  
  // Função para validar uma resposta (exemplo simples)
  const validarResposta = (resposta, tema) => {
    // Exemplo de validação: a resposta não pode estar vazia
    if (!resposta || resposta.trim() === '') {
      return false;
    }
  
    // Aqui você pode adicionar mais regras de validação, como:
    // - Verificar se a resposta começa com a letra sorteada.
    // - Verificar se a resposta é válida para o tema escolhido.
  
    return true; // Retorna true se a resposta for válida
  };
  
  // Função para calcular a pontuação de uma rodada
  const calcularPontuacao = (respostasValidas) => {
    // Exemplo simples: cada resposta válida vale 10 pontos
    return respostasValidas.length * 10;
  };
  
  module.exports = {
    sortearLetra,
    validarResposta,
    calcularPontuacao,
  };
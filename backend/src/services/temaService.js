// src/services/temaService.js
const { models } = require('../config/db'); // Importa o objeto models
const { Tema } = models; // Corrigido para 'Tema' (PascalCase)

// Buscar todos os temas
const buscarTemas = async () => {
  try {
    const temas = await Tema.findAll();
    return temas;
  } catch (error) {
    throw new Error(`Erro ao buscar temas: ${error.message}`);
  }
};

// Criar um novo tema
const criarTema = async (nome, descricao) => {
  try {
    const novoTema = await Tema.create({ nome, descricao });
    return novoTema;
  } catch (error) {
    throw new Error(`Erro ao criar tema: ${error.message}`);
  }
};

module.exports = {
  buscarTemas,
  criarTema,
};
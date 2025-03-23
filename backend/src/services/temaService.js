// src/services/temaService.js
const tema = require('../models/postgres/tema');

// Buscar todos os temas
const buscarTemas = async () => {
  try {
    const temas = await tema.findAll();
    return temas;
  } catch (error) {
    throw new Error(`Erro ao buscar temas: ${error.message}`);
  }
};

// Criar um novo tema
const criarTema = async (nome, descricao) => {
  try {
    const novoTema = await tema.create({ nome, descricao });
    return novoTema;
  } catch (error) {
    throw new Error(`Erro ao criar tema: ${error.message}`);
  }
};

module.exports = {
  buscarTemas,
  criarTema,
};
// src/controllers/temaController.js
const temaService = require('../services/temaService');

// Buscar todos os temas
const buscarTemas = async (req, res) => {
  try {
    const temas = await temaService.buscarTemas();
    res.status(200).json(temas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Criar um novo tema
const criarTema = async (req, res) => {
  const { nome, descricao } = req.body;

  try {
    const novoTema = await temaService.criarTema(nome, descricao);
    res.status(201).json(novoTema);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  buscarTemas,
  criarTema,
};
// src/controllers/amizadeController.js
const amizadeService = require('../services/amizadeService');

// Adicionar uma amizade
const adicionarAmizade = async (req, res) => {
  const { idJogador1, idJogador2 } = req.body;

  try {
    const novaAmizade = await amizadeService.adicionarAmizade(idJogador1, idJogador2);
    res.status(201).json(novaAmizade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Aceitar uma amizade
const aceitarAmizade = async (req, res) => {
  const { id } = req.params;

  try {
    const amizadeAceita = await amizadeService.aceitarAmizade(id);
    res.status(200).json(amizadeAceita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listarAmizades = async (req, res) => {
  const amizades = await amizadeService.listarAmizades();
  try {
    res.status(200).json(amizades);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar amizades.' });
  }
};

module.exports = {
  adicionarAmizade,
  aceitarAmizade,
  listarAmizades
};
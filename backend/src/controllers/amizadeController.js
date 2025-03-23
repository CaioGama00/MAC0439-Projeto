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

module.exports = {
  adicionarAmizade,
  aceitarAmizade,
};
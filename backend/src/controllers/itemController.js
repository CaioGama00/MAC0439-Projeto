// src/controllers/itemController.js
const itemService = require('../services/itemService');

// Buscar todos os itens
const buscarItens = async (req, res) => {
  try {
    const itens = await itemService.buscarItens();
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comprar um item
const comprarItem = async (req, res) => {
  const { idJogador, idItem } = req.body;

  try {
    const novoInventario = await itemService.comprarItem(idJogador, idItem);
    res.status(201).json(novoInventario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  buscarItens,
  comprarItem,
};
// src/services/itemService.js
const item = require('../models/postgres/item');
const inventario = require('../models/postgres/inventario');
const jogador = require('../models/postgres/jogador');

// Buscar todos os itens
const buscarItens = async () => {
  try {
    const itens = await item.findAll();
    return itens;
  } catch (error) {
    throw new Error(`Erro ao buscar itens: ${error.message}`);
  }
};

// Comprar um item
const comprarItem = async (idJogador, idItem) => {
  try {
    const jogadorEncontrado = await jogador.findByPk(idJogador);
    const itemEncontrado = await item.findByPk(idItem);

    if (!jogadorEncontrado || !itemEncontrado) {
      throw new Error('Jogador ou item não encontrado.');
    }

    // Verificar se o jogador tem créditos suficientes
    if (jogadorEncontrado.créditos < itemEncontrado.preço) {
      throw new Error('Créditos insuficientes para comprar o item.');
    }

    // Adicionar o item ao inventário do jogador
    const novoInventario = await inventario.create({
      id_jogador: idJogador,
      id_item: idItem,
      data_compra: new Date(),
    });

    // Deduzir os créditos do jogador
    jogadorEncontrado.créditos -= itemEncontrado.preço;
    await jogadorEncontrado.save();

    return novoInventario;
  } catch (error) {
    throw new Error(`Erro ao comprar item: ${error.message}`);
  }
};

module.exports = {
  buscarItens,
  comprarItem,
};
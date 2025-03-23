// src/models/postgres/inventario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize; // Importa a instância do Sequelize

const Inventario = sequelize.define('Inventario', {
  id_jogador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Jogador', // Referência à tabela Jogador
      key: 'id_jogador',
    },
  },
  id_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Item', // Referência à tabela Item
      key: 'id_item',
    },
  },
  data_compra: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Inventario;
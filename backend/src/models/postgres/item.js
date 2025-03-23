// src/models/postgres/item.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize; // Importa a instância do Sequelize

const Item = sequelize.define('Item', {
  id_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  raridade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preço: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  exclusivo_assinante: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Item;
// src/models/postgres/amizade.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize; // Importa a instância do Sequelize

const Amizade = sequelize.define('Amizade', {
  id_jogador1: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Jogador', // Referência à tabela Jogador
      key: 'id_jogador',
    },
  },
  id_jogador2: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Jogador', // Referência à tabela Jogador
      key: 'id_jogador',
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendente',
  },
  é_favorito: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Amizade;
// src/models/postgres/partida.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize; // Importa a instância do Sequelize

const Partida = sequelize.define('Partida', {
  id_partida: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_host: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Jogador', // Referência à tabela Jogador
      key: 'id_jogador',
    },
  },
  id_ganhador: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Jogador', // Referência à tabela Jogador
      key: 'id_jogador',
    },
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'ativa',
  },
  data_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Partida;
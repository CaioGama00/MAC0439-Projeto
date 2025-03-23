// src/models/postgres/historico.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize; // Importa a instância do Sequelize

const Historico = sequelize.define('Historico', {
  id_partida: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Partida', // Referência à tabela Partida
      key: 'id_partida',
    },
  },
  id_jogador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Jogador', // Referência à tabela Jogador
      key: 'id_jogador',
    },
  },
  pontuacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Historico;
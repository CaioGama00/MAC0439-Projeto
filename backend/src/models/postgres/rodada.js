// src/models/postgres/rodada.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize; // Importa a instância do Sequelize

const Rodada = sequelize.define('Rodada', {
  id_partida: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Partida', // Referência à tabela Partida
      key: 'id_partida',
    },
  },
  numero_rodada: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  stop_jogador: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Jogador', // Referência à tabela Jogador
      key: 'id_jogador',
    },
  },
  letra_sorteada: {
    type: DataTypes.STRING(1),
    allowNull: false,
  },
});

module.exports = Rodada;
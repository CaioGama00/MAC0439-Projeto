// src/models/postgres/tema_partida.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize;

const TemaPartida = sequelize.define('TemaPartida', {
  id_partida: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Partida', // Referência à tabela Partida
      key: 'id_partida',
    },
  },
  id_tema: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Tema', // Referência à tabela Tema
      key: 'id_tema',
    },
  },
}, {
  tableName: 'Tema_Partida', // Nome da tabela no banco de dados
  timestamps: false, // Desativa os campos `createdAt` e `updatedAt`
});

module.exports = TemaPartida;
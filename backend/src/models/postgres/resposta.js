// src/models/postgres/resposta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize; // Importa a instância do Sequelize

const Resposta = sequelize.define('Resposta', {
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
    references: {
      model: 'Rodada', // Referência à tabela Rodada
      key: 'numero_rodada',
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
  id_jogador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Jogador', // Referência à tabela Jogador
      key: 'id_jogador',
    },
  },
  resposta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  válida: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Resposta;
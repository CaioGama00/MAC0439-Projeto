// src/models/postgres/jogador.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize; // Importa a instância do Sequelize

const Jogador = sequelize.define('Jogador', {
  id_jogador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_criacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  é_assinante: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  créditos: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Jogador;
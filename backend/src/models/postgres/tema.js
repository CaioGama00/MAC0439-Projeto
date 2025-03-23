// src/models/postgres/tema.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize; // Importa a instância do Sequelize

const Tema = sequelize.define('Tema', {
  id_tema: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Tema;
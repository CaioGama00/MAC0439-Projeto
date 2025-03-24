const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize;

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
}, {
  tableName: 'Tema', // Nome da tabela no banco de dados
  timestamps: false, // Desativa os campos `createdAt` e `updatedAt`
});

module.exports = Tema;
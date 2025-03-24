const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize;

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
    allowNull: true,
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
  e_assinante: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  creditos: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'Jogador', // Nome da tabela no banco de dados
  timestamps: false, // Desativa os campos `createdAt` e `updatedAt`
});

module.exports = Jogador;
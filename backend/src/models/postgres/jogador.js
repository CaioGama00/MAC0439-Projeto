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
  tipo: {
    type: DataTypes.ENUM('Gratuito', 'Premium', 'Admin'),
    allowNull: false,
  },
}, {
  tableName: 'jogador',
  timestamps: false,
});

module.exports = Jogador;

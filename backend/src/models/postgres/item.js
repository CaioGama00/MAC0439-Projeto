const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize;

const Item = sequelize.define('Item', {
  id_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  raridade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  exclusivo_assinante: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'Item', // Nome da tabela no banco de dados
  timestamps: false, // Desativa os campos `createdAt` e `updatedAt`
});

module.exports = Item;
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize;

const Amizade = sequelize.define('Amizade', {
  id_jogador1: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Jogador', // Referência à tabela Jogador
      key: 'id_jogador',
    },
  },
  id_jogador2: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Jogador', // Referência à tabela Jogador
      key: 'id_jogador',
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendente',
  },
  e_favorito: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'Amizade', // Nome da tabela no banco de dados
  timestamps: false, // Desativa os campos `createdAt` e `updatedAt`
});

module.exports = Amizade;
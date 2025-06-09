const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize;

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
  valida: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'resposta', // Nome da tabela no banco de dados
  timestamps: false, // Desativa os campos `createdAt` e `updatedAt`
});

module.exports = Resposta;
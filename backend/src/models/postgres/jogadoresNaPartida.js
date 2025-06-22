'use strict';
const { Model } = require('sequelize');


class JogadoresNaPartida extends Model {
    static associate(models) {
        // Associação explícita opcional
    }
}

module.exports = (sequelize, DataTypes) => {
  JogadoresNaPartida.init({
    id_partida: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'partida',
        key: 'id_partida'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    id_jogador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'jogador',
        key: 'id_jogador'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    pontuacao_final: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }, {
    sequelize,
    modelName: 'JogadoresNaPartida',
    tableName: 'jogadoresnapartida',
    timestamps: false
  });

  return JogadoresNaPartida;
};

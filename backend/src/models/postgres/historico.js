const { Model, DataTypes } = require('sequelize');

class Historico extends Model {
  static associate(models) {
    Historico.belongsTo(models.Partida, {
      foreignKey: 'id_partida',
      as: 'partida'
    });
    Historico.belongsTo(models.Jogador, {
      foreignKey: 'id_jogador',
      as: 'jogador'
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  Historico.init({
    id_partida: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // references: { model: 'Partida', key: 'id_partida' } // Definido na associação
    },
    id_jogador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // references: { model: 'Jogador', key: 'id_jogador' } // Definido na associação
    },
    pontuacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_hora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Historico',
    tableName: 'historico',
    timestamps: false,
  });
  return Historico;
};
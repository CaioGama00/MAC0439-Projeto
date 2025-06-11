const { Model, DataTypes } = require('sequelize');

class Rodada extends Model {
  static associate(models) {
    Rodada.belongsTo(models.Partida, {
      foreignKey: 'id_partida',
      as: 'partida'
    });
    Rodada.belongsTo(models.Jogador, {
      foreignKey: 'stop_jogador',
      as: 'jogadorQueDeuStop',
      allowNull: true
    });

  }
}

module.exports = (sequelize, DataTypes) => {
  Rodada.init({
    id_partida: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // references: { model: 'Partida', key: 'id_partida' } // Definido na associação
    },
    numero_rodada: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    stop_jogador: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    letra_sorteada: {
      type: DataTypes.STRING(1),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Rodada',
    tableName: 'rodada',
    timestamps: false,
  });
  return Rodada;
};
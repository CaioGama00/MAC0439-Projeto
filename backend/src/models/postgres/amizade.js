const { Model, DataTypes } = require('sequelize');

class Amizade extends Model {
  static associate(models) {
    Amizade.belongsTo(models.Jogador, {
      foreignKey: 'id_jogador1',
      as: 'jogador1'
    });
    Amizade.belongsTo(models.Jogador, {
      foreignKey: 'id_jogador2',
      as: 'jogador2'
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  Amizade.init({
    id_jogador1: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // references: { model: 'Jogador', key: 'id_jogador' } // Definido na associação
    },
    id_jogador2: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // references: { model: 'Jogador', key: 'id_jogador' } // Definido na associação
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pendente', // Ex: pendente, aceita, recusada, bloqueada
    },
    e_favorito: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Amizade',
    tableName: 'amizade',
    timestamps: false,
  });
  return Amizade;
};
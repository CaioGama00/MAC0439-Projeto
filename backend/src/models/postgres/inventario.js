const { Model, DataTypes } = require('sequelize');

class Inventario extends Model {
  static associate(models) {
    Inventario.belongsTo(models.Jogador, {
      foreignKey: 'id_jogador'
    });
    Inventario.belongsTo(models.Item, {
      foreignKey: 'id_item'
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  Inventario.init({
    id_jogador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // references: { model: 'Jogador', key: 'id_jogador' } // Definido na associação
    },
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // references: { model: 'Item', key: 'id_item' } // Definido na associação
    },
    data_compra: { // No seu schema original era data_aquisicao, e tinha quantidade. Ajuste conforme necessário.
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    // quantidade: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 } // Se você tiver quantidade
  }, {
    sequelize,
    modelName: 'Inventario',
    tableName: 'inventario',
    timestamps: false,
  });
  return Inventario;
};
const { Model, DataTypes } = require('sequelize');

class Item extends Model {
  static associate(models) {
    Item.belongsToMany(models.Jogador, {
      through: models.Inventario,
      foreignKey: 'id_item',
      otherKey: 'id_jogador',
      as: 'jogadoresComItem'
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  Item.init({
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raridade: { // No seu schema original era 'descricao' e 'preco' era DECIMAL. Ajuste conforme seu schema.
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.INTEGER, // Ou DataTypes.DECIMAL(10, 2) conforme schema original
      allowNull: false,
    },
    exclusivo_assinante: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'item',
    timestamps: false,
  });
  return Item;
};
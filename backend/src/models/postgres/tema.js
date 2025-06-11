const { Model, DataTypes } = require('sequelize');

class Tema extends Model {
  static associate(models) {
    // Associação N:M com Partida através da tabela TemaPartida
    Tema.belongsToMany(models.Partida, {
      through: models.TemaPartida, // Use o modelo TemaPartida
      foreignKey: 'id_tema',
      otherKey: 'id_partida',
      as: 'Partidas' // Alias opcional
    });
    // Adicione outras associações de Tema aqui se necessário
  }
}

module.exports = (sequelize, DataTypes) => {
  Tema.init({
    id_tema: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Tema',
    tableName: 'tema',
    timestamps: false,
  });
  return Tema;
};
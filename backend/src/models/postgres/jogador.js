const { Model, DataTypes } = require('sequelize');

class Jogador extends Model {
  static associate(models) {
    // Jogador pode ser host de muitas Partidas
    Jogador.hasMany(models.Partida, {
      foreignKey: 'id_criador',
      as: 'partidasComoHost'
    });
    // Jogador pode ser ganhador de muitas Partidas
    Jogador.hasMany(models.Partida, {
      foreignKey: 'id_ganhador',
      as: 'partidasGanhas',
      allowNull: true // Ganhador pode ser nulo
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  Jogador.init({
    id_jogador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    tipo: {
      type: DataTypes.ENUM('Gratuito', 'Premium', 'Admin'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Jogador',
    tableName: 'jogador',
    timestamps: false,
  });
  return Jogador;
};

// partida.js
const { Model, DataTypes } = require('sequelize');

class Partida extends Model {
  static associate(models) {
    // Exemplo:
    Partida.belongsTo(models.Jogador, {
      foreignKey: 'id_criador',
      as: 'host'
    });
    Partida.belongsTo(models.Jogador, {
      foreignKey: 'id_ganhador',
      as: 'ganhador',
      allowNull: true // Importante para permitir que seja nulo
    });
    Partida.belongsToMany(models.Tema, {
      through: models.TemaPartida, // Certifique-se que TemaPartida também é um modelo definido e inicializado
      foreignKey: 'id_partida',
      otherKey: 'id_tema',
      as: 'Temas'
    });
    Partida.belongsToMany(models.Jogador, {
      through: 'jogadoresnapartida',
      as: 'Jogadores',
      foreignKey: 'id_partida',
      otherKey: 'id_jogador'
    });
  }
}

module.exports = (sequelize, DataTypes) => { // Exporta uma função
  Partida.init({
    id_partida: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_criador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // A referência é melhor definida na associação, mas pode estar aqui também
      // references: { model: 'Jogador', key: 'id_jogador' }
    },
    id_ganhador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: { model: 'Jogador', key: 'id_jogador' }
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'iniciada',
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize, // Passa a instância do sequelize
    modelName: 'Partida', // Nome do modelo
    tableName: 'partida',
    timestamps: false,
  });
  return Partida; // Retorna a classe do modelo
};

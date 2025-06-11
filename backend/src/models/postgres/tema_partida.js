// src/models/postgres/tema_partida.js
const { Model, DataTypes } = require('sequelize');

class TemaPartida extends Model {
  // Geralmente, tabelas de junção puras não precisam de um método 'associate' próprio,
  // pois as associações são definidas nos modelos que elas conectam (Partida e Tema).
  // static associate(models) {
  //   // Exemplo se houvesse necessidade:
  //   // TemaPartida.belongsTo(models.Partida, { foreignKey: 'id_partida' });
  //   // TemaPartida.belongsTo(models.Tema, { foreignKey: 'id_tema' });
  // }
}

module.exports = (sequelize, DataTypes) => {
  TemaPartida.init({
    id_partida: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'Partida', key: 'id_partida' }
    },
    id_tema: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: 'Tema', key: 'id_tema' }
    },
  }, {
    sequelize,
    modelName: 'TemaPartida',
    tableName: 'temapartida',
    timestamps: false,
  });
  return TemaPartida;
};
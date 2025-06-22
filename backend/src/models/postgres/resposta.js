const { Model, DataTypes } = require('sequelize');

class Resposta extends Model {
  static associate(models) {
    // Resposta pertence a uma Rodada (usando chave composta)
    Resposta.belongsTo(models.Rodada, {
      foreignKey: 'id_partida', // FK para id_partida da Rodada
      targetKey: 'id_partida',   // PK em Rodada
      as: 'rodada_partida'       // Alias para evitar conflito se houver outra FK id_partida
    });
    Resposta.belongsTo(models.Rodada, {
      foreignKey: 'numero_rodada', // FK para numero_rodada da Rodada
      targetKey: 'numero_rodada',    // PK em Rodada
      as: 'rodada_numero'        // Alias
    });
    // Simplificando, ou você pode criar uma associação mais complexa para a chave composta de Rodada.
    // Uma forma mais direta, se a FK em Resposta for para a Rodada como um todo:
    // Resposta.belongsTo(models.Rodada, { foreignKeys: ['id_partida', 'numero_rodada'], as: 'rodada' });
    // No entanto, o Sequelize lida melhor com FKs simples.
    // A abordagem acima com duas belongsTo para as partes da chave composta da Rodada é uma forma.
    // A melhor forma seria se Rodada tivesse uma PK simples e id_partida, numero_rodada fossem FKs + unique constraint.

    Resposta.belongsTo(models.Tema, {
      foreignKey: 'id_tema',
      as: 'tema'
    });
    Resposta.belongsTo(models.Jogador, {
      foreignKey: 'id_jogador',
      as: 'jogador'
    });
  }
}

module.exports = (sequelize, DataTypes) => {
  Resposta.init({
    id_partida: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // references: { model: 'Partida', key: 'id_partida' }
    },
    numero_rodada: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_tema: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // references: { model: 'Tema', key: 'id_tema' }
    },
    id_jogador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // references: { model: 'Jogador', key: 'id_jogador' }
    },
    resposta: { // No seu schema original era VARCHAR(255)
      type: DataTypes.STRING,
      allowNull: false,
    },
    valida: { // No seu schema original era BOOLEAN NOT NULL
      type: DataTypes.BOOLEAN,
      allowNull: false, // Ajustado para NOT NULL
      defaultValue: true, // Mantido o default, mas allowNull: false tem precedência
    },
    pontuacao: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    } // Adicionar se existir no schema
  }, {
    sequelize,
    modelName: 'Resposta',
    tableName: 'resposta',
    timestamps: false,
  });
  return Resposta;
};

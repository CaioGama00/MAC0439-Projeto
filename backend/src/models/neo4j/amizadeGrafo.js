// src/models/neo4j/amizadeGrafo.js
const { driver } = require('../../config/db');

// Adicionar uma amizade entre dois jogadores
const adicionarAmizade = async (idJogador1, idJogador2) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (j1:Jogador { id: $idJogador1 }), (j2:Jogador { id: $idJogador2 })
      MERGE (j1)-[:AMIGO_DE]->(j2)
      RETURN j1, j2
      `,
      { idJogador1, idJogador2 }
    );

    return result.records.map(record => ({
      jogador1: record.get('j1').properties,
      jogador2: record.get('j2').properties,
    }));
  } catch (error) {
    console.error('Erro ao adicionar amizade:', error);
    throw error;
  } finally {
    await session.close();
  }
};

// Verificar se dois jogadores são amigos
const verificarAmizade = async (idJogador1, idJogador2) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (j1:Jogador { id: $idJogador1 })-[:AMIGO_DE]->(j2:Jogador { id: $idJogador2 })
      RETURN j1, j2
      `,
      { idJogador1, idJogador2 }
    );

    return result.records.length > 0;
  } catch (error) {
    console.error('Erro ao verificar amizade:', error);
    throw error;
  } finally {
    await session.close();
  }
};

// Sugerir amizades com base em amigos em comum
const sugerirAmizades = async (idJogador) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (j1:Jogador { id: $idJogador })-[:AMIGO_DE]->(amigo:Jogador)-[:AMIGO_DE]->(sugestao:Jogador)
      WHERE NOT (j1)-[:AMIGO_DE]->(sugestao) AND j1 <> sugestao
      RETURN DISTINCT sugestao
      `,
      { idJogador }
    );

    return result.records.map(record => record.get('sugestao').properties);
  } catch (error) {
    console.error('Erro ao sugerir amizades:', error);
    throw error;
  } finally {
    await session.close();
  }
};

module.exports = { adicionarAmizade, verificarAmizade, sugerirAmizades };
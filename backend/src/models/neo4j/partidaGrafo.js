// src/models/neo4j/partidaGrafo.js
const { driver } = require('../../config/db');

// Registrar que um jogador participou de uma partida
const registrarParticipacao = async (idJogador, idPartida) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (j:Jogador { id: $idJogador }), (p:Partida { id: $idPartida })
      MERGE (j)-[:PARTICIPOU_DE]->(p)
      RETURN j, p
      `,
      { idJogador, idPartida }
    );

    return result.records.map(record => ({
      jogador: record.get('j').properties,
      partida: record.get('p').properties,
    }));
  } catch (error) {
    console.error('Erro ao registrar participação:', error);
    throw error;
  } finally {
    await session.close();
  }
};

// Verificar jogadores que participaram de uma partida
const buscarParticipantes = async (idPartida) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (j:Jogador)-[:PARTICIPOU_DE]->(p:Partida { id: $idPartida })
      RETURN j
      `,
      { idPartida }
    );

    return result.records.map(record => record.get('j').properties);
  } catch (error) {
    console.error('Erro ao buscar participantes:', error);
    throw error;
  } finally {
    await session.close();
  }
};

// Sugerir partidas com base em jogadores que o usuário já jogou
const sugerirPartidas = async (idJogador) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (j1:Jogador { id: $idJogador })-[:PARTICIPOU_DE]->(p:Partida)<-[:PARTICIPOU_DE]-(j2:Jogador)
      WHERE j1 <> j2
      WITH j2, COUNT(p) AS partidasJogadas
      ORDER BY partidasJogadas DESC
      LIMIT 5
      RETURN j2
      `,
      { idJogador }
    );

    return result.records.map(record => record.get('j2').properties);
  } catch (error) {
    console.error('Erro ao sugerir partidas:', error);
    throw error;
  } finally {
    await session.close();
  }
};

module.exports = { registrarParticipacao, buscarParticipantes, sugerirPartidas };
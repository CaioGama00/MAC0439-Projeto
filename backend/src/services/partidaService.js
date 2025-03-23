// src/services/partidaService.js
const partida = require('../models/postgres/partida');
const rodada = require('../models/postgres/rodada');
const resposta = require('../models/postgres/resposta');
const tema = require('../models/postgres/tema');

// Criar uma nova partida
const criarPartida = async (idHost, temas) => {
  try {
    const novaPartida = await partida.create({
      id_host: idHost,
      estado: 'ativa',
    });

    // Associar os temas à partida
    await novaPartida.setTemas(temas);

    return novaPartida;
  } catch (error) {
    throw new Error(`Erro ao criar partida: ${error.message}`);
  }
};

// Iniciar uma nova rodada
const iniciarRodada = async (partidaId) => {
  try {
    const letraSorteada = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Sorteia uma letra aleatória

    const novaRodada = await rodada.create({
      id_partida: partidaId,
      numero_rodada: await rodada.count({ where: { id_partida: partidaId } }) + 1,
      letra_sorteada: letraSorteada,
    });

    return novaRodada;
  } catch (error) {
    throw new Error(`Erro ao iniciar rodada: ${error.message}`);
  }
};

// Enviar uma resposta para uma rodada
const enviarResposta = async (partidaId, rodadaId, idJogador, idTema, resposta) => {
  try {
    const respostaSalva = await resposta.create({
      id_partida: partidaId,
      numero_rodada: rodadaId,
      id_tema: idTema,
      id_jogador: idJogador,
      resposta,
      válida: true, // Inicialmente assume-se que a resposta é válida
    });

    return respostaSalva;
  } catch (error) {
    throw new Error(`Erro ao enviar resposta: ${error.message}`);
  }
};

module.exports = {
  criarPartida,
  iniciarRodada,
  enviarResposta,
};
const EstatisticaPartida = require('../models/mongo/estatistica');

async function buscarTodasPartidas() {
  return await EstatisticaPartida.find();
}

async function buscarPorIdPartida(id_partida) {
  return await EstatisticaPartida.findOne({ id_partida });
}

async function criarPartida(dados) {
  const novaPartida = new EstatisticaPartida(dados);
  return await novaPartida.save();
}

module.exports = {
  buscarTodasPartidas,
  buscarPorIdPartida,
  criarPartida,
};
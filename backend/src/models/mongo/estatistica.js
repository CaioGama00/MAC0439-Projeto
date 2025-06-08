const mongoose = require('mongoose');

const RespostaPorTemaSchema = new mongoose.Schema({
  tema: String,
  resposta: String,
  resposta_valida: Boolean,
}, { _id: false });

const RodadaSchema = new mongoose.Schema({
  numero_rodada: Number,
  letra: String,
  respostas_por_tema: [RespostaPorTemaSchema],
}, { _id: false });

const JogadorSchema = new mongoose.Schema({
  id_jogador: String,
  username: String,
  pontuacao: Number,
  ganhador: Boolean,
  host: Boolean,
  rodadas: [RodadaSchema],
}, { _id: false });

const EstatisticaPartidaSchema = new mongoose.Schema({
  id_partida: String,
  data_horario_inicio: Date,
  data_horario_fim: Date,
  temas: [String],
  letras: [String],
  jogadores: [JogadorSchema],
}, {
  collection: 'estatisticas_partida',
});

module.exports = mongoose.model('EstatisticaPartida', EstatisticaPartidaSchema);
// src/models/mongo/HistoricoPartida.js
const mongoose = require('mongoose');

const respostaPorTemaSchema = new mongoose.Schema({
  tema: { type: String, required: true },
  resposta: { type: String, required: true },
  valida: { type: Boolean, required: true }
}, { _id: false });

const respostaJogadorSchema = new mongoose.Schema({
  numero_rodada: { type: Number, required: true },
  letra: { type: String, required: true },
  respostas_por_tema: [respostaPorTemaSchema]
}, { _id: false });

const jogadorPartidaSchema = new mongoose.Schema({
  id_jogador: { type: String, required: true },
  username: { type: String, required: true },
  pontuacao_total: { type: Number, required: true },
  respostas: [respostaJogadorSchema]
}, { _id: false });

const temaSchema = new mongoose.Schema({
    nome: { type: String, required: true }
}, { _id: false });

const historicoPartidaSchema = new mongoose.Schema({
  id_partida: { type: String, required: true, unique: true }, // ID da partida original (PostgreSQL)
  host: {
    id_jogador: { type: String, required: true },
    username: { type: String, required: true }
  },
  ganhador: { // Pode ser nulo ou não existir se não houver ganhador claro ou for empate
    id_jogador: { type: String },
    username: { type: String }
  },
  data_hora_inicio: { type: Date, required: true },
  data_hora_fim: { type: Date, required: false },
  temas: [temaSchema],
  letras_sorteadas: [String],
  jogadores: [jogadorPartidaSchema]
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  collection: 'partidas' // Especifica o nome da coleção existente
});

module.exports = mongoose.model('HistoricoPartida', historicoPartidaSchema);
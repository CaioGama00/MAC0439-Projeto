// src/models/mongo/mensagem.js
const mongoose = require('mongoose');

const mensagemSchema = new mongoose.Schema({
  remetente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jogador', // Referência ao modelo Jogador
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
  partidaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partida', // Referência ao modelo Partida
    required: true,
  },
  data_hora: {
    type: Date,
    default: Date.now, // Data e hora da mensagem
  },
});

// Exporta o modelo Mensagem
module.exports = mongoose.model('Mensagem', mensagemSchema);
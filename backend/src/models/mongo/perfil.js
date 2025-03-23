// src/models/mongo/perfil.js
const mongoose = require('mongoose');

// Esquema para o perfil do jogador
const perfilSchema = new mongoose.Schema({
  idJogador: {
    type: String,
    required: true, // ID do jogador (referência ao PostgreSQL)
    unique: true,   // Garante que cada jogador tenha apenas um perfil
  },
  preferencias: {
    temaFavorito: String, // Tema favorito do jogador
    idioma: {
      type: String,
      default: 'pt-BR', // Idioma preferido
    },
    notificacoes: {
      type: Boolean,
      default: true, // Receber notificações?
    },
  },
  configuracoes: {
    privacidade: {
      type: String,
      enum: ['publico', 'privado'], // Configuração de privacidade
      default: 'publico',
    },
  },
  dataCriacao: {
    type: Date,
    default: Date.now, // Data de criação do perfil
  },
});

// Criar o modelo "Perfil" a partir do esquema
const Perfil = mongoose.model('Perfil', perfilSchema);

module.exports = Perfil;
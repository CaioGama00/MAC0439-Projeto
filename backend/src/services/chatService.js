// src/services/chatService.js
const mensagem = require('../models/mongo/mensagem');

// Enviar uma mensagem no chat
const enviarMensagem = async (remetente, texto, partidaId) => {
  try {
    const novaMensagem = await mensagem.create({
      remetente,
      texto,
      partidaId,
    });

    return novaMensagem;
  } catch (error) {
    throw new Error(`Erro ao enviar mensagem: ${error.message}`);
  }
};

// Buscar mensagens de uma partida
const buscarMensagens = async (partidaId) => {
  try {
    const mensagens = await mensagem.find({ partidaId });
    return mensagens;
  } catch (error) {
    throw new Error(`Erro ao buscar mensagens: ${error.message}`);
  }
};

module.exports = {
  enviarMensagem,
  buscarMensagens,
};
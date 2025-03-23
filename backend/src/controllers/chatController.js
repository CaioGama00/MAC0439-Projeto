// src/controllers/chatController.js
const chatService = require('../services/chatService');

// Enviar uma mensagem no chat
const enviarMensagem = async (req, res) => {
  const { remetente, texto, partidaId } = req.body;

  try {
    const novaMensagem = await chatService.enviarMensagem(remetente, texto, partidaId);
    res.status(201).json(novaMensagem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar mensagens de uma partida
const buscarMensagens = async (req, res) => {
  const { partidaId } = req.params;

  try {
    const mensagens = await chatService.buscarMensagens(partidaId);
    res.status(200).json(mensagens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  enviarMensagem,
  buscarMensagens,
};
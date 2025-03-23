// src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Rota para enviar uma mensagem no chat
router.post('/enviar', chatController.enviarMensagem);

// Rota para buscar mensagens de uma partida
router.get('/partida/:partidaId', chatController.buscarMensagens);

module.exports = router;
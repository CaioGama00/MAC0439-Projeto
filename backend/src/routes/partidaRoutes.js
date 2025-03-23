// src/routes/partidaRoutes.js
const express = require('express');
const router = express.Router();
const partidaController = require('../controllers/partidaController');

// Rota para criar uma nova partida
router.post('/criar', partidaController.criarPartida);

// Rota para iniciar uma nova rodada
router.post('/:partidaId/iniciar-rodada', partidaController.iniciarRodada);

// Rota para enviar uma resposta em uma rodada
router.post('/:partidaId/rodada/:rodadaId/enviar-resposta', partidaController.enviarResposta);

module.exports = router;
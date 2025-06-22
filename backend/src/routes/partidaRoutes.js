// src/routes/partidaRoutes.js
const express = require('express');
const router = express.Router();
const partidaController = require('../controllers/partidaController');

// Rota para criar uma nova partida
router.post('/criar', partidaController.criarPartida);

// Rota para buscar partidas ativas
router.get('/ativas', partidaController.buscarPartidasAtivas);

// Rota para iniciar uma nova rodada
router.post('/:partidaId/iniciar-rodada', partidaController.iniciarRodada);

// Rota para enviar uma resposta em uma rodada
router.post('/:partidaId/rodada/:rodadaId/enviar-resposta', partidaController.enviarResposta);

// Rota para enviar uma resposta em uma rodada
router.get('/:partidaId/jogadores', partidaController.buscarJogadoresDaPartida);

// Rota para buscar partida por ID
router.get('/:partidaId', partidaController.buscarPartidaPorId);

// Rota para verificar a rodada
router.get('/:partidaId/verificar-rodada', partidaController.verificarRodada);

// Rota para entrar na Partida
router.post('/:partidaId/entrar', partidaController.entrarNaPartida);

module.exports = router;

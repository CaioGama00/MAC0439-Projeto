// src/routes/historicoRoutes.js
const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');
//const { autenticarToken } = require('../middlewares/authMiddleware'); // Assumindo que você tem um middleware de autenticação

// Rota para buscar o histórico de partidas (protegida por autenticação)
router.get('/partidas', historicoController.buscarHistoricoPartidas);
router.get('/partidas/atualizar/:id_partida', historicoController.atualizarMongo);
module.exports = router;
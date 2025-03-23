// src/routes/temaRoutes.js
const express = require('express');
const router = express.Router();
const temaController = require('../controllers/temaController');

// Rota para buscar todos os temas
router.get('/', temaController.buscarTemas);

// Rota para criar um novo tema
router.post('/criar', temaController.criarTema);

module.exports = router;
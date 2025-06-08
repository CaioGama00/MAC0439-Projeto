// src/routes/amizadeRoutes.js
const express = require('express');
const router = express.Router();
const amizadeController = require('../controllers/amizadeController');

// Rota para adicionar uma amizade
router.post('/adicionar', amizadeController.adicionarAmizade);

// Rota para aceitar uma amizade
router.put('/aceitar/:id', amizadeController.aceitarAmizade);

// Rota para listar amizades
router.get('/lista', amizadeController.listarAmizades);

module.exports = router;
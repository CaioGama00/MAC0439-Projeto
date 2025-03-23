// src/routes/jogadorRoutes.js
const express = require('express');
const router = express.Router();
const jogadorController = require('../controllers/jogadorController');

// Rota para cadastrar um novo jogador
router.post('/cadastrar', jogadorController.cadastrar);

// Rota para fazer login
router.post('/login', jogadorController.login);

// Rota para buscar o perfil de um jogador
router.get('/perfil/:id', jogadorController.buscarPerfil);

module.exports = router;
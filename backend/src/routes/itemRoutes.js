// src/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Rota para buscar todos os itens
router.get('/', itemController.buscarItens);

// Rota para comprar um item
router.post('/comprar', itemController.comprarItem);

module.exports = router;
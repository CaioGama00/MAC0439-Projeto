const express = require('express');
const router = express.Router();
const estatisticaController = require('../controllers/estatisticaController');

router.get('/', estatisticaController.getTodasPartidas);
router.get('/:id', estatisticaController.getPartidaPorId);
router.post('/', estatisticaController.postNovaPartida);

module.exports = router;
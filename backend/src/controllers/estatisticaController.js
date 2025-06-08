const estatisticaService = require('../services/estatisticaService');

async function getTodasPartidas(req, res) {
  try {
    const partidas = await estatisticaService.buscarTodasPartidas();
    res.json(partidas);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ erro: 'Erro ao buscar estatísticas' });
  }
}

async function getPartidaPorId(req, res) {
  try {
    const { id } = req.params;
    const partida = await estatisticaService.buscarPorIdPartida(id);

    if (!partida) {
      return res.status(404).json({ erro: 'Partida não encontrada' });
    }

    res.json(partida);
  } catch (error) {
    console.error('Erro ao buscar partida por ID:', error);
    res.status(500).json({ erro: 'Erro ao buscar partida' });
  }
}

async function postNovaPartida(req, res) {
  try {
    const novaPartida = await estatisticaService.criarPartida(req.body);
    res.status(201).json(novaPartida);
  } catch (error) {
    console.error('Erro ao criar nova partida:', error);
    res.status(500).json({ erro: 'Erro ao criar partida' });
  }
}

module.exports = {
  getTodasPartidas,
  getPartidaPorId,
  postNovaPartida,
};
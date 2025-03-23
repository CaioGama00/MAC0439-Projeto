// src/controllers/partidaController.js
const partidaService = require('../services/partidaService');

// Criar uma nova partida
const criarPartida = async (req, res) => {
  const { idHost, temas } = req.body;

  try {
    const novaPartida = await partidaService.criarPartida(idHost, temas);
    res.status(201).json(novaPartida);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Iniciar uma nova rodada
const iniciarRodada = async (req, res) => {
  const { partidaId } = req.params;

  try {
    const novaRodada = await partidaService.iniciarRodada(partidaId);
    res.status(200).json(novaRodada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enviar uma resposta para uma rodada
const enviarResposta = async (req, res) => {
  const { partidaId, rodadaId } = req.params;
  const { idJogador, idTema, resposta } = req.body;

  try {
    const respostaSalva = await partidaService.enviarResposta(partidaId, rodadaId, idJogador, idTema, resposta);
    res.status(200).json(respostaSalva);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  criarPartida,
  iniciarRodada,
  enviarResposta,
};
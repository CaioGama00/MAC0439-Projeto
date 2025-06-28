// src/controllers/partidaController.js
const partidaService = require('../services/partidaService');

// Criar uma nova partida
const criarPartida = async (req, res) => {
  const { idHost, temas } = req.body;

  try {
    const novaPartida = await partidaService.criarPartida(idHost, temas);
    res.status(201).json({
      success: true,
      data: novaPartida
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Buscar partidas ativas
const buscarPartidasAtivas = async (req, res) => {
  try {
    const partidas = await partidaService.buscarPartidasAtivas();
    res.status(200).json({
      success: true,
      data: partidas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Iniciar uma nova rodada
const iniciarRodada = async (req, res) => {
  const { partidaId } = req.params;

  try {
    const novaRodada = await partidaService.iniciarRodada(partidaId);
    res.status(200).json({
      success: true,
      data: novaRodada
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Enviar uma resposta para uma rodada
const enviarResposta = async (req, res) => {
  const { partidaId, rodadaId } = req.params;
  const { id_tema, resposta, id_jogador } = req.body;

  console.log('Recebido do front:', req.body);

  try {
    const respostaSalva = await partidaService.enviarResposta(
      partidaId, 
      rodadaId, 
      id_jogador, 
      id_tema, 
      resposta
    );
    
    res.status(200).json({
      success: true,
      data: respostaSalva
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const buscarJogadoresDaPartida = async (req, res) => {
  const { partidaId } = req.params;

  try {
    const jogadores = await partidaService.buscarJogadoresDaPartida(partidaId);

    res.status(200).json({
      success: true,
      data: jogadores
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const buscarPartidaPorId = async (req, res) => {
  const { partidaId } = req.params;

  try {
    const temas = await partidaService.buscarTemasDaPartida(partidaId);

    res.status(200).json({
      success: true,
      data: temas
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const verificarRodada = async (req, res) => {
  const { partidaId } = req.params;

  try {
    const rodada = await partidaService.buscarRodadaAtual(partidaId);

    if (!rodada) {
      return res.status(200).json({ rodadaIniciada: false });
    }

    return res.status(200).json({
      rodadaIniciada: true,
      dadosRodada: rodada
    });
  } catch (error) {
    console.error("Erro interno ao verificar rodada:", error);
    return res.status(500).json({ error: "Erro ao verificar rodada" });
  }
};

const entrarNaPartida = async (req, res) => {
  const { partidaId } = req.params;
  const { idJogador } = req.body;
  console.log(`${partidaId} e ${idJogador}`)

  try {
    const resultado = await partidaService.entrarOuVerificarJogadorNaPartida(partidaId, idJogador);
    console.log(resultado)

    res.status(200).json({
      success: true,
      message: resultado.entrouAgora
        ? 'Jogador entrou na partida'
        : 'Jogador já estava na partida',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  criarPartida,
  buscarPartidasAtivas,
  iniciarRodada,
  enviarResposta,
  buscarJogadoresDaPartida,
  verificarRodada,
  buscarPartidaPorId,
  entrarNaPartida
};

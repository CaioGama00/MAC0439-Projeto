// src/controllers/historicoController.js
const HistoricoPartida = require('../models/mongo/historicopartida');

const buscarHistoricoPartidas = async (req, res) => {
  try {
    // Adicionar opções de paginação e filtros se necessário
    // Exemplo: const { page = 1, limit = 10, idJogador } = req.query;
    // let query = {};
    // if (idJogador) {
    //   query['jogadores.id_jogador'] = idJogador;
    // }

    const historico = await HistoricoPartida.find({}) // Adicionar 'query' aqui se usar filtros
      .sort({ data_hora_fim: -1 }) // Ordena pelas mais recentes primeiro
      // .limit(limit * 1)
      // .skip((page - 1) * limit)
      .exec();

    // const count = await HistoricoPartida.countDocuments(query); // Para paginação

    res.status(200).json({
      success: true,
      data: historico,
      // totalPages: Math.ceil(count / limit), // Para paginação
      // currentPage: page // Para paginação
    });
  } catch (error) {
    console.error("Erro ao buscar histórico de partidas:", error);
    res.status(500).json({ success: false, message: 'Erro ao buscar histórico de partidas.' });
  }
};

module.exports = { buscarHistoricoPartidas };
// src/controllers/historicoController.js
const HistoricoPartida = require('../models/mongo/historicopartida');
const { sequelize } = require('../config/db');

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

// const atualizarMongo = async (req, res) => {
//   const sql = `
//       SELECT p.*, 
//             h.username AS host_username, 
//             g.username AS ganhador_username
//       FROM partida p
//       JOIN jogador h ON h.id_jogador = p.id_criador
//       JOIN jogador g ON g.id_jogador = p.id_ganhador`;  

//   const [results] = await sequelize.query(sql, {
//     type: sequelize.QueryTypes.SELECT,
//   });

//   for (const partida of results) {

//   }
// }
const atualizarMongo = async (req, res) => {
  try {
      // ✅ 1. Query PostgreSQL data
      const rows = await sequelize.query(`
        SELECT p.id_partida, p.data_criacao, 
              h.id_jogador AS host_id, h.username AS host_username,
              g.id_jogador AS ganhador_id, g.username AS ganhador_username
        FROM partida p
        JOIN jogador h ON h.id_jogador = p.id_criador
        JOIN jogador g ON g.id_jogador = p.id_ganhador
        WHERE p.estado = 'finalizada'
      `, { type: sequelize.QueryTypes.SELECT });

      for (const partida of rows) {
        // ✅ 2. Get jogadores, temas, letras, etc.
        const jogadores = await sequelize.query(`
          SELECT j.id_jogador, j.username, pj.pontuacao_final, r.numero_rodada, 
          r.resposta, r.valida, rod.letra_sorteada, t.nome as tema_nome
          FROM jogadoresnapartida pj
          JOIN jogador j ON j.id_jogador = pj.id_jogador
          JOIN resposta r ON r.id_jogador = j.id_jogador AND r.id_partida = pj.id_partida
          JOIN rodada rod ON r.id_partida = rod.id_partida AND r.numero_rodada = rod.numero_rodada
          JOIN tema t ON r.id_tema = t.id_tema
          WHERE pj.id_partida = '${partida.id_partida}'
          ORDER BY j.id_jogador, r.numero_rodada
        `, { type: sequelize.QueryTypes.SELECT });

        const temas = await sequelize.query(`
          SELECT t.nome FROM temapartida tp
          JOIN tema t ON t.id_tema = tp.id_tema
          WHERE tp.id_partida = '${partida.id_partida}'
        `, { type: sequelize.QueryTypes.SELECT });

        const letras = await sequelize.query(`
          SELECT letra_sorteada FROM rodada WHERE id_partida = '${partida.id_partida}'
          ORDER BY numero_rodada
        `, { type: sequelize.QueryTypes.SELECT });

        // ✅ 3. Transform into Mongo format
        const jogadoresTransformados = jogadores.reduce((acc, row) => {
          let jogador = acc.find(j => j.id_jogador === row.id_jogador);
          if (!jogador) {
            jogador = {
              id_jogador: row.id_jogador,
              username: row.username,
              pontuacao_total: row.pontuacao_final,
              respostas: []
            };
            acc.push(jogador);
          }

          // Agrupar por rodada
          let rodada = jogador.respostas.find(r => r.numero_rodada === row.numero_rodada);
          if (!rodada) {
            rodada = {
              numero_rodada: row.numero_rodada,
              letra: row.letra_sorteada,
              respostas_por_tema: []
            };
            jogador.respostas.push(rodada);
          }

          rodada.respostas_por_tema.push({
            tema: row.tema_nome,
            resposta: row.resposta,
            valida: row.valida
          });

          return acc;
        }, []);

        // ✅ 4. Inserir no Mongo
        await HistoricoPartida.create({
          id_partida: partida.id_partida,
          host: {
            id_jogador: partida.host_id,
            username: partida.host_username
          },
          ganhador: {
            id_jogador: partida.ganhador_id,
            username: partida.ganhador_username
          },
          data_hora_inicio: partida.data_criacao,
          temas: temas.map(t => ({ nome: t.nome })),
          letras_sorteadas: letras.map(l => l.letra_sorteada),
          jogadores: jogadoresTransformados
        });

        console.log(`✅ Partida ${partida.id_partida} migrada com sucesso`);
      }

      // ✅ Done
    } catch (err) {
      console.error('Erro durante migração:', err);
    }
};

module.exports = { buscarHistoricoPartidas, atualizarMongo };
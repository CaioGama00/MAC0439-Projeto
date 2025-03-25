// src/services/partidaService.js
const partida = require('../models/postgres/partida');
const tema = require('../models/postgres/tema');
const rodada = require('../models/postgres/rodada');
const resposta = require('../models/postgres/resposta');

// Criar uma nova partida
const criarPartida = async (idHost, temas) => {
  try {
    // Validação dos temas
    if (!temas || !Array.isArray(temas) || temas.length === 0) {
      throw new Error('Selecione pelo menos um tema');
    }

    // Verifica se os temas existem
    const temasExistentes = await tema.findAll({
      where: {
        id: temas
      }
    });

    if (temasExistentes.length !== temas.length) {
      throw new Error('Um ou mais temas não existem');
    }

    // Cria a partida
    const novaPartida = await partida.create({
      id_host: idHost,
      estado: 'ativa'
    });

    // Associa os temas à partida
    await novaPartida.setTemas(temas);

    return {
      id: novaPartida.id,
      id_host: novaPartida.id_host,
      estado: novaPartida.estado,
      temas: temasExistentes.map(tema => tema.nome)
    };
  } catch (error) {
    console.error('Erro ao criar partida:', error);
    throw error;
  }
};

// Buscar partidas ativas
const buscarPartidasAtivas = async () => {
  try {
    const partidas = await partida.findAll({
      where: { estado: 'ativa' },
      include: [
        {
          model: tema,
          attributes: ['id', 'nome'],
          through: { attributes: [] } // Não retorna dados da tabela de associação
        }
      ]
    });

    return partidas.map(partida => ({
      id: partida.id,
      id_host: partida.id_host,
      estado: partida.estado,
      temas: partida.Temas.map(tema => tema.nome)
    }));
  } catch (error) {
    console.error('Erro ao buscar partidas ativas:', error);
    throw error;
  }
};

// Iniciar uma nova rodada
const iniciarRodada = async (partidaId) => {
  try {
    // Verifica se a partida existe e está ativa
    const partida = await partida.findByPk(partidaId);
    if (!partida || partida.estado !== 'ativa') {
      throw new Error('partida não encontrada ou já encerrada');
    }

    // Sorteia uma letra aleatória (A-Z)
    const letraSorteada = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    // Cria a nova rodada
    const novaRodada = await rodada.create({
      id_partida: partidaId,
      numero_rodada: await rodada.count({ where: { id_partida: partidaId } }) + 1,
      letra_sorteada: letraSorteada
    });

    return novaRodada;
  } catch (error) {
    console.error('Erro ao iniciar rodada:', error);
    throw error;
  }
};

// Enviar uma resposta para uma rodada
const enviarResposta = async (partidaId, rodadaId, idJogador, idTema, resposta) => {
  try {
    // Verifica se a partida e rodada existem
    const partida = await partida.findByPk(partidaId);
    if (!partida) throw new Error('Partida não encontrada');

    const rodada = await rodada.findOne({
      where: {
        id_partida: partidaId,
        numero_rodada: rodadaId
      }
    });
    if (!rodada) throw new Error('Rodada não encontrada');

    // Verifica se o tema é válido para esta partida
    const temaNaPartida = await partida.hasTema(idTema);
    if (!temaNaPartida) throw new Error('Tema não válido para esta partida');

    // Cria a resposta
    const respostaSalva = await resposta.create({
      id_partida: partidaId,
      numero_rodada: rodadaId,
      id_tema: idTema,
      id_jogador: idJogador,
      resposta: resposta,
      valida: true // Pode adicionar lógica de validação depois
    });

    return respostaSalva;
  } catch (error) {
    console.error('Erro ao enviar resposta:', error);
    throw error;
  }
};

module.exports = {
  criarPartida,
  buscarPartidasAtivas,
  iniciarRodada,
  enviarResposta
};
// src/services/partidaService.js
const { models } = require('../config/db'); // Importa o objeto models
const { Partida, Tema, Jogador, Rodada, Resposta, JogadoresNaPartida } = models; // Corrigido para PascalCase

// Criar uma nova partida
const criarPartida = async (idHost, temas) => {
  const temasIds = temas.map(t => typeof t === 'object' ? t.id_tema || t.id : t);

  try {
    // Validação dos temas
    if (!temas || !Array.isArray(temas) || temas.length === 0) {
      throw new Error('Selecione pelo menos um tema');
    }

    // Verifica se os temas existem
    const temasExistentes = await Tema.findAll({
      where: {
        id_tema: temasIds
      }
    });

    console.log("Temas registrados: ", temasExistentes)

    if (temasExistentes.length !== temas.length) {
      throw new Error('Um ou mais temas não existem');
    }

    // Cria a partida
    const novaPartida = await Partida.create({
      id_criador: idHost,
      estado: 'iniciada'
    });

    // Associa os temas à partida
    await novaPartida.setTemas(temasExistentes); 

    return {
      id: novaPartida.id,
      id_criador: novaPartida.id_criador,
      estado: novaPartida.estado,
      temas: temasExistentes.map(t => t.id_tema)
    };
  } catch (error) {
    console.error('Erro ao criar partida:', error);
    throw error;
  }
};

// Buscar partidas ativas
const buscarPartidasAtivas = async () => {
  try {
    const partidas = await Partida.findAll({
      where: { estado: 'iniciada' },
      include: [
        {
          model: Tema,
          as: 'Temas', 
          attributes: ['id_tema', 'nome'],
          through: { attributes: [] } 
        },
        {
          model: Jogador,
          as: 'host', 
          attributes: ['id_jogador', 'username'] 
        }
      ]
    });

    return partidas.map(partida => ({
      id: partida.id_partida, 
      host: partida.host ? partida.host.username : null, 
      estado: partida.estado,
      temas: partida.Temas ? partida.Temas.map(t => t.nome) : [] 
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
    const partidaEncontrada = await Partida.findByPk(partidaId);
    if (!partidaEncontrada || partidaEncontrada.estado !== 'iniciada') {
      throw new Error('partida não encontrada ou já encerrada');
    }

    // Sorteia uma letra aleatória (A-Z)
    const letraSorteada = String.fromCharCode(65 + Math.floor(Math.random() * 26));

    // Cria a nova rodada
    const novaRodada = await Rodada.create({
      id_partida: partidaId,
      numero_rodada: await Rodada.count({ where: { id_partida: partidaId } }) + 1,
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
    const partidaEncontrada = await Partida.findByPk(partidaId);
    if (!partidaEncontrada) throw new Error('Partida não encontrada');

    const rodadaEncontrada = await Rodada.findOne({
      where: {
        id_partida: partidaId,
        numero_rodada: rodadaId
      }
    });
    if (!rodadaEncontrada) throw new Error('Rodada não encontrada');

    // Verifica se o tema é válido para esta partida
    const temaNaPartida = await partidaEncontrada.hasTema(idTema);
    if (!temaNaPartida) throw new Error('Tema não válido para esta partida');

    // Cria a resposta
    const respostaSalva = await Resposta.create({
      id_partida: partidaId,
      numero_rodada: rodadaId,
      id_tema: idTema,
      id_jogador: idJogador,
      resposta: resposta,
      valida: true,
      pontuacao: 10 // Pode adicionar lógica de validação depois
    });

    return respostaSalva;
  } catch (error) {
    console.error('Erro ao enviar resposta:', error);
    throw error;
  }
};

const buscarJogadoresDaPartida = async (idPartida) => {
  try {
    const partida = await Partida.findByPk(idPartida, {
    include: [
        {
          model: Jogador,
          as: 'Jogadores',
          attributes: ['id_jogador', 'nome', 'username'],
          through: {
            attributes: ['pontuacao_final']
          }
        }
      ]
    });

    if (!partida) throw new Error('Partida não encontrada');

    return partida.Jogadores.map(jogador => ({
      nome: jogador.nome,
      username: jogador.username
    }));
  } catch (error) {
    console.error('Erro ao buscar jogadores da partida:', error);
    throw error;
  }
};

const buscarTemasDaPartida = async (idPartida) => {
  console.log('buscarTemasDaPartida - idPartida:', idPartida);

  const partida = await Partida.findByPk(idPartida);

  if (!partida) {
    console.error('Partida não encontrada no banco para id:', idPartida);
    throw new Error('Partida não encontrada');
  }

  const partidaComTemas = await Partida.findByPk(idPartida, {
    include: [
      {
        model: Tema,
        as: 'Temas',
        attributes: ['id_tema', 'nome'],
        through: { attributes: [] }
      }
    ]
  });

  return {
    id: partidaComTemas.id_partida,
    estado: partidaComTemas.estado,
    temas: partidaComTemas.Temas.map(t => ({
      id: t.id_tema,
      nome: t.nome
    }))
  };
};

const buscarRodadaAtual = async (partidaId) => {
  return await Rodada.findOne({
    where: { id_partida: partidaId },
    order: [['numero_rodada', 'DESC']],
  });
};

const entrarOuVerificarJogadorNaPartida = async (id_partida, id_jogador) => {
  console.log(`${id_partida} e ${id_jodagor}`)

  const jogador = await JogadoresNaPartida.findOne({
    where: { id_partida, id_jogador }
  });

  console.log(jogador)

  if (!jogador) {
    // Cria a entrada
    await JogadoresNaPartida.create({
      id_partida,
      id_jogador,
      pontuacao_final: 0
    });
    return { entrouAgora: true };
  }

  return { entrouAgora: false };
};

module.exports = {
  criarPartida,
  buscarPartidasAtivas,
  iniciarRodada,
  enviarResposta,
  buscarJogadoresDaPartida,
  buscarRodadaAtual,
  buscarTemasDaPartida,
  entrarOuVerificarJogadorNaPartida
};

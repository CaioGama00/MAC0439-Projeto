// src/services/amizadeService.js
const amizade = require('../models/postgres/amizade');
const jogador = require('../models/postgres/jogador');

// Adicionar uma amizade
const adicionarAmizade = async (idJogador1, idJogador2) => {
  try {
    // Verificar se os jogadores existem
    const jogador1 = await jogador.findByPk(idJogador1);
    const jogador2 = await jogador.findByPk(idJogador2);

    if (!jogador1 || !jogador2) {
      throw new Error('Um ou ambos os jogadores não existem.');
    }

    // Criar a amizade
    const novaAmizade = await amizade.create({
      id_jogador1: idJogador1,
      id_jogador2: idJogador2,
      status: 'pendente',
    });

    return novaAmizade;
  } catch (error) {
    throw new Error(`Erro ao adicionar amizade: ${error.message}`);
  }
};

// Aceitar uma amizade
const aceitarAmizade = async (idAmizade) => {
  try {
    const amizadeEncontrada = await amizade.findByPk(idAmizade);

    if (!amizadeEncontrada) {
      throw new Error('Amizade não encontrada.');
    }

    amizadeEncontrada.status = 'aceita';
    await amizadeEncontrada.save();

    return amizadeEncontrada;
  } catch (error) {
    throw new Error(`Erro ao aceitar amizade: ${error.message}`);
  }
};

module.exports = {
  adicionarAmizade,
  aceitarAmizade,
};
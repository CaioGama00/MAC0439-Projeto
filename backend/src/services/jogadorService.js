// src/services/jogadorService.js
const jogador = require('../models/postgres/jogador');
const { hashPassword, comparePassword } = require('../config/auth');

// Cadastrar um novo jogador
const cadastrarJogador = async (username, email, senha) => {
  try {
    // Verifica se username ou email já existem
    const existeUsername = await jogador.findOne({ where: { username } });
    if (existeUsername) {
      throw new Error('Username já está em uso');
    }

    const existeEmail = await jogador.findOne({ where: { email } });
    if (existeEmail) {
      throw new Error('Email já está em uso');
    }

    const senhaHash = await hashPassword(senha);
    const novoJogador = await jogador.create({
      username,
      email,
      senha: senhaHash,
    });

    return novoJogador;
  } catch (error) {
    console.error('Erro detalhado:', error);
    throw new Error(`Erro ao cadastrar jogador: ${error.message}`);
  }
};

const autenticarJogador = async (username, senha) => {
  try {
    const jogadorEncontrado = await jogador.findOne({ 
      where: { username },
      attributes: ['id_jogador', 'username', 'email', 'senha']
    });
    
    if (!jogadorEncontrado) {
      throw new Error('Jogador não encontrado.');
    }

    const senhaValida = await comparePassword(senha, jogadorEncontrado.senha);
    if (!senhaValida) {
      throw new Error('Senha incorreta.');
    }

    const { senha: _, ...jogadorSemSenha } = jogadorEncontrado.get({ plain: true });
    return jogadorSemSenha;
  } catch (error) {
    throw new Error(`Erro ao autenticar jogador: ${error.message}`);
  }
};

// Buscar perfil de um jogador
const buscarPerfil = async (idJogador) => {
  try {
    const jogadorEncontrado = await jogador.findByPk(idJogador, {
      attributes: { exclude: ['senha'] },
    });

    if (!jogadorEncontrado) {
      throw new Error('Jogador não encontrado.');
    }

    return jogadorEncontrado;
  } catch (error) {
    throw new Error(`Erro ao buscar perfil: ${error.message}`);
  }
};

// Atualizar perfil do jogador
const atualizarPerfil = async (idJogador, dadosAtualizacao) => {
  try {
    // Verifica se o jogador existe
    const jogadorExistente = await jogador.findByPk(idJogador);
    if (!jogadorExistente) {
      throw new Error('Jogador não encontrado');
    }

    // Define campos permitidos para atualização
    const camposPermitidos = ['username', 'email', 'nome', 'avatar', 'data_nascimento'];
    const camposParaAtualizar = {};

    // Filtra apenas os campos permitidos
    for (const campo of camposPermitidos) {
      if (dadosAtualizacao[campo] !== undefined) {
        camposParaAtualizar[campo] = dadosAtualizacao[campo];
      }
    }

    // Verifica se há campos para atualizar
    if (Object.keys(camposParaAtualizar).length === 0) {
      throw new Error('Nenhum dado válido para atualização');
    }

    // Verifica se novo username já existe (se estiver sendo alterado)
    if (camposParaAtualizar.username && camposParaAtualizar.username !== jogadorExistente.username) {
      const usernameExistente = await jogador.findOne({ 
        where: { username: camposParaAtualizar.username } 
      });
      if (usernameExistente) {
        throw new Error('Username já está em uso');
      }
    }

    // Verifica se novo email já existe (se estiver sendo alterado)
    if (camposParaAtualizar.email && camposParaAtualizar.email !== jogadorExistente.email) {
      const emailExistente = await jogador.findOne({ 
        where: { email: camposParaAtualizar.email } 
      });
      if (emailExistente) {
        throw new Error('Email já está em uso');
      }
    }

    // Executa a atualização
    await jogador.update(camposParaAtualizar, {
      where: { id_jogador: idJogador }
    });

    // Retorna os dados atualizados (excluindo a senha)
    const jogadorAtualizado = await jogador.findByPk(idJogador, {
      attributes: { exclude: ['senha'] }
    });

    return jogadorAtualizado;
  } catch (error) {
    console.error('Erro ao atualizar perfil:', {
      idJogador,
      error: error.message
    });
    throw new Error(`Erro ao atualizar perfil: ${error.message}`);
  }
};

module.exports = {
  cadastrarJogador,
  autenticarJogador,
  buscarPerfil,
  atualizarPerfil 
};
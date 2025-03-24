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
      attributes: ['id_jogador', 'username', 'email', 'senha'] // Especifica os campos
    });
    
    if (!jogadorEncontrado) {
      throw new Error('Jogador não encontrado.');
    }

    const senhaValida = await comparePassword(senha, jogadorEncontrado.senha);
    if (!senhaValida) {
      throw new Error('Senha incorreta.');
    }

    // Retorna os dados do jogador sem a senha
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
      attributes: { exclude: ['senha'] }, // Exclui a senha do retorno
    });

    if (!jogadorEncontrado) {
      throw new Error('Jogador não encontrado.');
    }

    return jogadorEncontrado;
  } catch (error) {
    throw new Error(`Erro ao buscar perfil: ${error.message}`);
  }
};

module.exports = {
  cadastrarJogador,
  autenticarJogador,
  buscarPerfil,
};
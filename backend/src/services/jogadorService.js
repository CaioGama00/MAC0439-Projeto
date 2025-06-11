// src/services/jogadorService.js
const { models } = require('../config/db'); // Importa o objeto models
const { Jogador } = models; // Corrigido para 'Jogador' (PascalCase)
const { hashPassword, comparePassword } = require('../config/auth');

// Cadastrar um novo jogador
const cadastrarJogador = async (username, nome, email, senha) => { // Adicionar nome como parâmetro
  try {
    // Verifica se username ou email já existem
    const existeUsername = await Jogador.findOne({ where: { username } });
    if (existeUsername) {
      throw new Error('Username já está em uso');
    }

    const existeEmail = await Jogador.findOne({ where: { email } });
    if (existeEmail) {
      throw new Error('Email já está em uso');
    }

    const senhaHash = await hashPassword(senha);
    const novoJogador = await Jogador.create({
      username,
      nome, // Incluir nome na criação
      email,
      senha: senhaHash,
      tipo: 'Gratuito' 
    });

    // Retornar um objeto plano para garantir que todos os campos, incluindo 'tipo',
    // sejam corretamente passados adiante, especialmente para a geração do token.
    return novoJogador.get({ plain: true });
  } catch (error) {
    // O erro já está sendo logado no controller, mas pode manter se quiser um log específico aqui.
    throw new Error(`Erro ao cadastrar jogador: ${error.message}`);
  }
};

const autenticarJogador = async (username, senha) => {
  try {
    const jogadorEncontrado = await Jogador.findOne({ 
      where: { username },
      attributes: ['id_jogador', 'username', 'email', 'senha', 'tipo']
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
    const jogadorEncontrado = await Jogador.findByPk(idJogador, {
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
    const jogadorExistente = await Jogador.findByPk(idJogador);
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
      const usernameExistente = await Jogador.findOne({ 
        where: { username: camposParaAtualizar.username } 
      });
      if (usernameExistente) {
        throw new Error('Username já está em uso');
      }
    }

    // Verifica se novo email já existe (se estiver sendo alterado)
    if (camposParaAtualizar.email && camposParaAtualizar.email !== jogadorExistente.email) {
      const emailExistente = await Jogador.findOne({ 
        where: { email: camposParaAtualizar.email } 
      });
      if (emailExistente) {
        throw new Error('Email já está em uso');
      }
    }

    // Executa a atualização
    await Jogador.update(camposParaAtualizar, {
      where: { id_jogador: idJogador }
    });

    // Retorna os dados atualizados (excluindo a senha)
    const jogadorAtualizado = await Jogador.findByPk(idJogador, {
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
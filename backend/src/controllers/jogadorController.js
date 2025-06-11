// src/controllers/jogadorController.js
const jogadorService = require('../services/jogadorService');
const jwt = require('jsonwebtoken');


// Cadastrar um novo jogador
const cadastrar = async (req, res) => {
  const { username, nome, email, senha } = req.body; // Adicionar nome
  console.log("Dados recebidos:", { username, nome, email, senha }); // Log dos dados recebidos
  try {
    const novoJogador = await jogadorService.cadastrarJogador(username, nome, email, senha); // Passar nome
    
    // Gerar token JWT
    const token = jwt.sign(
      { id_jogador: novoJogador.id_jogador, tipo: novoJogador.tipo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN } // Define a validade do token
    );

    console.log("Jogador cadastrado com sucesso!"); // Log do sucesso
    // Retornar token, id e tipo do jogador
    res.status(201).json({ token, id_jogador: novoJogador.id_jogador, tipo: novoJogador.tipo, username: novoJogador.username, nome: novoJogador.nome, email: novoJogador.email });
  } catch (error) {
    console.error("Erro ao cadastrar jogador:", error); // Log do erro
    res.status(500).json({ message: error.message });
  }
};

// Login de um jogador
const login = async (req, res) => {
  const { username, senha } = req.body;

  try {
    const jogadorAutenticado = await jogadorService.autenticarJogador(username, senha);
    
    // Gerar token JWT
    const token = jwt.sign(
      { id_jogador: jogadorAutenticado.id_jogador, tipo: jogadorAutenticado.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Login feito com sucesso!");
    // Retornar token, id e tipo do jogador
    res.status(200).json({ token, id_jogador: jogadorAutenticado.id_jogador, tipo: jogadorAutenticado.tipo, username: jogadorAutenticado.username });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ message: error.message });
  }
};

// Buscar perfil de um jogador
const buscarPerfil = async (req, res) => {
  const { id } = req.params;

  try {
    const perfil = await jogadorService.buscarPerfil(id);
    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Atualiza perfil de um jogador
const atualizarPerfil = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // Validação rigorosa
  if (!id || id === 'undefined') {
    return res.status(400).json({ 
      success: false,
      message: 'ID do jogador é obrigatório'
    });
  }

  try {
    const jogadorAtualizado = await jogadorService.atualizarPerfil(id, req.body);
    res.json(jogadorAtualizado);
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

module.exports = {
  cadastrar,
  login,
  buscarPerfil,
  atualizarPerfil
};
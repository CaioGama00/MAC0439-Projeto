// src/controllers/jogadorController.js
const jogadorService = require('../services/jogadorService');

// Cadastrar um novo jogador
const cadastrar = async (req, res) => {
  const { username, email, senha } = req.body;
  console.log("Dados recebidos:", { username, email, senha }); // Log dos dados recebidos
  try {
    const novoJogador = await jogadorService.cadastrarJogador(username, email, senha);
    console.log("Jogador cadastrado com sucesso!"); // Log do sucesso
    res.status(201).json(novoJogador);
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
    console.log("Login feito com sucesso!"); // Log do sucesso
    res.status(200).json(jogadorAutenticado);
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

module.exports = {
  cadastrar,
  login,
  buscarPerfil,
};
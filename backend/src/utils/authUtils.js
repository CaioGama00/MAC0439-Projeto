// src/utils/authUtils.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET; // Chave secreta para assinar tokens JWT

// Função para gerar um token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora
};

// Função para verificar um token JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET); // Retorna o payload do token se for válido
  } catch (error) {
    return null; // Retorna null se o token for inválido
  }
};

// Função para criar um hash de senha
const hashPassword = async (password) => {
  const saltRounds = 10; // Número de rounds para o bcrypt
  return await bcrypt.hash(password, saltRounds);
};

// Função para comparar uma senha com um hash
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash); // Retorna true se a senha corresponder ao hash
};

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
};
// src/server.js
const http = require('http');
const app = require('./app');
const { configureSocket } = require('./config/socket');

// Configuração do servidor HTTP
const server = http.createServer(app);

// Configuração do Socket.IO
const io = configureSocket(server);

// Definição da porta
const PORT = process.env.PORT || 5000;

// Inicialização do servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
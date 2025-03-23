// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectToPostgres, connectToMongo } = require('./config/db');
const errorHandler = require('./utils/errorHandler');

// Importação das rotas
const jogadorRoutes = require('./routes/jogadorRoutes');
const partidaRoutes = require('./routes/partidaRoutes');
const temaRoutes = require('./routes/temaRoutes');
const amizadeRoutes = require('./routes/amizadeRoutes');
const chatRoutes = require('./routes/chatRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Inicialização do Express
const app = express();

// Middlewares
app.use(cors()); // Permite requisições de diferentes origens
app.use(bodyParser.json()); // Habilita o parsing de JSON no corpo das requisições

// Conexão com os bancos de dados
connectToPostgres();
connectToMongo();
// connectToNeo4j();

// Rotas
app.use('/api/jogador', jogadorRoutes);
app.use('/api/partida', partidaRoutes);
app.use('/api/tema', temaRoutes);
app.use('/api/amizade', amizadeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/item', itemRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;
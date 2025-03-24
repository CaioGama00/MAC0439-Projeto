// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectToPostgres, connectToMongo, sequelize } = require('./config/db'); // Importa sequelize
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
app.use(cors({
  origin: 'http://localhost:3000', // Substitua pela URL do seu frontend
  credentials: true, // Permite o envio de credenciais
}));
app.use(bodyParser.json()); // Habilita o parsing de JSON no corpo das requisições

// Conexão com os bancos de dados
const startServer = async () => {
  try {
    await connectToPostgres(); // Aguarda a conexão com o PostgreSQL
    await connectToMongo(); // Aguarda a conexão com o MongoDB

    // // Sincroniza o modelo com o banco de dados (apenas em desenvolvimento)
    // await sequelize.sync({ force: true }); // force: true recria as tabelas
    // console.log('Tabelas sincronizadas com o banco de dados.');

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

  } catch (error) {
    console.error('Erro ao conectar aos bancos de dados:', error);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

startServer();

module.exports = app;
// scripts/init_mongo.js
const mongoose = require('mongoose');
const Perfil = require('../models/mongo/perfil');
const Mensagem = require('../models/mongo/mensagem');

// Conectar ao MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`);
    console.log('Conectado ao MongoDB Atlas');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB Atlas:', error);
  }
};

// Função para inicializar o MongoDB
const initMongo = async () => {
  try {
    // Criar coleções iniciais (se não existirem)
    await Perfil.init();
    await Mensagem.init();

    console.log('Coleções do MongoDB inicializadas com sucesso.');
  } catch (error) {
    console.error('Erro ao inicializar o MongoDB:', error);
  } finally {
    // Fechar a conexão com o MongoDB
    await mongoose.connection.close();
  }
};

// Executar a inicialização
initMongo();
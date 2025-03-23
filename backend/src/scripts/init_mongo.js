// scripts/init_mongo.js
const mongoose = require('mongoose');
const Perfil = require('../src/models/mongo/perfil');
const Mensagem = require('../src/models/mongo/mensagem');

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
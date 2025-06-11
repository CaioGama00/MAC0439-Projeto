// src/config/db.js
const { Sequelize, DataTypes } = require('sequelize'); // Adicionar DataTypes
const mongoose = require('mongoose'); // MongoDB
const neo4j = require('neo4j-driver'); // Neo4j

// Configuração do Sequelize para PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres', // Define o banco de dados como PostgreSQL
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false, // Desativa logs do Sequelize (opcional)
});

// Objeto para armazenar os modelos
const db = {
  sequelize, // Adiciona a instância do sequelize ao objeto db
  Sequelize, // Adiciona a classe Sequelize ao objeto db
  models: {}, // Objeto para armazenar os modelos inicializados
};

// Importar e inicializar modelos
// Certifique-se de que cada arquivo de modelo exporta uma função que aceita (sequelize, DataTypes)
const modelDefiners = [
  require('../models/postgres/jogador'),
  require('../models/postgres/partida'),
  require('../models/postgres/tema'),
  require('../models/postgres/tema_partida'),
  require('../models/postgres/rodada'),
  require('../models/postgres/resposta'),
  require('../models/postgres/item'),
  require('../models/postgres/inventario'),
  require('../models/postgres/amizade'),
  // Adicione require para outros modelos aqui
];

modelDefiners.forEach(modelDefiner => modelDefiner(sequelize, DataTypes));

const connectToPostgres = async () => {
  try {
    await sequelize.authenticate(); // Testa a conexão com o banco de dados
    console.log('Conectado ao PostgreSQL com Sequelize');
  } catch (error) {
    console.error('Erro ao conectar ao PostgreSQL:', error);
  }
};

// Configuração do MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'adedonha'
    });
    console.log('Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); // Encerra o processo se falhar
  }
};

const uri = process.env.NEO4J_URI;
const user = process.env.NEO4J_USER;
const password = process.env.NEO4J_PASSWORD;
let driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const connectToNeo4j = async () => {
  try {
    const serverInfo = await driver.getServerInfo()
    console.log('Conectado ao Neo4j com sucesso')
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
};

// Associar modelos após todos serem definidos e inicializados
// A inicialização acontece quando os arquivos de modelo são chamados com (sequelize, DataTypes)
// e eles chamam Model.init(). O Sequelize registra os modelos internamente.
Object.values(sequelize.models).forEach(model => {
  if (model.associate) {
    model.associate(sequelize.models); // Passa todos os modelos registrados na instância do sequelize
  }
});

// Adicionar modelos ao objeto db para exportação (opcional, mas útil)
db.models = { ...sequelize.models };

module.exports = {
  ...db, // Exporta sequelize, Sequelize e models
  connectToPostgres,
  connectToMongo,
  connectToNeo4j,
  driver
};
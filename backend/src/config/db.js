// src/config/db.js
const { Sequelize } = require('sequelize');
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
      dbName: 'adedonha',
      useUnifiedTopology: true,
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

module.exports = {
  sequelize, // Exporta a instância do Sequelize
  connectToPostgres,
  connectToMongo,
  connectToNeo4j,
  driver
};
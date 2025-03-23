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
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`);
    console.log('Conectado ao MongoDB Atlas');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB Atlas:', error);
  }
};

// // Configuração do Neo4j
// const neo4jDriver = neo4j.driver(
//   process.env.NEO4J_URI, // URL de conexão do Neo4j
//   neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD) // Autenticação do Neo4j
// );

// const connectToNeo4j = async () => {
//   try {
//     await neo4jDriver.verifyConnectivity();
//     console.log('Conectado ao Neo4j');
//   } catch (error) {
//     console.error('Erro ao conectar ao Neo4j:', error);
//   }
// };

module.exports = {
  sequelize, // Exporta a instância do Sequelize
  connectToPostgres,
  connectToMongo,
};
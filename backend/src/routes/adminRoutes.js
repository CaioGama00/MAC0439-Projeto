// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/db');
const { QueryTypes } = require('sequelize');
const { autenticarToken, isAdmin } = require('../middlewares/adminAuth'); // Ajuste o caminho se necessário

// Proteger todas as rotas de admin
router.use(autenticarToken); // Primeiro autentica
router.use(isAdmin);       // Depois verifica se é admin

// Listar todas as tabelas
router.get('/db/tables', async (req, res, next) => {
    try {
        const tables = await sequelize.getQueryInterface().showAllTables();
        res.json(tables.sort());
    } catch (error) {
        next(error);
    }
});

// Obter dados de uma tabela específica
router.get('/db/tables/:tableName', async (req, res, next) => {
    const { tableName } = req.params;
    try {
        // Validação básica do nome da tabela para prevenir SQL injection simples
        if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
            return res.status(400).json({ message: 'Nome de tabela inválido.' });
        }
        const data = await sequelize.query(`SELECT * FROM "${tableName}"`, { type: QueryTypes.SELECT });
        res.json(data);
    } catch (error) {
        if (error.name === 'SequelizeDatabaseError') {
            res.status(404).json({ message: `Tabela "${tableName}" não encontrada ou erro ao acessá-la.` });
        } else {
            next(error);
        }
    }
});

// Executar uma query SQL (USAR COM EXTREMO CUIDADO)
router.post('/db/query', async (req, res, next) => {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: 'Query SQL não fornecida ou em formato inválido.' });
    }

    try {
        const [results, metadata] = await sequelize.query(query);
        res.json({ results, metadata });
    } catch (error) {
        console.error('Erro ao executar query SQL:', error);
        res.status(400).json({ message: error.message, name: error.name, original: error.original?.message });
    }
});

module.exports = router;
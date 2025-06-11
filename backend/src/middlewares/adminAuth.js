//src/middlewares/adminAuth.js
const Jogador = require('../models/postgres/jogador');
const jwt = require('jsonwebtoken');

// Middleware para verificar se o usuário está autenticado (exemplo, adapte se já tiver um)
const autenticarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.jogadorId = decoded.id_jogador; // Adiciona id_jogador à requisição
        req.jogadorTipo = decoded.tipo; // Adiciona tipo à requisição, se incluído no token
        next();
    });
};

const isAdmin = async (req, res, next) => {
    try {
        // Se o tipo não estiver no token, ou para uma verificação mais robusta:
        const jogador = await Jogador.findByPk(req.jogadorId);
        if (!jogador) {
            return res.status(404).json({ message: 'Jogador não encontrado.' });
        }
        if (jogador.tipo !== 'Admin') {
            return res.status(403).json({ message: 'Acesso negado. Requer privilégios de administrador.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Erro interno ao verificar permissões de administrador.' });
    }
};

module.exports = { autenticarToken, isAdmin };
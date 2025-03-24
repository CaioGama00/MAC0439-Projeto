// src/config/socket.js
const socketIO = require('socket.io');

// Função para configurar o Socket.IO
const configureSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: '*', // Permite conexões de qualquer origem (ajuste para produção)
      methods: ['GET', 'POST'], // Métodos HTTP permitidos
    },
  });

  // Contador de jogadores conectados
  let jogadoresConectados = 0;

  // Evento de conexão de um novo jogador
  io.on('connection', (socket) => {
    console.log('Novo jogador conectado:', socket.id);
    jogadoresConectados++; // Incrementa o contador de jogadores conectados
    console.log(`Jogadores conectados: ${jogadoresConectados}`);

    // Evento para entrar em uma partida
    socket.on('entrarPartida', (partidaId) => {
      socket.join(partidaId); // Entra na sala da partida
      console.log(`Jogador ${socket.id} entrou na partida ${partidaId}`);
    });

    // Evento para enviar uma mensagem no chat
    socket.on('enviarMensagem', (partidaId, mensagem) => {
      io.to(partidaId).emit('novaMensagem', mensagem); // Envia a mensagem para todos na partida
    });

    // Evento de desconexão
    socket.on('disconnect', () => {
      console.log('Jogador desconectado:', socket.id);
      jogadoresConectados--; // Decrementa o contador de jogadores conectados
      console.log(`Jogadores conectados: ${jogadoresConectados}`);
    });
  });

  return io;
};

module.exports = { configureSocket };
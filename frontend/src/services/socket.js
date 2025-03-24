// src/services/socket.js
import { io } from 'socket.io-client';

// Configura a URL do servidor Socket.IO (substitua pela URL do seu backend)
const SOCKET_SERVER_URL = 'http://localhost:5000';

// Cria uma instância do Socket.IO
const socket = io(SOCKET_SERVER_URL);

// Função para entrar em uma partida
export const entrarPartida = (partidaId) => {
  socket.emit('entrarPartida', partidaId);
};

// Função para enviar uma mensagem no chat
export const enviarMensagem = (partidaId, mensagem) => {
  socket.emit('enviarMensagem', partidaId, mensagem);
};

// Função para escutar novas letras sorteadas
export const onNovaLetra = (callback) => {
  socket.on('novaLetra', callback);
};

// Função para escutar novas mensagens no chat
export const onNovaMensagem = (callback) => {
  socket.on('novaMensagem', callback);
};

// Função para desconectar o Socket.IO
export const desconectarSocket = () => {
  socket.disconnect();
};

export default socket;
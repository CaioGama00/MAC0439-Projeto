import React, { useState, useEffect } from 'react';
import { enviarMensagem, onNovaMensagem } from '../services/socket';
import './chat.css';

const Chat = ({ partidaId, mensagens }) => {
  const [novaMensagem, setNovaMensagem] = useState('');

  // Escuta novas mensagens
  useEffect(() => {
    const handleNovaMensagem = (mensagem) => {
      console.log('Nova mensagem recebida:', mensagem);
    };

    onNovaMensagem(handleNovaMensagem);

    return () => {
      onNovaMensagem(null); // Remove o listener ao desmontar o componente
    };
  }, []);

  const handleEnviarMensagem = () => {
    if (novaMensagem.trim()) {
      enviarMensagem(partidaId, novaMensagem); // Envia a mensagem via Socket.IO
      setNovaMensagem('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-mensagens">
        {mensagens.map((msg, index) => (
          <div key={index} className="mensagem">
            <strong>{msg.remetente}:</strong> {msg.texto}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleEnviarMensagem}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
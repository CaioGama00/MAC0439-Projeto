import React, { useState, useEffect } from 'react';
import './chat.css';

const Chat = ({ mensagens }) => {
  const [novaMensagem, setNovaMensagem] = useState('');

  // Simula o carregamento de mensagens iniciais
  useEffect(() => {
    console.log('Chat carregado. Conectando ao Socket.IO...');
    // Aqui você pode adicionar a lógica para se conectar ao Socket.IO
  }, []);

  const handleEnviarMensagem = () => {
    if (novaMensagem.trim()) {
      // Aqui você pode enviar a mensagem para o backend via Socket.IO
      console.log('Mensagem enviada:', novaMensagem);
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
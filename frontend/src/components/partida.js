import React, { useState, useEffect } from 'react';
import Chat from './chat';
import Resposta from './resposta';
import './partida.css';

const Partida = ({ partidaId }) => {
  const [letra, setLetra] = useState('');
  const [respostas, setRespostas] = useState([]);
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    // Simula o sorteio de uma letra (substitua por uma chamada ao backend)
    setLetra('A');

    // Simula o carregamento de mensagens iniciais (substitua por uma chamada ao backend)
    setMensagens([
      { id: 1, texto: 'Bem-vindo à partida!', remetente: 'Sistema' },
    ]);
  }, []);

  const handleEnviarResposta = (resposta) => {
    setRespostas([...respostas, resposta]);

    // Simula o envio de uma mensagem no chat
    setMensagens([...mensagens, { id: mensagens.length + 1, texto: resposta, remetente: 'Você' }]);
  };

  return (
    <div className="partida-container">
      <h1>Partida {partidaId}</h1>
      <h2>Letra: {letra}</h2>
      <Resposta letra={letra} onEnviarResposta={handleEnviarResposta} />
      <Chat mensagens={mensagens} />
    </div>
  );
};

export default Partida;
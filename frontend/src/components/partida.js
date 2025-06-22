import React, { useState, useEffect } from 'react';
import Chat from './chat';
import Resposta from './resposta';
import { enviarResposta } from '../services/api';
import { onNovaLetra } from '../services/socket';
import './partida.css';

const Partida = ({ partidaId, letra, mensagens, onNovaMensagem }) => {
  const [respostas, setRespostas] = useState([]);

  const handleEnviarResposta = async (resposta) => {
    try {
      await enviarResposta(partidaId, 1, 1, resposta); // Substitua pelos IDs corretos
      setRespostas([...respostas, resposta]);

      // Notifica o parent sobre a nova mensagem
      onNovaMensagem?.({ texto: resposta, remetente: 'Você' });
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
    }
  };

  return (
    <div className="partida-container">
      <h1>Partida {partidaId}</h1>
      <h2>Letra: {letra}</h2>
      <Resposta letra={letra} onEnviarResposta={handleEnviarResposta} />
      <Chat partidaId={partidaId} mensagens={mensagens} />
    </div>
  );
};

export default Partida;

import React, { useState, useEffect } from 'react';
import Chat from './chat';
import Resposta from './resposta';
import { enviarResposta } from '../services/api';
import { onNovaLetra } from '../services/socket';
import './partida.css';

const Partida = ({ partidaId }) => {
  const [letra, setLetra] = useState('');
  const [respostas, setRespostas] = useState([]);
  const [mensagens, setMensagens] = useState([]);

  // Escuta novas letras sorteadas
  useEffect(() => {
    const handleNovaLetra = (novaLetra) => {
      setLetra(novaLetra);
    };

    onNovaLetra(handleNovaLetra);

    return () => {
      onNovaLetra(null); // Remove o listener ao desmontar o componente
    };
  }, []);

  const handleEnviarResposta = async (resposta) => {
    try {
      await enviarResposta(partidaId, 1, 1, resposta); // Substitua pelos IDs corretos
      setRespostas([...respostas, resposta]);
      setMensagens([...mensagens, { id: mensagens.length + 1, texto: resposta, remetente: 'Você' }]);
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
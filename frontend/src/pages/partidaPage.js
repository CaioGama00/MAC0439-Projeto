import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { entrarPartida, onNovaLetra, onNovaMensagem } from '../services/socket';
import Partida from '../components/partida';
import './partidaPage.css';

const PartidaPage = () => {
  const { partidaId } = useParams();
  const [letra, setLetra] = useState('');
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    // Entra na partida ao carregar a página
    entrarPartida(partidaId);

    // Escuta novas letras sorteadas
    onNovaLetra((novaLetra) => {
      setLetra(novaLetra);
    });

    // Escuta novas mensagens no chat
    onNovaMensagem((mensagem) => {
      setMensagens((prev) => [...prev, mensagem]);
    });

    // Limpa os listeners ao desmontar o componente
    return () => {
      onNovaLetra(null);
      onNovaMensagem(null);
    };
  }, [partidaId]);

  return (
    <div className="partida-page-container">
      <h1>Partida {partidaId}</h1>
      <Partida partidaId={partidaId} letra={letra} mensagens={mensagens} />
    </div>
  );
};

export default PartidaPage;
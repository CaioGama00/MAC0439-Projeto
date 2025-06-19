// src/pages/HistoricoPartidasPage.js
import React, { useState, useEffect } from 'react';
import { buscarHistorico } from '../services/api';
//import { obterUsername, obterJogadorId } from '../utils/auth'; // Para filtrar por jogador logado
import './historicoPartidas.css'; // Crie este arquivo CSS

const HistoricoPartidasPage = () => {
  const [historico, setHistorico] = useState([]);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);
  // const [filtroJogadorId, setFiltroJogadorId] = useState(obterJogadorId()); // Exemplo para filtrar

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        setLoading(true);
        // Passar filtros se implementado no backend e frontend:
        // const response = await buscarHistorico(filtroJogadorId);
        const response = await buscarHistorico();
        if (response && response.success && Array.isArray(response.data)) {
          setHistorico(response.data);
        } else {
          setErro('Erro ao carregar histórico: formato de dados inesperado.');
        }
      } catch (error) {
        setErro('Erro ao carregar histórico de partidas.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, [/* filtroJogadorId */]); // Adicionar filtroJogadorId se for usar

  const formatarData = (dataISO) => {
    if (!dataISO) return 'N/A';
    return new Date(dataISO).toLocaleString('pt-BR');
  };

  if (loading) {
    return <div className="loading-historico">Carregando histórico...</div>;
  }

  if (erro) {
    return <p className="erro-historico">{erro}</p>;
  }

  return (
    <div className="historico-container">
      <h1>Histórico de Partidas</h1>
      {historico.length === 0 ? (
        <p>Nenhuma partida encontrada no histórico.</p>
      ) : (
        <ul className="historico-lista">
          {historico.map((partida) => (
            <li key={partida.id_partida || partida._id} className="historico-item">
              <h2>Partida: {partida.id_partida}</h2>
              <p><strong>Host:</strong> {partida.host?.username || 'N/A'}</p>
              <p><strong>Ganhador:</strong> {partida.ganhador?.username || 'Nenhum (ou empate)'}</p>
              <p><strong>Início:</strong> {formatarData(partida.data_hora_inicio)}</p>
              <p><strong>Fim:</strong> {formatarData(partida.data_hora_fim)}</p>
              <p><strong>Temas:</strong> {partida.temas?.map(t => t.nome).join(', ') || 'N/A'}</p>
              <p><strong>Letras Sorteadas:</strong> {partida.letras_sorteadas?.join(', ') || 'N/A'}</p>
              
              <h3>Jogadores na Partida:</h3>
              <ul className="jogadores-partida-lista">
                {partida.jogadores?.map((jogador, index) => (
                  <li key={jogador.id_jogador || index} className="jogador-partida-item">
                    <strong>{jogador.username}</strong> - Pontuação: {jogador.pontuacao_total}
                    {/* Você pode adicionar um botão/link aqui para expandir e ver as respostas detalhadas */}
                    {/* Exemplo de como mostrar algumas respostas:
                    {jogador.respostas?.slice(0, 1).map(rod => ( // Mostra a primeira rodada como exemplo
                      <div key={rod.numero_rodada}>
                        <p>Rodada {rod.numero_rodada} (Letra: {rod.letra})</p>
                        {rod.respostas_por_tema?.map(rpt => (
                          <p key={rpt.tema}>{rpt.tema}: {rpt.resposta} ({rpt.valida ? 'Válida' : 'Inválida'})</p>
                        ))}
                      </div>
                    ))}
                    */}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoricoPartidasPage;
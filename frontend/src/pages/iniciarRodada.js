import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { entrarPartida, onNovaLetra } from '../services/socket';
import { obterJogadorId } from '../utils/auth';

const IniciarRodadaPage = () => {
  const { partidaId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [letra, setLetra] = useState(null);
  const idJogador = obterJogadorId()

  useEffect(() => {
    onNovaLetra((novaLetra) => {
      console.log("Letra recebida via socket:", novaLetra);
      setLetra(novaLetra);
    });

    return () => {
      onNovaLetra(null);
    };
  }, []);


    const iniciarRodadaOuEntrar = async (partidaId, navigate) => {
        try {
          const res = await axios.get(`http://localhost:8000/api/partida/${partidaId}/verificar-rodada`);
          const response = await axios.post(`http://localhost:8000/api/partida/${partidaId}/entrar`, {
            idJogador
          });

          console.log('Resposta da rodada:', res.data);

          if (res.data.rodadaIniciada && res.data.dadosRodada.estado === 'em_andamento') {
            const rodadaId = res.data.dadosRodada.numero_rodada;
            const letra = res.data.dadosRodada.letra_sorteada;

            await entrarOuRedirecionar(partidaId, idJogador);
            navigate(`/partida/${partidaId}`, {
              state: { rodadaId, letra }
            });

          } else {
            console.log('Nenhuma rodada em andamento ou rodada finalizada. Iniciando nova rodada...');
            
            await axios.post(`http://localhost:8000/api/partida/${partidaId}/iniciar-rodada`);

            const novaRodadaRes = await axios.get(`http://localhost:8000/api/partida/${partidaId}/verificar-rodada`);
            const rodadaId = novaRodadaRes.data.dadosRodada.numero_rodada;
            const letra = novaRodadaRes.data.dadosRodada.letra_sorteada;

            await entrarOuRedirecionar(partidaId, idJogador);
            navigate(`/partida/${partidaId}`, {
              state: { rodadaId, letra }
            });
          }
        } catch (err) {
          console.error('Erro ao verificar ou iniciar rodada:', err);
        }
    };

    const entrarOuRedirecionar = async (partidaId, idJogador) => { 
        try {
            const response = await axios.post(`http://localhost:8000/api/partida/${partidaId}/entrar`, {
                idJogador
            });
            console.log(response)
            if (response.data.success) {
                return true
            } else {
                alert('Erro ao entrar na partida');
            }
        } catch (err) {
            console.error('Erro ao entrar ou verificar jogador:', err);
        }
    };

  useEffect(() => {
    if (letra) {
      navigate(`/partida/${partidaId}`, { state: { letra } });
    }
  }, [letra]);

  return (
    <div style={{ textAlign: "center", marginTop: "15vh" }}>
      <h1>🎯 Adedonha Online</h1>
      {loading ? (
        <p>Carregando rodada...</p>
      ) : (
        <button onClick={() => iniciarRodadaOuEntrar(partidaId, navigate)} style={{ padding: 12, fontSize: 18, width: "200px" }}>
          🚀 Iniciar rodada
        </button>
      )}
    </div>
  );
};

export default IniciarRodadaPage;

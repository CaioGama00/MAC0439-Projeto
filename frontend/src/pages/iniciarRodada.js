import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { entrarPartida, onNovaLetra } from '../services/socket';

const IniciarRodadaPage = () => {
  const { partidaId } = useParams(); // recebe da URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [letra, setLetra] = useState(null);

  useEffect(() => {
    // escuta a letra sorteada do socket
    onNovaLetra((novaLetra) => {
      console.log("Letra recebida via socket:", novaLetra);
      setLetra(novaLetra);
    });

    return () => {
      // limpa listener se sair da página
      onNovaLetra(null);
    };
  }, []);


    const iniciarRodadaOuEntrar = async (partidaId, navigate) => {
        let idJogador = 1
        try {
            const res = await axios.get(`http://localhost:8000/api/partida/${partidaId}/verificar-rodada`);
            const response = await axios.post(`http://localhost:8000/api/partida/${partidaId}/entrar`, {
                idJogador
            });

            console.log(response)

            if (res.data.rodadaIniciada) {
                console.log('Rodada já iniciada, redirecionando...');
                console.log(res.data.dadosRodada.letra_sorteada)
                setLetra(res.data.dadosRodada.letra_sorteada)
                entrarOuRedirecionar(partidaId, 1)
                navigate(`/partida/${partidaId}`);
            } else {
                console.log('Iniciando nova rodada...');
                await axios.post(`http://localhost:8000/api/partida/${partidaId}/iniciar-rodada`);
                entrarOuRedirecionar(partidaId, 1)
                navigate(`/partida/${partidaId}`);
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

  // quando a letra estiver pronta, redireciona
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
        <button onClick={() => iniciarRodadaOuEntrar(partidaId, navigate)} style={{ padding: 12, fontSize: 18, weight: "200px" }}>
          🚀 Iniciar rodada
        </button>
      )}
    </div>
  );
};

export default IniciarRodadaPage;

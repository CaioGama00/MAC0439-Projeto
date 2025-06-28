import React, { useEffect, useState } from 'react';

const PlayerList = ({ players }) => (
  <div style={{ width: 180, backgroundColor: '#3e3e8c', padding: 10, borderRadius: 8, color: 'white', overflowY: 'auto', maxHeight: '90vh' }}>
    {players.map((player, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', backgroundColor: player.isCurrent ? '#4FC3F7' : '#FF9800',
          display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginRight: 10
        }}>
          <span role="img" aria-label="avatar">👤</span>
        </div>
        <div>
          <div style={{ fontWeight: 'bold' }}>{player.username}</div>
          <div style={{ fontSize: 12 }}>{player.points} pts</div>
        </div>
      </div>
    ))}
  </div>
);

const JogadoresDaPartida = ({ idPartida }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch(`http://localhost:8000/api/partida/${idPartida}/jogadores`);
        const data = await res.json();
        if (data.success) {
          const formattedPlayers = data.data.map((p, idx) => ({
            username: p.username,
            points: 0,           
            isCurrent: idx === 0 
          }));
          setPlayers(formattedPlayers);
        } else {
          setError(data.message || 'Erro ao carregar jogadores');
        }
      } catch (e) {
        setError('Erro de rede');
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, [idPartida]);

  if (loading) return <p>Carregando jogadores...</p>;
  if (error) return <p>{error}</p>;

  return <PlayerList players={players} />;
};

export default JogadoresDaPartida;

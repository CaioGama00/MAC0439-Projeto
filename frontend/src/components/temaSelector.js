// src/components/TemaSelector.js
import React, { useState } from 'react';
import './temaSelector.css';

const TemaSelector = ({ onSelecionarTemas }) => {
  const [temasSelecionados, setTemasSelecionados] = useState([]);

  const temasDisponiveis = [
    { id: 1, nome: 'Times de Futebol' },
    { id: 2, nome: 'Bandas' },
    { id: 3, nome: 'Países' },
    { id: 4, nome: 'Filmes' },
  ];

  const handleSelecionarTema = (tema) => {
    if (temasSelecionados.includes(tema)) {
      setTemasSelecionados(temasSelecionados.filter((t) => t !== tema));
    } else {
      setTemasSelecionados([...temasSelecionados, tema]);
    }
  };

  const handleConfirmar = () => {
    onSelecionarTemas(temasSelecionados);
  };

  return (
    <div className="tema-selector-container">
      <h2>Escolha os temas para a partida:</h2>
      <div className="temas-lista">
        {temasDisponiveis.map((tema) => (
          <div
            key={tema.id}
            className={`tema-item ${temasSelecionados.includes(tema) ? 'selecionado' : ''}`}
            onClick={() => handleSelecionarTema(tema)}
          >
            {tema.nome}
          </div>
        ))}
      </div>
      <button onClick={handleConfirmar}>Confirmar</button>
    </div>
  );
};

export default TemaSelector;
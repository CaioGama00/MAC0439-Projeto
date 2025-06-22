import React, { useState, useEffect } from 'react';
import { buscarTemas } from '../services/api';
import './temaSelector.css';

const TemaSelector = ({ onSelecionarTemas }) => {
  const [temasDisponiveis, setTemasDisponiveis] = useState([]);
  const [temasSelecionados, setTemasSelecionados] = useState([]);

  useEffect(() => {
    const carregarTemas = async () => {
      try {
        const temas = await buscarTemas();
        setTemasDisponiveis(temas);
      } catch (error) {
        console.error('Erro ao buscar temas:', error);
      }
    };

    carregarTemas();
  }, []);

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

  const toggleTheme = (themeId) => {
    setTemasSelecionados((prev) => (prev.includes(themeId) ? prev.filter((id) => id !== themeId) : [...prev, themeId]))
  }

  return (
    <div >
      <div className="form-group">
        <h3>Escolha os temas para a partida:</h3>
        <div className="themes-grid">
          {temasDisponiveis.map((theme) => (
            <button
              key={theme.id_tema}
              className={`theme-button ${
                temasSelecionados.includes(theme.id_tema) ? "theme-button-selected" : ""
              }`}
              onClick={() => toggleTheme(theme.id_tema)}
            >
              {theme.nome}
            </button>
          ))}
        </div>
        <p className="themes-counter">{temasSelecionados.length} tema(s) selecionado(s)</p>
      </div>
      <button className="confirm-button" onClick={handleConfirmar}>Confirmar</button>
    </div>
  );
};

export default TemaSelector;

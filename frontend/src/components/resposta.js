// src/components/Resposta.js
import React, { useState } from 'react';
import './resposta.css';

const Resposta = ({ letra, onEnviarResposta }) => {
  const [resposta, setResposta] = useState('');

  const handleEnviar = () => {
    if (resposta.trim()) {
      onEnviarResposta(resposta);
      setResposta('');
    }
  };

  return (
    <div className="resposta-container">
      <h3>Digite sua resposta para a letra {letra}:</h3>
      <input
        type="text"
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        placeholder="Sua resposta..."
      />
      <button onClick={handleEnviar}>Enviar</button>
    </div>
  );
};

export default Resposta;
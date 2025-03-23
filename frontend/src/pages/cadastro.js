// src/pages/Cadastro.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { salvarToken } from '../utils/auth';
import { cadastrar } from '../services/api'; // Supondo que você tenha uma função de cadastro na API
import './cadastro.css'; // Arquivo CSS para estilização

const Cadastro = () => {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async () => {
    if (username && senha && email) {
      try {
        const response = await cadastrar(username, senha, email);
        salvarToken(response.token); // Salva o token no localStorage
        navigate('/lobby'); // Redireciona para o lobby após o cadastro
      } catch (error) {
        setErro('Erro ao cadastrar. Tente novamente.');
      }
    } else {
      setErro('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro</h1>
      {erro && <p className="erro">{erro}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleCadastro}>Cadastrar</button>
      <p>
        Já tem uma conta? <Link to="/">Faça login</Link>
      </p>
    </div>
  );
};

export default Cadastro;
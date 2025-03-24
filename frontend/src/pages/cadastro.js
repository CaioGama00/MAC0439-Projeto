import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { salvarToken } from '../utils/auth';
import { cadastrar } from '../services/api';
import './cadastro.css';

const Cadastro = () => {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false); // Estado para controlar a visibilidade da senha
  const navigate = useNavigate();

  const handleCadastro = async () => {
    if (username && senha && email) {
      try {
        const response = await cadastrar(username, senha, email);
        salvarToken(response.token); // Salva o token no localStorage
        navigate('/lobby');
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
      <div className="senha-container">
        <input
          type={mostrarSenha ? "text" : "password"} // Alterna entre "text" e "password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <div className="mostrar-senha-checkbox">
          <input
            type="checkbox"
            id="mostrarSenha"
            checked={mostrarSenha}
            onChange={() => setMostrarSenha(!mostrarSenha)}
          />
          <label htmlFor="mostrarSenha">Mostrar senha</label>
        </div>
      </div>
      <button onClick={handleCadastro}>Cadastrar</button>
      <p>
        Já tem uma conta? <Link to="/">Faça login</Link>
      </p>
    </div>
  );
};

export default Cadastro;
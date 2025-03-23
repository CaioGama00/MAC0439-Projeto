// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importe o Link
import { salvarToken } from '../utils/auth';
import { login } from '../services/api';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && senha) {
      try {
        const response = await login(username, senha);
        salvarToken(response.token); // Salva o token no localStorage
        navigate('/lobby');
      } catch (error) {
        setErro('Erro ao fazer login. Verifique suas credenciais.');
      }
    } else {
      setErro('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {erro && <p className="erro">{erro}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
      <p>
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link> {/* Use o Link aqui */}
      </p>
    </div>
  );
};

export default Login;
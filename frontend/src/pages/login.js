import React, { useState } from 'react';
import { salvarDadosAutenticacao } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false); // Estado para controlar a visibilidade da senha
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && senha) {
      try {
        const response = await login(username, senha);
        
        // Salva ambos token e ID
        salvarDadosAutenticacao(response.token, response.id_jogador);
        navigate('/lobby');
      } catch (error) {
        setErro(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
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
      <button onClick={handleLogin}>Entrar</button>
      <p>
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;
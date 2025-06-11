import React, { useState } from 'react';
import { salvarDadosAutenticacao } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    senha: ''
  });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    
    if (!formData.username || !formData.senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setCarregando(true);
      const response = await login(formData.username, formData.senha);
      
      // Salva token, ID e tipo de usuário
      salvarDadosAutenticacao(response.token, response.id_jogador, response.tipo);
      navigate('/lobby');
    } catch (error) {
      console.error('Erro no login:', error);
      
      // Tratamento de erros específicos
      if (error.response) {
        if (error.response.status === 401) {
          setErro('Credenciais inválidas');
        } else {
          setErro(error.response.data?.message || 'Erro ao fazer login');
        }
      } else {
        setErro(error.message || 'Erro ao conectar com o servidor');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {erro && <p className="erro">{erro}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Digite seu username"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type={mostrarSenha ? "text" : "password"}
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            placeholder="Digite sua senha"
          />
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="mostrarSenha"
            checked={mostrarSenha}
            onChange={() => setMostrarSenha(!mostrarSenha)}
          />
          <label htmlFor="mostrarSenha">Mostrar senha</label>
        </div>
        
        <button type="submit" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      
      <p className="cadastro-link">
        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;
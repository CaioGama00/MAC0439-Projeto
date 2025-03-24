// src/pages/Cadastro.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { salvarDadosAutenticacao } from '../utils/auth';
import { cadastrar } from '../services/api';
import './cadastro.css'; // Estilos específicos para cadastro

const Cadastro = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    senha: '',
    confirmarSenha: ''
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
    
    // Validações básicas
    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    if (formData.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setCarregando(true);
      
      // Chamada para a API de cadastro
      const response = await cadastrar(
        formData.username,
        formData.senha,
        formData.email
      );

      // Verifica se a resposta contém os dados esperados
      if (!response.token || !response.id_jogador) {
        throw new Error('Dados de registro incompletos');
      }

      // Salva os dados de autenticação
      salvarDadosAutenticacao(response.token, response.id_jogador);
      
      // Redireciona para o lobby após cadastro bem-sucedido
      navigate('/lobby');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      
      // Tratamento de erros específicos
      if (error.response) {
        if (error.response.status === 409) {
          setErro('Username ou email já estão em uso');
        } else {
          setErro(error.response.data?.message || 'Erro ao cadastrar');
        }
      } else {
        setErro(error.message || 'Erro ao conectar com o servidor');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Criar Conta</h1>
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
            minLength="3"
            maxLength="20"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type={mostrarSenha ? "text" : "password"}
            id="confirmarSenha"
            name="confirmarSenha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="mostrarSenha"
            checked={mostrarSenha}
            onChange={() => setMostrarSenha(!mostrarSenha)}
          />
          <label htmlFor="mostrarSenha">Mostrar senhas</label>
        </div>
        
        <button type="submit" disabled={carregando}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      
      <p className="login-link">
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
};

export default Cadastro;
// src/pages/AdminDBPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { obterToken, obterTipoUsuario, estaAutenticado, removerDadosAutenticacao } from '../utils/auth';
import './AdminDBPage.css'; 

const API_BASE_URL = 'http://localhost:8000/api';

// Wrapper simples para chamadas de API
const api = {
  request: async (url, method = 'GET', body = null) => {
    const token = obterToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
    };

    if (body) {
      headers['Content-Type'] = 'application/json';
    }

    console.log('Fetching:', `/api${url}`);

    const response = await fetch(`${API_BASE_URL}${url}`, { // Ajuste a URL base se necessário (ex: process.env.REACT_APP_API_URL)
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        removerDadosAutenticacao(); // Deslogar se não autorizado/autenticado
        throw new Error(`Acesso negado ou não autenticado: ${response.status}`);
      }
      const errorData = await response.json().catch(() => ({ message: `Erro ${response.status}` }));
      throw new Error(errorData.message || `Erro ${response.status}`);
    }
    return response.json();
  },
  get: (url) => api.request(url, 'GET'),
  post: (url, data) => api.request(url, 'POST', data),
};

const AdminDBPage = () => {
  const navigate = useNavigate();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState('SELECT * FROM jogador LIMIT 10;');
  const [queryResult, setQueryResult] = useState(null);
  const [error, setError] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [loadingQuery, setLoadingQuery] = useState(false);

  const fetchTables = useCallback(async () => {
    try {
      setError(''); setLoadingData(true);
      const fetchedTables = await api.get('/admin/db/tables');
      setTables(fetchedTables);
    } catch (err) {
      console.error('Erro ao buscar tabelas:', err);
      setError(err.message);
      // Se o erro for de acesso negado e o usuário não for admin, ele já foi redirecionado ou teve o erro exibido.
      // Se o token expirou ou é inválido durante esta chamada específica, o erro será tratado.
      if (err.message.includes('Acesso negado ou não autenticado')) navigate('/');
    } finally { setLoadingData(false); }
  }, [navigate]); // Adicionamos navigate como dependência, embora seja estável.

  useEffect(() => {
    if (!estaAutenticado()) {
      navigate('/');
      return;
    }
    const tipoUsuario = obterTipoUsuario();
    if (tipoUsuario !== 'Admin') {
      setError('Acesso negado. Esta página é apenas para administradores.');
      setIsUserAdmin(false);
    } else {
      setIsUserAdmin(true);
      fetchTables();
    }
    setLoading(false);
  }, [navigate, fetchTables]); // Removemos obterTipoUsuario e estaAutenticado

  const fetchTableData = async (tableName) => {
    if (!tableName) return;
    try {
      setError(''); setLoadingData(true); setTableData([]);
      const data = await api.get(`/admin/db/tables/${tableName}`);
      setTableData(data);
    } catch (err) {
      console.error(`Erro ao buscar dados da tabela ${tableName}:`, err);
      setError(err.message);
      if (err.message.includes('Acesso negado')) navigate('/lobby');
    } finally { setLoadingData(false); }
  };

  const handleTableChange = (e) => {
    const tableName = e.target.value;
    setSelectedTable(tableName);
    if (tableName) fetchTableData(tableName);
    else setTableData([]);
  };

  const handleExecuteQuery = async () => {
    if (!query.trim()) { setError('A query não pode estar vazia.'); return; }
    try {
      setError(''); setLoadingQuery(true); setQueryResult(null);
      const result = await api.post('/admin/db/query', { query });
      setQueryResult(result);
    } catch (err) {
      console.error('Erro ao executar query:', err);
      setError(err.message); setQueryResult({ error: err.message });
      if (err.message.includes('Acesso negado')) navigate('/lobby');
    } finally { setLoadingQuery(false); }
  };

  if (loading) return <div className="admin-db-container">Carregando...</div>;
  if (!isUserAdmin) return (
    <div className="admin-db-container">
      <h1>Acesso ao Banco de Dados</h1>
      <p className="error-message">{error || 'Você não tem permissão para acessar esta página.'}</p>
      <button onClick={() => navigate('/lobby')}>Voltar ao Lobby</button>
    </div>
  );

  return (
    <div className="admin-db-container">
      <h1>Administração do Banco de Dados</h1>
      {error && <p className="error-message">{error}</p>}

      <section className="table-explorer">
        <h2>Explorar Tabelas</h2>
        <select onChange={handleTableChange} value={selectedTable} disabled={loadingData}>
          <option value="">Selecione uma tabela</option>
          {tables.map((table) => (<option key={table} value={table}>{table}</option>))}
        </select>
        {loadingData && <p>Carregando dados...</p>}
        {tableData.length > 0 && (
          <div className="table-data-viewer">
            <h3>Dados de: {selectedTable} ({tableData.length} linhas)</h3>
            <table>
              <thead><tr>{Object.keys(tableData[0]).map((key) => (<th key={key}>{key}</th>))}</tr></thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>{Object.values(row).map((value, i) => (<td key={i}>{typeof value === 'boolean' ? String(value) : value}</td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="query-executor">
        <h2>Executar Query SQL</h2>
        <p className="warning"><strong>Atenção:</strong> Use com extremo cuidado. Queries malformadas ou destrutivas (UPDATE, DELETE sem WHERE, DROP) podem causar perda de dados.</p>
        <textarea value={query} onChange={(e) => setQuery(e.target.value)} rows="5" placeholder="Digite sua query SQL. Ex: SELECT * FROM Jogador;" />
        <button onClick={handleExecuteQuery} disabled={loadingQuery}>{loadingQuery ? 'Executando...' : 'Executar Query'}</button>
        {loadingQuery && <p>Executando...</p>}
        {queryResult && (
          <div className="query-result-viewer"><h3>Resultado da Query:</h3><pre>{JSON.stringify(queryResult, null, 2)}</pre></div>
        )}
      </section>
    </div>
  );
};

export default AdminDBPage;
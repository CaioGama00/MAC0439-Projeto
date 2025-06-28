import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  entrarPartida,
  onNovaLetra,
  onNovaMensagem,
  enviarMensagem,
  emitirJogadorStop
} from '../services/socket';
import JogadoresNaPartida from '../components/jogadoresNaPartida';
import TimerBar from '../components/timerbar';
import { enviarResposta } from '../services/api';
import './partidaPage.css';
import axios from 'axios';
import { obterJogadorId } from '../utils/auth';

// ======================== COMPONENTES AUXILIARES ========================

const LetterAndRounds = ({ round, totalRounds, letter }) => (
  <div style={{ textAlign: 'center', color: '#374254', marginBottom: 20 }}>
    <h2 style={{ margin: 0 }}>RODADA {round}/{totalRounds}</h2>
    <div style={{
      fontSize: 48, backgroundColor: '#05cea2', width: 72, height: 72,
      borderRadius: 12, display: 'inline-flex', justifyContent: 'center',
      alignItems: 'center', fontWeight: 'bold', userSelect: 'none',
    }}>{letter}</div>
  </div>
);

const FieldsForm = ({ fields, onChange, onStop, fieldsData }) => (
  <form style={{
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12, marginBottom: 1, padding: 5
  }}>
    {fields.map(({ name, label }, i) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ fontSize: 14, color: '#374254', marginBottom: 4 }}>{label}</label>
        <input
          type="text"
          name={name}
          value={fieldsData[name] || ''}
          style={{ padding: 6, borderRadius: 4, border: 'none', fontSize: 16 }}
          onChange={onChange}
        />
      </div>
    ))}
    <button type="button" onClick={onStop} style={{
      gridColumn: 'span 3',
      backgroundColor: '#ffcc4d',
      border: 'none',
      padding: 12,
      borderRadius: 8,
      fontWeight: 'bold',
      fontSize: 18,
      cursor: 'pointer'
    }}>
      STOP!
    </button>
  </form>
);

const Chat = ({ messages, onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div style={{
      backgroundColor: '#3e3e8c',
      borderRadius: 8,
      color: 'white',
      padding: 10,
      width: 300,
      display: 'flex',
      flexDirection: 'column',
      height: '85vh',
      justifyContent: 'space-between'
    }}>
      <div style={{ overflowY: 'auto', flexGrow: 1, marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <b>{msg.user}: </b> {msg.text}
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', padding: 4,
        justifyContent: 'center', height: 40
      }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{
            flexGrow: 1,
            height: '100%',
            padding: '0 12px',
            borderRadius: 4,
            border: 'none',
            marginRight: 6,
            fontSize: 14
          }}
          placeholder="Converse aqui..."
        />
        <input
          type="submit"
          value="➤"
          onClick={handleSend}
          style={{
            height: '100%',
            width: 36,
            borderRadius: 4,
            cursor: 'pointer',
            background: '#4FC3F7',
            border: 'none',
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold'
          }}
        />
      </div>
    </div>
  );
};

// ======================== COMPONENTE PRINCIPAL ========================

const PartidaPage = () => {
  const { partidaId } = useParams();
  const idJogador = obterJogadorId();
  const location = useLocation();
  const navigate = useNavigate();
  const letraRecebida = location.state?.letra || '';
  const rodadaId = location.state?.rodadaId || 1;
  console.log(rodadaId)

  const [letra, setLetra] = useState(letraRecebida);
  const [fieldsData, setFieldsData] = useState({});
  const [timerPercent, setTimerPercent] = useState(60);
  const [messages, setMessages] = useState([]);
  const [round, setRound] = useState(1);
  const [fields, setFields] = useState([]);

  console.log("letra: ", letra)

  useEffect(() => {
    entrarPartida(partidaId);

    const handleNovaLetra = novaLetra => setLetra(novaLetra);
    onNovaLetra(handleNovaLetra);

    return () => onNovaLetra(null);
  }, [partidaId]);

  useEffect(() => {
    const carregarTemas = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/partida/${partidaId}`);
        const temas = res.data.data.temas || [];

        const campos = temas.map((tema, idx) => ({
          name: `tema_${idx}`,
          label: tema.nome,
          id: tema.id_tema || tema.id
        }));
        setFields(campos);
      } catch (err) {
        console.error("Erro ao carregar temas:", err);
      }
    };

    carregarTemas();
  }, [partidaId]);

  useEffect(() => {
    const receberMensagem = msg => setMessages(msgs => [...msgs, msg]);
    onNovaMensagem(receberMensagem);

    return () => onNovaMensagem(null);
  }, []);

  const handleFieldChange = (e) => {
    setFieldsData({ ...fieldsData, [e.target.name]: e.target.value });
  };

  const handleStopClick = async () => {
    const respostas = fields.map(field => ({
      idTema: field.id,
      resposta: fieldsData[field.name] || ''
    }));

    try {
      for (const r of respostas) {
        await enviarResposta(partidaId, rodadaId, idJogador, r.idTema, r.resposta);
      }

      emitirJogadorStop(partidaId, idJogador, respostas);
      alert('Você apertou STOP!');
      navigate(`/partida/iniciar/${partidaId}`);
    } catch (err) {
      console.error('Erro ao enviar respostas:', err);
    }
  };

  const handleSend = (text) => {
    const novaMsg = { user: 'Você', text };
    setMessages(msgs => [...msgs, novaMsg]);
    enviarMensagem(partidaId, novaMsg);
  };

  return (
    <div style={{
      display: 'flex',
      gap: 16,
      backgroundColor: '#ececec',
      padding: 20,
      maxWidth: '100vw',
      margin: '0 auto',
      color: '#374254',
      fontFamily: 'Arial, sans-serif'
    }}>
      <JogadoresNaPartida idPartida={parseInt(partidaId)} />

      <div style={{ flexGrow: 1, height: '85vh', marginBottom: 1 }}>
        <TimerBar percent={timerPercent} />
        <LetterAndRounds round={rodadaId} totalRounds={8} letter={letra} />
        <h3 style={{ textAlign: 'center', marginBottom: 5 }}>PREENCHA OS CAMPOS</h3>
        <FieldsForm
          fields={fields}
          onChange={handleFieldChange}
          onStop={handleStopClick}
          fieldsData={fieldsData}
        />
      </div>

      <Chat messages={messages} onSend={handleSend} />
    </div>
  );
};

export default PartidaPage;

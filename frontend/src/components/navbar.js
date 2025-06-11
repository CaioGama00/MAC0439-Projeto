// frontend/src/components/Navbar.js (Exemplo)
import { Link, useNavigate } from 'react-router-dom';
import { estaAutenticado, obterTipoUsuario, removerDadosAutenticacao } from '../utils/auth';

const Navbar = () => {
  const autenticado = estaAutenticado();
  const tipoUsuario = obterTipoUsuario();
  const navigate = useNavigate();

  const handleLogout = () => {
    removerDadosAutenticacao();
    navigate('/'); // Redireciona para a página de login
    // Poderia também forçar um reload ou atualizar o estado global para refletir o logout
  };

  return (
    <nav style={{ background: '#333', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/lobby" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Lobby</Link>
        {autenticado && (
          <Link to="/perfil" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Perfil</Link>
        )}
        {/* Link condicional para a página de Admin */}
        {autenticado && tipoUsuario === 'Admin' && (
          <Link to="/admin/db" style={{ color: 'white', marginRight: '15px', textDecoration: 'none', fontWeight: 'bold' }}>
            Admin DB
          </Link>
        )}
      </div>
      <div>
        {autenticado ? (
          <button onClick={handleLogout} style={{ padding: '8px 12px', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

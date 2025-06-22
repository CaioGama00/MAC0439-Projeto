// src/components/Header.js
import { Link } from 'react-router-dom';
import './header.css'; // você pode criar esse CSS separado ou usar inline

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <Link to="/"><h1 className="logo-text">Adedonha Online</h1></Link>
        </div>
        <nav className="nav">
          <Link to="/lobby">
            <div className="nav-button">
                <span className="nav-icon">👤</span>
                Lobby
            </div>
          </Link>
          <Link to="/perfil">
            <div className="nav-button">
              <span className="nav-icon">👤</span>
              Perfil
            </div>
          </Link>
          <Link to="/">
            <div className="nav-button nav-button-outline">
              <span className="nav-icon">🚪</span>
              Login
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

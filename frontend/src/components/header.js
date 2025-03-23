// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Adedonha Online</Link>
      </div>
      <nav className="nav">
        <Link to="/lobby">Lobby</Link>
        <Link to="/perfil">Perfil</Link>
      </nav>
    </header>
  );
};

export default Header;
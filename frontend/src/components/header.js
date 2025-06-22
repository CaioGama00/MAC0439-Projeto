// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/lobby">Adedonha Online</Link>
      </div>

    </header>
  );
};

export default Header;
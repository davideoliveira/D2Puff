import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/home">D2Puff</Link>
        </div>
        <nav className={`header-nav ${showMenu ? "show" : ""}`}>
          <ul>
            <li>
              <Link to="/financeiro">Financeiro</Link>
            </li>
            <li>
              <Link to="/vendas">Vendas</Link>
            </li>
            
            <li>
              <Link to="/estoque">Estoque</Link>
            </li>
          </ul>
        </nav>
        <div className="header-right">
          <div className="header-user">
            <span>Usuário</span>
          </div>
          <button className="header-menu" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

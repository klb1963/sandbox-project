import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="hamburger-nav">
      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <ul className={`menu ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>📋 Список компаний</Link></li>
        <li><Link to="/add" onClick={() => setIsOpen(false)}>➕ Добавить компанию</Link></li>
      </ul>
    </nav>
  );
}
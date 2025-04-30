import { Link } from 'react-router-dom';
import './Navigation.css'; // убедись, что файл называется именно так

export default function Navigation() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">📋 Список компаний</Link></li>
        <li><Link to="/add">➕ Добавить компанию</Link></li>
      </ul>
    </nav>
  );
}
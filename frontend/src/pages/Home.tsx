import { useNavigate } from 'react-router-dom';
import CompanyList from '../components/CompanyList';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="main-title">Companies</h1>
      <button className="add-button" onClick={() => navigate('/add')}>
        ➕ Add Company
      </button>
      <CompanyList />
    </div>
  );
}
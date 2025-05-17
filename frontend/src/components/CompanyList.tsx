import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CompanyList.css";
import { Company } from '../types/Company';
import { Link } from 'react-router-dom';

// Тип, представляющий допустимые ключи объекта Company, которые можно использовать для сортировки
type SortKey = keyof Company;

const API_URL = import.meta.env.VITE_API_URL;

console.log('🌐 VITE_API_URL:', API_URL);
console.log('🧪 API_URL in CompanyList:', import.meta.env.VITE_API_URL);

const CompanyList: React.FC = () => {
  // Состояние для списка компаний
  const [companies, setCompanies] = useState<Company[]>([]);

  // Состояние для текущего ключа сортировки (по умолчанию — 'name')
  const [sortKey, setSortKey] = useState<SortKey>('name');

  // Состояние для направления сортировки: true = по возрастанию, false = по убыванию
  const [sortAsc, setSortAsc] = useState(true);

  // Состояние для хранения компании, которую пользователь хочет удалить
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  // Загрузка компаний с сервера при монтировании компонента
  useEffect(() => {
    axios
    .get(`${API_URL}/companies/`) // ✅ слеш в конце
      .then(response => {
        const valid = response.data.filter(
          (c: Company) => c.id !== undefined && c.name?.trim() !== ''
        );
        setCompanies(valid);
      })
      .catch(error => console.error('Ошибка при загрузке компаний:', error));
  }, []);

  // Обработка сортировки по выбранному ключу
  const handleSort = (key: keyof Company) => {
    setSortKey(key);
    setSortAsc(prev => (key === sortKey ? !prev : true)); // инвертировать порядок, если уже отсортировано по этому ключу
  };

  // Получение отсортированного списка компаний
  const sortedCompanies = [...companies].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
    return 0;
  });

  // Устанавливаем компанию для удаления (это откроет модальное окно)
  const handleDelete = (company: Company) => {
    setCompanyToDelete(company);
  };

  // Подтверждение удаления — отправка DELETE-запроса
  const confirmDeleteCompany = async () => {
    if (!companyToDelete) return;

    try {
      await axios.delete(`${API_URL}/companies/${companyToDelete.id}`); // ✅ слеш в конце не нужен
      setCompanies(prev => prev.filter(c => c.id !== companyToDelete.id)); // удаляем из списка
      setCompanyToDelete(null); // закрываем модалку
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      alert('Произошла ошибка при удалении компании.');
    }
  };

  return (
    <div className="company-list-wrapper">
      <h2>Список компаний</h2>
  
      <table className="company-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('city')}>City</th>
            <th>Website</th>
            {/* <th>Email</th>
            <th>LinkedIn</th>
            <th>Latitude</th>
            <th>Longitude</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCompanies.map(company => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.city}</td>
              <td>{company.website}</td>
              {/* <td>{company.email}</td>
              <td>{company.linkedin}</td>
              <td>{company.latitude}</td>
              <td>{company.longitude}</td> */}
              <td>
                <Link to={`/edit/${company.id}`} className="action-edit">Edit ✏️</Link>
                <span> | </span>
                <button className="action-delete" onClick={() => handleDelete(company)}>Delete 🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      {companyToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Вы уверены, что хотите удалить <strong>{companyToDelete.name}</strong>?</p>
            <div className="modal-buttons">
              <button className="confirm" onClick={confirmDeleteCompany}>Удалить</button>
              <button className="cancel" onClick={() => setCompanyToDelete(null)}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
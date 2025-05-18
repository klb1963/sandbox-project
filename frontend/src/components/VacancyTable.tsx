// src/components/VacancyTable.tsx
import React from 'react';
import './VacancyList.css';

interface Vacancy {
  id: number;
  title: string;
  location: string;
  published_at?: string;
  remote: boolean;
  link: string;
  company_id: number;
}

interface Props {
  vacancies: Vacancy[];
}

const VacancyTable: React.FC<Props> = ({ vacancies }) => {
  return (
    <div className="container">
      <h2>Список вакансий</h2>
      <div className="table-wrapper">
        <table className="company-table">
          <thead>
            <tr>
              <th>Вакансия</th>
              <th>Локация</th>
              <th>Remote</th>
              <th>Дата</th>
              <th>Компания</th>
              <th>Ссылка</th>
            </tr>
          </thead>
          <tbody>
            {vacancies.map((v) => (
              <tr key={v.id}>
                <td>{v.title}</td>
                <td>{v.location}</td>
                <td>{v.remote ? '✅' : '❌'}</td>
                <td>{v.published_at}</td>
                <td>id: {v.company_id}</td>
                <td>
                  <a href={v.link} target="_blank" rel="noopener noreferrer">🔗</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VacancyTable;
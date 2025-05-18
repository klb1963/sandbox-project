// ✅ src/pages/VacancyList.tsx

// src/pages/VacancyList.tsx
import { useEffect, useState } from 'react';
import { getVacancies } from '../api';
import VacancyTable from '../components/VacancyTable';
import '../components/VacancyList.css';

export default function VacancyList() {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    getVacancies().then(setVacancies);
  }, []);

  return <VacancyTable vacancies={vacancies} />;
}
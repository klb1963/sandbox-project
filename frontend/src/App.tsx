//✅ src/App.tsx

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddCompanyPage from './pages/AddCompanyPage';
import EditCompanyPage from './pages/EditCompanyPage';
import NotFound from './pages/NotFound';
import HamburgerMenu from './components/HamburgerMenu';
import VacancyList from './pages/VacancyList';

export default function App() {
  return (
    <>
      <HamburgerMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCompanyPage />} />
        <Route path="/edit/:id" element={<EditCompanyPage />} />
        <Route path="/vacancies" element={<VacancyList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
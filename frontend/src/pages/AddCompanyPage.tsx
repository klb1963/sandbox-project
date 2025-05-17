import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Company } from '../types/Company';
import './Form.css'; // при наличии стилей

type CompanyFormData = Omit<Company, 'id'>;

const API_URL = import.meta.env.VITE_API_URL; // ✅

const AddCompanyPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    city: '',
    website: '',
    email: '',
    linkedin: '',
    latitude: 0,
    longitude: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Автоматически преобразуем числовые поля
    if (name === 'latitude' || name === 'longitude') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/companies/`, formData); // ✅ слеш в конце
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Ошибка при добавлении компании');
    }
  };

  return (
    <div className="form-container">
      <h2>Добавить компанию</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map(field => (
          <div key={field}>
            <label>{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field as keyof CompanyFormData]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="button-group">
          <button type="submit">💾 Сохранить</button>
          <button type="button" onClick={() => navigate('/')}>
            ← Назад
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddCompanyPage;
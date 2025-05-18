import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Company, CompanyFormData } from '../types/Company';
import './Form.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function EditCompanyPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    city: '',
    website: '',
    email: '',
    linkedin: '',
    latitude: '',
    longitude: '',
  });

  const [loading, setLoading] = useState(true); // ✅ Новый флаг загрузки
  const [errors, setErrors] = useState<Partial<Record<keyof CompanyFormData, string>>>({});

  useEffect(() => {
    if (!id) return;

    axios.get<Company>(`${API_URL}/companies/${id}`)
      .then((response) => {
        const company = response.data;
        setFormData({
          name: company.name || '',
          city: company.city || '',
          website: company.website || '',
          email: company.email || '',
          linkedin: company.linkedin || '',
          latitude: company.latitude?.toString() ?? '',
          longitude: company.longitude?.toString() ?? '',
        });
        setLoading(false); // ✅ Завершили загрузку
      })
      .catch((error) => {
        console.error('Ошибка при загрузке компании:', error);
        navigate('/');
      });
  }, [id, navigate]);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Название обязательно';
    if (!formData.city.trim()) newErrors.city = 'Город обязателен';
    if (!formData.website.trim()) newErrors.website = 'Сайт обязателен';
    if (!formData.email.trim()) newErrors.email = 'Email обязателен';
    if (!formData.latitude || isNaN(Number(formData.latitude))) newErrors.latitude = 'Широта — число';
    if (!formData.longitude || isNaN(Number(formData.longitude))) newErrors.longitude = 'Долгота — число';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.put(`${API_URL}/companies/${id}`, {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      });
      navigate('/');
    } catch (error) {
      console.error('Ошибка при сохранении компании:', error);
      alert('Ошибка при сохранении компании');
    }
  };

  if (loading) {
    // ✅ Показываем заглушку до загрузки данных
    return <p>Загрузка данных компании...</p>;
  }

  return (
    <div className="form-container">
      <h2>Редактировать компанию</h2>
      <form onSubmit={handleSubmit}>
        {(Object.keys(formData) as Array<keyof CompanyFormData>).map((field) => (
          <div key={field}>
            <label htmlFor={field}>{field}</label>
            <input
              id={field}
              name={field}
              type="text"
              value={formData[field]}
              onChange={handleChange}
            />
            {errors[field] && <div className="error">{errors[field]}</div>}
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
}
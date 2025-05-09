import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Company, CompanyFormData } from '../types/Company';
import './Form.css';

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

  const [errors, setErrors] = useState<Partial<Record<keyof CompanyFormData, string>>>({});

  useEffect(() => {
    axios.get<Company>(`http://127.0.0.1:8000/api/companies/${id}`)
      .then((response) => {
        const company = response.data;
        setFormData({
          name: company.name,
          city: company.city,
          website: company.website,
          email: company.email,
          linkedin: company.linkedin,
          latitude: company.latitude.toString(),
          longitude: company.longitude.toString(),
        });
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
      await axios.put(`http://127.0.0.1:8000/api/companies/${id}`, {
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
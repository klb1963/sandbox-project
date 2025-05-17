import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Form.css';

const API_URL = import.meta.env.VITE_API_URL;

interface AddCompanyFormProps {
  onCompanyAdded: () => void;
}

export default function AddCompanyForm({ onCompanyAdded }: AddCompanyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    website: '',
    email: '',
    linkedin: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/companies/`, {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      });
      toast.success('Компания успешно добавлена!');
      onCompanyAdded();
      setFormData({
        name: '',
        city: '',
        website: '',
        email: '',
        linkedin: '',
        latitude: '',
        longitude: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при добавлении компании');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {['name', 'city', 'website', 'email', 'linkedin', 'latitude', 'longitude'].map((field) => (
        <div key={field} className="form-group">
          <label htmlFor={field}>{field}</label>
          <input
            type="text"
            name={field}
            id={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Add Company</button>
    </form>
  );

}
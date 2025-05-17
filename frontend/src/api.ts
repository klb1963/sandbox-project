import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;
console.log('🔍 VITE_API_URL:', API_URL); // для отладки

export const getCompanies = async () => {
  const response = await axios.get(`${API_URL}/companies/`);
  return response.data;
};

export const addCompany = async (data: {
  name: string;
  city?: string;
  website?: string;
  email?: string;
  linkedin?: string;
}) => {
  await axios.post(`${API_URL}/companies/`, data);
};

export const updateCompany = async (id: number, data: any) => {
  await axios.put(`${API_URL}/companies/${id}/`, data);
};

export const deleteCompany = async (id: number) => {
  await axios.delete(`${API_URL}/companies/${id}/`);
};
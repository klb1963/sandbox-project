import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

export const getCompanies = async () => {
  const response = await axios.get(`${API_URL}/companies`)
  return response.data
}

export const addCompany = async (data: {
    name: string
    city?: string
    website?: string
    email?: string
    linkedin?: string
  }) => {
    await axios.post(`${API_URL}/companies`, data)
  }
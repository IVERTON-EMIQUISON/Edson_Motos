// api.js
import axios from 'axios';

const API_BASE_URL = 'https://f5nto8ycy5.execute-api.us-east-1.amazonaws.com/v1/motos';

// Funções de CRUD usando axios
export const createMoto = async (motoData) => {
    const response = await axios.post(API_BASE_URL, motoData);
    return response.data;
};

export const getMotos = async (filters = {}) => {
    const response = await axios.get(API_BASE_URL, { params: filters });
    return response.data;
};

export const getMotoDetails = async (motoId) => {
    const response = await axios.get(`${API_BASE_URL}/${motoId}`);
    return response.data;
};

export const updateMoto = async (motoId, updateData) => {
    const response = await axios.put(`${API_BASE_URL}/${motoId}`, updateData);
    return response.data;
};

export const deleteMoto = async (motoId) => {
    const response = await axios.delete(`${API_BASE_URL}/${motoId}`);
    return response.data;
};
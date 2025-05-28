import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials, Workout } from '../types';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export const workouts = {
  getAll: async (): Promise<Workout[]> => {
    const response = await api.get('/workouts');
    return response.data;
  },

  getOne: async (id: string): Promise<Workout> => {
    const response = await api.get(`/workouts/${id}`);
    return response.data;
  },

  create: async (workout: Omit<Workout, 'id'>): Promise<Workout> => {
    const response = await api.post('/workouts', workout);
    return response.data;
  },

  update: async (id: string, workout: Partial<Workout>): Promise<Workout> => {
    const response = await api.put(`/workouts/${id}`, workout);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/workouts/${id}`);
  },
}; 
import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, Poll, PollRequest, VoteRequest } from '../types';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (data: LoginRequest): Promise<AuthResponse> =>
    api.post('/auth/signin', data).then(res => res.data),
  
  register: (data: RegisterRequest): Promise<{ message: string }> =>
    api.post('/auth/signup', data).then(res => res.data),
};

// Poll API
export const pollAPI = {
  getAllPolls: (): Promise<Poll[]> =>
    api.get('/polls').then(res => res.data),
  
  getPollById: (id: number): Promise<Poll> =>
    api.get(`/polls/${id}`).then(res => res.data),
  
  createPoll: (data: PollRequest): Promise<Poll> =>
    api.post('/polls', data).then(res => res.data),
  
  vote: (data: VoteRequest): Promise<{ message: string }> =>
    api.post('/polls/vote', data).then(res => res.data),
};

export default api;
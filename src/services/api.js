import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aamt-backend.herokuapp.com',
  // baseURL: 'http://192.168.1.113:3333',
});

export default api;

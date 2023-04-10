import axios from 'axios';

//local:'http://localhost:3333'
//producao: 'https://aamt-api.onrender.com'
const api = axios.create({
  baseURL: 'http://localhost:3333',
  // baseURL: 'http://192.168.1.113:3333',
});

export default api;

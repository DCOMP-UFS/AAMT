import axios from 'axios';
require('dotenv').config();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://aamt-backend.herokuapp.com/'
  // baseURL: process.env.REACT_APP_API_URL || 'http://192.168.0.105:3333'
});

export default api;

export const headerAuthorization = () => {
  const { token } = JSON.parse(JSON.parse(localStorage.getItem('persist:aamt')).appConfig);

  return {
    headers: {
      authorization: `Bearer ${ token }`
    }
  }
}

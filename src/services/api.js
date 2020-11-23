import axios from 'axios';
require('dotenv').config();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://aamt-backend.herokuapp.com/'
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

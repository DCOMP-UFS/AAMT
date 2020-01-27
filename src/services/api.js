import axios from 'axios';

const api = axios.create({
  baseURL: process.env.APP_URL || 'http://localhost:3333'
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

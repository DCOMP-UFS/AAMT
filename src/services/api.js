import axios from 'axios';
import { AsyncStorage } from 'react-native';

// require('dotenv').config();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3333'
});

export default api;

export const headerAuthorization = () => {
  const { token } = JSON.parse(JSON.parse(AsyncStorage.getItem('persist:aamt')).appConfig);

  return {
    headers: {
      authorization: `Bearer ${ token }`
    }
  }
}

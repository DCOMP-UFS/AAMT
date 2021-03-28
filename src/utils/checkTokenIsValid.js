import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import api from '../services/api';

import { signOut } from '../store/modules/auth/actions';

export default function checkTokenIsValid() {
  const dispatch = useDispatch();
  const UNAUTHORIZED = 401;

  api.interceptors.response.use(
    response => response,
    error => {
      console.log('ihhhhhhhhhhhhhhhhhhhh');
      if (error.response && error.response.status === UNAUTHORIZED) {
        Alert.alert(
          'Sua sessão expirou!',
          'Por favor, realize login novamente'
        );
        dispatch(signOut());
      }
      return Promise.reject(error);
    }
  );
}

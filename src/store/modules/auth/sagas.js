import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';
import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { user: usuario, password } = payload;

    const response = yield call(api.post, '/auth/authenticate', {
      usuario,
      senha: password,
    });

    const { user, token } = response.data;

    if ([3, 4].includes(user.atuacoes[0].tipoPerfil)) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      yield put(signInSuccess(token, user));
    } else {
      Alert.alert(
        'Atenção!',
        'Você não possui autorização para utilizar o aplicativo.'
      );
      yield put(signInFailure());
    }
  } catch (err) {
    Alert.alert('Autenticação falhou', 'Verifique seu usuário ou senha');
    yield put(signInFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);

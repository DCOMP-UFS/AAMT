import { Alert } from 'react-native';
import { takeLatest, call, put, all, retry } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../../services/api';
import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { user, password } = payload;

    const response = yield call(api.post, '/auth/authenticate', {
      usuario: user,
      senha: password,
    });

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(response.data));
  } catch (err) {
    Alert.alert('Autenticação falhou', 'Verifique seu usuário ou senha');
    yield put(signInFailure());
  }
}

export function setToken({ payload }) {
  if (!payload.user.profile) return;

  const { token } = payload.user.profile;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);

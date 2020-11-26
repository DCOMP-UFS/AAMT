import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../../services/api';
import {signInSuccess, signInFailure} from './actions';

export function* signIn({payload}) {
  try {
    const {user, password} = payload;

    const response = yield call(api.post, '/auth/authenticate', {
      usuario: user,
      senha: password,
    });

    yield AsyncStorage.setItem('@Auth:token', response.data.token);

    yield put(signInSuccess(response.data));
  } catch (err) {
    Alert.alert('Autenticação falhou', 'Verifique seu usuário ou senha');
    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

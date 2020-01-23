import { call, put } from 'redux-saga/effects';
import { authenticateRequest } from '../../services/requests/User';

import * as UserActions from '../actions/user';
import { setToken } from '../actions/appConfig';

export function* authenticate(action) {
  try {
    const { data, status } = yield call( authenticateRequest, action.payload );
    const { redirectUser } = action.payload;

    if( status === 200 ) {
      const { token, user } = data;

      const userInfo = {
        nome: user.nome,
        usuario: user.usuario,
        email: user.email,
        tipoPerfil: user.tipoPerfil
      }

      redirectUser( user.tipoPerfil );

      yield put( UserActions.authenticate( userInfo ) );
      yield put( setToken( token ) );
    }
  } catch (error) {
    yield put( UserActions.authenticateFailure() );
  }
}

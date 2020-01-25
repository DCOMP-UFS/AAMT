import { call, put } from 'redux-saga/effects';
import { authenticateRequest } from '../../services/requests/Usuario';

import * as UserActions from '../actions/UsuarioActions';
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
        tipoPerfil: user.tipoPerfil,
        municipio: {
          codigo: user.municipio.codigo,
          nome: user.municipio.nome
        }
      }

      redirectUser( user.tipoPerfil );

      yield put( UserActions.authenticate( userInfo ) );
      yield put( setToken( token ) );
    }
  } catch (error) {
    yield put( UserActions.authenticateFailure() );
  }
}

export function* getUsuarios(action) {
  try {
    console.log("Sagas");

    // yield put( UserActions.getUsuarios([]) );

  } catch (error) {
    yield put( UserActions.getUsuariosFailure() );
  }
}

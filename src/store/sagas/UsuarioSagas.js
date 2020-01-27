import { call, put } from 'redux-saga/effects';
import { authenticateRequest, createUsuarioRequest, updateRequest } from '../../services/requests/Usuario';
import { getUsuarios as getUsuariosRequest } from '../../services/requests/Municipio';

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
          id: user.municipio.id,
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
    const { data, status } = yield call( getUsuariosRequest, action.payload.municipio_id );

    if( status === 200 ) {
      yield put( UserActions.getUsuarios( data ) );
    }else {
      yield put( UserActions.getUsuariosFailure() );
    }

  } catch (error) {
    yield put( UserActions.getUsuariosFailure() );
  }
}

export function* createUsuario( action ) {
  try {
    const { data, status } = yield call( createUsuarioRequest, action.payload );

    if( status === 201 ) {
      yield put( UserActions.createUsuario( data ) );
    }else {
      yield put( UserActions.createUsuarioFailure() );
    }
  } catch (error) {
    yield put( UserActions.createUsuarioFailure() )
  }
}

export function* updateUsuario( action ) {
  try {
    const { status } = yield call( updateRequest, action.payload );

    if( status === 200 ) {
      yield put( UserActions.updateUsuario() );
    } else {
      yield put( UserActions.updateUsuarioFailure() );
    }
  } catch (error) {
    yield put( UserActions.updateUsuarioFailure() );
  }
}

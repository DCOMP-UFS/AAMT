import { call, put } from 'redux-saga/effects';
import { authenticateRequest, createUsuarioRequest, updateRequest } from '../../services/requests/Usuario';
import { getUsuariosPorMunicipios } from '../../services/requests/Usuario';

import * as UserActions from '../actions/UsuarioActions';
import * as AppConfigActions from '../actions/appConfig';
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
    yield put( AppConfigActions.showNotifyToast( "Usuário ou senha inválidos", "error" ) );
  }
}

export function* getUsuarios(action) {
  try {
    const { data, status } = yield call( getUsuariosPorMunicipios, action.payload.municipio_id );

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
    const { data, status } = yield call( updateRequest, action.payload );

    if( status === 200 ) {
      yield put( UserActions.updateUsuario( data ) );
      yield put( AppConfigActions.showNotifyToast( "Usuário(s) alterado com sucesso", "success" ) );
    } else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar informações do usuário: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar o usuário, favor verifique sua conexão com a internet", "error" ) );
  }
}

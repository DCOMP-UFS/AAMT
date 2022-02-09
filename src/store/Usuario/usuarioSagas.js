import { takeLatest, takeEvery, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Usuario';
import * as UsuarioActions from './usuarioActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* authenticate(action) {
  try {
    const { data, status } = yield call( servico.authenticateRequest, action.payload );
    const { redirectUser } = action.payload;

    if( status === 200 ) {
      const { token, user, status, mensage } = data;

      if( status === "error" ) {
        yield put( AppConfigActions.showNotifyToast( mensage, "error" ) );
      } else {
        redirectUser( user.atuacoes );

        yield put( AppConfigActions.authenticate( user ) );
        yield put( AppConfigActions.setToken( token ) );
      }

    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Usuário ou senha inválidos", "error" ) );
  }
}

export function* getUsuarios(action) {
  try {
    const { data, status } = yield call( servico.getUsuariosPorMunicipios, action.payload.municipio_id );

    if( status === 200 ) {
      yield put( UsuarioActions.getUsuarios( data ) );
    }else {
      yield put( UsuarioActions.getUsuariosFailure() );
    }

  } catch (error) {
    yield put( UsuarioActions.getUsuariosFailure() );
  }
}

export function* getUsersByRegional( action ) {
  try {
    const { data, status } = yield call( servico.getUsersByRegionalRequest, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.getUsersByRegional( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha consultar os usuários: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar usuários, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* getUsuarioById(action) {
  try {
    const { data, status } = yield call( servico.getUsuarioByIdRequest, action.payload.id );

    if( status === 200 ) {
      yield put( UsuarioActions.getUsuarioById( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha consultar o usuário: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar usuário, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* getUsersByCity(action) {
  try {
    const { data, status } = yield call( servico.getUsersByCityRequest, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.getUsersByCity( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha consultar os usuários: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar usuários, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* createUsuario( action ) {
  try {
    const { data, status } = yield call( servico.createUsuarioRequest, action.payload );

    if( status === 201 ) {
      yield put( UsuarioActions.createUsuario( data ) );
      yield put( AppConfigActions.showNotifyToast( "Usuário criado com sucesso", "success" ) );
    }else {
      yield put( UsuarioActions.createUsuarioFailure() );
    }
  } catch (error) {
    yield put( UsuarioActions.createUsuarioFailure() )
  }
}

export function* updateUsuario( action ) {
  try {
    const { data, status } = yield call( servico.updateRequest, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.updateUsuario( data ) );
      yield put( AppConfigActions.showNotifyToast( "Usuário(s) alterado com sucesso", "success" ) );
    } else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar informações do usuário: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar o usuário, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* validarCpf( action ) {
  try {
    const { data, status } = yield call( servico.validarCpfRequest, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.setCpfValido( data.valido ) );
      if( !data.valido )
        yield put( AppConfigActions.showNotifyToast( data.mensagem, "warning" ) );
    } else {
      yield put( UsuarioActions.setCpfValido( false ) );
      yield put( AppConfigActions.showNotifyToast( "Falha ao tentar validar CPF: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao tentar validar CPF, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* validarEmail( action ) {
  try {
    const { data, status } = yield call( servico.validarEmailRequest, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.setEmailValido( data.valido ) );
      if( !data.valido )
        yield put( AppConfigActions.showNotifyToast( data.mensagem, "warning" ) );
    } else {
      yield put( UsuarioActions.setEmailValido( false ) );
      yield put( AppConfigActions.showNotifyToast( "Falha ao tentar validar e-mail: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao tentar validar e-mail, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* validarUsuario( action ) {
  try {
    const { data, status } = yield call( servico.validarUsuarioRequest, action.payload );

    if( status === 200 ) {
      yield put( UsuarioActions.setUsuarioValido( data.valido ) );
      if( !data.valido )
        yield put( AppConfigActions.showNotifyToast( data.mensagem, "warning" ) );
    } else {
      yield put( UsuarioActions.setUsuarioValido( false ) );

      if( data.mensagem )
        yield put( AppConfigActions.showNotifyToast( data.mensagem, "error" ) );
      else
        yield put( AppConfigActions.showNotifyToast( "Falha ao tentar validar usuário: " + status, "error" ) );
    }
  } catch ( error ) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao tentar validar e-mail, favor verifique sua conexão com a internet", "error" ) );
  }
}

function* watchAuthenticate() {
  yield takeLatest( AppConfigActions.ActionTypes.AUTHENTICATE_REQUEST, authenticate );
}

function* watchGetUsuarios() {
  yield takeLatest( UsuarioActions.ActionTypes.GET_USUARIOS_REQUEST, getUsuarios );
}

function* watchGetUsersByRegional() {
  yield takeLatest( UsuarioActions.ActionTypes.GET_USERS_BY_REGIONAL_REQUEST, getUsersByRegional );
}

function* watchGetUsuarioById() {
  yield takeLatest( UsuarioActions.ActionTypes.GET_USUARIO_BY_ID_REQUEST, getUsuarioById );
}

function* watchGetUsersByCity() {
  yield takeLatest( UsuarioActions.ActionTypes.GET_USERS_BY_CITY_REQUEST, getUsersByCity );
}

function* watchCreateUsuario() {
  yield takeLatest( UsuarioActions.ActionTypes.CREATE_USUARIO_REQUEST, createUsuario );
}

function* watchUpdateUsuario() {
  yield takeLatest( UsuarioActions.ActionTypes.UPDATE_USUARIO_REQUEST, updateUsuario );
}

function* watchUpdateEveryUsuario() {
  yield takeEvery( UsuarioActions.ActionTypes.UPDATE_ALL_USUARIO_REQUEST, updateUsuario );
}

function* watchValidarCpf() {
  yield takeEvery( UsuarioActions.ActionTypes.VALIDAR_CPF_REQUEST, validarCpf );
}

function* watchValidarEmail() {
  yield takeEvery( UsuarioActions.ActionTypes.VALIDAR_EMAIL_REQUEST, validarEmail );
}

function* watchValidarUsuario() {
  yield takeEvery( UsuarioActions.ActionTypes.VALIDAR_USUARIO_REQUEST, validarUsuario );
}

export function* usuarioSaga() {
  yield all( [
    watchAuthenticate(),
    watchGetUsuarios(),
    watchGetUsersByRegional(),
    watchGetUsuarioById(),
    watchGetUsersByCity(),
    watchCreateUsuario(),
    watchUpdateUsuario(),
    watchUpdateEveryUsuario(),
    watchValidarCpf(),
    watchValidarEmail(),
    watchValidarUsuario(),
  ] );
}
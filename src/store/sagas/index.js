import { all, takeLatest } from 'redux-saga/effects';

import { ActionTypes as UserActions } from '../actions/UsuarioActions';

import { authenticate, getUsuarios, createUsuario, updateUsuario } from './UsuarioSagas';

export default function* rootSaga() {
  yield all([
    takeLatest( UserActions.AUTHENTICATE_REQUEST, authenticate ),
    takeLatest( UserActions.GET_USUARIOS_REQUEST, getUsuarios ),
    takeLatest( UserActions.CREATE_USUARIO_REQUEST, createUsuario ),
    takeLatest( UserActions.UPDATE_ALL_USUARIO_REQUEST, updateUsuario ),
    takeLatest( UserActions.UPDATE_USUARIO_REQUEST, updateUsuario )
  ]);
}

import { all, takeLatest } from 'redux-saga/effects';

import { ActionTypes as UserActions } from '../actions/UsuarioActions';

import { authenticate, getUsuarios } from './UsuarioSagas';

export default function* rootSaga() {
  yield all([
    takeLatest( UserActions.AUTHENTICATE_REQUEST, authenticate ),
    takeLatest( UserActions.GET_USUARIOS_REQUEST, getUsuarios )
  ]);
}

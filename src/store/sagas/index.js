import { all, takeLatest } from 'redux-saga/effects';

import { ActionTypes as UserActions } from '../actions/user';

import { authenticate } from './UserSagas';

export default function* rootSaga() {
  yield all([takeLatest( UserActions.AUTHENTICATE_REQUEST, authenticate )]);
}

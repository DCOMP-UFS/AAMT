import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import currentActivity from './currentActivity/sagas';
import inspections from './inspections/sagas';
import routes from './routes/sagas';

export default function* rootSaga() {
  return yield all([auth, user, currentActivity, inspections, routes]);
}
import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import routes from './routes/sagas';
import inspectionForm from './inspectionForm/sagas';

export default function* rootSaga() {
  return yield all([auth, user, routes, inspectionForm]);
}

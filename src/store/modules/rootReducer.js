import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import routes from './routes/reducer';
import inspectionForm from './inspectionForm/reducer';

export default combineReducers({
  auth,
  user,
  routes,
  inspectionForm,
});

import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import currentActivity from './currentActivity/reducer';
import inspections from './inspections/reducer';
import routes from './routes/reducer';

export default combineReducers({
  auth,
  user,
  currentActivity,
  inspections,
  routes,
});

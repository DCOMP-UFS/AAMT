import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import activityRoutes from './activityRoutes/reducer';
import inspections from './inspections/reducer';

export default combineReducers({
  auth,
  user,
  activityRoutes,
  inspections,
});

import { combineReducers } from 'redux';

import atividade from './atividade';
import trabalhoDiario from './trabalhoDiario';
import sidebar from './sidebar';
import sidebarLab from './sidebarLab';
import quarteirao from './quarteirao';
import supportInfo from './supportInfo';
import user from './user';
import appConfig from './appConfig';

export default combineReducers({
  atividade,
  trabalhoDiario,
  sidebar,
  sidebarLab,
  quarteirao,
  supportInfo,
  user,
  appConfig,
});

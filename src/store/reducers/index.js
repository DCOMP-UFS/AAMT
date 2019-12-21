import { combineReducers } from 'redux';

import atividade from './atividade';
import trabalhoDiario from './trabalhoDiario';
import sidebar from './sidebar';
import quarteirao from './quarteirao';
import supportInfo from './supportInfo';

export default combineReducers({
  atividade,
  trabalhoDiario,
  sidebar,
  quarteirao,
  supportInfo
});

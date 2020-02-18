import { combineReducers } from 'redux';

import atividade from './atividade';
import trabalhoDiario from './trabalhoDiario';
import sidebar from './sidebar';
import sidebarLab from './sidebarLab';
import quarteirao from './quarteirao';
import supportInfo from './supportInfo';
import appConfig from './appConfig';
import usuario from './Usuario';
import municipio from './Municipio';
import localidade from './Localidade';
import categoria from './Categoria';
import zona from './Zona';
import pais from './Pais';
import regiao from './Regiao';
import estado from './Estado';
import regionalSaude from './RegionalSaude';
import rua from './Rua';
import imovel from './Imovel';

export default combineReducers({
  atividade,
  trabalhoDiario,
  sidebar,
  sidebarLab,
  quarteirao,
  supportInfo,
  appConfig,
  usuario,
  municipio,
  localidade,
  categoria,
  zona,
  pais,
  regiao,
  estado,
  regionalSaude,
  rua,
  imovel
});

import { combineReducers } from 'redux';

import appConfig from './appConfig';
import atividade from './atividade';
import categoria from './Categoria';
import estado from './Estado';
import imovel from './Imovel';
import localidade from './Localidade';
import municipio from './Municipio';
import pais from './Pais';
import quarteirao from './quarteirao';
import regiao from './Regiao';
import regionalSaude from './RegionalSaude';
import rua from './Rua';
import sidebar from './sidebar';
import sidebarCoordGeral from './sidebarCoordGeral';
import sidebarLab from './sidebarLab';
import supportInfo from './supportInfo';
import trabalhoDiario from './trabalhoDiario';
import usuario from './Usuario';
import zona from './Zona';

export default combineReducers({
  sidebarCoordGeral,
  sidebar,
  sidebarLab,
  atividade,
  trabalhoDiario,
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

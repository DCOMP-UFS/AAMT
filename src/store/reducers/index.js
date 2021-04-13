import { combineReducers } from 'redux';

import appConfig from './appConfig';
import atividade from './Atividade';
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
import sidebarSupervisor from './sidebarSupervisor';
import supportInfo from './supportInfo';
import trabalhoDiario from './trabalhoDiario';
import usuario from './Usuario';
import zona from './Zona';
import ciclo from './Ciclo';
import metodologia from './Metodologia';
import sidebarAgente from './sidebarAgente';
import rota from './Rota';
import rotaCache from './RotaCache';
import vistoria from './Vistoria';
import vistoriaCache from './VistoriaCache';
import nw_vistoria from '../Vistoria/vistoriaReduce';
import nw_atividade from '../Atividade/atividadeReduce';
import nw_rota from '../Rota/rotaReduce';

export default combineReducers({
  sidebarCoordGeral,
  sidebar,
  sidebarLab,
  sidebarSupervisor,
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
  imovel,
  ciclo,
  metodologia,
  sidebarAgente,
  rota,
  rotaCache,
  vistoria,
  vistoriaCache,
  nw_vistoria,
  nw_atividade,
  nw_rota
});

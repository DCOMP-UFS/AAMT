import { combineReducers } from 'redux';

import appConfig from '../AppConfig/appConfigReduce';
import categoria from '../Categoria/categoriaReduce';
import estado from '../Estado/estadoReduce';
import localidade from '../Localidade/localidadeReduce';
import municipio from '../Municipio/municipioReduce';
import pais from '../Pais/paisReduce';
import regiao from '../Regiao/regiaoReduce';
import regionalSaude from '../RegionalSaude/regionalSaudeReduce';
import sidebar from './sidebar';
import sidebarCoordGeral from './sidebarCoordGeral';
import sidebarLab from './sidebarLab';
import sidebarSupervisor from './sidebarSupervisor';
import supportInfo from './supportInfo';
import trabalhoDiario from './trabalhoDiario';
import usuario from './Usuario';
import zona from '../Zona/zonaReduce';
import metodologia from '../Metodologia/metodologiaReduce';
import sidebarAgente from './sidebarAgente';
import rota from '../Rota/rotaReduce';
import rotaCache from '../RotaCache/rotaCacheReduce';
import vistoriaCache from '../VistoriaCache/vistoriaCacheReduce';
import vistoria from '../Vistoria/vistoriaReduce';
import atividade from '../Atividade/atividadeReduce';
import amostra from '../Amostra/amostraReduce';
import nw_laboratorio from '../Laboratorio/laboratorioReduce';
import nw_mosquito from '../Mosquito/mosquitoReduce';
import imovel from '../Imovel/imovelReduce';
import quarteirao from '../Quarteirao/quarteiraoReduce';
import ciclo from '../Ciclo/cicloReduce';
import nw_trabalho from '../TrabalhoDiario/trabalhoDiarioReduce';
import nw_relatorio from '../Relatorio/relatorioReduce';
import nw_equipe from '../Equipe/equipeReduce';
import rua from '../Rua/ruaReduce';

export default combineReducers( {
  sidebarCoordGeral,
  sidebar,
  sidebarLab,
  sidebarSupervisor,
  trabalhoDiario,
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
  atividade,
  amostra,
  nw_laboratorio,
  nw_mosquito,
  quarteirao,
  nw_trabalho,
  nw_relatorio,
  nw_equipe,
} );

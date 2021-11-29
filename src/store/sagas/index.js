import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { ActionTypes as AppConfig } from '../AppConfig/appConfigActions';
import { ActionTypes as UserActions } from '../actions/UsuarioActions';
import { ActionTypes as RegiaoActions } from '../actions/RegiaoActions';
import { ActionTypes as RegionalSaudeActions } from '../actions/RegionalSaudeActions';
import { ActionTypes as RuaActions } from '../actions/RuaActions';
import { ActionTypes as RotaActions } from '../actions/RotaActions';
import { ActionTypes as VistoriaActions } from '../actions/VistoriaActions';
import { ActionTypes as TrabalhoDiarioActions } from '../actions/trabalhoDiario';

// Nova Estrutura
import { ActionTypes as NW_RotaActions } from '../Rota/rotaActions';
import { ActionTypes as NW_LaboratorioActions } from '../Laboratorio/laboratorioActions';
import { ActionTypes as NW_MosquitoActions } from '../Mosquito/mosquitoActions';
import { ActionTypes as NW_TrabalhoActions } from '../TrabalhoDiario/trabalhoDiarioActions';
import { ActionTypes as NW_RelatorioActions } from '../Relatorio/relatorioActions';
import { ActionTypes as NW_EquipeActions } from '../Equipe/equipeActions';
import { ActionTypes as NW_RuaActions } from '../Rua/ruaActions';

import {
  authenticate,
  getUsuarios,
  createUsuario,
  updateUsuario,
  getUsuarioById,
  getUsersByRegional,
  getUsersByCity
} from './UsuarioSagas';
import { GetRegionsByNation } from './RegiaoSagas';
import { getRegionalHealthByState } from './RegionalSaudeSagas';
import { getStreetByLocality, createStreet, updateStreet, deleteStreet } from './RuaSagas';
import * as RotaSagas from './RotaSagas';
import * as VistoriaSagas from './VistoriaSagas';
import * as TrabalhoDiarioSagas from './TrabalhoDiarioSagas';

// Nova Estrutura
import * as NW_RotaSagas from '../Rota/rotaSagas';
import * as NW_LaboratorioSagas from '../Laboratorio/laboratorioSagas';
import * as NW_MosquitoSagas from '../Mosquito/mosquitoSagas';
import * as NW_TrabalhoSagas from '../TrabalhoDiario/trabalhoDiarioSagas';
import * as NW_RelatorioSagas from '../Relatorio/relatorioSagas';
import * as NW_EquipeSagas from '../Equipe/equipeSagas';
import * as NW_RuaSagas from '../Rua/ruaSagas';

import { quarteiraoSaga } from '../Quarteirao/quarteiraoSagas';
import { rotaSaga } from '../Rota/rotaSagas';
import { atividadeSaga } from '../Atividade/atividadeSagas';
import { cicloSaga } from '../Ciclo/cicloSagas';
import { amostraSaga } from '../Amostra/amostraSagas';
import { categoriaSaga } from '../Categoria/categoriaSagas';
import { estadoSaga } from '../Estado/estadoSagas';
import { zonaSaga } from '../Zona/zonaSagas';
import { imovelSaga } from '../Imovel/imovelSagas';
import { localidadeSaga } from '../Localidade/localidadeSagas';
import { metodologiaSaga } from '../Metodologia/metodologiaSagas';
import { municipioSaga } from '../Municipio/municipioSagas';
import { paisSaga } from '../Pais/paisSagas';

export default function* rootSaga() {
  yield all([
    takeLatest( AppConfig.AUTHENTICATE_REQUEST, authenticate ),

    // Gerir Usuario
    takeLatest( UserActions.GET_USUARIOS_REQUEST, getUsuarios ),
    takeLatest( UserActions.GET_USUARIO_BY_ID_REQUEST, getUsuarioById ),
    takeLatest( UserActions.GET_USERS_BY_REGIONAL_REQUEST, getUsersByRegional ),
    takeLatest( UserActions.GET_USERS_BY_CITY_REQUEST, getUsersByCity ),
    takeLatest( UserActions.CREATE_USUARIO_REQUEST, createUsuario ),
    takeEvery( UserActions.UPDATE_ALL_USUARIO_REQUEST, updateUsuario ),
    takeLatest( UserActions.UPDATE_USUARIO_REQUEST, updateUsuario ),

    //Gerir Município
    municipioSaga(),

    // Gerir Localidade
    localidadeSaga(),

    // Gerir Categoria
    categoriaSaga(),

    // Gerir Zonas
    zonaSaga(),

    // Gerir País
    paisSaga(),

    // Gerir Região
    takeLatest( RegiaoActions.GET_REGIONS_BY_NATION_REQUEST, GetRegionsByNation ),

    // Gerir Estado
    estadoSaga(),

    // Gerir Regionais de Saúde
    takeLatest( RegionalSaudeActions.GET_REGIONAL_HEALTH_BY_STATE_REQUEST, getRegionalHealthByState ),

    // Gerir Quarteirão
    quarteiraoSaga(),

    // Gerir Rua
    takeLatest( RuaActions.GET_STREET_BY_LOCALITY_REQUEST, getStreetByLocality ),
    takeLatest( RuaActions.CREATE_STREET_REQUEST, createStreet ),
    takeLatest( RuaActions.UPDATE_STREET_REQUEST, updateStreet ),
    takeLatest( RuaActions.DELETE_STREET_REQUEST, deleteStreet ),

    // Gerir Ciclo
    cicloSaga(),

    // Gerir Metodologia
    metodologiaSaga(),

    // Gerir Atividade
    atividadeSaga(),
    
    // Gerir Rotas
    takeLatest( RotaActions.GET_ROUTE_REQUEST, RotaSagas.getRoute ),
    takeLatest( RotaActions.CHECK_ROTA_INICIADA_REQUEST, RotaSagas.isStarted ),
    takeLatest( RotaActions.INICIAR_ROTA_REQUEST, RotaSagas.startRoute ),
    takeLatest( RotaActions.ENCERRAR_ROTA_REQUEST, RotaSagas.closeRoute ),

    rotaSaga(),

    // Nova Estrutura
    takeLatest( NW_RotaActions.PLANEJAR_ROTA_REQUEST, NW_RotaSagas.planejarRota ),
    takeLatest( NW_RotaActions.GET_ROTAS_PLANEJADAS_REQUEST, NW_RotaSagas.getRotasPlanejadas ),

    // Gerir Vistoria
    takeLatest( VistoriaActions.CONSULTAR_VISTORIAS_REQUEST, VistoriaSagas.getInspects ),
    takeLatest( VistoriaActions.GET_INSPECTS_BY_DAILY_WORK_REQUEST, VistoriaSagas.getInspectsByDailyWork ),

    // Gerir Trabalho Diario
    takeLatest( TrabalhoDiarioActions.GET_BY_USER_REQUEST, TrabalhoDiarioSagas.getByUser ),
    takeLatest( TrabalhoDiarioActions.GET_DAILY_WORK_BY_ID_REQUEST, TrabalhoDiarioSagas.getDailyWorkById ),
    // Nova Estrutura
    takeLatest( NW_TrabalhoActions.GET_TRABALHOS_USUARIO_REQUEST, NW_TrabalhoSagas.getTrabalhosUsuario ),

    // Gerir Amostra
    amostraSaga(),

    // Gerir Laboratório
    takeLatest( NW_LaboratorioActions.GET_LABORATORIOS_REQUEST, NW_LaboratorioSagas.getLaboratorios ),

    // Gerir Mosquito
    takeLatest( NW_MosquitoActions.GET_MOSQUITOS_REQUEST, NW_MosquitoSagas.getMosquitos ),

    // Gerir Imóvel
    imovelSaga(),

    // Gerir Relatórios
    takeLatest( NW_RelatorioActions.GET_BOLETIM_SEMANAL_REQUEST, NW_RelatorioSagas.getBoletimSemanal ),
    takeLatest( NW_RelatorioActions.GET_BOLETIM_DIARIO_EQUIPE_REQUEST, NW_RelatorioSagas.getBoletimDiarioEquipe ),
    takeLatest( NW_RelatorioActions.GET_BOLETIM_ATIVIDADE_EQUIPE_REQUEST, NW_RelatorioSagas.getBoletimAtividadeEquipe ),
    takeLatest( NW_RelatorioActions.GET_BOLETIM_ATIVIDADE_REQUEST, NW_RelatorioSagas.getBoletimAtividade ),

    // Gerir Equipe
    takeLatest( NW_EquipeActions.GET_MEMBROS_REQUEST, NW_EquipeSagas.getMembros ),

    // Gerir Rua
    takeLatest( NW_RuaActions.GET_RUA_POR_CEP_REQUEST, NW_RuaSagas.getRuaPorCep ),
  ]);
}

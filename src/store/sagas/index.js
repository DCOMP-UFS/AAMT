import { all, takeLatest, takeEvery } from 'redux-saga/effects';

import { ActionTypes as AppConfig } from '../actions/appConfig';
import { ActionTypes as UserActions } from '../actions/UsuarioActions';
import { ActionTypes as MunicipioActions } from '../actions/MunicipioActions';
import { ActionTypes as LocalidadeActions } from '../actions/LocalidadeActions';
import { ActionTypes as CategoriaActions } from '../actions/CategoriaActions';
import { ActionTypes as ZonaActions } from '../actions/ZonaActions';
import { ActionTypes as PaisActions } from '../actions/PaisActions';
import { ActionTypes as RegiaoActions } from '../actions/RegiaoActions';
import { ActionTypes as EstadoActions } from '../actions/EstadoActions';
import { ActionTypes as RegionalSaudeActions } from '../actions/RegionalSaudeActions';
import { ActionTypes as QuarteiraoActions } from '../actions/QuarteiraoActions';
import { ActionTypes as RuaActions } from '../actions/RuaActions';

import {
  authenticate,
  getUsuarios,
  createUsuario,
  updateUsuario,
  getUsuarioById,
  getUsersByRegional,
  getUsersByCity
} from './UsuarioSagas';
import { getMunicipios, createCity, updateCity, getCityById, getCityByRegionalHealth } from './MunicipioSagas';
import { getLocalidades, createLocation, updateLocation, getLocationById, getLocationByCity } from './LocalidadeSagas';
import { getZoneByCity, createZone, updateZone, getZoneById, getZoneByLocality } from './ZonaSagas';
import { getCategorys } from './CategoriaSagas';
import { getNations } from './PaisSagas';
import { GetRegionsByNation } from './RegiaoSagas';
import { GetStatesByRegion } from './EstadoSagas';
import { getRegionalHealthByState } from './RegionalSaudeSagas';
import {
  getBlockByCity,
  createCityBlock,
  getBlockById,
  addHouse,
  deleteHouse,
  updateHouse
} from './QuarteiraoSagas';
import { getStreetByLocality, createStreet, updateStreet, deleteStreet } from './RuaSagas';

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
    takeLatest( MunicipioActions.GET_MUNICIPIOS_REQUEST, getMunicipios ),
    takeLatest( MunicipioActions.GET_CITY_BY_ID_REQUEST, getCityById ),
    takeLatest( MunicipioActions.GET_CITY_BY_REGIONAL_HEALTH_REQUEST, getCityByRegionalHealth ),
    takeLatest( MunicipioActions.CREATE_CITY_REQUEST, createCity ),
    takeLatest( MunicipioActions.UPDATE_CITY_REQUEST, updateCity ),

    // Gerir Localidade
    takeLatest( LocalidadeActions.GET_LOCATION_REQUEST, getLocalidades ),
    takeLatest( LocalidadeActions.GET_LOCATION_BY_ID_REQUEST, getLocationById ),
    takeLatest( LocalidadeActions.GET_LOCATION_BY_CITY_REQUEST, getLocationByCity ),
    takeLatest( LocalidadeActions.CREATE_LOCATION_REQUEST, createLocation ),
    takeLatest( LocalidadeActions.UPDATE_LOCATION_REQUEST, updateLocation ),

    // Gerir Categoria
    takeLatest( CategoriaActions.GET_CATEGORY_REQUEST, getCategorys ),

    // Gerir Zonas
    takeLatest( ZonaActions.GET_ZONE_BY_CITY_REQUEST, getZoneByCity ),
    takeLatest( ZonaActions.GET_ZONE_BY_ID_REQUEST, getZoneById ),
    takeLatest( ZonaActions.GET_ZONE_BY_LOCALITY_REQUEST, getZoneByLocality ),
    takeLatest( ZonaActions.CREATE_ZONE_REQUEST, createZone ),
    takeLatest( ZonaActions.UPDATE_ZONE_REQUEST, updateZone ),

    // Gerir País
    takeLatest( PaisActions.GET_NATIONS_REQUEST, getNations ),

    // Gerir Região
    takeLatest( RegiaoActions.GET_REGIONS_BY_NATION_REQUEST, GetRegionsByNation ),

    // Gerir Estado
    takeLatest( EstadoActions.GET_STATES_BY_REGION_REQUEST, GetStatesByRegion ),

    // Gerir Regionais de Saúde
    takeLatest( RegionalSaudeActions.GET_REGIONAL_HEALTH_BY_STATE_REQUEST, getRegionalHealthByState ),

    // Gerir Quarteirão
    takeLatest( QuarteiraoActions.GET_BLOCK_BY_CITY_REQUEST, getBlockByCity ),
    takeLatest( QuarteiraoActions.GET_BY_ID_REQUEST, getBlockById ),
    takeLatest( QuarteiraoActions.CREATE_CITY_BLOCK_REQUEST, createCityBlock ),
    takeLatest( QuarteiraoActions.ADD_HOUSE_REQUEST, addHouse ),
    takeLatest( QuarteiraoActions.DELETE_HOUSE_REQUEST, deleteHouse ),
    takeLatest( QuarteiraoActions.UPDATE_HOUSE_REQUEST, updateHouse ),

    // Gerir Rua
    takeLatest( RuaActions.GET_STREET_BY_LOCALITY_REQUEST, getStreetByLocality ),
    takeLatest( RuaActions.CREATE_STREET_REQUEST, createStreet ),
    takeLatest( RuaActions.UPDATE_STREET_REQUEST, updateStreet ),
    takeLatest( RuaActions.DELETE_STREET_REQUEST, deleteStreet ),

  ]);
}

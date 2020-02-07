import { all, takeLatest } from 'redux-saga/effects';

import { ActionTypes as UserActions } from '../actions/UsuarioActions';
import { ActionTypes as MunicipioActions } from '../actions/MunicipioActions';
import { ActionTypes as LocalidadeActions } from '../actions/LocalidadeActions';
import { ActionTypes as CategoriaActions } from '../actions/CategoriaActions';
import { ActionTypes as ZonaActions } from '../actions/ZonaActions';

import { authenticate, getUsuarios, createUsuario, updateUsuario, getUsuarioById } from './UsuarioSagas';
import { getMunicipios, createCity, updateCity, getCityById } from './MunicipioSagas';
import { getLocalidades, createLocation, updateLocation, getLocationById, getLocationByCity } from './LocalidadeSagas';
import { getZoneByCity, createZone, updateZone, getZoneById } from './ZonaSagas';
import { getCategorys } from './CategoriaSagas';

export default function* rootSaga() {
  yield all([
    takeLatest( UserActions.AUTHENTICATE_REQUEST, authenticate ),

    // Gerir Usuario
    takeLatest( UserActions.GET_USUARIOS_REQUEST, getUsuarios ),
    takeLatest( UserActions.GET_USUARIO_BY_ID_REQUEST, getUsuarioById ),
    takeLatest( UserActions.CREATE_USUARIO_REQUEST, createUsuario ),
    takeLatest( UserActions.UPDATE_ALL_USUARIO_REQUEST, updateUsuario ),
    takeLatest( UserActions.UPDATE_USUARIO_REQUEST, updateUsuario ),

    //Gerir Município
    takeLatest( MunicipioActions.GET_MUNICIPIOS_REQUEST, getMunicipios ),
    takeLatest( MunicipioActions.GET_CITY_BY_ID_REQUEST, getCityById ),
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
    takeLatest( ZonaActions.CREATE_ZONE_REQUEST, createZone ),
    takeLatest( ZonaActions.UPDATE_ZONE_REQUEST, updateZone )
  ]);
}

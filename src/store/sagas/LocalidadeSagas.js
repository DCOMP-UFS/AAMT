import { call, put } from 'redux-saga/effects';
import {
  listRequest,
  createLocationRequest,
  updateRequest,
  getLocationByIdRequest,
  getLocationByCityRequest
} from '../../services/requests/Localidade';

import * as LocalidadeActions from '../actions/LocalidadeActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getLocalidades(action) {
  try {
    const { data, status } = yield call( listRequest );

    if( status === 200 ) {
      yield put( LocalidadeActions.getLocations( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as localidades, favor verifique a conexão", "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os municípios, favor verifique a conexão", "error" ) );
  }
}

export function* getLocationById(action) {
  try {
    const { data, status } = yield call( getLocationByIdRequest, action.payload );

    if( status === 200 ) {
      yield put( LocalidadeActions.getLocationById( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a localidade: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a localidade, favor verifique a conexão", "error" ) );
  }
}

export function* getLocationByCity(action) {
  try {
    const { data, status } = yield call( getLocationByCityRequest, action.payload.municipio_id );

    if( status === 200 ) {
      yield put( LocalidadeActions.getLocationByCity( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as localidades: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as localidades, favor verifique a conexão", "error" ) );
  }
}

export function* createLocation( action ) {
  try {
    const { data, status } = yield call( createLocationRequest, action.payload );

    if( status === 201 ) {
      yield put( LocalidadeActions.createLocation( data ) );
      yield put( AppConfigActions.showNotifyToast( "Localidade criada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar a localidade: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao criar a localidade, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* updateLocation( action ) {
  try {
    const { data, status } = yield call( updateRequest, action.payload );

    if( status === 200 ) {
      yield put( LocalidadeActions.updateLocation( data ) );
      yield put( AppConfigActions.showNotifyToast( "Localidade atualizada com sucesso", "success" ) );
    } else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar as informações da localidade: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar a localidade, favor verifique sua conexão com a internet", "error" ) );
  }
}

import { call, put } from 'redux-saga/effects';
import { getZoneByCityRequest, createZoneRequest, updateRequest, getZoneByIdRequest } from '../../services/requests/Zona';

import * as ZonaActions from '../actions/ZonaActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getZoneByCity(action) {
  try {
    const { data, status } = yield call( getZoneByCityRequest, action.payload.municipio_id );

    if( status === 200 ) {
      yield put( ZonaActions.getZoneByCity( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as zonas do município: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as zonas do município, favor verifique a conexão", "error" ) );
  }
}

export function* createZone( action ) {
  try {
    const { data, status } = yield call( createZoneRequest, action.payload );

    if( status === 201 ) {
      yield put( ZonaActions.createZone( data ) );
      yield put( AppConfigActions.showNotifyToast( "Zona criada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar a zona: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao criar a zona, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* updateZone( action ) {
  try {
    const { data, status } = yield call( updateRequest, action.payload );

    if( status === 200 ) {
      yield put( ZonaActions.updateZone( data ) );
      yield put( AppConfigActions.showNotifyToast( "Zona atualizada com sucesso", "success" ) );
    } else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar as informações da zona: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar a zona, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* getZoneById(action) {
  try {
    const { data, status } = yield call( getZoneByIdRequest, action.payload );

    if( status === 200 ) {
      yield put( ZonaActions.getZoneById( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a zona: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a zona, favor verifique a conexão", "error" ) );
  }
}

import { call, put } from 'redux-saga/effects';
import {
  getRouteRequest,
  isStartedRequest,
  startRouteRequest
} from '../../services/requests/Rota';

import * as RotaActions from '../actions/RotaActions';
import * as VistoriaActions from '../actions/VistoriaActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getRoute(action) {
  try {
    const { data, status } = yield call( getRouteRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.getRoute( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar a rota: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a rota, favor verifique a conexão", "error" ) );
  }
}

export function* isStarted(action) {
  try {
    const { data, status } = yield call( isStartedRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.isStarted( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao checkar o status da rota: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a rota, favor verifique a conexão", "error" ) );
  }
}

export function* startRoute(action) {
  try {
    const { data, status } = yield call( startRouteRequest, action.payload );

    if( status === 200 ) {
      yield put( VistoriaActions.saveRoute( data ) );
      window.location = window.location.origin.toString() + '/agente/vistoria';
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao iniciario rota: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a rota, favor verifique a conexão", "error" ) );
  }
}

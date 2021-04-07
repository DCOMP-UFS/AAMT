import { call, put } from 'redux-saga/effects';
import {
  planejarRotaRequest,
  getRotasPlanejadasRequest
} from '../../services/requests/Rota';

import * as RotaActions from './rotaActions';
import * as AppConfigActions from '../actions/appConfig';

export function* planejarRota(action) {
  try {
    const { data, status } = yield call( planejarRotaRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.setRotaPlanejada( true ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao planejar rota: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao planejar rota, favor verifique a conexão", "error" ) );
  }
}

export function* getRotasPlanejadas(action) {
  try {
    const { data, status } = yield call( getRotasPlanejadasRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.setRotasPlanejadas( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar rotas planejadas: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar rotas planejadas, favor verifique a conexão", "error" ) );
  }
}

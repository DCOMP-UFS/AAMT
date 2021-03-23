import { call, put } from 'redux-saga/effects';
import {
  planejarRotaRequest
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

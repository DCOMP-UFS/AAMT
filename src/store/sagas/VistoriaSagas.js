import { call, put } from 'redux-saga/effects';
import {
  getInspectsRequest
} from '../../services/requests/Vistoria';

import * as VistoriaActions from '../actions/VistoriaActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getInspects(action) {
  try {
    const { data, status } = yield call( getInspectsRequest, action.payload );

    if( status === 200 ) {
      yield put( VistoriaActions.getInspects( data.data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as vistorias: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as vistorias, favor verifique a conexão", "error" ) );
  }
}

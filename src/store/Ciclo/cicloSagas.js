import { call, put } from 'redux-saga/effects';
import {
  getOpenCyleRequest
} from '../../services/requests/Ciclo';

import * as CicloActions from './cicloActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getCicloAberto( action ) {
  try {
    const { data, status } = yield call( getOpenCyleRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.setCiclo( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar o ciclo em aberto: " + status, "error" ) );
    }

  } catch ( error ) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o ciclo em aberto, favor verifique a conexão", "error" ) );
  }
}

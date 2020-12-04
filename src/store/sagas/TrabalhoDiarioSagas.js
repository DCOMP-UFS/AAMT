import { call, put } from 'redux-saga/effects';
import {
  getByUserRequest
} from '../../services/requests/TrabalhoDiario';

import * as TrabalhoDiarioActions from '../actions/trabalhoDiario';
import * as AppConfigActions from '../actions/appConfig';

export function* getByUser( action ) {
  try {
    const { data, status } = yield call( getByUserRequest, action.payload );

    if( status === 200 ) {
      yield put( TrabalhoDiarioActions.getByUser( data.data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os boletins diários: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os boletins diários, favor verifique a conexão", "error" ) );
  }
}

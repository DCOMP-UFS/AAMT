import { call, put } from 'redux-saga/effects';
import {
  getBoletimSemanalRequest
} from '../../services/requests/Relatorio';

import * as RelatorioActions from './relatorioActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getBoletimSemanal( action ) {
  try {
    const { data, status } = yield call( getBoletimSemanalRequest, action.payload );

    if( status === 200 ) {
      yield put( RelatorioActions.setBoletimSemanal( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar boletim semanal: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar boletim semanal, favor verifique a conexão", "error" ) );
  }
}

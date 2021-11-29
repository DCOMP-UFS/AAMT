import { call, put } from 'redux-saga/effects';
import {
  getMethodologiesRequest
} from '../../services/requests/Metodologia';

import * as CicloActions from '../actions/MetodologiaActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getMethodologies(action) {
  try {
    const { data, status } = yield call( getMethodologiesRequest );

    if( status === 200 ) {
      yield put( CicloActions.getMethodologies( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar metodologias: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar metodologias, favor verifique a conexão", "error" ) );
  }
}

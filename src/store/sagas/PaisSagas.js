import { call, put } from 'redux-saga/effects';
import { getNationsRequest } from '../../services/requests/Pais';

import * as PaisActions from '../actions/PaisActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getNations(action) {
  try {
    const { data, status } = yield call( getNationsRequest );

    if( status === 200 ) {
      yield put( PaisActions.getNations( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar países: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os países, favor verifique a conexão", "error" ) );
  }
}

import { call, put } from 'redux-saga/effects';
import { getRegionalHealthByStateRequest } from '../../services/requests/RegionalSaude';

import * as RegionalSaudeActions from '../actions/RegionalSaudeActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getRegionalHealthByState(action) {
  try {
    const { data, status } = yield call( getRegionalHealthByStateRequest, action.payload.estado_id );

    if( status === 200 ) {
      yield put( RegionalSaudeActions.getRegionalHealthByState( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as regionais de saúde do estado: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as regionais de saúde do estado, favor verifique a conexão", "error" ) );
  }
}

import { call, put } from 'redux-saga/effects';
import { GetStatesByRegionRequest } from '../../services/requests/Estado';

import * as EstadoActions from '../actions/EstadoActions';
import * as AppConfigActions from '../actions/appConfig';

export function* GetStatesByRegion(action) {
  try {
    const { data, status } = yield call( GetStatesByRegionRequest, action.payload.regiao_id );

    if( status === 200 ) {
      yield put( EstadoActions.GetStatesByRegion( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os estados da região: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os estados da região, favor verifique a conexão", "error" ) );
  }
}

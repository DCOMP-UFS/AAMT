import { call, put } from 'redux-saga/effects';
import { GetRegionsByNationRequest } from '../../services/requests/Regiao';

import * as RegiaoActions from '../actions/RegiaoActions';
import * as AppConfigActions from '../actions/appConfig';

export function* GetRegionsByNation(action) {
  try {
    const { data, status } = yield call( GetRegionsByNationRequest, action.payload.pais_id );

    if( status === 200 ) {
      yield put( RegiaoActions.GetRegionsByNation( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as regiões do país: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as regiões do país, favor verifique a conexão", "error" ) );
  }
}

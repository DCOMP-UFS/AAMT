import { call, put } from 'redux-saga/effects';
import {
  getPlanningRequest
} from '../../services/requests/Equipe';

import * as DefinirRotaCacheActions from '../actions/DefinirRotaCacheActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getPlanning(action) {
  try {
    const { data, status } = yield call( getPlanningRequest, action.payload );

    if( status === 200 ) {
      yield put( DefinirRotaCacheActions.getPlanning( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar rotas planejadas: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar rotas planejadas, favor verifique a conexão", "error" ) );
  }
}

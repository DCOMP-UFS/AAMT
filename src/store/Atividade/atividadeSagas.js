import { call, put } from 'redux-saga/effects';
import {
  getResponsabilityActivitiesRequest
} from '../../services/requests/Atividade';

import * as AtividadeActions from './atividadeActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getResponsabilityActivities(action) {
  try {
    const { data, status } = yield call( getResponsabilityActivitiesRequest, action.payload );

    if( status === 200 ) {
      yield put( AtividadeActions.setActivities( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as atividades: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as atividades, favor verifique a conexão", "error" ) );
  }
}

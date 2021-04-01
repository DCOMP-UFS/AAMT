import { call, put } from 'redux-saga/effects';
import {
  getResponsabilityActivitiesRequest,
  getRotaEquipeRequest
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

export function* getRotaEquipe(action) {
  try {
    const { data, status } = yield call( getRotaEquipeRequest, action.payload );

    if( status === 200 ) {
      yield put( AtividadeActions.setRotaEquipe( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar a rota da equipe: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a rota da equipe, favor verifique a conexão", "error" ) );
  }
}

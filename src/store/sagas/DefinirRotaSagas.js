import { call, put } from 'redux-saga/effects';
import {
  getActivitiesSupRequest,
  getTeamsSupRequest,
  savePlainRequest
} from '../../services/requests/Equipe';

import * as DefinirRotaActions from '../actions/DefinirRotaActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getActivitiesSup(action) {
  try {
    const { data, status } = yield call( getActivitiesSupRequest, action.payload );

    if( status === 200 ) {
      yield put( DefinirRotaActions.getActivitiesSup( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as atividades: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as atividades, favor verifique a conexão", "error" ) );
  }
}

export function* getTeamsSup(action) {
  try {
    const { data, status } = yield call( getTeamsSupRequest, action.payload );

    if( status === 200 ) {
      yield put( DefinirRotaActions.getTeamsSup( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as equipes do supervisor: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as equipes do supervisor, favor verifique a conexão", "error" ) );
  }
}

export function* savePlain(action) {
  try {
    const { data, status } = yield call( savePlainRequest, action.payload );

    if( status === 200 ) {
      yield put( DefinirRotaActions.savePlain( data ) );
      yield put( AppConfigActions.showNotifyToast( "Planejamento salvo com sucesso!", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao salvar o planejamento: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao salvar o planejamento, favor verifique a conexão", "error" ) );
  }
}

import { call, put } from 'redux-saga/effects';
import {
  getBoletimSemanalRequest,
  getBoletimDiarioEquipeRequest,
  getBoletimAtividadeEquipeRequest
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

export function* getBoletimDiarioEquipe( action ) {
  try {
    const { data, status } = yield call( getBoletimDiarioEquipeRequest, action.payload );

    if( status === 200 ) {
      yield put( RelatorioActions.setBoletimDiarioEquipe( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar boletim diário da equipe: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar boletim diário da equipe, favor verifique a conexão", "error" ) );
  }
}

export function* getBoletimAtividadeEquipe( action ) {
  try {
    const { data, status } = yield call( getBoletimAtividadeEquipeRequest, action.payload );

    if( status === 200 ) {
      yield put( RelatorioActions.setBoletimAtividadeEquipe( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar boletim da atividade por equipe: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar boletim da atividade por equipe, favor verifique a conexão", "error" ) );
  }
}

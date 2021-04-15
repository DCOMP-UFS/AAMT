import { call, put } from 'redux-saga/effects';
import {
  getAmostrasRequest,
  enviarAmostrasRequest
} from '../../services/requests/Amostra';

import * as AmostraActions from './amostraActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getAmostras( action ) {
  try {
    const { data, status } = yield call( getAmostrasRequest, action.payload );

    if( status === 200 ) {
      yield put( AmostraActions.setAmostras( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar amostras: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar amostras, favor verifique a conexão", "error" ) );
  }
}

export function* enviarAmostras( action ) {
  try {
    const { status } = yield call( enviarAmostrasRequest, action.payload );

    if( status === 200 ) {
      document.location.reload();
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao enviar amostras para o laboratório: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao enviar amostras para o laboratório", "error" ) );
  }
}

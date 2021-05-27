import { call, put } from 'redux-saga/effects';
import {
  getBlockByCityRequest,
  getLadosQuarteiraoRequest,
} from '../../services/requests/Quarteirao';

import * as QuarteiraoActions from './quarteiraoActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getQuarteiroes( action ) {
  try {
    const { data, status } = yield call( getBlockByCityRequest, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.setQuarteiroes( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar quarteirões: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar quarteirões, favor verifique a conexão", "error" ) );
  }
}

export function* getLadosQuarteirao( action ) {
  try {
    const { data, status } = yield call( getLadosQuarteiraoRequest, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.setLados( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as ruas do quarteirão: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas do quarteirão, favor verifique a conexão", "error" ) );
  }
}

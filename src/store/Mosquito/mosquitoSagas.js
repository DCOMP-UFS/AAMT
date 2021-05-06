import { call, put } from 'redux-saga/effects';
import {
  getMosquitosRequest
} from '../../services/requests/Mosquito';

import * as MosquitoActions from './mosquitoActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getMosquitos() {
  try {
    const { data, status } = yield call( getMosquitosRequest );

    if( status === 200 ) {
      yield put( MosquitoActions.setMosquitos( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar mosquitos: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar mosquitos, favor verifique a conexão", "error" ) );
  }
}

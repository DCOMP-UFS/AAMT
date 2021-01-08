import { call, put } from 'redux-saga/effects';
import {
  getByUserRequest,
  getDailyWorkByIdRequest
} from '../../services/requests/TrabalhoDiario';

import * as TrabalhoDiarioActions from '../actions/trabalhoDiario';
import * as VistoriaActions from '../actions/VistoriaActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getByUser( action ) {
  try {
    const { data, status } = yield call( getByUserRequest, action.payload );

    if( status === 200 ) {
      yield put( TrabalhoDiarioActions.getByUser( data.data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os boletins diários: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os boletins diários, favor verifique a conexão", "error" ) );
  }
}

export function* getDailyWorkById( action ) {
  try {
    const { data, status } = yield call( getDailyWorkByIdRequest, action.payload );

    if( status === 200 ) {
      yield put( TrabalhoDiarioActions.getDailyWorkById( data.data ) );
      yield put( VistoriaActions.getInspectsByDailyWork( data.data.vistorias ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar o trabalho diário: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o trabalho diário, favor verifique a conexão", "error" ) );
  }
}

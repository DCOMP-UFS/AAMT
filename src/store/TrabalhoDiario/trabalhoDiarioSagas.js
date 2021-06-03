import { call, put } from 'redux-saga/effects';
import {
  getByUserRequest
} from '../../services/requests/TrabalhoDiario';

import * as TrabalhoActions from './trabalhoDiarioActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getTrabalhosUsuario( action ) {
  try {
    const { data, status } = yield call( getByUserRequest, action.payload );

    if( status === 200 ) {
      yield put( TrabalhoActions.setTrabalhos( data.data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os trabalhos do usuário: " + status, "error" ) );
    }

  } catch ( error ) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os trabalhos do usuário, favor verifique a conexão", "error" ) );
  }
}

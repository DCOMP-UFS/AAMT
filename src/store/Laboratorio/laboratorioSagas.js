import { call, put } from 'redux-saga/effects';
import {
  getLaboratoriosRequest,
  enviarAmostrasRequest
} from '../../services/requests/Laboratorio';

import * as LaboratorioActions from './laboratorioActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getLaboratorios( action ) {
  try {
    const { data, status } = yield call( getLaboratoriosRequest, action.payload );

    if( status === 200 ) {
      yield put( LaboratorioActions.setLaboratorios( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar laboratórios: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar laboratórios, favor verifique a conexão", "error" ) );
  }
}

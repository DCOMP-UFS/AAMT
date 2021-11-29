import { call, put } from 'redux-saga/effects';
import * as servico from '../../services/requests/Equipe';
import * as EquipeActions from './equipeActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getMembros( action ) {
  try {
    const { data, status } = yield call( servico.getMembrosRequest, action.payload );

    if( status === 200 ) {
      yield put( EquipeActions.setMembros( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar membros da equipe: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar membros da equipe, favor verifique a conexão", "error" ) );
  }
}

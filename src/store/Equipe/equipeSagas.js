import { takeLatest, call, put, all } from 'redux-saga/effects';
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

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar membros da equipe, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar membros da equipe, favor verifique a conexão", "error" ) );
  }
}

function* watchGetMembros() {
  yield takeLatest( EquipeActions.ActionTypes.GET_MEMBROS_REQUEST, getMembros );
}

export function* equipeSaga() {
  yield all( [
    watchGetMembros(),
  ] );
}
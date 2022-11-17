import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Mosquito';
import * as MosquitoActions from './mosquitoActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getMosquitos() {
  try {
    const { data, status } = yield call( servico.getMosquitosRequest );

    if( status === 200 ) {
      yield put( MosquitoActions.setMosquitos( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar mosquitos: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar mosquitos, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar mosquitos, favor verifique a conexão", "error" ) );
  }
}

function* watchGetMosquitos() {
  yield takeLatest( MosquitoActions.ActionTypes.GET_MOSQUITOS_REQUEST, getMosquitos );
}

export function* mosquitoSaga() {
  yield all( [
    watchGetMosquitos(),
  ] );
}
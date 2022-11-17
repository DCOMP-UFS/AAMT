import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Metodologia';
import * as MetodologiaActions from './metodologiaActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getMethodologies(action) {
  try {
    const { data, status } = yield call( servico.getMethodologiesRequest );

    if( status === 200 ) {
      yield put( MetodologiaActions.getMethodologies( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar metodologias: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar metodologias, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar metodologias, favor verifique a conexão", "error" ) );
  }
}

function* watchGetMethodologies() {
  yield takeLatest( MetodologiaActions.ActionTypes.GET_METHODOLOGIES_REQUEST, getMethodologies );
}

export function* metodologiaSaga() {
  yield all( [
    watchGetMethodologies(),
  ] );
}
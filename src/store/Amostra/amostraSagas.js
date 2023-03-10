import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Amostra';
import * as AmostraActions from './amostraActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getAmostrasByLab( action ) {
  try {
    const { data, status } = yield call( servico.getAmostrasByLabRequest, action.payload );

    if( status === 200 ) {
      yield put( AmostraActions.setAmostras( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar amostras: " + status, "error" ) );
    }
  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar amostras, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar amostras, favor verifique a conexão", "error" ) );
  }
}

export function* getAmostras( action ) {
  try {
    yield put( AmostraActions.buscandoAmostras() );
    const { data, status } = yield call( servico.getAmostrasRequest, action.payload );

    if( status === 200 ) {
      yield put( AmostraActions.setAmostras( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar amostras: " + status, "error" ) );
    }

  } catch (err) {
    yield put( AmostraActions.getAmostrasRequestFail() );
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar amostras, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar amostras, favor verifique a conexão", "error" ) );
  }
}

export function* encaminharAmostras( action ) {
  try {
    const { data, status } = yield call( servico.enviarAmostrasRequest, action.payload );

    if( status === 200 ) {
      yield put( AmostraActions.encaminharAmostrasSuccess( data.amostrasEncaminhadas ) );
      //document.location.reload();
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao enviar amostras para o laboratório: " + status, "error" ) );
    }
  } catch (err) {
    yield put( AmostraActions.encaminharAmostrasFail() );
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao enviar amostras para o laboratório, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao enviar amostras para o laboratório, favor verifique a conexão", "error" ) );
  }
}

export function* registrarExame( action ) {
  try {
    const { data, status } = yield call( servico.registrarExameRequest, action.payload );

    if( status === 200 ) {
      yield put( AmostraActions.registrarExameSuccess(data.amostraExaminada) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao registrar exame: " + status, "error" ) );
    }
  } catch (err) {
    yield put( AmostraActions.registrarExameFail() );
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao registar exame, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao registar exame, favor verifique a conexão", "error" ) );
  }
}

function* watchGetAmostras() {
  yield takeLatest( AmostraActions.ActionTypes.GET_AMOSTRAS_REQUEST, getAmostras );
}

function* watchGetAmostrasByLab() {
  yield takeLatest( AmostraActions.ActionTypes.GET_AMOSTRAS_BY_LAB, getAmostrasByLab);
}

function* watchEncaminharAmostras() {
  yield takeLatest( AmostraActions.ActionTypes.ENCAMINHAR_AMOSTRAS_REQUEST, encaminharAmostras );
}

function* watchRegistrarExame() {
  yield takeLatest( AmostraActions.ActionTypes.REGISTRAR_EXAME_REQUEST, registrarExame );
}

export function* amostraSaga() {
  yield all( [
    watchGetAmostras(),
    watchGetAmostrasByLab(),
    watchEncaminharAmostras(),
    watchRegistrarExame(),
  ] );
}
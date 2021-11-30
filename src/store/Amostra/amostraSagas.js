import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Amostra';
import * as AmostraActions from './amostraActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getAmostras( action ) {
  try {
    const { data, status } = yield call( servico.getAmostrasRequest, action.payload );

    if( status === 200 ) {
      yield put( AmostraActions.setAmostras( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar amostras: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar amostras, favor verifique a conexão", "error" ) );
  }
}

export function* enviarAmostras( action ) {
  try {
    const { status } = yield call( servico.enviarAmostrasRequest, action.payload );

    if( status === 200 ) {
      document.location.reload();
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao enviar amostras para o laboratório: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao enviar amostras para o laboratório", "error" ) );
  }
}

export function* registrarExame( action ) {
  try {
    const { status } = yield call( servico.registrarExameRequest, action.payload );

    if( status === 200 ) {
      document.location.reload();
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao registrar exame: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao registar exame", "error" ) );
  }
}

function* watchGetAmostras() {
  yield takeLatest( AmostraActions.ActionTypes.GET_AMOSTRAS_REQUEST, getAmostras );
}

function* watchEnviarAmostras() {
  yield takeLatest( AmostraActions.ActionTypes.ENVIAR_AMOSTRAS_REQUEST, enviarAmostras );
}

function* watchRegistrarExame() {
  yield takeLatest( AmostraActions.ActionTypes.REGISTRAR_EXAME_REQUEST, registrarExame );
}

export function* amostraSaga() {
  yield all( [
    watchGetAmostras(),
    watchEnviarAmostras(),
    watchRegistrarExame(),
  ] );
}
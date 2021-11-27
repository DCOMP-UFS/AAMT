import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as service from '../../services/requests/Rota';
import * as RotaActions from './rotaActions';
import * as AppConfigActions from '../actions/appConfig';

export function* planejarRota(action) {
  try {
    const { data, status } = yield call( service.planejarRotaRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.setRotaPlanejada( true ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao planejar rota: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao planejar rota, favor verifique a conexão", "error" ) );
  }
}

export function* getRotasPlanejadas(action) {
  try {
    const { data, status } = yield call( service.getRotasPlanejadasRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.setRotasPlanejadas( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar rotas planejadas: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar rotas planejadas, favor verifique a conexão", "error" ) );
  }
}

/**
 * Solicita ao service se o trabalhoDiario está finalizado
 * @param {Object} action 
 */
 export function* isFinalizado( action ) {
  try {
    const { data, status } = yield call( service.isFinalizadoRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.setIsFinalizado( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao validar trabalho diário: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao validar trabalho diário, favor verifique a conexão", "error" ) );
  }
}

// Watcher Sagas
function* watchIsFinalizado() {
  yield takeLatest( RotaActions.ActionTypes.IS_FINALIZADO_REQUEST, isFinalizado );
}

export function* rotaSaga() {
  yield all( [
    watchIsFinalizado(),
  ] );
}
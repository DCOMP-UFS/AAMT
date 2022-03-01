import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Vistoria';
import * as VistoriaActions from './vistoriaActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getInspects(action) {
  try {
    const { data, status } = yield call( servico.getInspectsRequest, action.payload );

    if( status === 200 ) {
      yield put( VistoriaActions.getInspects( data.data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as vistorias: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as vistorias, favor verifique a conexão", "error" ) );
  }
}

export function* getInspectsByDailyWork( action ) {
  try {
    const { data, status } = yield call( servico.getInspectsByDailyWorkRequest, action.payload );

    if( status === 200 ) {
      yield put( VistoriaActions.getInspectsByDailyWork( data.data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as vistorias: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as vistorias, favor verifique a conexão", "error" ) );
  }
}

function* watchGetInspects() {
  yield takeLatest( VistoriaActions.ActionTypes.CONSULTAR_VISTORIAS_REQUEST, getInspects );
}

function* watchGetInspectsByDailyWork() {
  yield takeLatest( VistoriaActions.ActionTypes.GET_INSPECTS_BY_DAILY_WORK_REQUEST, getInspectsByDailyWork );
}

export function* vistoriaSaga() {
  yield all( [
    watchGetInspects(),
    watchGetInspectsByDailyWork(),
  ] );
}
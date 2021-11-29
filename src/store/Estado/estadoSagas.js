import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Estado';
import * as EstadoActions from './estadoActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getStatesByRegion(action) {
  try {
    const { data, status } = yield call( servico.GetStatesByRegionRequest, action.payload.regiao_id );

    if( status === 200 ) {
      yield put( EstadoActions.GetStatesByRegion( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os estados da região: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os estados da região, favor verifique a conexão", "error" ) );
  }
}


function* watchGetStatesByRegion() {
  yield takeLatest( EstadoActions.ActionTypes.GET_STATES_BY_REGION_REQUEST, getStatesByRegion );
}

export function* estadoSaga() {
  yield all( [
    watchGetStatesByRegion(),
  ] );
}
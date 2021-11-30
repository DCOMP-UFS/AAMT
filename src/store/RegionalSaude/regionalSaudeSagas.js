import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/RegionalSaude';
import * as RegionalSaudeActions from './regionalSaudeActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getRegionalHealthByState(action) {
  try {
    const { data, status } = yield call( servico.getRegionalHealthByStateRequest, action.payload.estado_id );

    if( status === 200 ) {
      yield put( RegionalSaudeActions.getRegionalHealthByState( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as regionais de saúde do estado: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as regionais de saúde do estado, favor verifique a conexão", "error" ) );
  }
}

function* watchGetRegionalHealthByState() {
  yield takeLatest( RegionalSaudeActions.ActionTypes.GET_REGIONAL_HEALTH_BY_STATE_REQUEST, getRegionalHealthByState );
}

export function* regionalSaudeSaga() {
  yield all( [
    watchGetRegionalHealthByState(),
  ] );
}
import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Regiao';
import * as RegiaoActions from './regiaoActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getRegionsByNation(action) {
  try {
    const { data, status } = yield call( servico.GetRegionsByNationRequest, action.payload.pais_id );

    if( status === 200 ) {
      yield put( RegiaoActions.GetRegionsByNation( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as regiões do país: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as regiões do país, favor verifique a conexão", "error" ) );
  }
}

function* watchGetRegionsByNation() {
  yield takeLatest( RegiaoActions.ActionTypes.GET_REGIONS_BY_NATION_REQUEST, getRegionsByNation );
}

export function* regiaoSaga() {
  yield all( [
    watchGetRegionsByNation(),
  ] );
}
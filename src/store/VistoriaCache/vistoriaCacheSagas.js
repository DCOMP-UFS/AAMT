import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Pais';
import * as PaisActions from './paisActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getNations(action) {
  try {
    const { data, status } = yield call( servico.getNationsRequest );

    if( status === 200 ) {
      yield put( PaisActions.getNations( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar países: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os países, favor verifique a conexão", "error" ) );
  }
}

function* watchGetNations() {
  yield takeLatest( PaisActions.ActionTypes.GET_NATIONS_REQUEST, getNations );
}

export function* paisSaga() {
  yield all( [
    watchGetNations(),
  ] );
}
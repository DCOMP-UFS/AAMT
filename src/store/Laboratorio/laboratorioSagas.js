import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Laboratorio';
import * as LaboratorioActions from './laboratorioActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getLaboratorios( action ) {
  try {
    const { data, status } = yield call( servico.getLaboratoriosRequest, action.payload );

    if( status === 200 ) {
      yield put( LaboratorioActions.setLaboratorios( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar laboratórios: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar laboratórios, favor verifique a conexão", "error" ) );
  }
}

function* watchGetLaboratorios() {
  yield takeLatest( LaboratorioActions.ActionTypes.GET_LABORATORIOS_REQUEST, getLaboratorios );
}

export function* laboratorioSaga() {
  yield all( [
    watchGetLaboratorios(),
  ] );
}
import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/TrabalhoDiario';
import * as TrabalhoDiarioActions from './trabalhoDiarioActions';
import * as VistoriaActions from '../Vistoria/vistoriaActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getTrabalhosUsuario( action ) {
  try {
    const { data, status } = yield call( servico.getByUserRequest, action.payload );

    if( status === 200 ) {
      yield put( TrabalhoDiarioActions.setTrabalhos( data.data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os trabalhos do usuário: " + status, "error" ) );
    }

  } catch ( error ) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os trabalhos do usuário, favor verifique a conexão", "error" ) );
  }
}

export function* getByUser( action ) {
  try {
    const { data, status } = yield call( servico.getByUserRequest, action.payload );

    if( status === 200 ) {
      yield put( TrabalhoDiarioActions.getByUser( data.data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os boletins diários: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os boletins diários, favor verifique a conexão", "error" ) );
  }
}

export function* getDailyWorkById( action ) {
  try {
    const { data, status } = yield call( servico.getDailyWorkByIdRequest, action.payload );

    if( status === 200 ) {
      yield put( TrabalhoDiarioActions.getDailyWorkById( data.data ) );
      yield put( VistoriaActions.getInspectsByDailyWork( data.data.vistorias ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar o trabalho diário: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o trabalho diário, favor verifique a conexão", "error" ) );
  }
}

function* watchGetTrabalhosUsuario() {
  yield takeLatest( TrabalhoDiarioActions.ActionTypes.GET_TRABALHOS_USUARIO_REQUEST, getTrabalhosUsuario );
}

function* watchGetByUser() {
  yield takeLatest( TrabalhoDiarioActions.ActionTypes.GET_BY_USER_REQUEST, getByUser );
}

function* watchGetDailyWorkById() {
  yield takeLatest( TrabalhoDiarioActions.ActionTypes.GET_DAILY_WORK_BY_ID_REQUEST, getDailyWorkById );
}

export function* trabalhoDiarioSaga() {
  yield all( [
    watchGetTrabalhosUsuario(),
    watchGetByUser(),
    watchGetDailyWorkById(),
  ] );
}
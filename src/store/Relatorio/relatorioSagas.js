import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Relatorio';
import * as RelatorioActions from './relatorioActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getBoletimSemanal( action ) {
  try {
    const { data, status } = yield call( servico.getBoletimSemanalRequest, action.payload );

    if( status === 200 ) {
      yield put( RelatorioActions.setBoletimSemanal( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar boletim semanal: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar boletim semanal, favor verifique a conexão", "error" ) );
  }
}

export function* getBoletimDiarioEquipe( action ) {
  try {
    const { data, status } = yield call( servico.getBoletimDiarioEquipeRequest, action.payload );

    if( status === 200 ) {
      yield put( RelatorioActions.setBoletimDiarioEquipe( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar boletim diário da equipe: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar boletim diário da equipe, favor verifique a conexão", "error" ) );
  }
}

export function* getBoletimAtividadeEquipe( action ) {
  try {
    const { data, status } = yield call( servico.getBoletimAtividadeEquipeRequest, action.payload );

    if( status === 200 ) {
      yield put( RelatorioActions.setBoletimAtividadeEquipe( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar boletim da atividade por equipe: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar boletim da atividade por equipe, favor verifique a conexão", "error" ) );
  }
}

export function* getBoletimAtividade( action ) {
  try {
    const { data, status } = yield call( servico.getBoletimAtividadeRequest, action.payload );

    if( status === 200 ) {
      yield put( RelatorioActions.setBoletimAtividade( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar boletim de acompanhamento da atividade: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar boletim de acompanhamento da atividade, favor verifique a conexão", "error" ) );
  }
}

function* watchGetBoletimSemanal() {
  yield takeLatest( RelatorioActions.ActionTypes.GET_BOLETIM_SEMANAL_REQUEST, getBoletimSemanal );
}

function* watchGetBoletimDiarioEquipe() {
  yield takeLatest( RelatorioActions.ActionTypes.GET_BOLETIM_DIARIO_EQUIPE_REQUEST, getBoletimDiarioEquipe );
}

function* watchGetBoletimAtividadeEquipe() {
  yield takeLatest( RelatorioActions.ActionTypes.GET_BOLETIM_ATIVIDADE_EQUIPE_REQUEST, getBoletimAtividadeEquipe );
}

function* watchGetBoletimAtividade() {
  yield takeLatest( RelatorioActions.ActionTypes.GET_BOLETIM_ATIVIDADE_REQUEST, getBoletimAtividade );
}

export function* relatorioSaga() {
  yield all( [
    watchGetBoletimSemanal(),
    watchGetBoletimDiarioEquipe(),
    watchGetBoletimAtividadeEquipe(),
    watchGetBoletimAtividade(),
  ] );
}
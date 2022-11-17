import { takeEvery, takeLatest, call, put, all } from 'redux-saga/effects';
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

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar laboratórios, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar laboratórios, favor verifique a conexão", "error" ) );
  }
}

export function* createLaboratory( action ) {
  try {
    const { data, status } = yield call( servico.createLaboratoryRequest, action.payload );

    if( status === 201 ) {
      yield put( LaboratorioActions.createLaboratory( data ) );
      yield put( AppConfigActions.showNotifyToast( "Laboratório criado com sucesso", "success" ) );
    } else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar a laboratorio: " + status, "error" ) );
    }
  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar laboratório, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar laboratório, favor verifique a conexão", "error" ) );
  }
}

export function* updateLaboratorio( action ) {
  try {
    const { data, status } = yield call( servico.setLaboratoryRequest, action.payload );

    if( status === 200 ) {
      yield put( LaboratorioActions.updateLaboratory( data ) );
      yield put( AppConfigActions.showNotifyToast( "Laboratório atualizado com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar laboratório: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar laboratório, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar laboratório, favor verifique a conexão", "error" ) );
  }
}

function* watchGetLaboratorios() {
  yield takeLatest( LaboratorioActions.ActionTypes.GET_LABORATORIOS_REQUEST, getLaboratorios );
}

function* watchCreateLaboratory() {
  yield takeLatest( LaboratorioActions.ActionTypes.CREATE_LABORATORY_REQUEST, createLaboratory );
}

function* watchUpdateLaboratorio() {
  yield takeEvery( LaboratorioActions.ActionTypes.UPDATE_LABORATORY_REQUEST, updateLaboratorio );
}

export function* laboratorioSaga() {
  yield all( [
    watchGetLaboratorios(),
    watchCreateLaboratory(),
    watchUpdateLaboratorio(),
  ] );
}

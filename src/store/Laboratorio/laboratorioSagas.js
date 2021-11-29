import { call, put } from 'redux-saga/effects';
import {
  getLaboratoriosRequest,
  createLaboratoryRequest,
  enviarAmostrasRequest,
  setLaboratoryRequest,
  updateLaboratory,
  
} from '../../services/requests/Laboratorio';

import * as LaboratorioActions from './laboratorioActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getLaboratorios( action ) {
  try {
    const { data, status } = yield call( getLaboratoriosRequest, action.payload );

    if( status === 200 ) {
      yield put( LaboratorioActions.setLaboratorios( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar laboratórios: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar laboratórios, favor verifique a conexão", "error" ) );
  }
}

export function* createLaboratory( action ) {
  try {
    const { data, status } = yield call( createLaboratoryRequest, action.payload );

    if( status === 200 ){
      yield put( LaboratorioActions.createLaboratory( data ) );
    }else{
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar a laboratorio: " + status, "error" ) );
    }
  } catch (error) {
    console.log(error)
    yield put( AppConfigActions.showNotifyToast( "Erro ao criar a laboratorio, favor verifique sua conexão com a internet" + error, "error" ) );
  }
}

export function* updateLaboratorio( action ) {
  try {
    const { data, status } = yield call( setLaboratoryRequest, action.payload );

    if( status === 200 ) {
      yield put( LaboratorioActions.updateLaboratory(data));
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar laboratório: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar laboratório, favor verifique a conexão" + error, "error" ) );
  } 
}


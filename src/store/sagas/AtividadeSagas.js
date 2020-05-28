import { call, put } from 'redux-saga/effects';
import {
  getActivitieByIdRequest,
  getActivitiesOfCityRequest,
  getActivitiesByCityRequest,
  getLocationsRequest,
  createActiveRequest,
  planActivityRequest
} from '../../services/requests/Atividade';

import * as AtividadeActions from '../actions/AtividadeActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getActivitiesOfCity(action) {
  try {
    const { data, status } = yield call( getActivitiesOfCityRequest, action.payload );

    if( status === 200 ) {
      yield put( AtividadeActions.getActivitiesOfCity( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as atividades: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as atividades, favor verifique a conexão", "error" ) );
  }
}

export function* getActivitieById(action) {
  try {
    const { data, status } = yield call( getActivitieByIdRequest, action.payload );

    if( status === 200 ) {
      yield put( AtividadeActions.getActivitieById( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar atividade: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar atividade, favor verifique a conexão", "error" ) );
  }
}

export function* getActivitiesByCity(action) {
  try {
    const { data, status } = yield call( getActivitiesByCityRequest, action.payload );
    if( status === 200 ) {
      yield put( AtividadeActions.getActivitiesByCity( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as atividades: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as atividades, favor verifique a conexão", "error" ) );
  }
}

export function* getLocations(action) {
  try {
    const { data, status } = yield call( getLocationsRequest, action.payload );
    if( status === 200 ) {
      yield put( AtividadeActions.getLocations( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar locais: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar locais, favor verifique a conexão", "error" ) );
  }
}

export function* createActive( action ) {
  try {
    const { data, status } = yield call( createActiveRequest, action.payload );

    if( status === 201 ) {
      yield put( AtividadeActions.createActive( data ) );
      yield put( AppConfigActions.showNotifyToast( "Atividade criada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar atividade: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao criar atividade, favor verifique a conexão", "error" ) );
  }
}

export function* planActivity( action ) {
  try {
    const { status } = yield call( planActivityRequest, action.payload );

    if( status === 200 ) {
      window.location = window.location.origin.toString() + '/coord/atividades';
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar atividade: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao salvar planejamento", "error" ) );
  }
}

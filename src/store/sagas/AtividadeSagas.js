import { call, put } from 'redux-saga/effects';
import {
  getActivitiesOfCityRequest,
  getActivitiesByCityRequest,
  createActiveRequest
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

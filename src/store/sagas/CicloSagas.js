import { call, put } from 'redux-saga/effects';
import {
  getCyclesForYearRequest,
  getCyclesRequest,
  createCycleRequest,
  getAllowedCyclesRequest
} from '../../services/requests/Ciclo';

import * as CicloActions from '../actions/CicloActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getCyclesForYear(action) {
  try {
    const { data, status } = yield call( getCyclesForYearRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.getCyclesForYear( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os ciclos: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os ciclos, favor verifique a conexão", "error" ) );
  }
}

export function* getCycles(action) {
  try {
    const { data, status } = yield call( getCyclesRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.getCycles( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os ciclos: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os ciclos, favor verifique a conexão", "error" ) );
  }
}

export function* getAllowedCycles(action) {
  try {
    const { data, status } = yield call( getAllowedCyclesRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.getAllowedCycles( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os ciclos: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os ciclos, favor verifique a conexão", "error" ) );
  }
}

export function* createCycle( action ) {
  try {
    const { status } = yield call( createCycleRequest, action.payload );

    if( status === 201 ) {
      yield put( AppConfigActions.showNotifyToast( "Ciclo criado com sucesso", "success" ) );

      window.location = window.location.origin.toString() + "/cg/ciclos/consultar";
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar ciclo: " + status, "error" ) );
      yield put( AppConfigActions.showNotifyToast( "Atenção! Não é permitido duplicidade de ciclo", "warning" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao criar um novo ciclo, favor verifique a conexão", "error" ) );
  }
}

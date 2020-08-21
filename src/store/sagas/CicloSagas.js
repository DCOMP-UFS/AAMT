import { call, put } from 'redux-saga/effects';
import {
  getCycleRequest,
  getCyclesForYearRequest,
  getCyclesRequest,
  createCycleRequest,
  getAllowedCyclesRequest,
  updateCycleRequest,
  destroyCycleRequest,
  getOpenCyleRequest
} from '../../services/requests/Ciclo';

import * as CicloActions from '../actions/CicloActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getCycle(action) {
  try {
    const { data, status } = yield call( getCycleRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.getCycle( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar ciclo: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar ciclo, favor verifique a conexão", "error" ) );
  }
}

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

export function* getOpenCyle(action) {
  try {
    const { data, status } = yield call( getOpenCyleRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.getOpenCycle( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar o ciclo em aberto: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o ciclo em aberto, favor verifique a conexão", "error" ) );
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

export function* updateCycle( action ) {
  try {
    const { data, status } = yield call( updateCycleRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.updateCycle( data ) );
      yield put( AppConfigActions.showNotifyToast( "Ciclo editado com sucesso", "success" ) );
    }
    else {
      yield put( CicloActions.changeFlUpdate( false ) );
      yield put( AppConfigActions.showNotifyToast( "Falha ao editar ciclo: " + status, "error" ) );
    }
  } catch (error) {
    yield put( CicloActions.changeFlUpdate( false ) );
    yield put( AppConfigActions.showNotifyToast( "Erro ao editar ciclo! Verifique a internet caso problema persista, consulte a equipe de TI", "error" ) );
  }
}

export function* destroyCycle( action ) {
  try {
    const { status } = yield call( destroyCycleRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.destroyCycle( action.payload.id ) );
      yield put( AppConfigActions.showNotifyToast( "Ciclo excluido com sucesso", "success" ) );
    }
    else {
      yield put( CicloActions.changeFlDestroyed( false ) );
      yield put( AppConfigActions.showNotifyToast( "Falha ao excluir ciclo: " + status, "error" ) );
    }
  } catch (error) {
    yield put( CicloActions.changeFlDestroyed( false ) );
    yield put( AppConfigActions.showNotifyToast( "Erro ao excluir ciclo! Verifique a internet caso problema persista, consulte a equipe de TI", "error" ) );
  }
}

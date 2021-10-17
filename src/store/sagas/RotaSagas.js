import { call, put } from 'redux-saga/effects';
import {
  getRouteRequest,
  isStartedRequest,
  startRouteRequest,
  closeRouteRequest
} from '../../services/requests/Rota';

import * as RotaActions from '../actions/RotaCacheActions';
import * as RotaCacheActions from '../actions/RotaCacheActions';
import * as VistoriaCacheActions from '../actions/VistoriaCacheActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getRoute(action) {
  try {
    const { data, status } = yield call( getRouteRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaCacheActions.getRoute( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar a rota: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a rota, favor verifique a conexão", "error" ) );
  }
}

export function* isStarted(action) {
  try {
    const { data, status } = yield call( isStartedRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.isStarted( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao checkar o status da rota: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a rota, favor verifique a conexão", "error" ) );
  }
}

export function* startRoute(action) {
  try {
    const { data, status } = yield call( startRouteRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaCacheActions.saveRoute( data, action.payload.horaInicio ) );
      yield put( VistoriaCacheActions.clearInspection() );
      window.location = window.location.origin.toString() + '/agente/vistoria';
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao iniciar rota: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao iniciar a rota, favor verifique a conexão", "error" ) );
  }
}

export function* closeRoute(action) {
  try {
    const { data, status } = yield call( closeRouteRequest, action.payload );

    if( status === 200 ) {
      if( data.status === "success" ) {
        const [ d, m, Y ]  = new Date().toLocaleDateString().split('/');
        const current_date = `${Y}-${m}-${d}`;
        const { data } = yield call( getRouteRequest, { usuario_id: action.payload.usuario_id, dia: current_date } );

        yield put( RotaCacheActions.getRoute( data ) );
        yield put( AppConfigActions.showNotifyToast( "Rota finalizada e vistorias registradas com sucesso!", "success" ) );

        window.location = window.location.origin.toString() + '/agente/relatorio/boletim_diario/' + action.payload.trabalhoDiario_id;
      }else {
        yield put( AppConfigActions.showNotifyToast( "Ocorreu um erro no servidor durante a requisição! Por favor, aguarde e tente novamente mais tarde.", "error" ) );
      }
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao encerrar rota: " + status, "error" ) );
    }

  } catch (error) {
    if (error.response.data.tipo === 'codigo_amostra_duplicado') {
      yield put( AppConfigActions.showNotifyToast( error.response.data.message, "error" ) );
    } else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao encerrar a rota, favor verifique a conexão", "error" ) );
    }
  }
}

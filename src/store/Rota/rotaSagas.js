import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as service from '../../services/requests/Rota';
import * as RotaActions from './rotaActions';
import * as RotaCacheActions from '../RotaCache/rotaCacheActions';
import * as VistoriaCacheActions from '../VistoriaCache/vistoriaCacheActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* planejarRota(action) {
  try {
    const { status } = yield call( service.planejarRotaRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.setRotaPlanejada( true ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao planejar rota: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao planejar rota, favor verifique a conexão", "error" ) );
  }
}

export function* getRotasPlanejadas(action) {
  try {
    const { data, status } = yield call( service.getRotasPlanejadasRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.setRotasPlanejadas( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar rotas planejadas: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar rotas planejadas, favor verifique a conexão", "error" ) );
  }
}

/**
 * Solicita ao service se o trabalhoDiario está finalizado
 * @param {Object} action 
 */
 export function* isFinalizado( action ) {
  try {
    const { data, status } = yield call( service.isFinalizadoRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.setIsFinalizado( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao validar trabalho diário: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao validar trabalho diário, favor verifique a conexão", "error" ) );
  }
}

export function* getRoute(action) {
  try {
    const { data, status } = yield call( service.getRouteRequest, action.payload );

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
    const { data, status } = yield call( service.isStartedRequest, action.payload );

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
    const { data, status } = yield call( service.startRouteRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaCacheActions.saveRoute( data, action.payload.horaInicio ) );
      yield put( VistoriaCacheActions.clearInspection() );
      yield put( RotaActions.setAuxIniciado(true) );
      window.location = window.location.origin.toString() + '/vistoria';
    }else {
      yield put( RotaActions.setAuxIniciado(false) );
      yield put( AppConfigActions.showNotifyToast( "Falha ao iniciar rota: " + status, "error" ) );
    }

  } catch (error) {
    yield put( RotaActions.setAuxIniciado(false) );
    yield put( AppConfigActions.showNotifyToast( "Erro ao iniciar a rota, favor verifique a conexão", "error" ) );
  }
}

export function* closeRoute(action) {
  try {
    const { data, status } = yield call( service.closeRouteRequest, action.payload );

    if( status === 200 ) {
      if( data.status === "success" ) {
        const [ d, m, Y ]  = new Date().toLocaleDateString().split('/');
        const current_date = `${Y}-${m}-${d}`;
        const { data } = yield call( service.getRouteRequest, { usuario_id: action.payload.usuario_id, dia: current_date } );

        yield put( RotaCacheActions.getRoute( data ) );
        yield put( VistoriaCacheActions.clearInspection() );
        yield put( RotaActions.setAuxFinalizado(true) );
        yield put( AppConfigActions.showNotifyToast( "Rota finalizada e vistorias registradas com sucesso!", "success" ) );

        window.location = window.location.origin.toString() + '/relatorio/boletimDiario/' + action.payload.trabalhoDiario_id;
      }else {
        yield put( RotaActions.setAuxFinalizado(false) );
        yield put( AppConfigActions.showNotifyToast( "Ocorreu um erro no servidor durante a requisição! Por favor, aguarde e tente novamente mais tarde.", "error" ) );
      }
    }else {
      yield put( RotaActions.setAuxFinalizado(false) );
      yield put( AppConfigActions.showNotifyToast( "Falha ao encerrar rota: " + status, "error" ) );
    }

  } catch( error ) {
    if( error.response.data.tipo === 'codigo_amostra_duplicado' ) {
      yield put( AppConfigActions.showNotifyToast( error.response.data.message, "error" ) );
    } else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao encerrar a rota, favor verifique a conexão", "error" ) );
    }
  }
}

// Watcher Sagas
function* watchPlanejarRota() {
  yield takeLatest( RotaActions.ActionTypes.PLANEJAR_ROTA_REQUEST, planejarRota );
}

function* watchGetRotasPlanejadas() {
  yield takeLatest( RotaActions.ActionTypes.GET_ROTAS_PLANEJADAS_REQUEST, getRotasPlanejadas );
}

function* watchIsFinalizado() {
  yield takeLatest( RotaActions.ActionTypes.IS_FINALIZADO_REQUEST, isFinalizado );
}

function* watchGetRoute() {
  yield takeLatest( RotaActions.ActionTypes.GET_ROUTE_REQUEST, getRoute );
}

function* watchIsStarted() {
  yield takeLatest( RotaActions.ActionTypes.CHECK_ROTA_INICIADA_REQUEST, isStarted );
}

function* watchStartRoute() {
  yield takeLatest( RotaActions.ActionTypes.INICIAR_ROTA_REQUEST, startRoute );
}

function* watchCloseRoute() {
  yield takeLatest( RotaActions.ActionTypes.ENCERRAR_ROTA_REQUEST, closeRoute );
}

export function* rotaSaga() {
  yield all( [
    watchPlanejarRota(),
    watchGetRotasPlanejadas(),
    watchIsFinalizado(),
    watchGetRoute(),
    watchIsStarted(),
    watchStartRoute(),
    watchCloseRoute(),
  ] );
}
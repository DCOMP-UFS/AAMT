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
  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao planejar rota, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao planejar rota, favor verifique a conexão", "error" ) );
  }
}

export function* alterarRota(action) {
  try {
    const { status } = yield call( service.alterarRotaRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaActions.setRotaPlanejada( true ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao alterar rota: " + status, "error" ) );
    }
  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao alterar rota, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao alterar rota, favor verifique a conexão", "error" ) );
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
  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar rotas planejadas, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro consultar rotas planejadas, favor verifique a conexão", "error" ) );
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

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao validar trabalho diário, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro validar trabalho diário, favor verifique a conexão", "error" ) );
  }
}

//Busca todas as rotas do usuarios que foram passadas na data informada
export function* getRoutes(action) {
  try {
    const { data, status } = yield call( service.getRoutesRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaCacheActions.getRoute( data ) );
      yield put( RotaActions.getRoutesSuccess() );
    }else {
      yield put( RotaActions.getRoutesFail() );
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar a rota: " + status, "error" ) );
    }

  } catch (err) {

    yield put( RotaActions.getRoutesFail() );

    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a rota, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
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

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao checkar o status da rota, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao checkar o status da rota, favor verifique a conexão", "error" ) );
  }
}

export function* startRoute(action) {
  try {
    const { data, status } = yield call( service.startRouteRequest, action.payload );

    if( status === 200 ) {
      yield put( RotaCacheActions.saveRoute( data, action.payload.horaInicio ) );

      //Linha abaixo foi comentada porque não é necessario limpar as vistorias de um trabalho que acabou de começar, ou seja, não possui vistorias ainda
      //yield put( VistoriaCacheActions.clearInspection(null) );

      yield put( RotaActions.setRotaIniciada(true) );
      //window.location = window.location.origin.toString() + '/vistoria';
    }else {
      yield put( RotaActions.setRotaIniciada(false) );
      yield put( AppConfigActions.showNotifyToast( "Falha ao iniciar rota: " + status, "error" ) );
    }

  } catch (err) {

    yield put( RotaActions.setRotaIniciada(false) );

    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao iniciar rota, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao iniciar rota, favor verifique a conexão", "error" ) );
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

        //yield put( RotaCacheActions.getRoute( data ) );
        yield put( VistoriaCacheActions.clearInspection(action.payload.trabalhoDiario_id) );
        yield put( RotaActions.setAuxFinalizado(true) );

        //linha abaixo foi comentado porque o redirecionamento não permitia a limpeza da barra de progressão de vistorias

        //window.location = window.location.origin.toString() + '/relatorio/boletimDiario/' + action.payload.trabalhoDiario_id;
      }else {
        yield put( RotaActions.setAuxFinalizado(false) );
        yield put( AppConfigActions.showNotifyToast( "Ocorreu um erro no servidor durante a requisição! Por favor, aguarde e tente novamente mais tarde.", "error" ) );
      }
    }else {
      yield put( RotaActions.setAuxFinalizado(false) );
      yield put( AppConfigActions.showNotifyToast( "Falha ao encerrar rota: " + status, "error" ) );
    }

  } catch( err ) {

    yield put( RotaActions.setAuxFinalizado(false) );

    if(err.response){
      if( err.response.data.tipo === 'codigo_amostra_duplicado' ) {
        yield put( AppConfigActions.showNotifyToast( err.response.data.message, "error" ) );
      } else {
        yield put( AppConfigActions.showNotifyToast( "Erro ao encerrar a rota, favor verifique a conexão", "error" ) );
      }
    }
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao iniciar rota, favor verifique a conexão", "error" ) );
  }
}

// Watcher Sagas
function* watchPlanejarRota() {
  yield takeLatest( RotaActions.ActionTypes.PLANEJAR_ROTA_REQUEST, planejarRota );
}

function* watchAlterarRoute() {
  yield takeLatest( RotaActions.ActionTypes.PUT_ROTA_REQUEST, alterarRota );
}

function* watchGetRotasPlanejadas() {
  yield takeLatest( RotaActions.ActionTypes.GET_ROTAS_PLANEJADAS_REQUEST, getRotasPlanejadas );
}

function* watchIsFinalizado() {
  yield takeLatest( RotaActions.ActionTypes.IS_FINALIZADO_REQUEST, isFinalizado );
}

function* watchGetRoute() {
  yield takeLatest( RotaActions.ActionTypes.GET_ROUTES_REQUEST, getRoutes );
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
    watchAlterarRoute(),
  ] );
}
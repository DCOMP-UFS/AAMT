import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as service from '../../services/requests/Ciclo';
import * as CicloActions from './cicloActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getCicloAberto( action ) {
  try {
    const { data, status } = yield call( service.getOpenCyleRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.setCiclo( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar o ciclo em aberto: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o ciclo em aberto, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o ciclo em aberto, favor verifique a conexão", "error" ) );
  }
}

export function* getCycle(action) {
  try {
    const { data, status } = yield call( service.getCycleRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.getCycle( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar ciclo: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o ciclo, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o ciclo, favor verifique a conexão", "error" ) );
  }
}

export function* getCyclesForYear(action) {
  try {
    const { data, status } = yield call( service.getCyclesForYearRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.getCyclesForYear( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os ciclos: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os ciclos, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os ciclos, favor verifique a conexão", "error" ) );
  }
}

export function* getCycles(action) {
  try {
    const { data, status } = yield call( service.getCyclesRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.getCycles( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os ciclos: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os ciclos, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os ciclos, favor verifique a conexão", "error" ) );
  }
}

export function* getAllowedCycles(action) {
  try {
    const { data, status } = yield call( service.getAllowedCyclesRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.getAllowedCycles( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os ciclos: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os ciclos, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os ciclos, favor verifique a conexão", "error" ) );
  }
}

export function* getOpenCycle(action) {
  try {
    const { data, status } = yield call( service.getOpenCyleRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.getOpenCycle( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar o ciclo em aberto: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o ciclo em aberto, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o ciclo em aberto, favor verifique a conexão", "error" ) );
  }
}

export function* createCycle( action ) {
  try {
    const { status } = yield call( service.createCycleRequest, action.payload );

    if( status === 201 ) {
      yield put( AppConfigActions.showNotifyToast( "Ciclo criado com sucesso", "success" ) );

      window.location = window.location.origin.toString() + "/ciclos/consultar";
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar ciclo: " + status, "error" ) );
      yield put( AppConfigActions.showNotifyToast( "Atenção! Não é permitido duplicidade de ciclo", "warning" ) );
    }
  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar o ciclo, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar o ciclo, favor verifique a conexão", "error" ) );
  }
}

export function* updateCycle( action ) {
  try {
    const { data, status } = yield call( service.updateCycleRequest, action.payload );

    if( status === 200 ) {
      yield put( CicloActions.updateCycle( data ) );
      yield put( AppConfigActions.showNotifyToast( "Ciclo editado com sucesso", "success" ) );
    }
    else {
      yield put( CicloActions.changeFlUpdate( false ) );
      yield put( AppConfigActions.showNotifyToast( "Falha ao editar ciclo: " + status, "error" ) );
    }
  } catch (err) {

    yield put( CicloActions.changeFlUpdate( false ) );

    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao editar o ciclo, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao editar o ciclo, favor verifique a conexão", "error" ) );
  }
}

export function* destroyCycle( action ) {
  try {
    const { status, data } = yield call(service.destroyCycleRequest, action.payload);

    if( status === 200 ) {
      yield put( CicloActions.destroyCycle( data.ids ) );
      yield put( AppConfigActions.showNotifyToast( "Ciclo excluido com sucesso", "success" ) );
    }
    else {
      yield put( CicloActions.changeFlDestroyed( false ) );
      yield put( AppConfigActions.showNotifyToast( "Falha ao excluir ciclo: " + status, "error" ) );
    }
  } catch (err) {

    yield put( CicloActions.changeFlDestroyed( false ) );

    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao excluir o ciclo, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao excluir o ciclo, favor verifique a conexão", "error" ) );
  }
}

function* watchGetCicloAberto() {
  yield takeLatest( CicloActions.ActionTypes.GET_CICLO_ABERTO_REQUEST, getCicloAberto );
}

function* watchGetCycle() {
  yield takeLatest( CicloActions.ActionTypes.GET_CYCLE_REQUEST, getCycle );
}

function* watchGetCyclesForYear() {
  yield takeLatest( CicloActions.ActionTypes.GET_CYCLES_FOR_YEAR_REQUEST, getCyclesForYear );
}

function* watchGetCycles() {
  yield takeLatest( CicloActions.ActionTypes.GET_CYCLES_REQUEST, getCycles );
}

function* watchGetAllowedCycles() {
  yield takeLatest( CicloActions.ActionTypes.GET_ALLOWED_CYCLES_REQUEST, getAllowedCycles );
}

function* watchGetOpenCycle() {
  yield takeLatest( CicloActions.ActionTypes.GET_OPEN_CYCLE_REQUEST, getOpenCycle );
}

function* watchCreateCycle() {
  yield takeLatest( CicloActions.ActionTypes.CREATE_CYCLE_REQUEST, createCycle );
}

function* watchUpdateCycle() {
  yield takeLatest( CicloActions.ActionTypes.UPDATE_CYCLE_REQUEST, updateCycle );
}

function* watchDestroyCycle() {
  yield takeLatest( CicloActions.ActionTypes.DESTROY_CYCLE_REQUEST, destroyCycle );
}

export function* cicloSaga() {
  yield all( [
    watchGetCicloAberto(),
    watchGetCycle(),
    watchGetCyclesForYear(),
    watchGetCycles(),
    watchGetAllowedCycles(),
    watchGetOpenCycle(),
    watchCreateCycle(),
    watchUpdateCycle(),
    watchDestroyCycle(),
  ] );
}

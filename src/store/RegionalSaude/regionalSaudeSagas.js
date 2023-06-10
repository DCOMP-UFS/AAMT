import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/RegionalSaude';
import * as RegionalSaudeActions from './regionalSaudeActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getRegionalHealthById(action) {
  try {
    const { data, status } = yield call( servico.getRegionalById, action.payload.id );

    if( status === 200 ) {
      yield put( RegionalSaudeActions.getRegionalHealthByIdSuccess( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar a regional de saúde: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a regional de saúde, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a regional de saúde, favor verifique a conexão", "error" ) );
  }
}

export function* getRegionalHealthByState(action) {
  try {
    const { data, status } = yield call( servico.getRegionalHealthByStateRequest, action.payload );

    if( status === 200 ) {
      yield put( RegionalSaudeActions.getRegionalHealthByStateSuccess( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as regionais de saúde do estado: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as regionais de saúde do estado, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as regionais de saúde do estado, favor verifique a conexão", "error" ) );
  }
}

export function* createRegionalHealth( action ) {
  try {
    const { data, status } = yield call( servico.createRegional, action.payload );

    if( status === 201 ) {
      yield put( RegionalSaudeActions.createRegionalHealthSuccess( data ) );
      yield put( AppConfigActions.showNotifyToast( "Regional criada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar regional: " + status, "error" ) );
    }
  } catch (err) {
    yield put( RegionalSaudeActions.createRegionalHealthFail() );
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar regional, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar regional, favor verifique a conexão", "error" ) );
  }
}

export function* updateRegionalHealth(action) {
  try {
    const { data, status } = yield call( servico.updateRegionalRequest, action.payload );

    if( status === 200 ) {
      yield put( RegionalSaudeActions.updateRegionalHealthSuccess( ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha atualizar dados da regional de saúde: " + status, "error" ) );
    }

  } catch (err) {
    yield put( RegionalSaudeActions.updateRegionalHealthFail( ) );
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro atualizar dados da regional de saúde, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar dados da regional de saúde, favor verifique a conexão", "error" ) );
  }
}

function* watchGetRegionalHealthById() {
  yield takeLatest( RegionalSaudeActions.ActionTypes.GET_REGIONAL_HEALTH_BY_ID_REQUEST, getRegionalHealthById );
}

function* watchGetRegionalHealthByState() {
  yield takeLatest( RegionalSaudeActions.ActionTypes.GET_REGIONAL_HEALTH_BY_STATE_REQUEST, getRegionalHealthByState );
}

function* watchCreateRegionalHealth() {
  yield takeLatest( RegionalSaudeActions.ActionTypes.CREATE_REGIONAL_HEALTH_REQUEST, createRegionalHealth );
}

function* watchUpdateRegionalHealth() {
  yield takeLatest( RegionalSaudeActions.ActionTypes.UPDATE_REGIONAL_HEALTH_REQUEST, updateRegionalHealth );
}

export function* regionalSaudeSaga() {
  yield all( [
    watchGetRegionalHealthById(),
    watchGetRegionalHealthByState(),
    watchCreateRegionalHealth(),
    watchUpdateRegionalHealth(),
  ] );
}
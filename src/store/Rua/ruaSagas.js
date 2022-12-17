import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Rua';
import * as servicoUtil from '../../services/requests/Utilitarios';
import * as RuaActions from './ruaActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

import { Rua } from '../../config/models/index';

/**
 * Sagas para aguarar a consulta a API dos correios.
 * @param {Object} action 
 */
export function* getRuaPorCep( action ) {
  try {
    const { data, status } = yield call( servicoUtil.getRuaPorCepRequest, action.payload );

    if( status === 200 ) {
      const rua = new Rua( {
        id  : null,
        nome: data.logradouro,
        cep : action.payload.cep
      } );
      yield put( RuaActions.setRua( rua ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Não foi possível consultar a rua pelo cep: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a rua pelo cep, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a rua pelo cep, favor verifique a conexão", "error" ) );
  }
}

export function* getStreetByCity(action) {
  try {
    const { data, status } = yield call( servico.getStreetByCityRequest, action.payload );

    if( status === 200 ) {

      yield put( RuaActions. getStreetByCitySuccess( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas do município: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas do município, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas do município, favor verifique a conexão", "error" ) );
  }
}

export function* streetAlreadyExist(action) {
  try {
    const { data, status } = yield call( servico.streetExistRequest, action.payload );

    if( status === 200 ) {
      yield put( RuaActions.streetExistSuccess( data ) );

      if( data.sameCEP )  
        yield put( AppConfigActions.showNotifyToast( "Já exise uma rua com este cep", "error" ))

    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao verificar existência da rua: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao verificar existência da rua, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao verificar existência da rua, favor verifique a conexão", "error" ) );
  }
}

export function* createStreet( action ) {
  try {
    const { data, status } = yield call( servico.createStreetRequest, action.payload );

    if( status === 201 ) {
      yield put( RuaActions.createStreet( data ) );
      yield put( AppConfigActions.showNotifyToast( "Rua criada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar a rua: " + status, "error" ) );
    }
  } catch (err) {

    yield put(RuaActions.createStreetFail())

    if(err.response){
      const {sameName, sameCEP} = err.response.data

      if(sameName)
        yield put( AppConfigActions.showNotifyToast( "Já existe uma rua com este nome na localidade", "error" ) );
      if(sameCEP)
        yield put( AppConfigActions.showNotifyToast( "Já existe uma rua com este CEP", "error" ) );
      if(!sameCEP && !sameName)
        yield put( AppConfigActions.showNotifyToast( "Erro ao criar a rua, entre em contato com o suporte", "error" ) );
    }
    else{
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar a rua, favor verifique a conexão", "error" ) );
    }
  }
}

export function* updateStreet( action ) {
  try {
    const { data, status } = yield call( servico.updateStreetRequest, action.payload );

    if( status === 200 ) {
      yield put( RuaActions.updateStreet( data ) );
      yield put( AppConfigActions.showNotifyToast( "Rua atualizada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizada a rua: " + status, "error" ) );
    }
  } catch (err) {

    yield put(RuaActions.updateStreetFail())
    if(err.response){
      const {sameName, sameCEP} = err.response.data

      if(sameName)
        yield put( AppConfigActions.showNotifyToast( "Já existe uma rua com este nome na localidade", "error" ) );
      if(sameCEP)
        yield put( AppConfigActions.showNotifyToast( "Já existe uma rua com este CEP", "error" ) );
      if(!sameCEP && !sameName)
        yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar a rua, entre em contato com o suporte", "error" ) );
    }
    else{
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar a rua, favor verifique a conexão", "error" ) );
    }
  }
}

export function* deleteStreet( action ) {
  try {
    const { status } = yield call( servico.deleteStreetRequest, action.payload );

    if( status === 200 ) {
      yield put( RuaActions.deleteStreet( action.payload.index ) );
      yield put( AppConfigActions.showNotifyToast( "Rua excluída com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao excluir rua: " + status, "error" ) );
    }
  } catch (err) {

    if(err.response){
      const {numQuarteiroes, error} = err.response.data

      //caso um quarteirão com esteja associado com a rua
      if(numQuarteiroes){
        yield put( AppConfigActions.showNotifyToast( "Existem lados associados a esta rua que devem ser excluidos antes. Os números dos quarteirões que contem esses lados são: "+numQuarteiroes, "warning" ) );
      //provavel erro na api ou banco
      }else
        yield put( AppConfigActions.showNotifyToast( "Erro ao deletar rua, entre em contato com o suporte", "error" ) );
    }
    //Não conseguiu entrar em contato com api
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao deletar rua, favor verifique sua conexão", "error" ) );
  }
}

function* watchGetRuaPorCep() {
  yield takeLatest( RuaActions.ActionTypes.GET_RUA_POR_CEP_REQUEST, getRuaPorCep );
}

function* watchGetStreetByCity() {
  yield takeLatest( RuaActions.ActionTypes.GET_STREET_BY_CITY_REQUEST, getStreetByCity );
}

function* watchCreateStreet() {
  yield takeLatest( RuaActions.ActionTypes.CREATE_STREET_REQUEST, createStreet );
}

function* watchUpdateStreet() {
  yield takeLatest( RuaActions.ActionTypes.UPDATE_STREET_REQUEST, updateStreet );
}

function* watchDeleteStreet() {
  yield takeLatest( RuaActions.ActionTypes.DELETE_STREET_REQUEST, deleteStreet );
}

function* watchStreetAlreadyExist() {
  yield takeLatest( RuaActions.ActionTypes.STREET_EXIST_REQUEST, streetAlreadyExist );
}

export function* ruaSaga() {
  yield all( [
    watchGetRuaPorCep(),
    watchGetStreetByCity(),
    watchCreateStreet(),
    watchUpdateStreet(),
    watchDeleteStreet(),
    watchStreetAlreadyExist(),
  ] );
}
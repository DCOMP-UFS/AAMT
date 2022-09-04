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

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Não foi possível consultar a rua pelo cep.", "error" ) );
  }
}

export function* getStreetByLocality(action) {
  try {
    const { data, status } = yield call( servico.getStreetByLocalityRequest, action.payload );

    if( status === 200 ) {

      yield put( RuaActions.getStreetByLocality( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas da localidade/bairro: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas da localidade/bairro, favor verifique a conexão", "error" ) );
  }
}

export function* streetAlreadyExist(action) {
  try {
    const { data, status } = yield call( servico.streetExistRequest, action.payload );

    if( status === 200 ) {
      yield put( RuaActions.streetExistSuccess( data ) );

      if( data.sameName ) 
        yield put( AppConfigActions.showNotifyToast( "Já existe uma rua com este nome na localidade", "error" ))
      if( data.sameCEP )  
        yield put( AppConfigActions.showNotifyToast( "Já exise uma rua com este cep", "error" ))

    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas da localidade/bairro: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas da localidade/bairro, favor verifique a conexão", "error" ) );
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
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar a rua, favor verifique sua conexão com a internet", "error" ) );
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
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar a rua, favor verifique sua conexão com a internet", "error" ) );
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
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Verifique se existem quarteirões associados a essa rua", "warning" ) );
  }
}

function* watchGetRuaPorCep() {
  yield takeLatest( RuaActions.ActionTypes.GET_RUA_POR_CEP_REQUEST, getRuaPorCep );
}

function* watchGetStreetByLocality() {
  yield takeLatest( RuaActions.ActionTypes.GET_STREET_BY_LOCALITY_REQUEST, getStreetByLocality );
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
    watchGetStreetByLocality(),
    watchCreateStreet(),
    watchUpdateStreet(),
    watchDeleteStreet(),
    watchStreetAlreadyExist(),
  ] );
}
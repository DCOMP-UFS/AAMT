import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Municipio';
import * as MunicipioActions from './municipioActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getMunicipios(action) {
  try {
    const { data, status } = yield call( servico.listRequest );

    if( status === 200 ) {
      yield put( MunicipioActions.getMunicipios( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar municípios: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os municípios, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os municípios, favor verifique a conexão", "error" ) );
  }
}

export function* getCityById(action) {
  try {
    const { data, status } = yield call( servico.getCityByIdRequest, action.payload.id );

    if( status === 200 ) {
      yield put( MunicipioActions.getCityById( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar município: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o município, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar o município, favor verifique a conexão", "error" ) );
  }
}

export function* getCityByRegionalHealth(action) {
  try {
    const { data, status } = yield call( servico.getCityByRegionalHealthRequest, action.payload.regionalSaude_id );

    if( status === 200 ) {
      yield put( MunicipioActions.getCityByRegionalHealth( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar os municípios: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os municípios, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os municípios, favor verifique a conexão", "error" ) );
  }
}

export function* createCity( action ) {
  try {
    const { data, status } = yield call( servico.createCityRequest, action.payload );

    if( status === 201 ) {
      yield put( MunicipioActions.createCitySuccess( data ) );
      yield put( AppConfigActions.showNotifyToast( "Município criado com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar município: " + status, "error" ) );
    }
  } catch (err) {
    yield put( MunicipioActions.createCityFail() );
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar município, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar município, favor verifique a conexão", "error" ) );
  }
}

export function* updateCity( action ) {
  try {
    const { data, status } = yield call( servico.updateRequest, action.payload );

    if( status === 200 ) {
      yield put( MunicipioActions.updateCity( data ) );
      yield put( AppConfigActions.showNotifyToast( "Município atualizado com sucesso", "success" ) );
    } else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar informações do município: " + status, "error" ) );
    }
  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar município, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar município, favor verifique a conexão", "error" ) );
  }
}

function* watchGetMunicipios() {
  yield takeLatest( MunicipioActions.ActionTypes.GET_MUNICIPIOS_REQUEST, getMunicipios );
}

function* watchGetCityById() {
  yield takeLatest( MunicipioActions.ActionTypes.GET_CITY_BY_ID_REQUEST, getCityById );
}

function* watchGetCityByRegionalHealth() {
  yield takeLatest( MunicipioActions.ActionTypes.GET_CITY_BY_REGIONAL_HEALTH_REQUEST, getCityByRegionalHealth );
}

function* watchCreateCity() {
  yield takeLatest( MunicipioActions.ActionTypes.CREATE_CITY_REQUEST, createCity );
}

function* watchUpdateCity() {
  yield takeLatest( MunicipioActions.ActionTypes.UPDATE_CITY_REQUEST, updateCity );
}

export function* municipioSaga() {
  yield all( [
    watchGetMunicipios(),
    watchGetCityById(),
    watchGetCityByRegionalHealth(),
    watchCreateCity(),
    watchUpdateCity(),
  ] );
}
import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Localidade';
import * as LocalidadeActions from './localidadeActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getLocalidades(action) {
  try {
    const { data, status } = yield call( servico.listRequest );

    if( status === 200 ) {
      yield put( LocalidadeActions.getLocations( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as localidades, favor verifique a conexão", "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as localidades, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as localidades, favor verifique a conexão", "error" ) );
  }
}

export function* getLocationById(action) {
  try {
    const { data, status } = yield call( servico.getLocationByIdRequest, action.payload );

    if( status === 200 ) {
      yield put( LocalidadeActions.getLocationById( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a localidade: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a localidade, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a localidade, favor verifique a conexão", "error" ) );
  }
}

export function* getLocationByCity(action) {
  try {
    const { data, status } = yield call( servico.getLocationByCityRequest, action.payload.municipio_id );

    if( status === 200 ) {
      yield put( LocalidadeActions.getLocationByCity( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as localidades: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as localidades, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as localidades, favor verifique a conexão", "error" ) );
  }
}

export function* createLocation( action ) {
  try {
    const { data, status } = yield call( servico.createLocationRequest, action.payload );

    if( status === 201 ) {
      yield put( LocalidadeActions.createLocation( data ) );
      yield put( AppConfigActions.showNotifyToast( "Localidade criada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar a localidade: " + status, "error" ) );
    }
  } catch (err) {
    yield put(LocalidadeActions.createLocationFail())

    if(err.response){
      const {alreadyExist, error} = err.response.data
      if(alreadyExist)
        yield put( AppConfigActions.showNotifyToast( error, "error" ) );
      else
        yield put( AppConfigActions.showNotifyToast( "Erro ao criar a localidade, entre em contato com o suporte", "error" ) );
    }
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar a localidade, favor verifique a conexão", "error" ) );
  }
}

export function* updateLocation( action ) {
  try {
    const { data, status } = yield call( servico.updateRequest, action.payload );

    if( status === 200 ) {
      yield put( LocalidadeActions.updateLocation( data ) );
      yield put( AppConfigActions.showNotifyToast( "Localidade atualizada com sucesso", "success" ) );
    } else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar as informações da localidade: " + status, "error" ) );
    }
  } catch (err) {
    yield put(LocalidadeActions.updateLocationFail())

    if(err.response){
      const {alreadyExist, error} = err.response.data
      if(alreadyExist)
        yield put( AppConfigActions.showNotifyToast( error, "error" ) );
      else
        yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar a localidade, entre em contato com o suporte", "error" ) );
    }
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar a localidade, favor verifique a conexão", "error" ) );
  }
}

function* watchGetLocalidades() {
  yield takeLatest( LocalidadeActions.ActionTypes.GET_LOCATION_REQUEST, getLocalidades );
}

function* watchGetLocationById() {
  yield takeLatest( LocalidadeActions.ActionTypes.GET_LOCATION_BY_ID_REQUEST, getLocationById );
}

function* watchGetLocationByCity() {
  yield takeLatest( LocalidadeActions.ActionTypes.GET_LOCATION_BY_CITY_REQUEST, getLocationByCity );
}

function* watchCreateLocation() {
  yield takeLatest( LocalidadeActions.ActionTypes.CREATE_LOCATION_REQUEST, createLocation );
}

function* watchUpdateLocation() {
  yield takeLatest( LocalidadeActions.ActionTypes.UPDATE_LOCATION_REQUEST, updateLocation );
}

export function* localidadeSaga() {
  yield all( [
    watchGetLocalidades(),
    watchGetLocationById(),
    watchGetLocationByCity(),
    watchCreateLocation(),
    watchUpdateLocation(),
  ] );
}
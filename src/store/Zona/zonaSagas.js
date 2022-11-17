import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Zona';
import * as ZonaActions from './zonaActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getZoneByCity(action) {
  try {
    const { data, status } = yield call( servico.getZoneByCityRequest, action.payload.municipio_id );

    if( status === 200 ) {
      yield put( ZonaActions.getZoneByCity( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as zonas do município: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as zonas do município, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as zonas do município, favor verifique a conexão", "error" ) );
  }
}

export function* getZoneByLocality(action) {
  try {
    const { data, status } = yield call( servico.getZoneByLocalityRequest, action.payload );

    if( status === 200 ) {
      yield put( ZonaActions.getZoneByLocality( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as zonas da localidade: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as zonas da localidade, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as zonas da localidade, favor verifique a conexão", "error" ) );
  }
}

export function* createZone( action ) {
  try {
    const { data, status } = yield call( servico.createZoneRequest, action.payload );

    if( status === 201 ) {
      yield put( ZonaActions.createZone( data ) );
      yield put( AppConfigActions.showNotifyToast( "Zona criada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar a zona: " + status, "error" ) );
    }
  } catch (err) {
      yield put( ZonaActions.createZoneFail())

      if(err.response){
        const {alreadyExist, error} = err.response.data
        if(alreadyExist)
          yield put( AppConfigActions.showNotifyToast( error, "error" ) );
        else
          yield put( AppConfigActions.showNotifyToast( "Erro ao criar a zona, entre em contato com o suporte", "error" ) );
      }
      else
        yield put( AppConfigActions.showNotifyToast( "Erro ao criar a zona, favor verifique a conexão", "error" ) );
  }
}

export function* updateZone( action ) {
  try {
    const { data, status } = yield call( servico.updateRequest, action.payload );
    if( status === 200 ) {
      yield put( ZonaActions.updateZone( data ) );
      yield put( AppConfigActions.showNotifyToast( "Zona atualizada com sucesso", "success" ) );
    } else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar as informações da zona: " + status, "error" ) );
    }
  } catch (err) {
    yield put( ZonaActions.updateZoneFail() )

    if(err.response){
      const {alreadyExist, error} = err.response.data
      if(alreadyExist)
        yield put( AppConfigActions.showNotifyToast( error, "error" ) );
      else
        yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar a zona, entre em contato com o suporte", "error" ) );
    }
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar a zona, favor verifique a conexão", "error" ) );
  }
}

export function* getZoneById(action) {
  try {
    const { data, status } = yield call( servico.getZoneByIdRequest, action.payload );

    if( status === 200 ) {
      yield put( ZonaActions.getZoneById( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a zona: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a zona, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar a zona, favor verifique a conexão", "error" ) );
  }
}

function* watchGetZoneByCity() {
  yield takeLatest( ZonaActions.ActionTypes.GET_ZONE_BY_CITY_REQUEST, getZoneByCity );
}

function* watchGetZoneByLocality() {
  yield takeLatest( ZonaActions.ActionTypes.GET_ZONE_BY_LOCALITY_REQUEST, getZoneByLocality );
}

function* watchCreateZone() {
  yield takeLatest( ZonaActions.ActionTypes.CREATE_ZONE_REQUEST, createZone );
}

function* watchUpdateZone() {
  yield takeLatest( ZonaActions.ActionTypes.UPDATE_ZONE_REQUEST, updateZone );
}

function* watchGetZoneById() {
  yield takeLatest( ZonaActions.ActionTypes.GET_ZONE_BY_ID_REQUEST, getZoneById );
}

export function* zonaSaga() {
  yield all( [
    watchGetZoneByCity(),
    watchGetZoneByLocality(),
    watchCreateZone(),
    watchUpdateZone(),
    watchGetZoneById(),
  ] );
}
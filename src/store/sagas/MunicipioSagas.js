import { call, put } from 'redux-saga/effects';
import { listRequest, createCityRequest, updateRequest, getCityByIdRequest } from '../../services/requests/Municipio';

import * as MunicipioActions from '../actions/MunicipioActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getMunicipios(action) {
  try {
    const { data, status } = yield call( listRequest );

    if( status === 200 ) {
      yield put( MunicipioActions.getMunicipios( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar municípios: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os municípios, favor verifique a conexão", "error" ) );
  }
}

export function* getCityById(action) {
  try {
    const { data, status } = yield call( getCityByIdRequest, action.payload.id );

    console.log(data);


    if( status === 200 ) {
      yield put( MunicipioActions.getCityById( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar município: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar município, favor verifique a conexão", "error" ) );
  }
}

export function* createCity( action ) {
  try {
    const { data, status } = yield call( createCityRequest, action.payload );

    if( status === 201 ) {
      yield put( MunicipioActions.createCity( data ) );
      yield put( AppConfigActions.showNotifyToast( "Município criado com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar município: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao criar o município, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* updateCity( action ) {
  try {
    const { data, status } = yield call( updateRequest, action.payload );

    if( status === 200 ) {
      yield put( MunicipioActions.updateCity( data ) );
      yield put( AppConfigActions.showNotifyToast( "Município atualizado com sucesso", "success" ) );
    } else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar informações do município: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar o município, favor verifique sua conexão com a internet", "error" ) );
  }
}

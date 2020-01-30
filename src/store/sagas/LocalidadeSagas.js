import { call, put } from 'redux-saga/effects';
import { listRequest, createLocationRequest, updateRequest } from '../../services/requests/Localidade';

import * as LocalidadeActions from '../actions/LocalidadeActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getLocalidades(action) {
  try {
    const { data, status } = yield call( listRequest );

    if( status === 200 ) {
      yield put( LocalidadeActions.getLocations( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as localidades, favor verifique a conexão", "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os municípios, favor verifique a conexão", "error" ) );
  }
}

export function* createLocation( action ) {
  // try {
  //   const { data, status } = yield call( createCityRequest, action.payload );

  //   if( status === 201 ) {
  //     yield put( MunicipioActions.createCity( data ) );
  //     yield put( AppConfigActions.showNotifyToast( "Município criado com sucesso", "success" ) );
  //   }else {
  //     yield put( AppConfigActions.showNotifyToast( "Falha ao criar município: " + status, "error" ) );
  //   }
  // } catch (error) {
  //   yield put( AppConfigActions.showNotifyToast( "Erro ao criar o município, favor verifique sua conexão com a internet", "error" ) );
  // }
}

export function* updateLocation( action ) {
  // try {
  //   const { data, status } = yield call( updateRequest, action.payload );

  //   if( status === 200 ) {
  //     yield put( MunicipioActions.updateCity( data ) );
  //     yield put( AppConfigActions.showNotifyToast( "Município atualizado com sucesso", "success" ) );
  //   } else {
  //     yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar informações do município: " + status, "error" ) );
  //   }
  // } catch (error) {
  //   yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar o município, favor verifique sua conexão com a internet", "error" ) );
  // }
}

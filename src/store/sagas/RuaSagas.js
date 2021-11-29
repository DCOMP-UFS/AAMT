import { call, put } from 'redux-saga/effects';
import {
  getStreetByLocalityRequest,
  createStreetRequest,
  updateStreetRequest,
  deleteStreetRequest
} from '../../services/requests/Rua';

import * as RuaActions from '../actions/RuaActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getStreetByLocality(action) {
  try {
    const { data, status } = yield call( getStreetByLocalityRequest, action.payload );

    if( status === 200 ) {
      yield put( RuaActions.getStreetByLocality( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas da localidade/bairro: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas da localidade/bairro, favor verifique a conexão", "error" ) );
  }
}

export function* createStreet( action ) {
  try {
    const { data, status } = yield call( createStreetRequest, action.payload );

    if( status === 201 ) {
      yield put( RuaActions.createStreet( data ) );
      yield put( AppConfigActions.showNotifyToast( "Rua criada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar a rua: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao criar a rua, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* updateStreet( action ) {
  try {
    const { data, status } = yield call( updateStreetRequest, action.payload );

    if( status === 200 ) {
      yield put( RuaActions.updateStreet( data ) );
      yield put( AppConfigActions.showNotifyToast( "Rua atualizada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizada a rua: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao atualizada a rua, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* deleteStreet( action ) {
  try {
    const { status } = yield call( deleteStreetRequest, action.payload );

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


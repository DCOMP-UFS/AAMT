import { call, put } from 'redux-saga/effects';
import {
  getImoveisRequest,
  createHouseRequest,
  updateHouseRequest
} from '../../services/requests/Imovel';

import * as ImovelActions from './imovelActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getImoveis( action ) {
  try {
    const { data, status } = yield call( getImoveisRequest, action.payload );

    if( status === 200 ) {
      yield put( ImovelActions.setImoveis( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar imóveis: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar imóveis, favor verifique a conexão", "error" ) );
  }
}

export function* addImovel( action ) {
  try {
    const { status } = yield call( createHouseRequest, action.payload.imovel );

    if( status === 201 ) {
      document.location.reload();
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao adicionar imóvel: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao adicionar imóvel, favor verifique a conexão", "error" ) );
  }
}

export function* editarImovel( action ) {
  try {
    const { status } = yield call( updateHouseRequest, action.payload.imovel );

    if( status === 200 ) {
      document.location.reload();
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar imóvel: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar imóvel, favor verifique a conexão", "error" ) );
  }
}
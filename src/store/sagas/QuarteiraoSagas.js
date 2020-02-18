import { call, put } from 'redux-saga/effects';
import { getBlockByCityRequest, createCityBlockRequest, getByIdRequest } from '../../services/requests/Quarteirao';
import { createHouseRequest, deleteHouseRequest, updateHouseRequest } from '../../services/requests/Imovel';

import * as QuarteiraoActions from '../actions/QuarteiraoActions';
import * as ImovelActions from '../actions/ImovelActions';
import * as AppConfigActions from '../actions/appConfig';

export function* getBlockByCity(action) {
  try {
    const { data, status } = yield call( getBlockByCityRequest, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.getBlockByCity( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os quarteirões: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar os quarteirões, favor verifique a conexão", "error" ) );
  }
}

export function* getBlockById(action) {
  try {
    const { data, status } = yield call( getByIdRequest, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.getById( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar quarteirão: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar quarteirão, favor verifique a conexão", "error" ) );
  }
}

export function* createCityBlock( action ) {
  try {
    const { data, status } = yield call( createCityBlockRequest, action.payload );

    if( status === 201 ) {
      yield put( QuarteiraoActions.createCityBlock( data ) );
      yield put( AppConfigActions.showNotifyToast( "Quarteirão criada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar quarteirão: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao criar quarteirão, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* addHouse( action ) {
  try {
    const { data, status } = yield call( createHouseRequest, action.payload );

    if( status === 201 ) {
      yield put( QuarteiraoActions.addHouse( data ) );
      yield put( ImovelActions.setCreatedTrue() )
      yield put( AppConfigActions.showNotifyToast( "Imóvel criado", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar imóvel: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao criar imóvel, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* updateHouse( action ) {
  try {
    const { data, status } = yield call( updateHouseRequest, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.updateHouse( data ) );
      yield put( ImovelActions.setUpdatedTrue() );
      yield put( AppConfigActions.showNotifyToast( "Imóvel atualizado", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar imóvel: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar imóvel, favor verifique sua conexão com a internet", "error" ) );
  }
}

export function* deleteHouse( action ) {
  try {
    const { status } = yield call( deleteHouseRequest, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.deleteHouse( action.payload.id, action.payload.lado_id ) );
      yield put( AppConfigActions.showNotifyToast( "Imóvel excluído com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao excluir imóvel: " + status, "error" ) );
    }
  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao excluir imóvel, favor verifique sua conexão com a internet", "error" ) );
  }
}

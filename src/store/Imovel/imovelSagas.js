import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Imovel';
import * as ImovelActions from './imovelActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

/**
 * Saga de consulta de imóveis
 * @param {*} action 
 */
export function* getImoveis( action ) {
  try {
    const { data, status } = yield call( servico.getImoveisRequest, action.payload );

    if( status === 200 ) {
      yield put( ImovelActions.setImoveis( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar imóveis: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao consultar imóveis, favor verifique a conexão", "error" ) );
  }
}

/**
 * Saga para adição de um imóvel
 * @param {*} action 
 */
export function* addImovel( action ) {
  try {
    const { status } = yield call( servico.createHouseRequest, action.payload.imovel );

    if( status === 201 ) {
      document.location.reload();
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao adicionar imóvel: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao adicionar imóvel, favor verifique a conexão", "error" ) );
  }
}

/**
 * Saga para edição de imóvel
 * @param {*} action 
 */
export function* editarImovel( action ) {
  try {
    const { status } = yield call( servico.updateHouseRequest, action.payload.imovel );

    if( status === 200 ) {
      yield put( AppConfigActions.showNotifyToast( "Imóvel atualizado com sucesso!", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar imóvel: " + status, "error" ) );
    }

  } catch (error) {
    yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar imóvel, favor verifique a conexão", "error" ) );
  }
}

function* watchGetImoveis() {
  yield takeLatest( ImovelActions.ActionTypes.GET_IMOVEIS_MUNICIPIO_REQUEST, getImoveis );
}

function* watchAddImovel() {
  yield takeLatest( ImovelActions.ActionTypes.ADD_IMOVEL_REQUEST, addImovel );
}

function* watchEditarImovel() {
  yield takeLatest( ImovelActions.ActionTypes.EDITAR_IMOVEL_REQUEST, editarImovel );
}

export function* imovelSaga() {
  yield all( [
    watchGetImoveis(),
    watchAddImovel(),
    watchEditarImovel(),
  ] );
}
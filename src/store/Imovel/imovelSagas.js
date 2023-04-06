import { takeEvery, takeLatest, call, put, all } from 'redux-saga/effects';
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

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar imóveis, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar imóveis, favor verifique a conexão", "error" ) );
  }
}

/**
 * Saga para adição de um imóvel
 * @param {*} action 
 */
export function* addImovel( action ) {
  try {
    const { status, data } = yield call( servico.createHouseRequest, action.payload.imovel );

    if( status === 201 ) {
      yield put( ImovelActions.addImovelReduce( data ) );
      // document.location.reload();
      yield put( AppConfigActions.showNotifyToast( "Imóvel cadastrado com sucesso!", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao adicionar imóvel: " + status, "error" ) );
    }

  } catch (err) {

    yield put( ImovelActions.setCreatedFalse() );

    if(err.response){

      const {numeroRepetido, numeroSequenciaRepetidos, error} = err.response.data

      if(numeroRepetido)
        yield put( AppConfigActions.showNotifyToast( "O número do imovel informado já é usado por outro imovél do logradouro", "error" ) );
      else if(numeroSequenciaRepetidos)
        yield put( AppConfigActions.showNotifyToast( "O número e a sequência do imovel informado já é usado por outro imovél do logradouro", "error" ) );
      else{
        //Provavel erro de logica na API
        yield put( AppConfigActions.showNotifyToast( "Erro ao adicionar imóvel, entre em contato com o suporte", "error" ) );
      }
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao adicionar imóvel, favor verifique a conexão", "error" ) );
  }
}

/**
 * Saga para edição de imóvel
 * @param {*} action 
 */
export function* editarImovel( action ) {
  try {
    const { status, data } = yield call( servico.updateHouseRequest, action.payload.imovel );

    if( status === 200 ) {
      yield put( ImovelActions.updateImovelReduce(data));
      yield put( AppConfigActions.showNotifyToast( "Imóvel atualizado com sucesso!", "success" ) );
      //setTimeout(() => { document.location.reload( true );}, 1000)
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar imóvel: " + status, "error" ) );
    }

  } catch (err) {

    yield put( ImovelActions.setUpdatedFalse() );

    if(err.response){

      const {numeroRepetido, numeroSequenciaRepetidos, error} = err.response.data

      if(numeroRepetido)
        yield put( AppConfigActions.showNotifyToast( "O número do imovel informado já é usado por outro imovél do logradouro", "error" ) );
      else if(numeroSequenciaRepetidos)
        yield put( AppConfigActions.showNotifyToast( "O número e a sequência do imovel informado já é usado por outro imovél do logradouro", "error" ) );
      else{
        //Provavel erro de logica na API
        yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar imóvel, entre em contato com o suporte", "error" ) );
      }
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar imóvel, favor verifique a conexão", "error" ) );
  }
}

/**
 * Saga para deletar imóvel
 * @param {*} action 
 */
export function* deletarImovel( action ) {
  try {
    const { status, data } = yield call( servico.deletarImovelRequest, action.payload.imovel_id );

    if( status === 200 ) {
      yield put( ImovelActions.setImoveisByImovelId( action.payload.imovel_id ) );
      yield put( AppConfigActions.showNotifyToast( data.message, "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao excluir imóvel: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao excluir o imóvel, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao excluir o imóvel, favor verifique a conexão", "error" ) );
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

function* watchDeletarImovel() {
  yield takeEvery( ImovelActions.ActionTypes.DELETAR_IMOVEL_REQUEST, deletarImovel );
}

export function* imovelSaga() {
  yield all( [
    watchGetImoveis(),
    watchAddImovel(),
    watchEditarImovel(),
    watchDeletarImovel(),
  ] );
}
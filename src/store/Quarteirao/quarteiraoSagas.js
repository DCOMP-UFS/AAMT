import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as service from '../../services/requests/Quarteirao';
import * as imovelService from '../../services/requests/Imovel';
import * as QuarteiraoActions from './quarteiraoActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

/**
 * Solicita ao service os quarteirões de um município
 * @param {Object} action 
 */
export function* getQuarteiroes( action ) {
  try {
    const { data, status } = yield call( service.getQuarteiroesPorMunicipioRequest, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.setQuarteiroes( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar quarteirões: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar quarteirões, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar quarteirões, favor verifique a conexão", "error" ) );
  }
}

/**
 * Solicita ao service os quarteirões de um município que não estão em nenhuma zona
 * @param {Object} action 
 */
export function* getQuarteiroesSemZona( action ) {
  try {
    const { data, status } = yield call( service.getQuarteiroesPorMunicipioSemZonaRequest, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.setQuarteiroes( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar quarteirões: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar quarteirões, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar quarteirões, favor verifique a conexão", "error" ) );
  }
}

export function* getLadosQuarteirao( action ) {
  try {
    const { data, status } = yield call( service.getLadosQuarteiraoRequest, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.setLados( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as ruas do quarteirão: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas do quarteirão, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as ruas do quarteirão, favor verifique a conexão", "error" ) );
  }
}

/**
 * Solicita requisição ao service para atualização do quarteirão
 * 
 * @param {Object} action 
 */
function* setQuarteirao( action ) {
  try {
    const { data, status } = yield call( service.setQuarteiraoRequest, action.payload );
    if( status === 200 ) {
      yield put( QuarteiraoActions.setUpdated( true ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao atualizar quarteirão: " + status, "error" ) );
    }
  } catch( err ) {
    yield put(QuarteiraoActions.setUpdated(false))

    if(err.response){
      const {alreadyExist, error} = err.response.data

      //caso um quarteirão com mesmo codigo no municipio ja exista
      if(alreadyExist)
        yield put( AppConfigActions.showNotifyToast( error, "error" ) );
      //provavel erro na api ou banco
      else
        yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar quarteirão, entre em contato com o suporte", "error" ) );
    }
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao atualizar quarteirão, favor verifique sua conexão", "error" ) );
  }
    
}

/**
 * Solicita ao service add o quarteirão
 * @param {Object} action 
 */
export function* addQuarteirao( action ) {
  try {
    const { data, status } = yield call( service.addQuarteiraoRequest, action.payload.quarteirao );

    if( status === 201 ) {
      yield put( QuarteiraoActions.addQuarteiraoSuccess( data ) );
      yield put( AppConfigActions.showNotifyToast( "Quarteirão criada com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao criar quarteirão: " + status, "error" ) );
    }
  } catch (err) {
    yield put(QuarteiraoActions.setCreated(false))

    if(err.response){
      const {alreadyExist, error} = err.response.data

      //caso um quarteirão com mesmo codigo no municipio ja exista
      if(alreadyExist)
        yield put( AppConfigActions.showNotifyToast( error, "error" ) );
      //provavel erro na api ou banco
      else
        yield put( AppConfigActions.showNotifyToast( "Erro ao criar quarteirão, entre em contato com o suporte", "error" ) );
    }
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao criar quarteirão, favor verifique sua conexão", "error" ) );
  }
}

/**
 * Solicita requisição ao service para excluir lado do quarteirão
 * 
 * @param {Object} action 
 */
function* excluirLado( action ) {
  try {
    const { status } = yield call( service.excluirLadoRequest, action.payload );
    if( status === 200 ) {
      //Ultimo lado foi excluido
      if(action.payload.isUltimoLado)
        yield put(QuarteiraoActions.setUpdated(true))
      else
        yield put( QuarteiraoActions.excluirLadoReduce( action.payload.excluirLadoId, action.payload.addImovelLadoId ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao excluir lado do quarteirão: " + status, "error" ) );
    }
  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao excluir lado do quarteirão, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao excluir lado do quarteirão, favor verifique a conexão", "error" ) );
  }
}

/**
 * Solicita requisição ao service para consultar o quarteirão por ID
 * 
 * @param {Object} action 
 */
function* getQuarteiraoPorId( action ) {
  try {
    const { data, status } = yield call( service.getQuarteiraoPorIdRequest, action.payload );
    if( status === 200 ) {
      yield put( QuarteiraoActions.setQuarteirao( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar quarteirão: " + status, "error" ) );
    }
  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar quarteirão, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar quarteirão, favor verifique a conexão", "error" ) );
  }
}

/**
 * Solicita ao service deletar um imóvel
 * @param {Object} action 
 */
export function* excluirImovel( action ) {
  try {
    const { status } = yield call( imovelService.deleteHouseRequest, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.excluirImovelReduce( action.payload.id, action.payload.lado_id ) );
      yield put( AppConfigActions.showNotifyToast( "Imóvel excluído com sucesso", "success" ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao excluir imóvel: " + status, "error" ) );
    }
  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao excluir imóvel, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao excluir imóvel, favor verifique a conexão", "error" ) );
  }
}

export function* inserirQuarteiraoEmZona( action ) {
  const { updatedZone } =  action.payload
  try {
    const { status } = yield call( service.inserirQuarteiraoEmZona, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.inserirQuarteiraoEmZonaSuccess(updatedZone) );
    }else {
      yield put( QuarteiraoActions.inserirQuarteiraoEmZonaFail() );
      yield put( AppConfigActions.showNotifyToast( "Falha ao adicionar quarteirao na zona: " + status, "error" ) );
    }
  } catch (err) {
    yield put( QuarteiraoActions.inserirQuarteiraoEmZonaFail(updatedZone) );
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao adicionar quarteirao na zona, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao adicionar quarteirao na zona, favor verifique a conexão", "error" ) );
  }
}

export function* removerQuarteiraoEmZona( action ) {
  try {
    const { status } = yield call( service.removerQuarteiraoEmZona, action.payload );

    if( status === 200 ) {
      yield put( QuarteiraoActions.removerQuarteiraoEmZonaSuccess() );
    }else {
      yield put( QuarteiraoActions.removerQuarteiraoEmZonaFail() );
      yield put( AppConfigActions.showNotifyToast( "Falha ao remover quarteirao da zona: " + status, "error" ) );
    }
  } catch (err) {
    yield put( QuarteiraoActions.removerQuarteiraoEmZonaFail() );
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao remover quarteirao da zona, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro ao remover quarteirao da zona, favor verifique a conexão", "error" ) );
  }
}



// Watcher Sagas
function* watchGetQuarteiroes() {
  yield takeLatest( QuarteiraoActions.ActionTypes.GET_QUARTEIROES_MUNICIPIO_REQUEST, getQuarteiroes );
}

function* watchGetQuarteiroesSemZona() {
  yield takeLatest( QuarteiraoActions.ActionTypes.GET_QUARTEIROES_MUNICIPIO_SEM_ZONA_REQUEST, getQuarteiroesSemZona );
}

function* watchGetLadosQuarteirao() {
  yield takeLatest( QuarteiraoActions.ActionTypes.GET_LADOS_QUARTEIRAO, getLadosQuarteirao );
}

function* watchSetQuarteirao() {
  yield takeLatest( QuarteiraoActions.ActionTypes.EDITAR_QUARTEIRAO_REQUEST, setQuarteirao );
}

function* watchGetQuarteiraoPorId() {
  yield takeLatest( QuarteiraoActions.ActionTypes.GET_QUARTEIRAO_POR_ID, getQuarteiraoPorId );
}

function* watchExcluirLado() {
  yield takeLatest( QuarteiraoActions.ActionTypes.EXCLUIR_LADO_REQUEST, excluirLado );
}

function* watchExcluirImovel() {
  yield takeLatest( QuarteiraoActions.ActionTypes.EXCLUIR_IMOVEL_REQUEST, excluirImovel );
}

function* watchAddQuarteirao() {
  yield takeLatest( QuarteiraoActions.ActionTypes.ADD_QUARTEIRAO_REQUEST, addQuarteirao );
}

function* watchInserirQuarteiraoEmZona() {
  yield takeLatest( QuarteiraoActions.ActionTypes.INSERIR_QUARTEIRAO_ZONA_REQUEST, inserirQuarteiraoEmZona );
}
function* watchRemoverQuarteiraoEmZona() {
  yield takeLatest( QuarteiraoActions.ActionTypes.REMOVER_QUARTEIRAO_ZONA_REQUEST, removerQuarteiraoEmZona );
}

export function* quarteiraoSaga() {
  yield all( [
    watchGetQuarteiroes(),
    watchGetQuarteiroesSemZona(),
    watchGetLadosQuarteirao(),
    watchSetQuarteirao(),
    watchGetQuarteiraoPorId(),
    watchExcluirLado(),
    watchExcluirImovel(),
    watchAddQuarteirao(),
    watchInserirQuarteiraoEmZona(),
    watchRemoverQuarteiraoEmZona(),
  ] );
}
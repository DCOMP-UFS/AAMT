import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as servico from '../../services/requests/Categoria';
import * as CategoriaActions from '../Categoria/categoriaActions';
import * as AppConfigActions from '../AppConfig/appConfigActions';

export function* getCategorys( action ) {
  try {
    const { data, status } = yield call( servico.listRequest );

    if( status === 200 ) {
      yield put( CategoriaActions.getCategorys( data ) );
    }else {
      yield put( AppConfigActions.showNotifyToast( "Falha ao consultar as categorias da localidade: " + status, "error" ) );
    }

  } catch (err) {
    if(err.response){
      //Provavel erro de logica na API
      yield put( AppConfigActions.showNotifyToast( "Erro ao consultar as categorias da localidade, entre em contato com o suporte", "error" ) );
      
    }
    //Se chegou aqui, significa que não houve resposta da API
    else
      yield put( AppConfigActions.showNotifyToast( "Erro consultar as categorias da localidade, favor verifique a conexão", "error" ) );
  }
}


function* watchGetCategorys() {
  yield takeLatest( CategoriaActions.ActionTypes.GET_CATEGORY_REQUEST, getCategorys );
}

export function* categoriaSaga() {
  yield all( [
    watchGetCategorys(),
  ] );
}